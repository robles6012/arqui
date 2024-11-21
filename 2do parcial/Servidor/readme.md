## Ejecutar servidor

```
    npm init
    npm i express
    npm i body-parser
    npm i nodemon
    npm i -g nodemon
    nodemon .
```

## API Endpoints

### USUARIO

<code>POST localhost:3300/auth/create</code> - Crear usuario
```json
{
"username": "nombre",
"password": "contraseña"

}
```

<code>GET localhost:3300/auth </code> - Inicio de sesión
```json
{
    "username": "nombre",
    "password": "contraseña"
}
```


### PRODUCTOS

<code>POST localhost:3300/producto </code>- Insertar producto
```json
{
  "nombre": "Nombre del producto",
  "detalle": "Detalle del producto",
  "valor": "Valor del producto en numeros"
}
```

<code>GET localhost:3300/producto </code> - Consultar producto por nombre
```json
{
  "nombre": "Nombre del producto"
}
```

<code>PUT localhost:3300/producto </code> - Actualizar producto
```json
{
  "detalle": "Nuevo detalle",
  "nombre" : "Nuevo nombre",
  "valor": "Nuevo valor",
  "id": "Id actual filtrar"
}
```

<code>delete localhost:3300/producto - Eliminar producto
```json
{
  "id": "Id del producto a eliminar"
}
```