import {
  lista_productos,
  crearProducto,
  Producto,
} from "./business-logic/product.js";

import {
  agregarAlCarrito,
  eliminarDelCarrito,
  actualizarCarritoUI,
  setupCarritoModal,
  setupAgregarCarritoDelegado,
} from "./business-logic/card-logic.js";

// Inicializar eventos de carrito
document.addEventListener("DOMContentLoaded", () => {
  setupCarritoModal();
  setupAgregarCarritoDelegado();
});

// Agregar los productos del listado en main.js
crearProducto(
  new Producto(
    1,
    "Cafetera Nescafé 230v Blanca Genio S Blanco",
    179.999,
    5,
    "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTeHC20VN7reUOzJiEHRINl57sjdZEEf1yeaGAoRRqIvTvXYkfCoqcd8a1Lq7rztZI48EpVib6d-XX0nxB_ZJkgP5u4BbI4cJxe2MkwTx0Ad7UVU4yT8kyQN4b-hz0rEQKeTWv8WXuC&usqp=CAc",
    10,
  ),
);
crearProducto(
  new Producto(
    2,
    "Ventilador Retractil De Techo 4 aspas Color Blanco",
    113.149,
    50,
    "https://static.hendel.com/media/catalog/product/cache/b866fd8d147dcce474dc8744e477ca66/4/7/47281-min.jpg",
    0,
  ),
);
crearProducto(
  new Producto(
    3,
    "Perfume Liquid Brun French Avenue 100ml Edp Arabe",
    82.081,
    100,
    "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSa-KyJF7luQhelyspiurmcC6Km3XUmYKlY8yZ1Kgtm2keeLBd4t2JpCOaBVoc3qhGcWwXFRSOGG-kkxVxCkOwjsAwBL0e-opeCKk-Kc8AMpRdrDdNKqK2Wt-BcknTTlp3pXzx0iqQ&usqp=CAc",
    5,
  ),
);
crearProducto(
  new Producto(
    4,
    "Samsung Galaxy A16 4g 128gb 4 Gb Ram Negro",
    257.699,
    150,
    "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTvLAwLAUWKmxIvOkhna6b9oxGfDlTeHTLDZ_pZf6QlFjcSf7ysOKjOt7NxxefKfzMecHXnJ8FqL9LIOT4WIEniqwO6bnToPe4IPjIA_MCgBHhvmsN0R7K5sUMH0PzJ1TNAeC6JhrU&usqp=CAc",
    15,
  ),
);
crearProducto(
  new Producto(
    5,
    "Colchón KL-Eterna Känn Livet 2 Plazas",
    308.999,
    200,
    "https://lacardeuse.vtexassets.com/arquivos/ids/1581280-800-auto?v=639034040604200000&width=800&height=auto&aspect=true",
    0,
  ),
);

Object.values(lista_productos).forEach((producto) => {
  const container = document.getElementById("catalogo");
  const col = document.createElement("div");
  col.classList.add("col", "d-flex");
  // Calcular precio con descuento si aplica
  let precioFinal = producto.precio;
  let descuentoHTML = "";
  if (producto.descuento && producto.descuento > 0) {
    precioFinal = producto.precio * (1 - producto.descuento / 100);
    descuentoHTML = `<span class='badge rounded-pill px-3 py-2 mb-2' style='background-color:#F59E0B; color:#111827; font-weight:600;'>${producto.descuento}% OFF</span>`;
  }
  col.innerHTML = `
    <div class="product-card card flex-fill h-100 p-3 border-0 shadow-sm bg-white">
      <img src="${producto.img}" class="product-img mb-2 bg-light border w-100 d-block mx-auto" alt="${producto.nombre}" style="height:180px; object-fit:contain; aspect-ratio:1.1/1; max-width:180px; min-width:120px;">
      <div class="product-title text-dark-emphasis mb-1">${producto.nombre}</div>
      <div class="product-price mb-1">
        <span class="fw-bold" style="color:#A78BFA;">$${precioFinal.toLocaleString("es-AR")}</span>
        ${producto.descuento && producto.descuento > 0 ? `<span class='text-decoration-line-through text-secondary ms-2' style='font-size:0.95em;'>$${producto.precio.toLocaleString("es-AR")}</span>` : ""}
      </div>
      <div class="product-stock text-secondary mb-2">Stock: ${producto.stock}</div>
      ${descuentoHTML}
      <button class="btn w-100 mt-auto add-to-cart-btn" data-id="${producto.id_producto}" style="background-color:#A78BFA; color:#fff; font-weight:600; border:none;">Agregar al carrito</button>
    </div>
  `;
  container.appendChild(col);
});
