import {
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
} from './tp3_pp2.js';

console.info(`🟠 CREAMOS A DOS USUARIOS, UNO CORPORATIVO Y OTRO NORMAL`);
registrarUsuario(new Usuario(1 /*id_usuario*/, "Maria Pia Buono" /*nombre*/, "pia@gmail.com"/*mail*/, "password"/*password*/, true/*es_corporativo*/));
registrarUsuario(new Usuario(2, "Ludmila Sánchez Rufanacht", "ludmila@gmail.com", "password", false));


console.info(`🟠 CREAMOS EL CUPÓN PARA LOS USUARIOS NORMALES`);
crearCupon(new Cupon(1/*id_cupon*/, "CUPON"/*nombre*/, 5/*descuento*/, "2026/10/12"/*fecha de vencimiento*/, true/*activo*/));

console.info(`🟠 CREAMOS 5 PRODUCTOS`);
crearProducto(new Producto(1 /*id_producto*/, "Cafetera Nescafé 230v Blanca Genio S Blanco" /*nombre*/, 179.999 /*precio*/, 5 /*stock*/));
crearProducto(new Producto(2, "Ventilador Retractil De Techo 4 aspas Color Blanco", 113.149, 50));
crearProducto(new Producto(3, "Perfume Liquid Brun French Avenue 100ml Edp Arabe Veoquiero", 82.081, 100));
crearProducto(new Producto(4, "Samsung Galaxy A16 4g 128gb 4 Gb Ram Negro", 257.699, 150));
crearProducto(new Producto(5, "Colchón KL-Eterna Känn Livet 2 Plazas", 308.999, 200));

console.info(`🟠 BUSCAMOS UN PRODUCTO`);
console.table(buscarProducto(4 /*id_producto*/));

console.info(`🟠 CREAMOS LOS CARRITOS`);
crearCarrito(1 /*id_carrito*/, 2 /*id_usuario*/);
crearCarrito(2, 1);

console.info(`🟠 AGREGAMOS ITEMS AL CARRITO`);
lista_carritos[2].agregarProducto(1/*id_producto*/, 2 /*cantidad*/, 1 /*id_item*/);
lista_carritos[2].agregarProducto(1, 40, 2);

console.info(`🟠 VAMOS AL CARRITO`);
console.log(lista_carritos[2]);

console.info(`🟠 HACEMOS LOGIN`);
loguearUsuario("pia@gmail.com", "password");