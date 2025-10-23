import { BrandScroller } from "../../components/Products/Brands"
import Categories from "../../components/Products/Categories"
import HeroCarousel from "../../components/Products/Hero"
import { ProductCarousel } from "../../components/Products/ProductCarousel"
import { SmartphoneDealsCarousel } from "../../components/Products/SmartPhone"



const Home = () => {
  return (
    <div>
      <HeroCarousel/>
      <ProductCarousel/>
      <SmartphoneDealsCarousel/>
      <Categories/>
      <BrandScroller/>
</div>
  )
}

export default Home