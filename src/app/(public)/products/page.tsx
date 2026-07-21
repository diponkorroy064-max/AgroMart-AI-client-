"use client";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductList } from "@/components/ui/ProductList";
import { IProduct } from "@/types/Product";
import { getAllProducts } from "@/lib/api/product";

const categories = ["All", "Vegetables", "Fruits", "Grains", "Seeds", "Fertilizers", "Pesticides", "Farm Equipment", "Organic Products"];

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts({ search, category, sort });
        setProducts(data.products);
        // console.log('data', data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (category !== "All") {
      data = data.filter(
        (item) =>
          item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sort) {
      case "low":
        data.sort((a, b) => a.price - b.price);
        break;

      case "high":
        data.sort((a, b) => b.price - a.price);
        break;

      case "name":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return data;
  }, [products, search, category, sort]);
  // console.log('filteredProducts', filteredProducts);


  return (
    <main className="container mx-auto bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-linear-to-r from-green-700 to-green-500 py-8">
        <div className="px-4">

          <h1 className="text-5xl font-bold text-white">
            Explore Products
          </h1>

          <p className="text-green-100 mb-4">
            Browse fresh vegetables, fruits, grains, seeds,
            fertilizers and farm equipment directly from trusted
            farmers.
          </p>
        </div>
      </section>


      {/* Filters */}
      <section className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid lg:grid-cols-4 gap-5">

            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600" />
            </div>

            {/* Category */}
            <select
              className="rounded-xl border border-gray-300 px-4 py-3"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }>
              {categories.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              className="rounded-xl border border-gray-300 px-4 py-3"
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }>
              <option value="">Sort By</option>
              <option value="low">
                Price: Low to High
              </option>
              <option value="high">
                Price: High to Low
              </option>
              <option value="name">
                Name (A-Z)
              </option>
            </select>
          </div>
        </div>
      </section>


      {/* Products */}
      <section className="container mx-auto px-4 py-10">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold">
            All Products
          </h2>
          <div className="flex items-center gap-2 text-gray-600">
            <SlidersHorizontal className="w-5 h-5" />
            <span>
              {filteredProducts.length} Products Found
            </span>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">

            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-80 rounded-2xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-16 text-center">
            <h3 className="text-2xl font-semibold">
              No Products Found
            </h3>

            <p className="text-gray-500 mt-3">
              Try another category or search keyword.
            </p>
          </div>
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </section>
    </main>
  );
}

