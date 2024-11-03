Sistema de Gestión de Transporte de productos
Este proyecto es un sistema para la gestión de servicios de transporte de paquetes, diseñado para empresas de logística y transporte. Su objetivo es optimizar la administración de envíos, mejorando la eficiencia y trazabilidad de las entregas.

Características principales
Gestión de Clientes: permite registrar y administrar la información de clientes que envían y reciben paquetes.
Gestión de Paquetes: registro y seguimiento detallado de cada paquete, incluyendo peso, dimensiones y tipo de servicio.
Asignación de Vehículos y Rutas: facilita la asignación de vehículos a envíos y la planificación de rutas óptimas.
Seguimiento en Tiempo Real: permite actualizar el estado de los envíos y realizar un seguimiento en tiempo real del proceso de entrega.
Gestión de Conductores: control de datos de conductores y disponibilidad.
Generación de Reportes: informes detallados sobre la operación, incluyendo historial de envíos, estado de paquetes y rendimiento de los conductores.
Tecnologías Utilizadas
Backend: Java
Base de Datos: Oracle 11g
IDE: IntelliJ IDEA
Gestión de Dependencias: Maven
Control de Versiones: Git y GitHub
SQL: Oracle SQL Developer
Estructura del Proyecto
src/: contiene el código fuente de la aplicación.
resources/: archivos de configuración y recursos adicionales.
docs/: documentación del proyecto.
tests/: pruebas unitarias y de integración.
Configuración del Proyecto
Clonar el repositorio:
git clone <URL del repositorio>
Abrir el proyecto en Visual Studio Code.

Configurar la conexión a la base de datos Oracle 11g en SQL Developer.

Compilar el proyecto con Maven:
mvn clean install

Ejecutar la aplicación desde IntelliJ o mediante el comando:
mvn exec:java

Uso del Sistema
Registrar un nuevo cliente: el sistema permite añadir nuevos clientes con sus datos personales y detalles de contacto.
Crear un envío: se registra el paquete, el cliente destinatario y el tipo de servicio.
Asignar vehículos y conductores: se asigna un conductor y un vehículo disponibles para cada envío.
Actualizar el estado del envío: se realiza un seguimiento de cada envío y se actualiza su estado conforme avanza el proceso de entrega.
Consultar reportes: se pueden generar reportes de desempeño y estadísticas de envíos.
Contribuciones
Las contribuciones son bienvenidas. Por favor, sigue los pasos para crear un pull request, y asegúrate de que el código sigue el estándar y que todas las pruebas unitarias pasen.

Contacto
Para cualquier duda o sugerencia, puedes contactar a [tu email o contacto aquí].
