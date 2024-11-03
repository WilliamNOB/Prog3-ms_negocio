import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/company", "CompanyController.find");
    Route.get("/company/:id", "CompanyController.find");
    Route.post("/company", "CompanyController.create");
    Route.put("/company/:id", "CompanyController.update");
    Route.delete("/company/:id", "CompanyController.delete");
})