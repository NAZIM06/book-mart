import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaShippingFast } from 'react-icons/fa';
import { MdOutlineMoreTime, MdReplayCircleFilled } from "react-icons/md";

// for home

const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <div className="max-w-screen-lg mx-auto py-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">What will you get?</h1>
          <div className="border-t-2 border-red-500 w-16 mx-auto my-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10" data-aos="zoom-in">
  <div className="w-full md:w-80 h-auto rounded-lg shadow-md p-4 text-center bg-slate-50 mx-auto mb-4 md:mb-0">
  <FaShippingFast className="text-4xl text-red-500 mb-6 mx-auto" />
                            <h3 className="text-2xl font-semibold mb-4">Free Shipping Item</h3>
    <p className="text-gray-500">Orders over $500</p>
  </div>
  <div className="w-full md:w-80 h-auto rounded-lg shadow-md p-4 text-center bg-slate-50 mx-auto mb-4 md:mb-0">
  <MdReplayCircleFilled className="text-4xl text-red-500 mb-6 mx-auto" />
                            <h3 className="text-2xl font-semibold mb-4">Money Back Guarantee</h3>
    <p className="text-gray-500">
    100% money back</p>
  </div>
  <div className="w-full md:w-80 h-auto rounded-lg shadow-md p-4 text-center bg-slate-50 mx-auto">
  <MdOutlineMoreTime className="text-4xl text-red-500 mb-6 mx-auto" />
                            <h3 className="text-2xl font-semibold mb-4">Lifetime Support</h3>
    <p className="text-gray-500">
Keep up with in the latest in cloud</p>
  </div>
</div>

      </div>
    </div>

  );
};

export default About;