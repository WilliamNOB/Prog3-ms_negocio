import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/addressRoute", "AddressRouteController.find");
  Route.get("/addressRoute/:id", "AddressRouteController.find");
  Route.post("/addressRoute", "AddressRouteController.create");
  Route.put("/addressRoute/:id", "AddressRouteController.update");
  Route.delete("/addressRoute/:id", "AddressRouteController.delete");
});
