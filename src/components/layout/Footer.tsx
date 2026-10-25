import Link from "next/link";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white border-t border-gray-800">
      {/* Top */}
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-8 w-8 text-yellow-300" />
              <h2 className="text-3xl font-bold tracking-tight">AgroMart AI</h2>
            </div>

            <p className="text-emerald-100/80 leading-7 text-sm max-w-sm">
              অ্যাগ্রোমার্ট একটি স্মার্ট কৃষি মার্কেটপ্লেস যা কৃষক, বিক্রেতা ও ক্রেতাদের সরাসরি সংযুক্ত করে। ন্যায্যমূল্যে খাঁটি বীজ, সার, কীটনাশক ও আধুনিক খামার সরঞ্জাম কিনুন নিরাপদে।
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <Link
                href="#"
                aria-label="Facebook"
                className="bg-white/10 p-2.5 rounded-full hover:bg-emerald-600 transition"
              >
                <FaFacebook size={18} />
              </Link>

              <Link
                href="#"
                aria-label="Instagram"
                className="bg-white/10 p-2.5 rounded-full hover:bg-pink-600 transition"
              >
                <BsInstagram size={18} />
              </Link>

              <Link
                href="#"
                aria-label="Twitter"
                className="bg-white/10 p-2.5 rounded-full hover:bg-sky-500 transition"
              >
                <BsTwitter size={18} />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="bg-white/10 p-2.5 rounded-full hover:bg-blue-700 transition"
              >
                <LiaLinkedin size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-yellow-300">
              প্রয়োজনীয় লিঙ্ক
            </h3>

            <ul className="space-y-2.5 text-sm text-emerald-100/80">
              <li>
                <Link href="/" className="hover:text-yellow-300 transition">
                  হোম পেজ
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-yellow-300 transition">
                  সকল কৃষি পণ্য
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-yellow-300 transition">
                  কৃষি ব্লগ ও টিপস
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-yellow-300 transition">
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-yellow-300 transition">
                  যোগাযোগ ও সহায়তা
                </Link>
              </li>
            </ul>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-yellow-300">
              মার্কেটপ্লেস
            </h3>

            <ul className="space-y-2.5 text-sm text-emerald-100/80">
              <li>
                <Link href="/products" className="hover:text-yellow-300 transition">
                  পণ্য ব্রাউজ করুন
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-yellow-300 transition">
                  বিক্রেতা হিসেবে যোগ দিন
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-yellow-300 transition">
                  ব্যবহারকারী লগইন
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-yellow-300 transition">
                  শপিং কার্ট
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-yellow-300">
              অফিস ও যোগাযোগ
            </h3>

            <div className="space-y-3.5 text-sm text-emerald-100/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="text-yellow-300 shrink-0 mt-0.5" size={16} />
                <span>সাভার ক্যান্টনমেন্ট, আশুলিয়া, ঢাকা-১৩৪৪, বাংলাদেশ</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="text-yellow-300 shrink-0" size={16} />
                <span>০১৯৮৮৮৮৩১০২ (সকাল ৯টা - রাত ৮টা)</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="text-yellow-300 shrink-0" size={16} />
                <span>support@agromart.ai</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Bottom Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row justify-between items-center text-xs text-emerald-200/60">
          <p>© {new Date().getFullYear()} AgroMart AI। সর্বস্বত্ব সংরক্ষিত।</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <Link href="#" className="hover:text-yellow-300 transition">
              গোপনীয়তা নীতি (Privacy Policy)
            </Link>
            <Link href="#" className="hover:text-yellow-300 transition">
              শর্তাবলী (Terms & Conditions)
            </Link>
            <Link href="#" className="hover:text-yellow-300 transition">
              সহায়তা কেন্দ্র
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
