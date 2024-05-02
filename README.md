# Sistema de Gestión de Pacientes - Frontend

Este proyecto de frontend es parte del sistema de gestión de visitas a pacientes de un asilo de ancianos por parte del Hospital 'Los Alerces'. Se integra con el backend alojado en el siguiente repositorio: [Proyecto Alerce Backend](https://github.com/jmcstoltze/proyecto_alerce_back_end).

## Tecnologías utilizadas

- React.js
- React Router DOM
- React Validator
- Axios (para peticiones HTTP)
- JSX

## Descripción

El frontend de este sistema de gestión de pacientes fue desarrollado con React.js. Utiliza el enrutador React Router DOM para la navegación dentro del sitio. Se conecta con la API RESTful del backend para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos de los pacientes almacenados en la base de datos MongoDB.

## Configuración

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando el comando `npm install`.
3. Asegúrate de tener acceso al backend alojado en [Proyecto Alerce Backend](https://github.com/jmcstoltze/proyecto_alerce_back_end).
4. Configura la URL de conexión al backend en el archivo de configuración correspondiente (usualmente en un archivo de constantes o de configuración de la API).
5. Ajusta cualquier otra configuración necesaria según las instrucciones del backend.

## Requerimientos a evaluar

- Configura react-router-dom para la navegación dentro del sitio.
- Crea las rutas de navegación con react-router-dom.
- Conecta la API RestFul del backend con la aplicación de React utilizando Axios.
- Crea componentes para la administración de los pacientes.
- Valida el ingreso de datos desde el frontend con react-validator.
- Implementa redireccionamiento de páginas.
- Utiliza JSX para la lógica de los componentes.

## Componentes

El proyecto contiene un menú de navegación y diversas páginas y componentes:

- Página de inicio o home.
- Componentes para agregar, listar y buscar pacientes.
- Componentes específicos para actualizar o eliminar registros en la base de datos MongoDB.

## Autor

Jose Contreras Stoltze
