import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Shift from "App/Models/Shift";
import ShiftValidator from "App/Validators/ShiftValidator";

export default class ShiftsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theShift: Shift = await Shift.findOrFail(params.id);
      await theShift.load("driver");
      return theShift;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Shift.query().paginate(page, perPage);
      } else {
        return await Shift.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(ShiftValidator);
    const theShift: Shift = await Shift.create(payload);
    await theShift.load("driver");
    return theShift;
  }

  public async update({ params, request }: HttpContextContract) {
    const theShift: Shift = await Shift.findOrFail(params.id);
    const payload = await request.validate(ShiftValidator);
    theShift.merge(payload);
    await theShift.save();
    await theShift.load("driver");
    return theShift;
  }

  public async delete({ params, response }: HttpContextContract) {
    const theShift: Shift = await Shift.findOrFail(params.id);
    await theShift.delete();
    return response.status(204).json(null);
  }
}
