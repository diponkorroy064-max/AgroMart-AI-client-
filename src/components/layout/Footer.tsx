"use client";
import Link from "next/link";
import { Leaf, Mail, Phone, MapPin, Send} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";


export default function Footer() {
  return (
    <footer className="container mx-auto bg-gray-800 text-white">

      {/* Top */}
      <div className="container mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Logo */}
          <div className="lg:col-span-2">

            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-8 w-8 text-yellow-300" />
              <h2 className="text-3xl font-bold">
                AgroMart
              </h2>
            </div>

            <p className="text-green-100 leading-7">
              AgroMart is a smart agriculture marketplace that connects
              farmers, sellers, and customers. Buy fresh products directly
              from trusted farmers with secure payment and fast delivery.
            </p>

            {/* Social */}

            <div className="flex gap-4 mt-6">

              <Link
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-green-600 transition"
              >
                <FaFacebook size={20} />
              </Link>

              <Link
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-pink-600 transition"
              >
                <BsInstagram size={20} />
              </Link>

              <Link
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-sky-500 transition"
              >
                <BsTwitter size={20} />
              </Link>

              <Link
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-blue-700 transition"
              >
                <LiaLinkedin size={20} />
              </Link>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-green-100">

              <li>
                <Link href="/" className="hover:text-yellow-300">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/products" className="hover:text-yellow-300">
                  Products
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-yellow-300">
                  About
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-yellow-300">
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Marketplace */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Marketplace
            </h3>

            <ul className="space-y-3 text-green-100">

              <li>
                <Link href="/products" className="hover:text-yellow-300">
                  Browse Products
                </Link>
              </li>

              <li>
                <Link href="/register" className="hover:text-yellow-300">
                  Become Seller
                </Link>
              </li>

              <li>
                <Link href="/login" className="hover:text-yellow-300">
                  Login
                </Link>
              </li>

              <li>
                <Link href="/cart" className="hover:text-yellow-300">
                  Shopping Cart
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-green-100">

              <div className="flex items-center gap-3">
                <MapPin className="text-yellow-300" size={18} />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-yellow-300" size={18} />
                <span>+880 1700-000000</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-yellow-300" size={18} />
                <span>support@agromart.com</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Newsletter */}

      <div className="border-t border-green-700">

        <div className="container mx-auto px-6 py-10">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            <div>

              <h3 className="text-2xl font-semibold">
                Subscribe to our Newsletter
              </h3>

              <p className="text-green-200 mt-2">
                Get updates on new products and farming tips.
              </p>

            </div>

            <div className="flex w-full lg:w-auto">

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full lg:w-80 border border-green-700 rounded-l-lg px-4 py-3 text-white outline-none"
              />

              <button className="bg-yellow-400 hover:bg-yellow-500 px-6 rounded-r-lg text-green-900 font-semibold transition flex items-center gap-2">

                <Send size={18} />

                Subscribe

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-green-700">

        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-green-200 text-sm">
            © {new Date().getFullYear()} AgroMart. All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0 text-sm">

            <Link href="#" className="hover:text-yellow-300">
              Privacy Policy
            </Link>

            <Link href="#" className="hover:text-yellow-300">
              Terms & Conditions
            </Link>

            <Link href="#" className="hover:text-yellow-300">
              Help Center
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}
