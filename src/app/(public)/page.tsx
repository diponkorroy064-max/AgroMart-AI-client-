import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChoose from "@/components/home/WhyChoose";
import Statistics from "@/components/home/Statistics";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import HomeBlogs from "@/components/home/HomeBlogs";
import Newsletter from "@/components/home/Newsletter";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <div className="w-full">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyChoose />
      <Statistics />
      <HowItWorks />
      <Testimonials />
      <HomeBlogs />
      <Newsletter />
      <CTA />
    </div>
  );
}
