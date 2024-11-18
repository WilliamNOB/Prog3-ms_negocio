import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/vehicleOwner", "VehicleOwnerController.find");
  Route.get("/vehicleOwner/:id", "VehicleOwnerController.find");
  Route.post("/vehicleOwner", "VehicleOwnerController.create");
  Route.put("/vehicleOwner/:id", "VehicleOwnerController.update");
  Route.delete("/vehicleOwner/:id", "VehicleOwnerController.delete");
});
