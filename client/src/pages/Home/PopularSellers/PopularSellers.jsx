import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const PopularInstructors = () => {

    const { data: instructors = [] } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/popular-instructors`)
            return response.data
        }
    })
    // console.log(instructors)
    return (
        <div className='px-6 md:px-10 my-10 mx-auto w-11/12'>
        <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Our Categories</h1>
                <div className="border-t-2 border-red-500 w-16 mx-auto my-4"></div>
                {/* <p className="text-gray-600">We learn from every student who is in our class because learning is a two-way process.</p> */}
            </div>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                instructors.slice(0, 6).map(instructor =>
    
                    <div key={instructor._id} className="card card-compact w-full glass shadow-2xl group">
                        <figure><img className='h-64 w-full object-cover' src={instructor?.image} alt={instructor.name} /></figure>
                        <div className="card-body items-center">
                            <h2 className="card-title">{instructor.name}</h2>
                            {/* <p className='font-semibold'>Email: <span className='font-normal'>{instructor.email}</span></p> */}
                        </div>
                    </div>
                )
            }
        </div>
    </div>
    
    );
};

export default PopularInstructors;


