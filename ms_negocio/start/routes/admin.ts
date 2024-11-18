import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/admin", "AdminController.find");
  Route.get("/admin/:id", "AdminController.find");
  Route.post("/admin", "AdminController.create");
  Route.put("/admin/:id", "AdminController.update");
  Route.delete("/admin/:id", "AdminController.delete");
});
