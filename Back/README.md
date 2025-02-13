# Proyecto_9

## Introducción

Web Scraping es una técnica utilizada para extraer información de sitios web. Consiste en el uso de programas o scripts para automatizar la navegación y la recolección de datos de manera eficiente y automatizada. Los datos obtenidos pueden ser utilizados para una variedad de propósitos, como:

- Monitorización de peliculas, pecios.
- Recopilación de datos para análisis.
- Generación de contenido automatizado.
- Análisis de tendencias en redes sociales.
- Extracción de datos de sitios de comparación de precios.
- Recopilación de noticias y actualizaciones en sitios de comercio electrónico.
  El Web Scraping es una herramienta poderosa que puede optimizar diversos procesos de recolección de datos en la web.

## Pupeteer

Puppeteer es una biblioteca de Node.js desarrollada por Google. Permite controlar de manera programática un navegador web (Chromium) para realizar tareas como:

- Navegar por sitios web de manera automatizada.
- Extraer información de páginas web.
- Interactuar con formularios, hacer clic en botones, tomar capturas de pantalla, entre otros.
  Es especialmente útil para el web scraping de sitios que requieren interacción con JavaScript o tienen contenido dinámico.

## Mongoose

Mongoose es una librería de Node.js que facilita la interacción con bases de datos MongoDB. Proporciona una solución de modelado de datos basada en esquemas, permitiendo:

- Definir esquemas de datos y validaciones.
- Crear y administrar documentos en MongoDB.
- Realizar consultas y manipulaciones de datos de forma eficiente.
  En este proyecto, Mongoose se utiliza para almacenar y organizar los datos recolectados mediante web scraping.

## Endpoints

### Peliculas

GET /api/v1/:genero : buscar por genero
GET /api/v1/peliculas : buscar todas las peliculas

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB(Atlas)
- Mongoose
- INMSOMIA
- Visual Studio Code
- Cloudinary
- Multer
- Puppeteer

## Instalación

<!-- ### Se clona este repositorio

- https://github.com/GiraMorales/Proyecto_9_WEB_SCRAPPING.git -->

Incializar un paquete de npm

```jsx
nmp init -y
```

Instalación de paquetes necesacios

```jsx
npm i puppeteer mongoose
```

Crear un fichero index.js

```jsx
touch index.js
```

Añadir el script para ejecutar dicho fichor en el package.json

```jsx
"start": node index.js
```

### Guia

En nuestro fichero index.js

- Se importan las bibliotecas de Puppeteer y Mongoose al principio del script.
- Se crea un modelo de datos llamado "Data" utilizando Mongoose, con tres campos: género, título, portada y sipnosis.
- Se define una función "connectDB" para conectarse a la base de datos MongoDB.
- Se define una función "scrap" para extraer los datos de la página web.

  a. Se llama a la función "connectDB" para conectarse a la base de datos.
  b. Se inicializa el navegador con Puppeteer y se abre nueva pestaña.
  c. Se navega a la URL especifica (sensacine en este caso) y se realiza una búsqueda en el sitio utilizando la palabra "peliculas" o buscando por el género de la película.
  d. Se esprea a que la pagina se cargue y se hace un scroll para ver más resultados de búsqueda.
  e. Utilizando el método ".$$eval" de Puppeteer se extraen los géneros, títulos, portadas y sipnosis de las películas de la página.
  f. Se crea un array con los datos extraídos y se convierte en un objeto JSON.
  g. Se guarda el objeto JSON en la base de datos MongoDB.
  h. Se cierra el navegador y se imprime un mensaje de éxito.

### añadir los scripts

`Para ejecutar el fichero  index.js`

- "start": "node index.js"

`Para levantar la base de datos`

- "dev": "nodemon index.js"
