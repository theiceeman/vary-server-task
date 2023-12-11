/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/login', 'UserService.login')
  Route.post('/signup', 'UserService.signup')
  Route.get('/view', 'UserService.view')
}).prefix('/users')


Route.group(() => {
  Route.post('/create', 'BookService.create')
  Route.get('/view/:page/:limit', 'BookService.view')
}).prefix('/books')


Route.group(() => {
  Route.post('/create', 'OrderService.create')
  Route.post('/cancel', 'OrderService.cancel')
  Route.post('/complete', 'OrderService.complete')
  Route.get('/view', 'OrderService.view')
}).prefix('/orders')

