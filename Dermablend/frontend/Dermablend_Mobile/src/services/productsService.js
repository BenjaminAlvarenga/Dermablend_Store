import { apiRequest } from "../utils/apiRequest";

const normalizeProduct = (product) => ({
  id: product._id || product.id,
  name: product.name || "Producto sin nombre",
  description: product.description || "",
  price: Number(product.price ?? 0),
  image: product.image || null,
  category: product.category || "",
  shade: product.shade || "",
  coverageLevel: product.coverage_level || "",
  skinTypeCompatible: Array.isArray(product.skin_type_compatible)
    ? product.skin_type_compatible
    : [],
  stock: product.stock ?? 0,
});

export async function getProducts() {
  const data = await apiRequest("/products");
  if (!Array.isArray(data?.data)) {
    throw new Error("No fue posible cargar los productos en este momento.");
  }
  return data.data.map(normalizeProduct);
}

export async function getProductById(id) {
  const data = await apiRequest(`/products/${id}`);
  if (!data?.data) {
    throw new Error("No fue posible cargar este producto.");
  }
  return normalizeProduct(data.data);
}
