import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Route from "App/Models/Route";

export default class RoutesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theRoute: Route = await Route.findOrFail(params.id);
      return theRoute;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Route.query().paginate(page, perPage);
      } else {
        return await Route.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theRoute: Route = await Route.create(body);
    await theRoute.load("contract");
    await theRoute.load("vehicle");
    return theRoute;
  }

  public async update({ params, request }: HttpContextContract) {
    const theRoute: Route = await Route.findOrFail(params.id);
    const body = request.body();
    theRoute.name = body.name;
    theRoute.batches = body.batches;
    theRoute.addressId = body.addressId;
    theRoute.contractId = body.contractId;
    theRoute.vehicleId = body.vehicleId;
    return await theRoute.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theRoute: Route = await Route.findOrFail(params.id);
    response.status(204);
    return await theRoute.delete();
  }
}
