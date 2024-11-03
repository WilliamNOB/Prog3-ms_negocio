import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Person from 'App/Models/Person';

export default class PeopleController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let thePerson: Person = await Person.findOrFail(params.id)
            return thePerson;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Person.query().paginate(page, perPage)
            } else {
                return await Person.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const thePerson: Person = await Person.create(body);
        return thePerson;
    }

    public async update({ params, request }: HttpContextContract) {
        const thePerson: Person = await Person.findOrFail(params.id);
        const body = request.body();
        thePerson.name = body.name;
        thePerson.email = body.email;
        return await thePerson.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thePerson: Person = await Person.findOrFail(params.id);
            response.status(204);
            return await thePerson.delete();
    }
}
