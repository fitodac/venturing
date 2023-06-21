# Venturing movies
El proyecto se encuentra dividido en 2 directorios:

📂 API

📂 CLIENT

El primero contiene los archivos del servidor mientras que en el segundo están todos los archivos para el front-end.


### Configurando el servidor

- Una vez que hayas clonado este repositorio dirígete a la carpeta **/api **y ejecuta `npm install`.

- Usa el archivo **.env.sample** para crear un **/api/.env** y configura las variables de entorno. Dentro del **sample** encontrarás una explicación de (para) qué es cada constante.

- Crea una base de datos MySQL e importa el archivo **/api/dump.sql** para crear la tabla `movies`.

- Finalmente, estando en **/api** en el terminal, corre `npm run start` para iniciar el servidor.

> Si accedes en el navegador a [**http://localhost:3000/api/movies**](http://localhost:3000/api/movies) deberías ver un **"error": "Acceso denegado"**.


-

### Configurando el front-end

- En el terminal, entra en el directorio **/client** y ejecuta `npm install`.

- Usa el archivo **.env.sample** para crear un **/api/.env** y configura las variables de entorno. Dentro del **sample** encontrarás una explicación de (para) qué es cada constante.

🚨 Debes usar el mismo usuario / contraseña que has establecido previamente en el `/api/.env` para que funcione.

- Finalmente, estando en **/client** en el terminal, corre `npm run dev` para iniciar el servidor.

> Si accedes en el navegador a [**http://localhost:5173/**](http://localhost:5173/) deberías ver El formulario de Login.

Para acceder usarás el usuario y contraseña que has definido en el `/client/.env`.

-


Eso es todo. Espero que hayas podido hacer el setup local y que todo funcione, de no ser así escríbeme a fitodac@gmail.com.


# ¡Nos vemos en el futuro!

![](https://media2.giphy.com/media/YxGH20CjY7LnS4m5s3/giphy.gif?cid=ecf05e47wjecpvof3qktzju21ji2g30gitgdfedpvzcy97ju&ep=v1_gifs_search&rid=giphy.gif&ct=g)
