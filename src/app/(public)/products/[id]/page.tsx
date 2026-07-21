'use client';
import React, { useState, useEffect } from 'react';
import { getProductById } from '@/lib/api/product';
import { IProduct } from '@/types/Product';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useParams } from 'next/navigation';


const ProductDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="p-4">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-lg mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-2">Price: ${product.price}</p>
        <p className="mb-2">Quantity available: {product.quantity}</p>
        <p className="mb-2">Category: {product.category}</p>
        {product.farmer && <p className="mb-4">Seller: {product.farmer.name}</p>}
        <Button>Add to Cart</Button>
      </Card>
    </div>
  );
};

export default ProductDetailPage;
