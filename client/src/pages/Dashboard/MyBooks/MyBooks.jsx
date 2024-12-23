import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaPencilAlt } from 'react-icons/fa';
import { useAuth } from '../../../components/Hooks/useAuth';
import { Helmet } from 'react-helmet';

const MyBooks = () => {
    const { user } = useAuth()
    const { data: allBooks = [] } = useQuery({
        queryKey: ['my-books'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-books/${user?.email}`)
            return response.data
        }
    })

    return (
        <>
        <Helmet>
                <title>BookMart || My Books</title>
            </Helmet>
        <div className='w-11/12 py-10 px-5 bg-base-300 shadow-2xl my-10'>
            <p className='text-3xl font-bold my-5 text-center'>My Books : {allBooks.length}</p>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-red-600 text-white'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Book Name</th>
                            <th>Price</th>
                            <th>Quants</th>
                            <th>Total Enrolled Students</th>
                            <th>Feedback</th>
                            <th>Status</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBooks.map((books, index) =>
                            <tr key={books._id} className='hover'>
                                <th>{index + 1}</th>
                                <td><img className='w-20' src={books.image} alt="" /></td>
                                <td>{books.BookName}</td>
                                <td>{books.price}</td>
                                <td>{books.seats}</td>
                                <td>{books.purchedSellers}</td>
                                <td>{books.status === 'Denied' ? books.feedback : 'No feedback'}</td>
                                {
                                    books.status === 'Pending' && <td><div className='text-sm p-3 rounded-full flex justify-center items-center border-2 border-yellow-600 font-semibold'>{books.status}</div></td>
                                }
                                {
                                    books.status === 'Approved' && <td><div className='text-sm p-3 rounded-full flex justify-center items-center border-2 border-green-700 font-semibold'>{books.status}</div></td>
                                }
                                {
                                   books.status === 'Denied' && <td><div className='text-sm p-3 rounded-full flex justify-center items-center border-2 border-red-800 font-semibold'>{books.status}</div></td>
                                }
                                <td><div className='button cursor-pointer'><FaPencilAlt className='w-5 h-5' /></div></td>
                            </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default MyBooks;