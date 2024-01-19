# Node.js TypeScript Express MongoDB API

Este proyecto es una API desarrollada con Node.js utilizando TypeScript, Express y MongoDB. Permite realizar operaciones como la creación de usuarios, inicio y cierre de sesión, búsqueda de usuarios con paginación, y la obtención de información sobre el usuario actualmente autenticado.

## Requisitos Previos

Asegúrate de tener instalados Node.js y npm en tu entorno de desarrollo.

## Configuración del Proyecto

1. Clona este repositorio a tu máquina local:

   ```bash
   git clone https://github.com/santiagofv36/avila-tek-back.git
   
2. Navega al directorio del proyecto:
    ```bash
    cd avila-tek-back
    
3. Instala las dependencias del proyecto:
    ```bash
    npm install
  
## Iniciar el proyecto

1. Para ejecutar la API, utiliza el siguiente comando:
    ```bash
    nmp run dev
    
Esto iniciará el servidor en el puerto 3000

## Endpoints Disponibles
### 1. Crear Usuario

- **Endpoint:** `POST /sign-up`
- **Body:**
  ```json
  {
    "email": "correo@ejemplo.com",
    "password": "contraseña"
  }
 
### 2. Iniciar sesión

- **Endpoint:** `POST /sign-in`
- **Body:**
  ```json
  {
    "email": "correo@ejemplo.com",
    "password": "contraseña"
  }
  
 ### 3. Cerrar Sesión

- **Endpoint:** `DELETE /sign-out`

### 4. Buscar usuarios con paginación

- **Endpoint:** `GET /users`
- **Parámetros de Consulta:**
  - `page` (número de página, opcional, por defecto 1)
  - `limit` (límite de resultados por página, opcional, por defecto 10)
 
### 5. Obtener el usuario Logueado
- **Endpoint:** `GET /user`

Para obtener más información sobre la API, consulta la documentación en Postman. También puedes encontrar el archivo JSON de la colección de Postman en el proyecto.

**Link de la Documentación en Postman:** [Documentación en Postman](https://documenter.getpostman.com/view/16754741/2s9YsT68kM)
