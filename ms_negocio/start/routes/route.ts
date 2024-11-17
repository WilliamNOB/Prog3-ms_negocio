import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/route", "RouteController.find");
  Route.get("/route/:id", "RouteController.find");
  Route.post("/route", "RouteController.create");
  Route.put("/route/:id", "RouteController.update");
  Route.delete("/route/:id", "RouteController.delete");
});
