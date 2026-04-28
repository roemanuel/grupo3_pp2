// Carrito
import {
  buscarProducto,
  hayStockProducto,
  restarStockProducto,
} from "./product.js";

class ItemCarrito {
  constructor(id_carrito, id_item, objeto_producto, cantidad) {
    this.id_carrito = id_carrito;
    this.id_item = id_item;
    this.producto_id = objeto_producto;
    this.cantidad = cantidad;
  }
}

class Carrito {
  constructor(id_carrito, usuario) {
    this.id_carrito = id_carrito;
    this.usuario = usuario;
    this.ItemCarrito = [];
  }

  agregarProducto(id_producto, cantidad, id_item) {
    const producto = buscarProducto(id_producto);
    if (producto) {
      if (hayStockProducto(id_producto, cantidad)) {
        this.ItemCarrito.push(
          new ItemCarrito(this.id_carrito, id_item, producto, cantidad),
        );
        restarStockProducto(id_producto, cantidad);
        console.log(
          `✔️  El item ${producto.nombre} se agregó ${cantidad} vez/veces`,
        );
      } else {
        console.log(`❌ Stock insuficiente del producto ${producto.nombre}`);
      }
    } else {
      console.log(`No existe el producto`);
    }
  }
}

const lista_carritos = {};

function crearCarrito(id_carrito, usuario) {
  const carrito = new Carrito(id_carrito, usuario);
  lista_carritos[carrito.id_carrito] = carrito;
  console.log(`🛒 El carrito de ${usuario.nombre} se creó correctamente`);
}

export { ItemCarrito, Carrito, lista_carritos, crearCarrito };
