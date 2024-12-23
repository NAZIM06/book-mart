import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const AboutUs = () => {
    const { data: allSellers= [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-sellers`);
            return response.data;
        },
    });
    return (
        <>
            <Helmet>
                <title>BookMart ||AboutUs</title>
            </Helmet>
            <div className='w-full flex justify-center my-10'>
                <div className='max-w-screen-lg'>
                <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">All Sellers</h1>
                <div className="border-t-2 border-red-500 w-16 mx-auto my-4"></div>
            </div>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-5 mx-auto'>
                        {
                            allSellers.map(seller =>
                                <div key={seller._id} className="card card-compact sm:w-80 glass shadow-2xl group">
                                    <figure>
                                        <img className='h-64 w-full object-cover' src={seller?.image} alt={seller.name} />
                                    </figure>
                                    <div className="card-body items-center">
                                        <h2 className="card-title">{seller.name}</h2>
                                        <p className='font-semibold'>Email: <span className='font-normal'>{seller.email}</span></p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
