import Header from "../header/Header";
import ProductH from "../product/Product";
import HomeRemedyH from "../homeremedy/Homeremedy";
import YogaH from "../yoga/Yoga";
import Footer from "../footer/Footer";
import Slider from "../slider/Sliderr";

function Home() {
  return (
    <>
      <Header />
      <Slider />
      <HomeRemedyH />
      <ProductH />
      <YogaH />
      <Footer />
    </>
  );
}
export default Home;
