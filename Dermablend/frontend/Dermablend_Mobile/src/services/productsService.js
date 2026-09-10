import { API_URL } from "../config/api";

const normalizeProduct = (product) => ({
  id: product._id || product.id,
  name: product.name || "Producto sin nombre",
  description: product.description || "",
  price: Number(product.price ?? 0),
  image: product.image || null,
  category: product.category || "",
  shade: product.shade || "",
  stock: product.stock ?? null,
});

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("No fue posible obtener los productos.");
  }

  const data = await response.json();
  if (!Array.isArray(data?.data)) {
    throw new Error("La respuesta de productos no tiene un formato válido.");
  }

  return data.data.map(normalizeProduct);
}
