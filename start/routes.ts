/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login', 'UsersController.login')

Route.group(() => {
  Route.get('/list', 'UsersController.getList')

  // for admin
  Route.post('/create/admin', 'UsersController.storeAdmin')
  Route.put('/update/admin', 'UsersController.updateUserAdmin')
  Route.delete('/delete/admin', 'UsersController.deleteAdmin')
}).middleware('jwt').prefix('user')

Route.group(() => {
  Route.get('/list', 'RolesController.getList')
}).middleware('jwt').prefix('master-data/role')

Route.group(() => {
  Route.get('/list', 'DinasController.getList')
}).middleware('jwt').prefix('master-data/dinas')

Route.get('category/list', 'CategoryInfrastucturesController.getAllCategory')

Route.group(() => {
  Route.get('/detail', 'CategoryInfrastucturesController.getById')
  Route.post('/create', 'CategoryInfrastucturesController.create')
  Route.put('/update', 'CategoryInfrastucturesController.update')
  Route.delete('/delete', 'CategoryInfrastucturesController.delete')
}).middleware('jwt').prefix('category')

Route.group(() => {
  Route.post('/', 'UploadsController.uploadShp')
}).middleware('jwt').prefix('shp/upload')

Route.group(() => {
  Route.post('/upload', 'UploadsController.uploadExistingInfrastucture')
  Route.put('/update', 'MasterShpsController.input')
  Route.get('/list', 'MasterShpsController.getList')
  Route.get('/', 'MasterShpsController.getById')
}).middleware('jwt').prefix('master/shp')

Route.group(() => {
  Route.get('/get-maps', 'MapsController.getMaps')
  Route.get('/get-list/kecamatan', 'MapsController.getListKecamatan')
  Route.get('/get-list/kelurahan', 'MapsController.getListKelurahan')
}).prefix('shp')
