'use client';
import { Mail, Phone, MapPin, Clock, Send} from 'lucide-react';


export default function ContactPage() {
    return (
        <div className="container mx-auto bg-gray-50">

            {/* Hero */}
            <section className="bg-linear-to-r from-green-700 to-emerald-500 text-white py-24">
                <div className="container mx-auto px-6 text-center">

                    <h1 className="text-5xl font-bold mb-6">
                        Contact AgroMart
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg text-green-100">
                        We wouldd love to hear from you. Whether you are a farmer,
                        seller, or customer, our team is here to help.
                    </p>

                </div>
            </section>

            {/* Contact Info */}

            <section className="container mx-auto px-6 py-16">

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                    <div className="bg-white rounded-2xl shadow p-8 text-center hover:shadow-xl transition">

                        <Mail className="mx-auto text-green-600 mb-4" size={40} />

                        <h3 className="font-bold text-xl mb-2">
                            Email
                        </h3>

                        <p className="text-gray-600">
                            support@agromart.com
                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow p-8 text-center hover:shadow-xl transition">

                        <Phone className="mx-auto text-green-600 mb-4" size={40} />

                        <h3 className="font-bold text-xl mb-2">
                            Phone
                        </h3>

                        <p className="text-gray-600">
                            +880 1700-000000
                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow p-8 text-center hover:shadow-xl transition">

                        <MapPin className="mx-auto text-green-600 mb-4" size={40} />

                        <h3 className="font-bold text-xl mb-2">
                            Office
                        </h3>

                        <p className="text-gray-600">
                            Dhaka, Bangladesh
                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow p-8 text-center hover:shadow-xl transition">

                        <Clock className="mx-auto text-green-600 mb-4" size={40} />

                        <h3 className="font-bold text-xl mb-2">
                            Working Hours
                        </h3>

                        <p className="text-gray-600">
                            Sat - Thu
                            <br />
                            9:00 AM - 6:00 PM
                        </p>

                    </div>

                </div>

            </section>

            {/* Contact Form */}

            <section className="container mx-auto px-6 pb-20">

                <div className="grid lg:grid-cols-2 gap-10">

                    {/* Form */}

                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold mb-6">
                            Send us a Message
                        </h2>

                        <form className="space-y-5">

                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            <textarea
                                rows={6}
                                placeholder="Write your message..."
                                className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            <button
                                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition"
                            >
                                <Send size={18} />
                                Send Message
                            </button>

                        </form>

                    </div>

                    {/* Right Side */}

                    <div className="space-y-8">

                        <div className="bg-white rounded-2xl shadow-lg p-8">

                            <h2 className="text-2xl font-bold mb-4">
                                Why Contact Us?
                            </h2>

                            <ul className="space-y-4 text-gray-600">

                                <li>✔ Product Support</li>

                                <li>✔ Seller Registration</li>

                                <li>✔ Farmer Assistance</li>

                                <li>✔ Partnership Opportunities</li>

                                <li>✔ Technical Support</li>

                            </ul>

                        </div>

                        <div className="bg-green-600 rounded-2xl text-white p-8">

                            <h2 className="text-2xl font-bold mb-4">
                                Connect With Us
                            </h2>

                            <p className="text-green-100 mb-6">
                                Stay connected through our social media channels.
                            </p>

                            <div className="flex gap-4">

                                <button className="bg-white/20 p-3 rounded-full hover:bg-white/30">
                                    {/* <FaFacebookSquare /> */}
                                </button>

                                <button className="bg-white/20 p-3 rounded-full hover:bg-white/30">
                                    {/* <Instagram /> */}
                                </button>

                                <button className="bg-white/20 p-3 rounded-full hover:bg-white/30">
                                    {/* <Linkedin /> */}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* FAQ */}

            <section className="bg-white py-20">

                <div className="container mx-auto px-6 max-w-4xl">

                    <h2 className="text-4xl font-bold text-center mb-12">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">

                        <div className="border rounded-xl p-6">

                            <h3 className="font-semibold text-lg">
                                How can I become a seller?
                            </h3>

                            <p className="text-gray-600 mt-2">
                                Register an account and choose the Seller role during signup.
                            </p>

                        </div>

                        <div className="border rounded-xl p-6">

                            <h3 className="font-semibold text-lg">
                                Are products verified?
                            </h3>

                            <p className="text-gray-600 mt-2">
                                Yes. Every seller and farmer goes through verification before listing products.
                            </p>

                        </div>

                        <div className="border rounded-xl p-6">

                            <h3 className="font-semibold text-lg">
                                How long does delivery take?
                            </h3>

                            <p className="text-gray-600 mt-2">
                                Usually within 2-5 business days depending on your location.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* Map */}

            <section className="py-20 bg-gray-50">

                <div className="container mx-auto px-6">

                    <h2 className="text-4xl font-bold text-center mb-10">
                        Our Location
                    </h2>

                    <div className="rounded-2xl overflow-hidden shadow-lg">

                        <iframe
                            src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
                            className="w-full h-112.5"
                            loading="lazy"
                        />

                    </div>

                </div>

            </section>

            {/* CTA */}

            <section className="bg-linear-to-r from-green-700 to-emerald-500 py-20">

                <div className="container mx-auto px-6 text-center text-white">

                    <h2 className="text-4xl font-bold mb-4">
                        Let`s Grow Agriculture Together 🌱
                    </h2>

                    <p className="text-green-100 mb-8">
                        Join thousands of farmers, sellers, and buyers already using AgroMart.
                    </p>

                    <button className="bg-white text-green-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition">
                        Join AgroMart Today
                    </button>

                </div>

            </section>

        </div>
    );
}
