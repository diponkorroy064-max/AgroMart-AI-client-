'use client'
import Image from "next/image";
import { ReactNode } from "react";
import { Briefcase, MapPin, Search, Star, Users, Zap, Package, Tractor, Wind,} from "lucide-react";

interface Stat {
  icon: ReactNode;
  value: string;
  label: string;
}

interface FloatingCard {
  icon: ReactNode;
  title: string;
  value: string;
  animation: string;
}



const stats: Stat[] = [
  {
    icon: <Package size={20} className="text-gray-600" />,
    value: "10,000+",
    label: "Products",
  },
  {
    icon: <Users size={20} className="text-gray-600" />,
    value: "2,500+",
    label: "Sellers",
  },
  {
    icon: <Tractor size={20} className="text-gray-600" />,
    value: "15,000+",
    label: "Farmers",
  },
];

const floatingCards: FloatingCard[] = [
  {
    icon: <Users size={24} className="text-green-600" />,
    title: "Verified Sellers",
    value: "2,500+",
    animation: "animate-float-1",
  },
  {
    icon: <Star size={24} className="text-yellow-500" />,
    title: "Customer Rating",
    value: "4.9/5",
    animation: "animate-float-2",
  },
  {
    icon: <Briefcase size={24} className="text-blue-500" />,
    title: "Fast Delivery",
    value: "64 Districts",
    animation: "animate-float-3",
  },
  {
    icon: <Zap size={24} className="text-purple-500" />,
    title: "AI Recommendations",
    value: "24/7 Smart Assistance",
    animation: "animate-float-4",
  },
];

const bottomStats: Stat[] = [
  {
    icon: <Package size={32} className="text-green-600" />,
    value: "10,000+",
    label: "Products",
  },
  {
    icon: <Users size={32} className="text-green-600" />,
    value: "2,500+",
    label: "Verified Sellers",
  },
  {
    icon: <Tractor size={32} className="text-green-600" />,
    value: "15,000+",
    label: "Farmers",
  },
  {
    icon: <MapPin size={32} className="text-green-600" />,
    value: "64",
    label: "Districts Covered",
  },
];




const Hero = () => {
  return (
    <section className="container mx-auto relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-20%] left-[-20%] w-[40%] h-[40%] bg-green-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[40%] h-[40%] bg-yellow-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-green-100/20 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-15">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-1 mb-4 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
              <Wind size={16} className="mr-2" />
              AI Powered Agricultural Marketplace
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Everything Farmers Need for{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-green-500 to-green-700">
                Successful Crop Cultivation
              </span>
            </h1>
            <p className="mt-6 text-sm text-gray-600">
              AgroMart AI is an intelligent agricultural marketplace where
              trusted sellers provide quality seeds, fertilizers, pesticides,
              farming tools, irrigation equipment, machinery, seedlings, and
              other agricultural essentials. Farmers can compare products,
              purchase securely, and grow healthier, more productive crops.
            </p>
            <div className="mt-8 space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <button className="w-full px-6 py-3 text-base font-medium text-white transition-transform duration-300 transform bg-green-600 rounded-lg shadow-lg sm:w-auto hover:bg-green-700 hover:scale-105">
                Explore Products
              </button>
              <button className="w-full px-6 py-3 text-base font-medium text-green-700 transition-transform duration-300 transform bg-green-100 rounded-lg shadow-lg sm:w-auto hover:bg-green-200 hover:scale-105">
                Become a Seller
              </button>
            </div>

            <div className="relative mt-8">
              <input
                type="text"
                placeholder="Search seeds, fertilizers, farming tools..."
                className="w-full px-5 py-4 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-green-600 rounded-r-lg hover:bg-green-700">
                <Search size={24} />
              </button>
            </div>

            {/* <div className="flex items-center justify-center mt-6 space-x-6 lg:justify-start">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center">
                  {stat.icon}
                  <div className="ml-2">
                    <p className="text-lg font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          <div className="relative flex items-center justify-center">
            <Image
              src="/agromartai.png"
              alt="Agricultural marketplace"
              width={600}
              height={600}
              className="object-cover rounded-3xl shadow-2xl"
            />
            {floatingCards.map((card, index) => (
              <div
                key={index}
                className={`absolute p-4 bg-white/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200/50 ${card.animation}`}
              >
                <div className="flex items-center">
                  {card.icon}
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-800">
                      {card.title}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="py-8 bg-white sm:py-12">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {bottomStats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 text-center transition-transform duration-300 transform bg-gray-100 rounded-lg shadow-md hover:scale-105 hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white rounded-full">
                  {stat.icon}
                </div>
                <p className="mt-4 text-3xl font-extrabold text-gray-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-lg font-medium text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(10px, -10px) rotate(3deg);
          }
        }
        @keyframes float-2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-10px, 10px) rotate(-3deg);
          }
        }
        @keyframes float-3 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(10px, 10px) rotate(-3deg);
          }
        }
        @keyframes float-4 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-10px, -10px) rotate(3deg);
          }
        }
        .animate-float-1 {
          animation: float-1 8s ease-in-out infinite;
          top: 10%;
          left: -10%;
        }
        .animate-float-2 {
          animation: float-2 8s ease-in-out infinite;
          top: 30%;
          right: -15%;
        }
        .animate-float-3 {
          animation: float-3 8s ease-in-out infinite;
          bottom: 30%;
          left: -15%;
        }
        .animate-float-4 {
          animation: float-4 8s ease-in-out infinite;
          bottom: 10%;
          right: -10%;
        }
      `}</style>
    </section>
  );
};

export default Hero;
