import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/cost", "CostController.find");
  Route.get("/cost/:id", "CostController.find");
  Route.post("/cost", "CostController.create");
  Route.put("/cost/:id", "CostController.update");
  Route.delete("/cost/:id", "CostController.delete");
});
