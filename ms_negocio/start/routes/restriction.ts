import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/restriction", "RestrictionController.find");
  Route.get("/restriction/:id", "RestrictionController.find");
  Route.post("/restriction", "RestrictionController.create");
  Route.put("/restriction/:id", "RestrictionController.update");
  Route.delete("/restriction/:id", "RestrictionController.delete");
});
