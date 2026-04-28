// Productos
class Producto {
  constructor(id_producto, nombre, precio, stock, img, descuento = 0) {
    this.id_producto = id_producto;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.img = img;
    this.descuento = descuento; // porcentaje (ej: 10 para 10%)
  }
}

const lista_productos = {};

function crearProducto(objetoProducto) {
  lista_productos[objetoProducto.id_producto] = objetoProducto;
  console.log(`📦 El producto ${objetoProducto.nombre} ha sido creado`);
}

function buscarProducto(id_producto) {
  if (id_producto in lista_productos) {
    return lista_productos[id_producto];
  } else {
    return false;
  }
}

function hayStockProducto(id_producto, cantidad) {
  const producto = buscarProducto(id_producto);
  return producto && producto.stock >= cantidad;
}

function restarStockProducto(id_producto, cantidad) {
  lista_productos[id_producto].stock -= cantidad;
}

export {
  Producto,
  lista_productos,
  crearProducto,
  buscarProducto,
  hayStockProducto,
  restarStockProducto,
};
