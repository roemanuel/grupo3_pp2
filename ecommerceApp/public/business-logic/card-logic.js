import { lista_productos } from "./product.js";

// --- Carrito simple en memoria (por usuario anónimo) ---
let carrito = {
  items: [], // {producto, cantidad}
};

function agregarAlCarrito(productoId) {
  const prod = lista_productos[productoId];
  if (!prod) return;
  const idx = carrito.items.findIndex(
    (item) => item.producto.id_producto === productoId,
  );
  if (idx !== -1) {
    carrito.items[idx].cantidad++;
  } else {
    carrito.items.push({ producto: prod, cantidad: 1 });
  }
  actualizarCarritoUI();
  mostrarAlertaCarrito(prod.nombre);
}

function mostrarAlertaCarrito(nombreProducto) {
  const alertDiv = document.getElementById("cart-alert");
  const msgSpan = document.getElementById("cart-alert-msg");
  msgSpan.textContent = `¡${nombreProducto} agregado al carrito!`;
  alertDiv.classList.add("show");
  alertDiv.classList.remove("fade");
  setTimeout(() => {
    alertDiv.classList.remove("show");
    alertDiv.classList.add("fade");
  }, 1800);
}

function eliminarDelCarrito(productoId) {
  carrito.items = carrito.items.filter(
    (item) => item.producto.id_producto !== productoId,
  );
  actualizarCarritoUI();
}

function actualizarCarritoUI() {
  // Actualizar contador
  document.getElementById("cart-count").textContent = carrito.items.reduce(
    (acc, item) => acc + item.cantidad,
    0,
  );
  // Renderizar modal
  const cartItemsDiv = document.getElementById("cart-items");
  if (!cartItemsDiv) return;
  if (carrito.items.length === 0) {
    cartItemsDiv.innerHTML =
      '<div class="text-center text-secondary">El carrito está vacío.</div>';
    document.getElementById("cart-total").textContent = "0";
    document.getElementById("checkout-btn").disabled = true;
    return;
  }
  let total = 0;
  cartItemsDiv.innerHTML = carrito.items
    .map((item) => {
      let precioFinal = item.producto.precio;
      let descuento = item.producto.descuento || 0;
      let descuentoHTML = "";
      let precioOriginalHTML = "";
      if (descuento > 0) {
        precioFinal = item.producto.precio * (1 - descuento / 100);
        descuentoHTML = `<span class='badge rounded-pill px-2 py-1 ms-1' style='background-color:#F59E0B; color:#111827; font-size:0.85em;'>${descuento}% OFF</span>`;
        precioOriginalHTML = `<span class='text-decoration-line-through text-secondary ms-2' style='font-size:0.95em;'>$${item.producto.precio.toLocaleString("es-AR")}</span>`;
      }
      total += precioFinal * item.cantidad;
      return `
			<div class="d-flex align-items-center border-bottom py-2">
				<img src="${item.producto.img}" alt="${item.producto.nombre}" style="width:60px; height:60px; object-fit:contain;" class="me-3 bg-light border rounded">
				<div class="flex-grow-1">
					<div class="fw-bold">${item.producto.nombre} ${descuentoHTML}</div>
					<div class="small text-secondary">Cantidad: ${item.cantidad}</div>
					<div class="small">
						Precio: <span class="fw-bold" style="color:#A78BFA;">$${precioFinal.toLocaleString("es-AR")}</span>
						${precioOriginalHTML}
					</div>
				</div>
				<button class="btn btn-sm btn-danger ms-2" data-remove="${item.producto.id_producto}">Eliminar</button>
			</div>
		`;
    })
    .join("");
  document.getElementById("cart-total").textContent =
    total.toLocaleString("es-AR");
  document.getElementById("checkout-btn").disabled = false;

  // Asignar eventos de eliminar
  cartItemsDiv.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(btn.getAttribute("data-remove"));
      eliminarDelCarrito(id);
    });
  });
}

// Mostrar modal carrito
function setupCarritoModal() {
  document.querySelector(".navbar .btn").addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("cartModal"));
    actualizarCarritoUI();
    modal.show();
  });
}

// Delegación de eventos para los botones "Agregar al carrito"
function setupAgregarCarritoDelegado() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart-btn");
    if (btn) {
      const id = parseInt(btn.getAttribute("data-id"));
      agregarAlCarrito(id);
    }
  });
}

export {
  agregarAlCarrito,
  eliminarDelCarrito,
  actualizarCarritoUI,
  setupCarritoModal,
  setupAgregarCarritoDelegado,
};
