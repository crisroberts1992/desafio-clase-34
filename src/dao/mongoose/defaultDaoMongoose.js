import { ErrorNotFound } from "../../models/error/errors.model.js";

function toPojo(object) {
  return JSON.parse(JSON.stringify(object));
}

function linker(str, apg, sel) {
  const arrstr = str.split(`page=${apg}`);
  const nextPage = arrstr[0].concat(`page=${apg + 1}`).concat(arrstr[1]);
  const prevPage = arrstr[0].concat(`page=${apg - 1}`).concat(arrstr[1]);
  if (sel === "prev") {
    return prevPage;
  } else if (sel === "next") {
    return nextPage;
  }
  throw new ErrorNotFound("invalid page");
}

export class DaoMongoose {
  #modelDb;
  constructor(mongooseModel) {
    this.#modelDb = mongooseModel;
  }

  async add(element) {
    const pojo = toPojo(await this.#modelDb.create(element));
    delete pojo._id;
    return pojo;
  }

  async findOne(condition) {
    const serched = await this.#modelDb
      .findOne(condition)
      .select({ _id: 0 })
      .lean();
    if (!serched) throw new ErrorNotFound("Not Found");
    return serched;
  }

  async findOneById(condition) {
    const serched = await this.#modelDb
      .findOne({ id: condition })
      .select({ _id: 0 })
      .lean();
    if (!serched) throw new ErrorNotFound("Not Found");
    return serched;
  }

  //if you want to read all condition={}
  async findMany(condition) {
    const serched = await this.#modelDb
      .find(condition)
      .select({ _id: 0 })
      .lean();
    return serched;
  }

  async updateOne(condition, data) {
    const updater = await this.#modelDb
      .findOneAndUpdate({ id: condition }, data, {
        new: true,
        projection: { _id: 0 },
      })
      .lean();
    if (!updater) throw new ErrorNotFound("NOT FOUND");
    delete updater._id;
    return updater;
  }

  async updateMany(condition, data) {
    await this.#modelDb.updateMany(condition, data);
  }

  async deleteOne(condition) {
    const deleted = await this.#modelDb
      .findOneAndDelete({ id: condition }, { projection: { _id: 0 } })
      .lean();
    if (!deleted) throw new ErrorNotFound("NOT FOUND");
    delete deleted._id;
    return deleted;
  }

  async deleteMany(condition) {
    await this.#modelDb.deleteMany(condition);
  }

  //PAGINATION
  async getPaginatedElements(options, data) {
    const optDefault = {
      limit: options.limit || 10,
      page: options.page || 1,
      sort: { price: null },
      lean: true,
      projection: { _id: 0 },
    };

    const optQuery = {
      stock: { $gt: -1 },
    };

    for (const [key, value] of Object.entries(options)) {
      if (key !== "limit" && key !== "page" && key !== "sort")
        optQuery[key] = value;
      if (key === "sort" && (value === "asc" || value === "1")) {
        
        optDefault.sort.price = "ascending";
      } else if (key === "sort" && (value === "desc" || value === "-1")) {
        
        optDefault.sort.price = "descending";
      }
      if (key === "stock" && (value === "disp" || value === "1")) {
        optQuery.stock = { $gt: 0 };
      }
    }

    const result = await this.#modelDb.paginate(optQuery, optDefault);

    return {
      
      payload: result.docs,
      
      status: result.status_code,
      
      totalPages: result.totalPages,
      
      prevPage: result.prevPage,
      
      nextPage: result.nextPage,
      
      page: result.page,
      
      hasPrevPage: result.hasPrevPage,
      
      hasNextPage: result.hasNextPage,
      
      prevLink:
        
        result.hasPrevPage === false
          ? "Not Exist"
          : 
            linker(data, result.page, "prev"),
      
      nextLink:
        
        result.hasNextPage === false
          ? "Not Exist"
          : 
            linker(data, result.page, "next"),
    };
  }
}
