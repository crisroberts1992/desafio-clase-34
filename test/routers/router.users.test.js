import assert from 'node:assert'

import supertest from 'supertest'
import { userDao } from '../../src/dao/index.js'

//-----------------------------------------------------------------------------------------------------------------

const httpClient = supertest('http://localhost:8080')

describe.only('api rest', () => {

  describe('/api/users', () => {

    beforeEach(async () => {
      await userDao.deleteMany({})
    })

    afterEach(async () => {
      await userDao.deleteMany({})
    })

    describe('POST', () => {
      describe('cuando envio peticion con datos correctos', () => {
        it('crea usuario, devuelve 201', async () => {

          const datosUsuario = {
            nombre: 'juan',
            apellido: 'perez',
            email: 'juan@perez',
            password: 'abc123',
          }

          const resultadoEsperado = {
            nombreCompleto: `${datosUsuario.nombre} ${datosUsuario.apellido}`,
            email: datosUsuario.email
          }

          const response = await httpClient.post('/api/users').send(datosUsuario)

          assert.strictEqual(response.statusCode, 201)
          assert.deepStrictEqual(response.body, resultadoEsperado)
        })
      })
    })
  })

  describe('GET', () => {
    describe('cuando envio peticion y hay usuarios', () => {
      it('devuelve la coleccion de usuarios y codigo 200', async () => {

        const usuarioEnLaDB = {
          id: '123123',
          first_name: 'juan',
          last_name: 'perez',
          age: 25,
          email: 'juan@perez',
          password: 'abc123',
          role: 'user',
          cart: []
        }
        await userDao.create(usuarioEnLaDB)

        const response = await httpClient.get('/api/users')

        assert.strictEqual(response.statusCode, 200)
        assert.deepStrictEqual(response.body, [usuarioEnLaDB])

      })
    })
  })
})