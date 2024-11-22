import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Invoice from "App/Models/Invoice";
import InvoiceValidator from "App/Validators/InvoiceValidator";
import Env from "@ioc:Adonis/Core/Env";
import axios from "axios";

export default class InvoicesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theInvoice: Invoice = await Invoice.findOrFail(params.id);
      await theInvoice.load("cost");
      return theInvoice;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Invoice.query().paginate(page, perPage);
      } else {
        return await Invoice.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(InvoiceValidator);
    const body = request.body();
    const theInvoice: Invoice = await Invoice.create(body);
    await theInvoice.load("quota");

    await theInvoice.load("cost", (costQuery) => {
      costQuery.preload("driver");
    });
    const user = theInvoice.cost.driver?.email;

    // const userResponse = await axios.get(
    //   //PARA OBTENER LA INFO DEL USUARIO DESDE MS_SEGURIDAD
    //   `${Env.get("MS_SECURITY")}/users/${user}`,
    //   {
    //     headers: { Authorization: request.headers().authorization || "" },
    //   }
    // );
    // //PONER IF..

    // if (!userResponse.data.email) {
    //   //VERIFICAR QUE SI ENCONTRÓ EL EMAIL DE ESE USER
    //   return {
    //     message: "El correo del usuario no está disponible.",
    //   };
    // }

    const emailPayload = {
      subject: "Nueva factura",
      recipient:user,//ACCEDER AL EMAIL DEL CONDUCTOR QUE HIZO EL GASTO DEL CUAL ES ESA FACTURA
      body_html: `<p>Estimado usuario,</p>

<p>Nos complace informarle que se ha generado una nueva factura en nuestro sistema con los siguientes detalles:</p>

<table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
  <tr style="background-color: #f2f2f2;">
    <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Detalle</th>
    <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Información</th>
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>ID de la factura:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theInvoice.id}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>ID de la cuota:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theInvoice.quotaId}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Monto del gasto:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theInvoice.cost.amount}</td>
  </tr>
    <tr>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><b>Id del conductor asociado:</b></td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${theInvoice.cost.driverId}</td>
  </tr>
</table>

<p style="margin-top: 20px;">Si tiene alguna pregunta o necesita más información, no dude en ponerse en contacto con nosotros.</p>

<p>Gracias por utilizar nuestros servicios.</p>

<p style="margin-top: 20px;"><b>Atentamente,</b></p>
<p>Gestión de servicios de carga de productos</p>
`,
    };

    // Llamar al microservicio de notificaciones
    const emailResponse = await axios.post(
      `${Env.get("MS_NOTIFICATIONS")}/send-email`,
      emailPayload
    );

    if (!emailResponse.data || emailResponse.status !== 200) {
      console.warn("No se pudo enviar el email de confirmación.");
    }

    return theInvoice;
  }

  public async update({ params, request }: HttpContextContract) {
    const theInvoice: Invoice = await Invoice.findOrFail(params.id);
    const body = request.body();
    theInvoice.amount = body.amount;
    theInvoice.quotaId = body.quotaId;
    theInvoice.costId = body.costId;
    return await theInvoice.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theInvoice: Invoice = await Invoice.findOrFail(params.id);
    response.status(204);
    return await theInvoice.delete();
  }
}
