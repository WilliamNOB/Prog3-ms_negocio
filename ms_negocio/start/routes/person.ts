import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/people", "PeopleController.find");
    Route.get("/people/:id", "PeopleController.find");
    Route.post("/people", "PeopleController.create");
    Route.put("/people/:id", "PeopleController.update");
    Route.delete("/people/:id", "PeopleController.delete");
})