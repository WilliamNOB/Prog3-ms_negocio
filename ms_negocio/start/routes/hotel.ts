import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/hotel", "HotelController.find");
  Route.get("/hotel/:id", "HotelController.find");
  Route.post("/hotel", "HotelController.create");
  Route.put("/hotel/:id", "HotelController.update");
  Route.delete("/hotel/:id", "HotelController.delete");
});
