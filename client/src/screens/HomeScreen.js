import ProductCarousel from '../components/ProductCarousel';
import Services from '../components/Services';
import CollectionGrid from '../components/CollectionGrid';
import AboutUs from '../components/AboutUs';
import BestSellers from '../components/BestSellers';
import TestimonialCarousel from '../components/TestimonialCarousel';
import Newsletter from '../components/Newsletter';
import LatestBlogs from '../components/LatestBlogs';

import ScrollToReveal from '../components/ScrollToReveal';

const HomeScreen = () => {
  return (
    <>
      <ProductCarousel />

      <ScrollToReveal>
        <section className="py-5">
          <Services />
        </section>
      </ScrollToReveal>

      <ScrollToReveal>
        <CollectionGrid />
      </ScrollToReveal>

      <ScrollToReveal>
        <AboutUs />
      </ScrollToReveal>

      <ScrollToReveal>
        <BestSellers />
      </ScrollToReveal>

      <ScrollToReveal>
        <TestimonialCarousel />
      </ScrollToReveal>

      <ScrollToReveal>
        <LatestBlogs />
      </ScrollToReveal>


      <ScrollToReveal>
        <Newsletter />
      </ScrollToReveal>
    </>
  );
};

export default HomeScreen;
