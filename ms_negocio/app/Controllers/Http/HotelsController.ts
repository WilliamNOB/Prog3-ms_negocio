import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Hotel from "App/Models/Hotel";
import HotelValidator from "App/Validators/HotelValidator";

export default class HotelsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theHotel: Hotel = await Hotel.findOrFail(params.id);
      return theHotel;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Hotel.query().paginate(page, perPage);
      } else {
        return await Hotel.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(HotelValidator);
    const theHotel: Hotel = await Hotel.create(payload);
    return theHotel;
  }

  public async update({ params, request }: HttpContextContract) {
    const theHotel: Hotel = await Hotel.findOrFail(params.id);
    const payload = await request.validate(HotelValidator);
    theHotel.merge(payload);
    await theHotel.save();
    return theHotel;
  }

  public async delete({ params, response }: HttpContextContract) {
    const theHotel: Hotel = await Hotel.findOrFail(params.id);
    await theHotel.delete();
    return response.status(204).json(null);
  }
}
