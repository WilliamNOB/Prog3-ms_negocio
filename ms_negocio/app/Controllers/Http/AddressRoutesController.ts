import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AddressRoute from "App/Models/AddressRoute";
import AddressRouteValidator from "App/Validators/AddressRouteValidator";

export default class AddressRoutesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theAddressRoute: AddressRoute = await AddressRoute.findOrFail(
        params.id
      );
      await theAddressRoute.load("address");
      await theAddressRoute.load("route");
      await theAddressRoute.load("batch");
      return theAddressRoute;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await AddressRoute.query().paginate(page, perPage);
      } else {
        return await AddressRoute.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(AddressRouteValidator);
    const theAddressRoute: AddressRoute = await AddressRoute.create(payload);
    await theAddressRoute.load("address");
    await theAddressRoute.load("route");
    await theAddressRoute.load("batch");
    return theAddressRoute;
  }

  public async update({ params, request }: HttpContextContract) {
    const theAddressRoute: AddressRoute = await AddressRoute.findOrFail(
      params.id
    );
    const payload = await request.validate(AddressRouteValidator);
    theAddressRoute.merge(payload);
    await theAddressRoute.save();
    await theAddressRoute.load("address");
    await theAddressRoute.load("route");
    await theAddressRoute.load("batch");
    return theAddressRoute;
  }

  public async delete({ params, response }: HttpContextContract) {
    const theAddressRoute: AddressRoute = await AddressRoute.findOrFail(
      params.id
    );
    await theAddressRoute.delete();
    return response.status(204).json(null);
  }
}
