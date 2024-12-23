import React from 'react';

const Contact = () => {
    return (

        <section className="p-12 font-sans">
            <div className="text-center mb-12">
                <h2 className="text-red-500 mb-2 uppercase tracking-wide">Contact Us</h2>
                <h1 className="text-4xl font-bold mb-4">Have any query?</h1>
                <div className="border-t-2 border-red-500 w-16 mx-auto my-4"></div>
                <p className="text-gray-600">Drop us a line through the form below and we'll get back to you.</p>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-start lg:space-x-12">
                <div className="lg:w-1/3 mb-12 lg:mb-0">
                    <div className="mb-6">
                        <h3 className="font-semibold text-red-500">Email Us</h3>
                        <p>support@email.com</p>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-semibold text-red-500">Make a Call</h3>
                        <p>+45 234 345467</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-red-500">Corporate Office</h3>
                        <p>Moon Street Light Avenue, 14/05 Jupiter, JP 80630</p>
                    </div>
                </div>
                <div className="lg:w-2/5">
                    <form className="space-y-6">
                        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                            <input type="text" placeholder="Your Name" className="w-full lg:w-1/2 p-3 border border-gray-300 rounded" required />
                            <input type="email" placeholder="Email Address" className="w-full lg:w-1/2 p-3 border border-gray-300 rounded" required />
                        </div>
                        <input type="text" placeholder="Subject" className="w-full p-3 border border-gray-300 rounded" required />
                        <textarea placeholder="Your Message" className="w-full p-3 border border-gray-300 rounded h-32" required></textarea>
                        <button type="submit" className="bg-red-500 text-white py-3 px-6 rounded hover:bg-red-600">Send Message</button>
                    </form>
                </div>
            </div>
        </section>

    );
};

export default Contact;