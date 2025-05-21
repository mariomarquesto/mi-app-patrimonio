Inventario de Bienes Patrimoniales
Esta aplicación React es una herramienta diseñada para gestionar y generar un inventario de bienes patrimoniales. Permite a los usuarios ingresar detalles sobre diferentes activos, incluyendo descripciones, códigos, vida útil y amortización anual, y luego generar una tabla con estos datos que puede ser exportada a un documento PDF con un formato específico.

Características
Formulario de Ingreso de Datos: Interfaz intuitiva para introducir información detallada sobre cada bien.

Autocompletado Inteligente: Al escribir la descripción de un bien, la aplicación sugiere ítems existentes de una base de datos local (itemsData.json) y auto-rellena campos relacionados como Cuenta, Especie, Vida Útil y Amortización Anual.

Generación de Tabla Dinámica: Los datos ingresados se añaden a una tabla en pantalla, permitiendo una visualización clara de todos los bienes registrados.

Exportación a PDF: Capacidad de exportar la tabla de inventario a un documento PDF. El PDF incluye:

Título principal: "INVENTARIO DE BIENES" (centrado).

Subtítulo: "Contaduria General de la Provincia Departamento Patrimonial".

Detalles del formulario: "Reparticion:", "Dependencia:", "Habitacion:", y "Motivo:" con sus respectivos valores (priorizando códigos numéricos sobre descripciones si ambos están presentes).

"Descripción General" del formulario.

La tabla de bienes generada.

Orientación horizontal (landscape) del documento.

Diseño Responsivo: La aplicación está diseñada para ser utilizable en diferentes tamaños de pantalla.

Tecnologías Utilizadas
React: Biblioteca de JavaScript para construir interfaces de usuario.

HTML2Canvas: Biblioteca para tomar "capturas de pantalla" de elementos HTML y convertirlos en imágenes de lienzo.

jsPDF: Biblioteca para generar documentos PDF en el lado del cliente.

JavaScript (ES6+): Lógica de la aplicación.

CSS: Estilos y diseño de la interfaz.

Estructura del Proyecto
mi-app-patrimonio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── FilterForm.js
│   │   ├── DataTable.js
│   │   └── Footer.js
│   ├── data/
│   │   └── itemsData.json  <-- Base de datos local para autocompletado
│   ├── App.js
│   ├── App.css
│   ├── FilterForm.css
│   └── index.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

Cómo Ejecutar la Aplicación Localmente
Para poner en marcha esta aplicación en tu máquina local, sigue estos pasos:

Clona el repositorio (si aún no lo has hecho):

git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio # Asegúrate de estar en la carpeta raíz del proyecto

(Reemplaza https://github.com/tu-usuario/tu-repositorio.git con la URL real de tu repositorio).

Instala las dependencias:

npm install
# o si usas yarn
yarn install

Inicia la aplicación:

npm start
# o si usas yarn
yarn start

Esto abrirá la aplicación en tu navegador en http://localhost:3000.

Despliegue
Esta aplicación está diseñada para ser fácilmente desplegada en plataformas como Vercel o Netlify.

Despliegue con Vercel (Recomendado)
Asegúrate de que tu código esté en un repositorio de Git (GitHub, GitLab, Bitbucket).

Ve a https://vercel.com/ y crea una cuenta o inicia sesión (preferiblemente con tu cuenta de GitHub).

En el dashboard de Vercel, haz clic en "Add New..." -> "Project".

Selecciona tu repositorio de Git. Vercel detectará automáticamente que es una aplicación React y configurará los ajustes de construcción.

Haz clic en "Deploy". Vercel construirá y desplegará tu aplicación, proporcionándote una URL pública.

Contacto
Si tienes alguna pregunta o sugerencia, no dudes en contactar al desarrollador.
