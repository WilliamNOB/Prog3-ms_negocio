import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/person", "PersonController.find");
    Route.get("/person/:id", "PersonController.find");
    Route.post("/person", "PersonController.create");
    Route.put("/person/:id", "PersonController.update");
    Route.delete("/person/:id", "PersonController.delete");
})