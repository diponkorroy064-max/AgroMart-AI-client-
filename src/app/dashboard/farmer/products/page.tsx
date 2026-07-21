'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCard from '@/components/dashboard/DashboardCard';
import EmptyState from '@/components/dashboard/EmptyState';
import StatCard from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/Button';
import { getSellerProducts } from '@/lib/api/product';
import { IProduct } from '@/types/Product';

import {
  Package,
  Plus,
  Search,
  Pencil,
  Trash2,
  Boxes,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

const FarmerProductsPage = () => {
  const breadcrumb = [
    { label: 'Dashboard', href: '/dashboard/farmer' },
    { label: 'My Products' },
  ];

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getSellerProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="space-y-8">

      <DashboardHeader
        title="My Products"
        breadcrumb={breadcrumb}
      />

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatCard
          icon={<Package className="text-green-600" />}
          label="Products"
          value={String(totalProducts)}
        />

        <StatCard
          icon={<Boxes className="text-blue-600" />}
          label="Total Stock"
          value={String(totalStock)}
        />

        <StatCard
          icon={<DollarSign className="text-yellow-600" />}
          label="Inventory Value"
          value={`$${totalValue}`}
        />

      </div>

      {/* Search */}

      <DashboardCard title="Manage Products">

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">

          <div className="relative w-full md:max-w-md">

            <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />

            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          <Link href="/dashboard/farmer/products/add">

            <Button className="bg-green-600 hover:bg-green-700">

              <Plus className="mr-2 h-5 w-5" />

              Add Product

            </Button>

          </Link>

        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 rounded-2xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            icon={<Package className="w-12 h-12 text-gray-400" />}
            title="No Products Found"
            description="You haven't added any products yet."
            action={{
              label: 'Add Product',
              onClick: () => { },
            }}
          />
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredProducts.map((product) => (

              <div
                key={product._id}
                className="rounded-2xl border bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
              >

                <img
                  src={
                    product.image ||
                    'https://placehold.co/600x400?text=No+Image'
                  }
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">

                  <div className="flex justify-between items-start">

                    <h3 className="text-xl font-bold">
                      {product.name}
                    </h3>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${product.quantity > 10
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                        }`}
                    >
                      {product.quantity > 10
                        ? 'In Stock'
                        : 'Low Stock'}
                    </span>

                  </div>

                  <p className="text-gray-500 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-4 space-y-2">

                    <div className="flex justify-between">
                      <span>Category</span>
                      <span className="font-semibold">
                        {product.category}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Price</span>
                      <span className="font-bold text-green-600">
                        ${product.price}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Quantity</span>
                      <span>{product.quantity}</span>
                    </div>

                  </div>

                  {product.quantity <= 10 && (
                    <div className="flex items-center gap-2 mt-4 text-red-500 text-sm">
                      <AlertTriangle size={16} />
                      Low stock remaining
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 mt-6">

                    <Button variant="outline">
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>

                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </DashboardCard>

    </div>
  );
};

export default withAuth(FarmerProductsPage, ['farmer']);
