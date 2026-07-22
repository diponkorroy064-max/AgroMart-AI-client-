import { Button } from '@/components/ui/Button';
import { Activity, Award, CheckCircle, CircleDollarSign, Clock, HeartHandshake, Leaf, Lightbulb, Package, Palette, ShieldCheck, Star, Tractor, TrendingUp, Users} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
// import Button from '@/components/ui/Button';


const coreValues = [
  {
    icon: <HeartHandshake className="h-12 w-12 text-emerald-500" />,
    title: 'Trust',
    description:
      'We build relationships based on trust and reliability with our farmers, sellers, and customers.',
  },
  {
    icon: <Award className="h-12 w-12 text-emerald-500" />,
    title: 'Quality',
    description:
      'We are committed to providing the highest quality agricultural products and services.',
  },
  {
    icon: <Leaf className="h-12 w-12 text-emerald-500" />,
    title: 'Sustainability',
    description:
      'We promote sustainable farming practices to protect our planet for future generations.',
  },
  {
    icon: <Lightbulb className="h-12 w-12 text-emerald-500" />,
    title: 'Innovation',
    description:
      'We embrace technology and innovation to revolutionize the agriculture industry.',
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-emerald-500" />,
    title: 'Transparency',
    description: 'We believe in open and honest communication with all our stakeholders.',
  },
  {
    icon: <Users className="h-12 w-12 text-emerald-500" />,
    title: 'Community',
    description:
      'We foster a strong community of farmers, sellers, and buyers working together.',
  },
];

const platformFeatures = [
  {
    icon: <Users className="h-10 w-10 text-emerald-500" />,
    title: 'Verified Farmers',
    description: 'Directly from trusted and verified farmers to your table.',
  },
  {
    icon: <CircleDollarSign className="h-10 w-10 text-emerald-500" />,
    title: 'Secure Payments',
    description: 'Safe and secure payment gateway for all your transactions.',
  },
  {
    icon: <Clock className="h-10 w-10 text-emerald-500" />,
    title: 'Fast Delivery',
    description: 'Get your fresh products delivered to your doorstep quickly.',
  },
  {
    icon: <Tractor className="h-10 w-10 text-emerald-500" />,
    title: 'AI Agriculture Support',
    description: 'Get expert advice and support powered by AI technology.',
  },
  {
    icon: <Package className="h-10 w-10 text-emerald-500" />,
    title: 'Real-time Inventory',
    description: 'Track product availability and manage your inventory in real-time.',
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-emerald-500" />,
    title: 'Order Tracking',
    description: 'Monitor your orders from the farm to your doorstep.',
  },
  {
    icon: <Star className="h-10 w-10 text-emerald-500" />,
    title: 'Product Reviews',
    description: 'Read and write reviews to help the community make informed decisions.',
  },
  {
    icon: <Palette className="h-10 w-10 text-emerald-500" />,
    title: 'Modern Dashboard',
    description: 'An intuitive and powerful dashboard to manage your activities.',
  },
];

const teamMembers = [
  {
    avatar: '/user.svg',
    name: 'Ahmed Khan',
    role: 'Founder & CEO',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    avatar: '/user.svg',
    name: 'Fatima Ali',
    role: 'Full Stack Developer',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    avatar: '/user.svg',
    name: 'Zainab Begum',
    role: 'UI/UX Designer',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    avatar: '/user.svg',
    name: 'Bilal Hassan',
    role: 'Agriculture Expert',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
];

const testimonials = [
  {
    image: '/user.svg',
    name: 'Aisha Rahman',
    rating: 5,
    review: 'AgroMart has transformed the way I sell my produce. The platform is easy to use, and I get fair prices for my hard work.',
  },
  {
    image: '/user.svg',
    name: 'Ibrahim Malik',
    rating: 4,
    review:
      "As a buyer, I'm impressed with the quality and freshness of the products on AgroMart. The delivery is always on time.",
  },
  {
    image: '/user.svg',
    name: 'Samina Akter',
    rating: 5,
    review:
      'The AI agriculture support feature is a game-changer. I have learned so much about sustainable farming practices.',
  },
];

const impactTimeline = [
  {
    year: '2021',
    title: 'Farmer Registration',
    description: 'Onboarded our first 100 farmers and started our journey.',
  },
  {
    year: '2022',
    title: 'Marketplace Launch',
    description: 'Launched the AgroMart marketplace with over 500 products.',
  },
  {
    year: '2023',
    title: '1000 Products',
    description: 'Reached a milestone of 1000 unique products available on the platform.',
  },
  {
    year: '2024',
    title: 'Nationwide Expansion',
    description: 'Expanded our services to cover all major districts in the country.',
  },
  {
    year: '2025',
    title: 'AI Agriculture Assistant',
    description: 'Introduced our AI-powered assistant to help farmers with smart farming.',
  },
];


const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 container mx-auto">
      <main className="overflow-hidden">
        <div className="relative isolate">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true">
            <div
              className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#80ff80] to-[#008000] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}/>
          </div>

          {/* Hero Section */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Growing Agriculture Through Technology
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                AgroMart is a modern platform that connects farmers, sellers, and buyers to
                create a sustainable and profitable agricultural ecosystem.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/products">
                  <Button>
                    Explore Products
                  </Button>
                </Link>

                <Link href="/register">
                  <Button variant='outline'>
                    Become a Seller <span aria-hidden="true">→</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Our Story Section */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  Our Story
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  AgroMart was born from a desire to solve the challenges faced by farmers in
                  accessing markets and getting fair prices for their produce. We saw an
                  opportunity to use technology to bridge the gap between farmers and
                  consumers, creating a transparent and efficient marketplace.
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Our platform empowers farmers by providing them with the tools and resources
                  they need to thrive in the digital age. We connect them with a wide network
                  of buyers, ensuring they get the best value for their hard work.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg"
                  alt="Our Story"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  To empower farmers through digital technology, ensuring fair pricing, an easy
                  marketplace, and promoting sustainable agriculture for a better future.
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  To build the largest agricultural marketplace, creating a smart farming
                  ecosystem that drives digital transformation and a brighter future for the
                  agriculture sector.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Our Core Values
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                The principles that guide our work and define our culture.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value) => (
                <div
                  key={value.title}
                  className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Features Section */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Platform Features
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Everything you need to succeed in the agricultural marketplace.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {platformFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    {feature.icon}
                    <h3 className="ml-4 text-lg font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose AgroMart Section */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  Why Choose AgroMart
                </h2>
                <ul className="mt-8 space-y-4">
                  {[
                    'Fresh Products',
                    'Trusted Sellers',
                    'Affordable Prices',
                    'Secure Transactions',
                    'Fast Delivery',
                    '24/7 Support',
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-center">
                      <CheckCircle className="h-6 w-6 text-emerald-500" />
                      <span className="ml-3 text-lg text-gray-600 dark:text-gray-300">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg"
                  alt="Why Choose AgroMart"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-emerald-600 text-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
                <div>
                  <h3 className="text-4xl font-bold">500+</h3>
                  <p className="mt-2 text-lg">Farmers</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold">10,000+</h3>
                  <p className="mt-2 text-lg">Customers</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold">5,000+</h3>
                  <p className="mt-2 text-lg">Products</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold">25+</h3>
                  <p className="mt-2 text-lg">Districts</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold">98%</h3>
                  <p className="mt-2 text-lg">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Meet Our Team Section */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Meet Our Team
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                The passionate people behind AgroMart.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="mx-auto rounded-full"/>
                  <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-emerald-500">{member.role}</p>
                  <div className="mt-4 flex justify-center gap-4">
                    <a href={member.social.twitter}>
                      <Activity className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </a>
                    <a href={member.social.linkedin}>
                      <Activity className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="bg-gray-100 dark:bg-gray-800 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  What Our Community Says
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  Real stories from real people.
                </p>
              </div>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.name}
                    className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full" />
                      <div className="ml-4">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{testimonial.review}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Our Impact Section */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Our Impact
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                A timeline of our journey and milestones.
              </p>
            </div>
            <div className="mt-16">
              {impactTimeline.map((item, index) => (
                <div key={item.title} className="flex items-center w-full">
                  <div className="w-1/2 text-right pr-8">
                    {index % 2 === 0 && (
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-1/12">
                    <div className="mx-auto w-1 h-16 bg-emerald-500 rounded-full"></div>
                    <div className="mx-auto w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                      {item.year}
                    </div>
                  </div>
                  <div className="w-1/2 pl-8">
                    {index % 2 !== 0 && (
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call To Action Section */}
          <div className="bg-linear-to-r from-emerald-500 to-green-500 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Join the Future of Agriculture
              </h2>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="#"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-emerald-600 shadow-sm hover:bg-gray-100"
                >
                  Explore Marketplace
                </Link>
                <Link
                  href="#"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Register Now <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Banner */}
          <div className="bg-gray-900 py-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
              <p className="text-lg text-white">
                Together we grow agriculture with technology.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
