# Requisitos previos

Para que funcione la aplicación se necesita una base de datos llamada **tawa_db** en el motor PostgreSQL
El ORM crara la tabla solo es 1 como lo solicitaste
Estoy subiendo con el .env para que cambies las credenciales si necesitas probarlo, lo importante ahi es el **DB_USER** y **DB_PASSWORD**

# Instalacion

¿Como activar pnpm? [instalacion](https://pnpm.io/installation#using-corepack)

``pnpm install``

# Iniciar el servidor


``pnpm dev:watch`` o ``pnpm start``

# Endpoints

## Get con paginación

``/api/products``

query => limit=15 number, page=0 number,

``/api/products?page=0&limit=10``

## Get by Id

``/api/products/{idProduct}``

params => idProduct: number

## Post

``/api/products``
```bash
Headers => Content-Type: application/json
Body => {
  name: string, => min 5 caracteres
  price: decimal, => mayor o igual a 0.0
  stock: integer => mayor o igual a 0
}
```

## Patch

``/api/products/{idProduct}``
```bash
Params => idProduct: number
Headers => Content-Type: application/json
Body (parcial) => {
  name?: string,
  price?: decimal,
  stock?: integer
}
```

## Delete

``/api/products/{idProduct}``

Params => idProduct: number