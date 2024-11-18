import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/vehicleDriver", "VehicleDriverController.find");
  Route.get("/vehicleDriver/:id", "VehicleDriverController.find");
  Route.post("/vehicleDriver", "VehicleDriverController.create");
  Route.put("/vehicleDriver/:id", "VehicleDriverController.update");
  Route.delete("/vehicleDriver/:id", "VehicleDriverController.delete");
});
