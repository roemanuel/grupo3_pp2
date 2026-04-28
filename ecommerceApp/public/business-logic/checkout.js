// Checkout y flujo de compra
import { lista_carritos } from "./cart.js";
import { estaLogueado, sesion, buscarUsuario } from "./user.js";
import { Envio, Pago } from "./payment.js";
import { generarOrden } from "./checkout.js";

function verificarStockCarrito(id_carrito) {
  const carrito = lista_carritos[id_carrito];
  if (!carrito) {
    console.log(`❌ Carrito ${id_carrito} no encontrado`);
    return false;
  }
  for (const item of carrito.ItemCarrito) {
    if (!item.producto_id) {
      console.log(`❌ El producto ya no está disponible`);
      return false;
    }
  }
  console.log(`✔️  Stock verificado correctamente`);
  return true;
}

function verificarSesion() {
  if (!estaLogueado()) {
    console.log(`❌ El usuario no está logueado. Redirigiendo al login...`);
    return false;
  }
  console.log(`✔️  Usuario logueado: ID ${sesion.usuario_id}`);
  return true;
}

function ingresarDatosEnvio(datosEnvio) {
  const envio = new Envio(
    Date.now(),
    null,
    "Pendiente",
    new Date().toISOString(),
  );
  console.log(`🚚 Datos de envío registrados:`);
  console.log(`   Dirección : ${datosEnvio.direccion}`);
  console.log(`   Ciudad    : ${datosEnvio.ciudad}`);
  console.log(`   Provincia : ${datosEnvio.provincia}`);
  console.log(`   CP        : ${datosEnvio.codigo_postal}`);
  return envio;
}

export { verificarStockCarrito, verificarSesion, ingresarDatosEnvio };
