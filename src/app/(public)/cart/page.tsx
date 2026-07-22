'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight
} from 'lucide-react';

export default function CartPage() {

  const cartItems = [
    {
      id: 1,
      name: 'Fresh Tomato',
      price: 120,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337',
    },
    {
      id: 2,
      name: 'Organic Rice',
      price: 950,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31f',
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const delivery = 80;
  const total = subtotal + delivery;

  return (
    <section className="bg-gray-50 min-h-screen py-12">

      <div className="container mx-auto px-5">

        <h1 className="text-4xl font-bold mb-10">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Items */}

          <div className="lg:col-span-2 space-y-6">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row gap-5"
              >

                <Image
                  src={item.image}
                  alt={item.name}
                  width={140}
                  height={140}
                  className="rounded-xl object-cover"
                />

                <div className="flex-1">

                  <h2 className="text-2xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-green-600 font-bold mt-2">
                    ৳ {item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-5">

                    <button className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Minus size={18} />
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <button className="h-10 w-10 rounded-lg bg-green-600 text-white flex items-center justify-center">
                      <Plus size={18} />
                    </button>

                  </div>

                </div>

                <div className="flex flex-col justify-between items-end">

                  <button className="text-red-500 hover:text-red-700">

                    <Trash2 />

                  </button>

                  <p className="font-bold text-xl">

                    ৳ {item.price * item.quantity}

                  </p>

                </div>

              </div>

            ))}

          </div>

          {/* Summary */}

          <div>

            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span>Subtotal</span>

                  <span>৳ {subtotal}</span>

                </div>

                <div className="flex justify-between">

                  <span>Delivery</span>

                  <span>৳ {delivery}</span>

                </div>

                <div className="border-t pt-4 flex justify-between font-bold text-xl">

                  <span>Total</span>

                  <span>৳ {total}</span>

                </div>

              </div>

              <input
                placeholder="Coupon Code"
                className="w-full mt-6 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-semibold flex justify-center items-center gap-2">

                Proceed to Checkout

                <ArrowRight size={18} />

              </button>

              <Link
                href="/products"
                className="block text-center mt-5 text-green-600 font-medium hover:underline"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
