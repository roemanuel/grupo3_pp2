import { lista_productos, crearProducto, Producto } from "./tp3_pp2.js";


// Agregar los productos del listado en main.js
crearProducto(new Producto(1, "Cafetera Nescafé 230v Blanca Genio S Blanco", 179.999, 5, "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTeHC20VN7reUOzJiEHRINl57sjdZEEf1yeaGAoRRqIvTvXYkfCoqcd8a1Lq7rztZI48EpVib6d-XX0nxB_ZJkgP5u4BbI4cJxe2MkwTx0Ad7UVU4yT8kyQN4b-hz0rEQKeTWv8WXuC&usqp=CAc"));
crearProducto(new Producto(2, "Ventilador Retractil De Techo 4 aspas Color Blanco", 113.149, 50, "https://static.hendel.com/media/catalog/product/cache/b866fd8d147dcce474dc8744e477ca66/4/7/47281-min.jpg"));
crearProducto(new Producto(3, "Perfume Liquid Brun French Avenue 100ml Edp Arabe", 82.081, 100, "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSa-KyJF7luQhelyspiurmcC6Km3XUmYKlY8yZ1Kgtm2keeLBd4t2JpCOaBVoc3qhGcWwXFRSOGG-kkxVxCkOwjsAwBL0e-opeCKk-Kc8AMpRdrDdNKqK2Wt-BcknTTlp3pXzx0iqQ&usqp=CAc"));
crearProducto(new Producto(4, "Samsung Galaxy A16 4g 128gb 4 Gb Ram Negro", 257.699, 150, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTvLAwLAUWKmxIvOkhna6b9oxGfDlTeHTLDZ_pZf6QlFjcSf7ysOKjOt7NxxefKfzMecHXnJ8FqL9LIOT4WIEniqwO6bnToPe4IPjIA_MCgBHhvmsN0R7K5sUMH0PzJ1TNAeC6JhrU&usqp=CAc"));
crearProducto(new Producto(5, "Colchón KL-Eterna Känn Livet 2 Plazas", 308.999, 200, "https://lacardeuse.vtexassets.com/arquivos/ids/1581280-800-auto?v=639034040604200000&width=800&height=auto&aspect=true"));

Object.values(lista_productos).forEach((producto) => {
    const container = document.getElementById("catalogo");
    const card = document.createElement("div");
    card.classList.add("card", "mb-4");
    card.innerHTML = `
      <div class="card-body">
        <img src="${producto.img}" class="card-img-top" style="width: 200px; height: auto;" alt="${producto.nombre}">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">Precio: $${producto.precio}</p>
        <p class="card-text">Stock: ${producto.stock}</p>  
         <span class="badge bg-danger">10% OFF</span>
        <button class="btn btn-primary">Agregar al carrito</button>
      </div>
        `;
    container.appendChild(card);
})