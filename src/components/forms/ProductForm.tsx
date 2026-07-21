'use client';
import React, { useState } from 'react';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Button } from '../ui/Button';
import { ProductFormData } from '@/types/Product';

interface ProductFormProps {
  onSubmit: (productData: ProductFormData) => void;
  initialData?: ProductFormData;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData }) => {
  const [productData, setProductData] = useState<ProductFormData>(
    initialData ?? {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        placeholder="Product Name"
        value={productData.name}
        onChange={handleChange}
        required
      />
      <Textarea
        name="description"
        placeholder="Product Description"
        value={productData.description}
        onChange={handleChange}
        required
      />
      <Input
        name="price"
        type="number"
        placeholder="Price"
        value={productData.price}
        onChange={handleChange}
        required
      />
      <Input
        name="quantity"
        type="number"
        placeholder="Quantity"
        value={productData.quantity}
        onChange={handleChange}
        required
      />
      <Input
        name="category"
        placeholder="Category"
        value={productData.category}
        onChange={handleChange}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
