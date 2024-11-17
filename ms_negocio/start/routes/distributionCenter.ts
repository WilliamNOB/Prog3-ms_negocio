import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/distributionCenter", "DistributionCenterController.find");
    Route.get("/distributionCenter/:id", "DistributionCenterController.find");
    Route.post("/distributionCenter", "DistributionCenterController.create");
    Route.put("/distributionCenter/:id", "DistributionCenterController.update");
    Route.delete("/distributionCenter/:id", "DistributionCenterController.delete");
})