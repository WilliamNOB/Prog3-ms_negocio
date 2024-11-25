import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Restriction from "App/Models/Restriction";

export default class RestrictionsController {
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theRestriction: Restriction = await Restriction.create(body);
    await theRestriction.load("municipality");
    return theRestriction;
  }

  public async delete({ params, response }: HttpContextContract) {
    const theRestriction: Restriction = await Restriction.findOrFail(params.id);
    response.status(204);
    return await theRestriction.delete();
  }
}
