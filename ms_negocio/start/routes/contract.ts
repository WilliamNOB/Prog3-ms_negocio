import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/contract", "ContractController.find");
    Route.get("/contract/:id", "ContractController.find");
    Route.post("/contract", "ContractController.create");
    Route.put("/contract/:id", "ContractController.update");
    Route.delete("/contract/:id", "ContractController.delete");
})