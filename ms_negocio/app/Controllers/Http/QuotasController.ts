import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Quota from "App/Models/Quota";

export default class QuotasController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      if (params.id) {
        let theQuota: Quota = await Quota.findOrFail(params.id);
        return theQuota;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          return await Quota.query().paginate(page, perPage);
        } else {
          return await Quota.query();
        }
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theQuota: Quota = await Quota.create(body);
    await theQuota.load("contract");
    await theQuota.load("invoice");
    return theQuota;
  }

  public async update({ params, request }: HttpContextContract) {
    const theQuota: Quota = await Quota.findOrFail(params.id);
    const body = request.body();
    theQuota.amount = body.amount;
    theQuota.dueDate = body.dueDate;
    theQuota.contractId = body.contractId;
    return await theQuota.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theQuota: Quota = await Quota.findOrFail(params.id);
    response.status(204);
    return await theQuota.delete();
  }
}
