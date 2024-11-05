import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/categoryProducts", "CategoryProductsController.find");
    Route.get("/categoryProducts/:id", "CategoryProductsController.find");
    Route.post("/categoryProducts", "CategoryProductsController.create");
    Route.put("/categoryProducts/:id", "CategoryProductsController.update");
    Route.delete("/categoryProducts/:id", "CategoryProductsController.delete");
})