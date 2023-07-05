async function addProductQuantityToCart(cid, pid, quantity) {
  const cidarr = cid.split("carts/");
  const cidt = cidarr[1];
  const FETCH_URL = `http://localhost:8080/api/carts/${cidt}/product/${pid}?quantity=${quantity}`;
  const { status } = await fetch(FETCH_URL, { method: "POST",headers: { "Content-Type": "application/json" }});
  console.log(status);

  if (status === 201) {
    
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: true,
      title: `Added product`,
      icon: "success",
      background: "#bd9cfa",
      color: "#fff",
      confirmButtonColor: "#01657ed1",
    });
  } else {
    console.log("Excedeed Quantity: " + status);
    
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: true,
      title: `Not Enough Stock`,
      icon: "info",
      background: "#600252",
      color: "#fff",
      confirmButtonColor: "#01657ed1",
    });
  }
}
