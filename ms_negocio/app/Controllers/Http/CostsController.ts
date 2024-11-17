import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Cost from "App/Models/Cost";

export default class CostsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theCost: Cost = await Cost.findOrFail(params.id);
      await theCost.load("company");
      return theCost;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Cost.query().paginate(page, perPage);
      } else {
        return await Cost.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theCost: Cost = await Cost.create(body);
    await theCost.load("invoice");
    await theCost.load("owner");
    return theCost;
  }

  public async update({ params, request }: HttpContextContract) {
    const theCost: Cost = await Cost.findOrFail(params.id);
    const body = request.body();
    theCost.description = body.description;
    theCost.amount = body.amount;
    theCost.invoiceId = body.invoice_id;
    theCost.ownerId = body.owner_id;
    return await theCost.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theCost: Cost = await Cost.findOrFail(params.id);
    response.status(204);
    return await theCost.delete();
  }
}
