import ProductCard from "./ProductCard";

export default function FeaturedProducts({ products }) {
  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 text-center">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
            Colección destacada
          </p>
          <h2 className="mt-2 font-display text-3xl font-light text-espresso sm:text-4xl">
            Destacados de <em className="italic text-taupe">la Semana</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
