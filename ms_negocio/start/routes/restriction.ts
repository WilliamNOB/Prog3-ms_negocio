import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.post("/restriction", "RestrictionController.create");
  Route.delete("/restriction/:id", "RestrictionController.delete");
});
