import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client';

export default class ClientsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theClient: Client = await Client.findOrFail(params.id)
            await theClient.load("contracts")
            return theClient;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Client.query().paginate(page, perPage)
            } else {
                return await Client.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theClient: Client = await Client.create(body);
        return theClient;
    }

    public async update({ params, request }: HttpContextContract) {
        const theClient: Client = await Client.findOrFail(params.id);
        const body = request.body();
        theClient.name = body.name;
        theClient.email = body.email;
        return await theClient.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theClient: Client = await Client.findOrFail(params.id);
            response.status(204);
            return await theClient.delete();
    }
}
