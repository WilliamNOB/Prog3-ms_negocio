import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/invoice", "InvoiceController.find");
  Route.get("/invoice/:id", "InvoiceController.find");
  Route.post("/invoice", "InvoiceController.create");
  Route.put("/invoice/:id", "InvoiceController.update");
  Route.delete("/invoice/:id", "InvoiceController.delete");
});
