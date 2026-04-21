# Resumen del Sistema de Simulación de Compras

Este sistema simula el proceso de compra en una tienda online, incluyendo usuarios, productos, carritos, cupones, órdenes de compra, pagos y envíos. El flujo completo se puede visualizar tanto por consola (Node.js) como en una interfaz HTML alternativa.

## Clases Principales

### Usuario

- **Atributos:** `id_usuario`, `nombre`, `email`, `password`, `es_corporativo`, `OrdenCompra` (array de órdenes asociadas)
- **Instanciación:**
  ```js
  new Usuario(id, nombre, email, password, es_corporativo);
  ```

### Producto

- **Atributos:** `id_producto`, `nombre`, `precio`, `stock`
- **Instanciación:**
  ```js
  new Producto(id, nombre, precio, stock);
  ```

### Cupon

- **Atributos:** `id_cupon`, `nombre`, `descuento` (decimal), `fecha_vencimiento` (Date), `activo`
- **Instanciación:**
  ```js
  new Cupon(id, nombre, descuento, fecha_vencimiento, activo);
  ```

### Carrito

- **Atributos:** `id_carrito`, `usuario`, `ItemCarrito` (array de ítems)
- **Instanciación:**
  ```js
  new Carrito(id_carrito, usuario);
  ```
- **Método:**
  - `agregarProducto(id_producto, cantidad, id_item)`

### ItemCarrito

- **Atributos:** `id_carrito`, `id_item`, `producto_id` (objeto Producto), `cantidad`
- **Instanciación:**
  ```js
  new ItemCarrito(id_carrito, id_item, producto, cantidad);
  ```

### OrdenCompra

- **Atributos:** `id_orden`, `usuario_id`, `cupon_id`, `total`, `fecha_compra`, `estado_compra`, `DetalleOrden` (array)
- **Instanciación:**
  ```js
  new OrdenCompra(id_orden, fecha_compra);
  ```
- **Métodos:**
  - `agregarDetalle(detalle)`
  - `calcularTotal()`

### DetalleOrden

- **Atributos:** `id_orden`, `id_detalle`, `producto_id`, `cantidad`, `precio_unitario`
- **Instanciación:**
  ```js
  new DetalleOrden(id_orden, id_detalle, cantidad, precio_unitario);
  ```
- **Método:**
  - `subtotalDetalleOrden()`

### Envio

- **Atributos:** `id_envio`, `orden_id`, `estado_envio`, `fecha_envio`
- **Instanciación:**
  ```js
  new Envio(id_envio, orden_id, estado_envio, fecha_envio);
  ```

### Pago

- **Atributos:** `id_pago`, `orden_id`, `estado_pago`, `metodo_pago`, `fecha_pago`
- **Instanciación:**
  ```js
  new Pago(id_pago, orden_id, estado_pago, metodo_pago, fecha_pago);
  ```

## Funciones Principales

- **Usuarios:**
  - `registrarUsuario(usuario)`
  - `loguearUsuario(email, password)`
  - `cerrarSesion()`
  - `es_corporativoUsuario(usuario_id)`
  - `buscarUsuario(id_usuario)`

- **Productos:**
  - `crearProducto(producto)`
  - `buscarProducto(id_producto)`
  - `hayStockProducto(id_producto, cantidad)`
  - `restarStockProducto(id_producto, cantidad)`

- **Cupones:**
  - `crearCupon(cupon)`
  - `validarCupon(cupon_id)`
  - `descuentoCupon(cupon_id)`

- **Carrito:**
  - `crearCarrito(id_carrito, id_usuario)`

- **Checkout y compra:**
  - `verificarStockCarrito(id_carrito)`
  - `verificarSesion()`
  - `ingresarDatosEnvio(datosEnvio)`
  - `generarOrden(id_carrito, cupon_id)`
  - `seleccionarMetodoPago(metodoPago)`
  - `procesarPago(orden, metodoPago, pagoAprobado)`
  - `emitirTicket(orden, pago, envio)`
  - `enviarMailConfirmacion(orden)`
  - `simularCompra(id_carrito, cupon_id, datosEnvio, metodoPago, pagoAprobado)`

## Simulación de Compra

El archivo `main.js` ejecuta el flujo completo:

1. Crea usuarios (corporativo y normal).
2. Crea un cupón y productos.
3. Crea carritos y agrega productos.
4. Simula dos compras:
   - **Compra 1:** Usuario corporativo, pago aprobado, muestra ticket y mail de confirmación.
   - **Compra 2:** Usuario normal con cupón, pago rechazado, muestra mensaje de cancelación y opción de reintentar pago.

## Visualización

- Por consola: Todo el proceso se muestra paso a paso.
- En HTML: Alternativamente, el proceso se visualiza en dos columnas (aprobada/rechazada) en `view/index.html` usando estilos modernos y minimalistas.

---

Este resumen refleja fielmente la estructura y funcionamiento del código proporcionado, sin agregar ni omitir información relevante del sistema.
