import { ProductCard } from "./ProductCard";
import { IProduct } from "@/types/Product";

interface ProductListProps {
  products: IProduct[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4.5">
      {products.map((product) => (
        <ProductCard key={String(product._id)} product={product} />
      ))}
    </div>
  );
}

export { ProductCard };
export default ProductList;
