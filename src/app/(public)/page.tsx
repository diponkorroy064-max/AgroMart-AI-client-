import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChoose from "@/components/home/WhyChoose";
import Statistics from "@/components/home/Statistics";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import CTA from "@/components/home/CTA";


export default function HomePage() {
  return (
    <section className="container mx-auto">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyChoose />
      <Statistics />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
      <CTA />
    </section>
  );
}
