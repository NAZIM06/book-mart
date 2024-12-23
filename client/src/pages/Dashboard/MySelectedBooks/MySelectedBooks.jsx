import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../components/Hooks/useAuth';


const MySelectedBooks = () => {
    const { user, loading } = useAuth()
    const { data: selectedBooks = [], refetch } = useQuery({
        queryKey: ['selected-books'],
        enabled: !loading,
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/selected-books?email=${user?.email}`)
            return response.data
        }
    })
  
    const handleDelete = (id) => {
        axios.delete(`${import.meta.env.VITE_BASE_URL}/selected-books/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        icon: 'success',
                        text: 'Book deleted successfully',
                    })
                }
                console.log(res.data)
            })
    }
    return (
        <>
            <div className='w-11/12 pb-10 px-5 bg-base-300 shadow-2xl my-10'>
                <p className='text-3xl font-bold my-5 text-center'>Selected Books : {selectedBooks.length}</p>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-red-600 text-white'>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Seller Name</th>
                                <th>Available Quants</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedBooks.map((books, index) =>
                                <tr key={books._id} className='hover'>
                                    <th>{index + 1}</th>
                                    <td><img className='w-20' src={books?.singleBooks?.image} alt="" /></td>
                                    <td>{books?.singleBook?.bookName}</td>
                                    <td>{books?.singleBook.sellerName}</td>
                                    <td>{books?.singleBook?.seats}</td>
                                    <td>{books?.singleBook?.price}</td>
                                    <td className='flex justify-between'><button onClick={() => handleDelete(books?._id)} className='inline-flex items-center h-12 px-6 my-3 font-medium text-white bg-red-500 hover:bg-red-600'>Delete</button><Link to={`/dashboard/payment/${books?._id}`}><button className='button'>pay</button></Link></td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MySelectedBooks;