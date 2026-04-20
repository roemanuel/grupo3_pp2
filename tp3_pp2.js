class Usuario {
    constructor(id_usuario, nombre, email, password, es_corporativo) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.es_corporativo = es_corporativo;
        this.OrdenCompra = [];
    }
}

const lista_usuarios = {};

function registrarUsuario(objetoUsuario) {
    lista_usuarios[objetoUsuario.id_usuario] = objetoUsuario;
    if (objetoUsuario.es_corporativo) {
        console.log(`🧍${objetoUsuario.nombre} ha sido registrado/a correctamente como usuario corporativo`);
    } else {
        console.log(`🧍${objetoUsuario.nombre} ha sido registrado/a correctamente`);
    }
}

function es_corporativoUsuario(usuario_id) {
    return lista_usuarios[usuario_id]?.es_corporativo || false;
}

function buscarUsuario(id_usuario) {
    if (id_usuario in lista_usuarios) { return lista_usuarios[id_usuario] } else { return false }
}

function loguearUsuario(email, password) {
    let valido = false;
    for (let id in lista_usuarios) {
        if (lista_usuarios[id].email == email && lista_usuarios[id].password == password) {
            valido = true;
        }
    }
    if (valido) { console.log(`✔️  El usuario se logueó correctamente`); } else { console.log(`❌ Error al loguearse`); }
}

class OrdenCompra {
    constructor(id_orden, fecha_compra) {
        this.id_orden = id_orden;
        this.usuario_id = Usuario;
        this.cupon_id = Cupon;
        this.total = 0;
        this.fecha_compra = new Date(fecha_compra);
        this.estado_compra = "Pendiente";
        this.DetalleOrden = [];
    }

    agregarDetalle(detalle) {
        this.DetalleOrden.push(detalle);
    }

    calcularTotal() {
        // 1. Calcular Subtotal iterando el array de detalles
        let subTotal = this.DetalleOrden.reduce((acc, det) => acc + det.subtotalDetalleOrden(), 0);

        // 2. Aplicar Descuentos (Tu Regla de Negocio)
        let porcentajeDescuento = 0;
        if (es_corporativoUsuario(this.usuario_id)) {
            porcentajeDescuento += 10; // Regla: 10% si es corporativo
        } else if (validarCupon(this.cupon_id)) {
            porcentajeDescuento += descuentoCupon(this.cupon_id); // Regla: Cupón
        }

        let descuentoMonto = subTotal * (porcentajeDescuento / 100);

        // 3. Total Final
        return this.total = subTotal - descuentoMonto;
    }

}

class Envio {
    constructor(id_envio, estado_envio, fecha_envio) {
        this.id_envio = id_envio;
        this.orden_id = OrdenCompra;
        this.estado_envio = estado_envio;
        this.fecha_envio = new Date(fecha_envio);
    }
}

class Pago {
    constructor(id_pago, estado_pago, metodo_pago, fecha_pago) {
        this.id_pago = id_pago;
        this.orden_id = OrdenCompra;
        this.estado_pago = estado_pago;
        this.metodo_pago = metodo_pago;
        this.fecha_pago = new Date(fecha_pago);
    }
}

class Cupon {
    constructor(id_cupon, nombre, descuento, fecha_vencimiento, activo) {
        this.id_cupon = id_cupon;
        this.nombre = nombre;
        this.descuento = descuento / 100;
        this.fecha_vencimiento = new Date(fecha_vencimiento);
        this.activo = activo;
    }
}

const lista_cupones = {};

function crearCupon(objetoCupon) {
    lista_cupones[objetoCupon.id_cupon] = objetoCupon;
    console.log(`✔️  Se creó el cupón con nombre ${objetoCupon.nombre}`);
}

function validarCupon(cupon_id) {
    const hoy = new Date();

    if (cupon_id in lista_cupones) {
        if (lista_cupones[cupon_id].fecha_vencimiento < hoy) {
            lista_cupones[cupon_id].activo = false;
        }
        return lista_cupones[cupon_id].activo;
    } else { return false; }
}

function descuentoCupon(cupon_id) {
    if (cupon_id in lista_cupones) { return lista_cupones[cupon_id].descuento };
}

class DetalleOrden {
    constructor(id_orden, id_detalle, cantidad, precio_unitario) {
        this.id_orden = id_orden;
        this.id_detalle = id_detalle;
        this.producto_id = Producto;
        this.cantidad = cantidad;
        this.precio_unitario = precio_unitario;
    }

    subtotalDetalleOrden() {
        return this.cantidad * this.precio_unitario;
    }
}

class Producto {
    constructor(id_producto, nombre, precio, stock) {
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

const lista_productos = {};

function crearProducto(objetoProducto) {
    lista_productos[objetoProducto.id_producto] = objetoProducto;
    console.log(`📦 El producto ${objetoProducto.nombre} ha sido creado`);
}

function buscarProducto(id_producto) {
    if (id_producto in lista_productos) { return lista_productos[id_producto] }
    else { return false }
}

function hayStockProducto(id_producto, cantidad) {
    let producto = buscarProducto(id_producto);

    if (producto && producto.stock >= cantidad) { return true; } else { return false; }
}

function restarStockProducto(id_producto, cantidad){
    lista_productos[id_producto].stock -= cantidad;
}

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
            const hayStock = hayStockProducto(id_producto, cantidad);
            if (hayStock) {
                this.ItemCarrito.push(new ItemCarrito(this.id_carrito, id_item, producto, cantidad));
                restarStockProducto(id_producto, cantidad);
                console.log(`✔️  El item ${producto.nombre} se agregó ${cantidad} vez/veces`)
            } else { console.log(`❌ Stock insuficiente del producto ${producto.nombre}`) }
        } else { console.log(`No existe el producto`) }
    }
}

const lista_carritos = {};

function crearCarrito(id_carrito, id_usuario) {
    let usuario = buscarUsuario(id_usuario);

    if (usuario) {
        let carrito = new Carrito(id_carrito, usuario);
        lista_carritos[carrito.id_carrito] = carrito;

        console.log(`🛒 El carrito de ${usuario.nombre} se creó correctamente`);
    } else { console.log(`Se produjo un error`); }
}

export {
    // Usuarios
    Usuario,
    lista_usuarios,
    registrarUsuario,
    es_corporativoUsuario,
    buscarUsuario,
    loguearUsuario,

    // Órdenes
    OrdenCompra,
    DetalleOrden,

    // Envío y pago
    Envio,
    Pago,

    // Cupones
    Cupon,
    lista_cupones,
    crearCupon,
    validarCupon,
    descuentoCupon,

    // Productos
    Producto,
    lista_productos,
    crearProducto,
    buscarProducto,
    hayStockProducto,
    restarStockProducto,

    // Carrito
    ItemCarrito,
    Carrito,
    lista_carritos,
    crearCarrito
};