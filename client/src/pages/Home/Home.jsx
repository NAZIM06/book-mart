
import About from './About';
import PopularInstructors from './PopularSellers/PopularSellers';
import PopularClasses from './PopularBooks/PopularBooks';
import Herosection from './Banner/Herosection';
import Banner2 from './Banner/Banner2';
import Apply from './Apply';


const Home = () => {
  return (
    <div>
      <Herosection/>
      <Banner2></Banner2>
      <div className='py-10'><PopularInstructors /></div>
      <PopularClasses />
      <About/>
      <Apply/>
    </div>
  );
};

export default Home;