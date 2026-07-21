import Link from 'next/link';
import {
  ArrowRight,
  Leaf,
  MapPin,
  Package,
  Search,
  ShoppingCart,
  Sprout,
  Star,
  Store,
  TrendingUp,
  Users,
} from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-yellow-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-4 flex items-center gap-2 rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-800">
              <Leaf size={16} />
              <span>AI Powered Agriculture Marketplace</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Buy Fresh Agricultural Products Directly From{' '}
              <span className="bg-linear-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">
                Trusted Farmers
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Connect directly with verified farmers and sellers. Discover
              fresh vegetables, fruits, grains, seeds, fertilizers and
              agricultural equipment with AI-powered recommendations.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Explore Marketplace
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 transition-transform duration-200 hover:scale-105 hover:bg-gray-50"
              >
                Become a Seller
              </Link>
            </div>
            <div className="mt-12 w-full max-w-lg">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search vegetables, fruits, seeds..."
                  className="w-full rounded-lg border-2 border-gray-200 bg-white py-4 pl-6 pr-24 text-base text-gray-800 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute inset-y-0 right-0 flex items-center justify-center rounded-r-lg bg-green-600 px-6 transition-colors hover:bg-green-700"
                >
                  <Search className="text-white" size={24} />
                </button>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600 lg:justify-start">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="text-green-600" size={16} />
                  5000+ Products
                </span>
                <span className="flex items-center gap-1.5">
                   <Users className="text-green-600" size={16} />
                  Verified Sellers
                </span>
                <span className="flex items-center gap-1.5">
                  <Package className="text-green-600" size={16} />
                  Fast Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative hidden h-full min-h-125 lg:flex">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute h-64 w-64 rounded-full bg-green-400/30 blur-3xl" />
              <div className="absolute h-56 w-56 rounded-full bg-yellow-300/30 blur-3xl animation-delay-2000 animate-pulse" />
            </div>

            <div className="relative flex h-full w-full items-center justify-center">
                <div className="relative h-96 w-full max-w-md rounded-2xl bg-linear-to-br from-green-100 to-teal-100 p-4 shadow-2xl transition-transform duration-300 hover:scale-105">
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-green-500/50 text-center">
                        <Sprout size={64} className="mb-4 text-green-600" />
                        <h3 className="text-xl font-bold text-green-900">AgroMart</h3>
                        <p className="mt-2 text-sm text-green-800/80">Premium Agricultural Marketplace</p>
                        <p className="mt-1 text-xs text-green-700/60">Image Placeholder</p>
                    </div>
                </div>

              {/* Floating Cards */}
              <div className="absolute -top-8 left-0 flex items-center gap-3 rounded-lg bg-white/70 p-4 shadow-lg backdrop-blur-md transition-transform duration-300 hover:-translate-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Users size={28} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">500+</p>
                  <p className="text-sm text-gray-600">Verified Farmers</p>
                </div>
              </div>

              <div className="absolute -bottom-10 right-0 flex items-center gap-3 rounded-lg bg-white/70 p-4 shadow-lg backdrop-blur-md transition-transform duration-300 hover:translate-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <ShoppingCart size={28} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">10000+</p>
                  <p className="text-sm text-gray-600">Successful Orders</p>
                </div>
              </div>

              <div className="absolute -right-8 top-1/4 flex items-center gap-3 rounded-lg bg-white/70 p-4 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-110">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
                  <Star size={28} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">4.9</p>
                  <p className="text-sm text-gray-600">Customer Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Statistics */}
      <div className="container mx-auto px-4 pb-16 sm:pb-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {[
            { icon: Package, value: '5000+', label: 'Products' },
            { icon: Store, value: '2500+', label: 'Farmers' },
            { icon: Users, value: '10000+', label: 'Customers' },
            { icon: MapPin, value: '64', label: 'Districts' },
          ].map((stat, index) => (
            <div
              key={index}
              className="group rounded-xl bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 transition-colors duration-300 group-hover:bg-green-600 group-hover:text-white mx-auto">
                <stat.icon size={32} />
              </div>
              <p className="text-3xl font-bold text-gray-900 md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-base text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
