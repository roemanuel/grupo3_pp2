// Envío y pago
class Envio {
  constructor(id_envio, orden_id, estado_envio, fecha_envio) {
    this.id_envio = id_envio;
    this.orden_id = orden_id;
    this.estado_envio = estado_envio;
    this.fecha_envio = new Date(fecha_envio);
  }
}

class Pago {
  constructor(id_pago, orden_id, estado_pago, metodo_pago, fecha_pago) {
    this.id_pago = id_pago;
    this.orden_id = orden_id;
    this.estado_pago = estado_pago;
    this.metodo_pago = metodo_pago;
    this.fecha_pago = new Date(fecha_pago);
  }
}

export { Envio, Pago };
