
// server.js - El motor de nuestra aplicación
import express from 'express';
import productosDb from './db.js'; // Importamos la base de datos de productos

const app = express();
const PORT = 3000;
// Le decimos al servidor que exponga públicamente los archivos de la carpeta "public"
app.use(express.static('public'));
app.use(express.json()); // Middleware para parsear JSON en las solicitudes

app.get('/api/productos', (req, res) => { 
    res.json(productosDb); // Respondemos con la lista de productos en formato JSON
});

app.post('/api/productos', (req, res) => { 
    const productoNuevo = req.body; // Obtenemos el nuevo producto enviado desde el cliente
    // productosDb.push(productoNuevo); // Agregamos el nuevo producto a la base de datos
    console.log('Producto recibido:', productoNuevo); 
    res.json(productosDb); // Respondemos con la lista de productos en formato JSON
});

app.put('/api/productos/:id', (req, res) => {
    const idProducto = parseInt(req.params.id);
    const productoActualizado = req.body; // Obtenemos el producto actualizado enviado desde el cliente
    const producto = productosDb.find(producto => producto.id_producto === idProducto);
    if (producto) {
       producto.nombre = productoActualizado.nombre || producto.nombre;
       producto.precio = productoActualizado.precio || producto.precio;
       producto.stock = productoActualizado.stock || producto.stock;
       producto.img = productoActualizado.img || producto.img;
       producto.descuento = productoActualizado.descuento || producto.descuento;
        console.log('Producto actualizado:', producto);
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.delete('/api/productos/:id', (req, res) => {
    const idProducto = parseInt(req.params.id);
    const producto = productosDb.find(producto => producto.id_producto === idProducto);
    if (producto) {
        productosDb.splice(productosDb.indexOf(producto), 1);
        console.log(productosDb);
        res.json({ message: 'Producto eliminado exitosamente' });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.post('/api/checkout', (req, res) => {
    const carritoRecibido = req.body; // Obtenemos el carrito enviado desde el cliente
    console.log('Carrito recibido:', carritoRecibido); // Imprimimos el carrito en la consola para verificar su contenido
    res.json({ message: 'Compra recibida exitosamente' }); // Respondemos con un mensaje de éxito
});

// Encendemos el servidor
app.listen(PORT, () => {
 console.log(`✅Servidor corriendo en http://localhost:${PORT}`);
});