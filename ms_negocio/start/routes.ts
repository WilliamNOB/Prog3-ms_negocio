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

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

import "./routes/company";
import "./routes/person";
import "./routes/client";
import "./routes/contract";
import "./routes/product";
import "./routes/category";
import "./routes/categoryProduct";
import "./routes/department";
import "./routes/municipality";
import "./routes/address";
import "./routes/insurance";
import "./routes/vehicle";
import "./routes/distributionCenter";
import "./routes/batch";
import "./routes/operation";
import "./routes/route";
import "./routes/quota";
import "./routes/invoice";
import "./routes/cost";
import "./routes/user";
