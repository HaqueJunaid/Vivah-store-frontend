import AllProducts from '../../components/products/AllProducts';
import HeroSwipper from '../../components/home/HeroSwipper';
import PageLoader from '../../components/common/PageLoader';
import { useEffect } from 'react';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "VivahStore | Home";
  }, []);

  return (
    <div className='bg-stone-50 w-full'>
      <PageLoader />
      <HeroSwipper />
      <AllProducts />
    </div>
  )
}

export default HomePage;