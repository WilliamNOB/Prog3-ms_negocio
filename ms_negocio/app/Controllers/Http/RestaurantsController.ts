import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Restaurant from "App/Models/Restaurant";
import RestaurantValidator from "App/Validators/RestaurantValidator";

export default class RestaurantsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theRestaurant: Restaurant = await Restaurant.findOrFail(params.id);
      return theRestaurant;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Restaurant.query().paginate(page, perPage);
      } else {
        return await Restaurant.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(RestaurantValidator);
    const theRestaurant: Restaurant = await Restaurant.create(payload);
    return theRestaurant;
  }

  public async update({ params, request }: HttpContextContract) {
    const theRestaurant: Restaurant = await Restaurant.findOrFail(params.id);
    const payload = await request.validate(RestaurantValidator);
    theRestaurant.merge(payload);
    await theRestaurant.save();
    return theRestaurant;
  }

  public async delete({ params, response }: HttpContextContract) {
    const theRestaurant: Restaurant = await Restaurant.findOrFail(params.id);
    await theRestaurant.delete();
    return response.status(204).json(null);
  }
}
