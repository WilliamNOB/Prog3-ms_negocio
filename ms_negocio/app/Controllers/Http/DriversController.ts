import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Driver from "App/Models/Driver";
import DriverValidator from "App/Validators/DriverValidator";

export default class DriversController {
  public async index({ request, params }: HttpContextContract) {
    if (params.id) {
      const theDriver = await Driver.findOrFail(params.id);
      return theDriver;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Driver.query().paginate(page, perPage);
      } else {
        return await Driver.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(DriverValidator);
    const theDriver: Driver = await Driver.create(payload);
    return theDriver;
  }

  public async update({ params, request }: HttpContextContract) {
    const theDriver: Driver = await Driver.findOrFail(params.id);
    const payload = await request.validate(DriverValidator);
    theDriver.merge(payload);
    await theDriver.save();
    return theDriver;
  }

  public async delete({ params, response }: HttpContextContract) {
    const theDriver: Driver = await Driver.findOrFail(params.id);
    await theDriver.delete();
    return response.status(204).json(null);
  }
}
