import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Restriction from 'App/Models/Restriction';
import RestrictionValidator from 'App/Validators/RestrictionValidator';
import axios from 'axios';
import Env from "@ioc:Adonis/Core/Env";
import axios from "axios";

export default class RestrictionsController {
    public async create({ request }: HttpContextContract) {
        await request.validate(RestrictionValidator);
        const body = request.body();
        const theRestriction: Restriction = await Restriction.create(body);
        await theRestriction.load("municipality", (vehicleQuery) => {
          vehicleQuery.preload("vehicles", (ownerQuery) => ){
          vehicleQuery.preload("owners", (ownerQuery) => {
            ownerQuery.preload('user')
        })
        const user = theRestriction.municipality.vehicleowner?.user;
    
        const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${user}`,
        {
        headers: { Authorization: request.headers().authorization || "" },
        }
        );
    
        if (!userResponse.data.email) {
        return {
        message: "El correo del usuario no está disponible.",
        };
        }
    
        const emailPayload = {
          subject: "Nueva factura",
          recipient:user,
          body_html: `<p>Estimado usuario,</p>
    
    <p>Nos complace informarle que se ha generado una nueva factura en nuestro sistema con los siguientes detalles:</p>
    
    <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
      <tr style="background-color: #f2f2f2;">
        <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Detalle</th>
        <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Información</th>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Id de la restricción:</b></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theRestriction.id}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Descripción:</b></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theRestriction.description}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Fecha en que comienza:</b></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theRestriction.init}</td>
      </tr>
        <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Fecha en que termina:</b></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theRestriction.end}</td>
      </tr>
      </tr>
        <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Id del municipio asociado:</b></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theRestriction.municipality_id}</td>
      </tr>
    </table>
    
    <p style="margin-top: 20px;">Si tiene alguna pregunta o necesita más información, no dude en ponerse en contacto con nosotros.</p>
    
    <p>Gracias por utilizar nuestros servicios.</p>
    
    <p style="margin-top: 20px;"><b>Atentamente,</b></p>
    <p>Gestión de servicios de carga de productos</p>
    `,
        };
    
        const emailResponse = await axios.post(
          `${Env.get("MS_NOTIFICATIONS")}/send-email`,
          emailPayload
        );
    
        if (!emailResponse.data || emailResponse.status !== 200) {
          console.warn("No se pudo enviar el email de confirmación.");
        }
    
        return theRestriction;
      }

    public async delete({ params, response }: HttpContextContract) {
        const theRestriction: Restriction = await Restriction.findOrFail(params.id);
            response.status(204);
            return await theRestriction.delete();
    }
  })
  