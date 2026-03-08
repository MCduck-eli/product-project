import HeroSlider from "@/components/HeroSlider";
import ProductsGrid from "@/components/ProductsGrid";
import Banners from "@/components/Banners";
import CategoriesGrid from "@/components/CategoriesGrid";
import DailyDealsPage from "@/components/DailyDealsPage";

export default function HomePage() {
    return (
        <main>
            <HeroSlider />
            <CategoriesGrid />
            <DailyDealsPage />
            <ProductsGrid />
            <Banners />
        </main>
    );
}
