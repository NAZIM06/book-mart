import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../../../components/Hooks/useAuth';


const MyPurchedBooks = () => {
    const { user } = useAuth()
    const { data: purchedBooks = [], refetch } = useQuery({
        queryKey: ['selected-books'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/enrolled-books/${user?.email}`)
            return response.data
        }
    })
    return (
        <>
            <div className='w-11/12 py-10 px-5 bg-base-300 shadow-2xl my-10'>
                <p className='text-3xl font-bold my-5 text-center'>Enrolled Books : {enrolledBooks.length}</p>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-red-600 text-white'>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Book Name</th>
                                <th>Seller Name</th>
                                <th>Seller Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchedBooks.map((books, index) =>
                                <tr key={books._id} className='hover'>
                                    <th>{index + 1}</th>
                                    <td><img className='w-20' src={books?.singleBooks?.image} alt="" /></td>
                                    <td>{books?.singleBook?.bookName}</td>
                                    <td>{books?.singleBook?.sellerName}</td>
                                    <td>{books?.singleBook?.sellerEmail}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MyPurchedBooks;