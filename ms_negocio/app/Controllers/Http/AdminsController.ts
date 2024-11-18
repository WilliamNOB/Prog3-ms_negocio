import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Admin from "App/Models/Admin";
import AdminValidator from "App/Validators/AdminValidator";

export default class AdminsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theAdmin: Admin = await Admin.findOrFail(params.id);
      await theAdmin.load("service");
      return theAdmin;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Admin.query().paginate(page, perPage);
      } else {
        return await Admin.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(AdminValidator);
    const theAdmin: Admin = await Admin.create(payload);
    await theAdmin.load("service");
    return theAdmin;
  }

  public async update({ params, request }: HttpContextContract) {
    const theAdmin: Admin = await Admin.findOrFail(params.id);
    const payload = await request.validate(AdminValidator);
    theAdmin.merge(payload);
    await theAdmin.save();
    await theAdmin.load("service");
    return theAdmin;
  }

  public async delete({ params, response }: HttpContextContract) {
    const theAdmin: Admin = await Admin.findOrFail(params.id);
    await theAdmin.delete();
    return response.status(204).json(null);
  }
}
