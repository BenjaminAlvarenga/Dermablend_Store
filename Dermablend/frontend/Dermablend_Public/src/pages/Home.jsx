import { useRef, useState } from "react";
import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Catalog from "../components/Catalog";
import Philosophy from "../components/Philosophy";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import ToneFinderModal from "../components/ToneFinderModal";
import { useProductFilter } from "../hooks/useProductFilter";
import { products } from "../data/products";

const featured = products.filter((p) => p.badge === "bestseller" || p.badge === "favorito").slice(0, 4);

export default function Home() {
  const [toneFinderOpen, setToneFinderOpen] = useState(false);
  const catalogRef = useRef(null);

  const filterState = useProductFilter(products);

  function handleCategorySelect(categoryId) {
    filterState.setCategory(categoryId);
    catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <Hero onFindTone={() => setToneFinderOpen(true)} />
      <StatsBar />
      <Categories onSelect={handleCategorySelect} />
      <FeaturedProducts products={featured} />

      <div ref={catalogRef}>
        <Catalog {...filterState} />
      </div>

      <Philosophy />
      <Testimonials />
      <Newsletter />

      <ToneFinderModal open={toneFinderOpen} onClose={() => setToneFinderOpen(false)} />
    </>
  );
}
