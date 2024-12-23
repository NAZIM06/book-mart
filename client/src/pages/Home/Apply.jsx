import React from 'react';

const Apply = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div 
          className="flex justify-between items-center w-full max-w-5xl mx-auto p-10 rounded-lg"
          style={{ backgroundImage: 'url(https://i.ibb.co/QvKvpsM/performing-homeimg-2.png)',  backgroundPosition: 'center' }}
        >
          <div className="w-1/2 text-white p-10">
            <h2 className="text-4xl font-bold mb-4">Subscribe Now to Get Regular Updates.</h2>
          </div>
          <div className="w-1/2 p-10">
            <h3 className="text-2xl font-bold mb-4 flex justify-between items-center">
            </h3>
            <form className="space-y-4">
              <input type="text" placeholder="Name" className="w-full p-3 border border-gray-300 rounded" />
              <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded" />
              <input type="text" placeholder="Phone number" className="w-full p-3 border border-gray-300 rounded" />
              <button type="submit" className="w-full p-3 bg-black text-white rounded hover:bg-gray-800">Get it now</button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Apply;