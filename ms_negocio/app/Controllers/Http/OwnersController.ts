import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Owner from "App/Models/Owner";

export default class OwnersController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theOwner: Owner = await Owner.findOrFail(params.id);
      return theOwner;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Owner.query().paginate(page, perPage);
      } else {
        return await Owner.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theOwner: Owner = await Owner.create(body);
    await theOwner.load("costs");
    await theOwner.load("vehicles");
    return theOwner;
  }

  public async update({ params, request }: HttpContextContract) {
    const theOwner: Owner = await Owner.findOrFail(params.id);
    const body = request.body();
    theOwner.name = body.name;
    theOwner.email = body.email;
    return await theOwner.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theOwner: Owner = await Owner.findOrFail(params.id);
    response.status(204);
    return await theOwner.delete();
  }
}
