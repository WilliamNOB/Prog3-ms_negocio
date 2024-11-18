import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/restaurant", "RestaurantController.find");
  Route.get("/restaurant/:id", "RestaurantController.find");
  Route.post("/restaurant", "RestaurantController.create");
  Route.put("/restaurant/:id", "RestaurantController.update");
  Route.delete("/restaurant/:id", "RestaurantController.delete");
});
