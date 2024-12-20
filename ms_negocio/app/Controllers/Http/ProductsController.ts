import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";

export default class ProductsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theProduct: Product = await Product.findOrFail(params.id);
      await theProduct.load("client");
      return theProduct;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Product.query().paginate(page, perPage);
      } else {
        return await Product.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theProduct: Product = await Product.create(body);
    await theProduct.load("client");
    return theProduct;
  }

  public async update({ params, request }: HttpContextContract) {
    const theProduct: Product = await Product.findOrFail(params.id);
    const body = request.body();
    theProduct.name = body.name;
    theProduct.description = body.description;
    theProduct.price = body.price;
    theProduct.stock = body.stock;
    theProduct.client_id = body.client_id;
    theProduct.category_product_id = body.category_product_id;
    theProduct.batch_id = body.batch_id;
    return await theProduct.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theProduct: Product = await Product.findOrFail(params.id);
    response.status(204);
    return await theProduct.delete();
  }
}
