import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Herosection = () => {
  return (
    <div className='w-full bg-[#FCEBE6] h-full flex items-center justify-center'>
      <div className='container mx-auto flex flex-col lg:flex-row items-center justify-center mr-4 px-8 py-8'>
        {/* Text Content */}
        <div className='w-full lg:w-1/2 mb-6 lg:mr-6 flex flex-col items-center lg:items-start'>
          <div className="flex items-center mb-4">
            <div className="h-1 w-8 bg-red-600 mr-3"></div>
            <span className="uppercase font-semibold">New Release</span>
          </div>
          <div className='mb-7 text-center lg:text-left'>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
            The Sons of the Empire 
            </h1>
            <p className='pt-4'>An amazing collection of Horus Heresy Primarch short stroies, penned by a host of best selling authors. A must have for all fans of Horus Heresy!</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
          <button className='button'>Buy Now</button>
          <button className='inline-flex items-center h-12 px-5 my-3 font-medium rounded shadow-md bg-blue-500 text-white'>Read Sample <FaArrowRight className="ml-2" /></button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center ">
          <img src="https://i.ibb.co.com/LgHn0m9/author-book-store-hero-book-cover-img.jpg" alt="Online Coaching" className="rounded-lg shadow-lg w-full md:w-2/3 lg:w-4/5 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Herosection;
