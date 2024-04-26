# API para Explorar el Universo Disney

Esta es una aplicación desarrollada para explorar el universo de Disney, permitiendo conocer y modificar los personajes, así como comprender las películas en las que participaron. La API expone la información de manera que cualquier frontend pueda consumirla de manera sencilla.

## Interfaces de usuario

![image](https://github.com/sebastiannarvaez23/dv-idico-web/assets/88569352/ad031d7f-dffa-4662-92ed-39810c297adb)

![image](https://github.com/sebastiannarvaez23/dv-idico-web/assets/88569352/9b85d275-897f-4c03-a7e5-0a3e5c865d3b)

![image](https://github.com/sebastiannarvaez23/dv-idico-web/assets/88569352/ddd85383-aa7a-4220-a646-088cd3e22898)

![image](https://github.com/sebastiannarvaez23/dv-idico-web/assets/88569352/2eeb1e51-6f09-4780-bbc9-e32b7b8ec563)


## Tecnologías Utilizadas

- **NodeJs**: Para el desarrollo del backend.
- **ExpressJs**: Para la creación de la API RESTful.
- **Base de datos MySQL**: Almacenamiento de datos.
- **React con @mui React Text Field component - Material UI**: Para la construcción del frontend.
- **Patrón REST para rutas**: Para la estructuración de las rutas de la API.
- **Librería Sequelize**: Para el mapeo objeto-relacional y la interacción con la base de datos.

## Entrega del Código

El código ha sido publicado en GitHub. Se han realizado commits regulares y se ha hecho uso de ramas para una gestión eficiente del código.

## Tareas y Estimación

| No | Sprint | Entorno  | Descripción                                                                                           | Tiempo | Unidad  | Rama dependiente           | Nombre de la rama     | Complejidad | Comentarios                                                                                                                     |
|----|--------|----------|-------------------------------------------------------------------------------------------------------|--------|---------|-----------------------------|-----------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------|
| 14 | 2      | Frontend | Estructura base del código fuente                                                                     | 20     | Minutos | NA                          | feature/sprint1#DEV00013 | Baja        | NA                                                                                                                              |
| 15 | 2      | Frontend | Pantalla de autenticación y registro de usuario                                                        | 30     | Minutos | NA                          | feature/sprint1#DEV00013 | Baja        | NA                                                                                                                              |
| 16 | 2      | Frontend | Pantalla de interacción con el personaje                                                               | 30     | Minutos | NA                          | feature/sprint1#DEV00013 | Media       | NA                                                                                                                              |
| 17 | 2      | Frontend | Pantalla de interacción con las películas                                                              | 30     | Minutos | NA                          | feature/sprint1#DEV00013 | Media       | NA                                                                                                                              |
| 18 | 2      | Frontend | Integración de las pantallas                                                                           | 30     | Minutos | feature/sprint1#DEV00013   | feature/sprint1#DEV00014| Media       | NA                                                                                                                              |
| 19 | 2      | Frontend | Consumo del servicio de autenticación y registro, y protección de rutas                                | 1      | hora    | feature/sprint1#DEV00014   | feature/sprint1#DEV00015| Media       | NA                                                                                                                              |
| 20 | 2      | Frontend | Consumo de servicios de obtención de Personajes y Películas + renderizado de la información           | 1      | hora    | feature/sprint1#DEV00015   | feature/sprint1#DEV00016| Media       | NA                                                                                                                              |
| 21 | 2      | Frontend | Implementación del filtros de búsqueda en la interfaz                                                   | 1      | hora    | feature/sprint1#DEV00016   | feature/sprint1#DEV00017| Media       | NA                                                                                                                              |

## Consideraciones Técnicas

Se han tenido en cuenta varias consideraciones técnicas para el desarrollo eficiente de la aplicación:

- Uso de Sequelize para el modelado de la base de datos y la realización de operaciones CRUD.
- Implementación de autenticación de usuarios para ciertos endpoints.
- Uso de componentes visuales atractivos y filtros dinámicos en el frontend para mejorar la experiencia del usuario.
- Organización y estructuración del código siguiendo buenas prácticas y patrones de diseño.

## Observaciones y Recomendaciones

- Es importante considerar la escalabilidad de la aplicación para futuras expansiones del universo Disney en las cuales se tengan en cuenta test unitarios, documentación con swagger, e incluir un sistema de administración de roles de usuario.

## Búsqueda Multifactor y Interfaz de Usuario

Se ha implementado una búsqueda multifactor que permite a los usuarios buscar personajes por diferentes criterios, así como películas o series y géneros. La interfaz de usuario presenta componentes visuales atractivos y filtros dinámicos para mejorar la experiencia del usuario.
