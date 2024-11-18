import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/shift", "ShiftController.find");
  Route.get("/shift/:id", "ShiftController.find");
  Route.post("/shift", "ShiftController.create");
  Route.put("/shift/:id", "ShiftController.update");
  Route.delete("/shift/:id", "ShiftController.delete");
});
