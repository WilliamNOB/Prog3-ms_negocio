import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/service", "ServiceController.find");
  Route.get("/service/:id", "ServiceController.find");
  Route.post("/service", "ServiceController.create");
  Route.put("/service/:id", "ServiceController.update");
  Route.delete("/service/:id", "ServiceController.delete");
});
