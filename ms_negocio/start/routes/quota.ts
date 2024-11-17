import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/quota", "quotaController.find");
  Route.get("/quota/:id", "quotaController.find");
  Route.post("/quota", "quotaController.create");
  Route.put("/quota/:id", "quotaController.update");
  Route.delete("/quota/:id", "quotaController.delete");
});
