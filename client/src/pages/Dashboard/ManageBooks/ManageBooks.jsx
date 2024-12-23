import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

const ManageBooks = () => {
    const [modal, setModal] = useState(false)
    const [selectedBookId, setSelectedBookId] = useState(null);

    const { data: allBooks = [], refetch } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-books`);
            return response.data;
        },
    });

    const handleUpdate = (id, status) => {
        fetch(`${import.meta.env.VITE_BASE_URL}/all-books/${id}?status=${status}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                console.log(data)
            })
    }
    const handleModal = (id) => {
        setSelectedBookId(id)
        setModal(true)

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const feedback = event.target.feedback.value;
        const id = selectedBookId; // Access the selected book ID
        axios.put(`${import.meta.env.VITE_BASE_URL}/all-books/${id}?feedback=${feedback}`)
            .then((res) => {
                console.log(res.data);
            });
        setModal(false);
    };

    return (
        <>
            {
                modal && <dialog className="modal modal-bottom sm:modal-middle" open>
                    <form onSubmit={handleSubmit} method="dialog" className="modal-box">
                        <h3 className="font-bold text-lg">Feedback</h3>
                        <div className="form-control mt-3">
                            <textarea placeholder="Feedback" name='feedback' className="textarea textarea-bordered textarea-md w-full focus:outline-none" ></textarea>
                        </div>
                        <div className="modal-action">
                            <button type='submit' className="btn">
                                submit
                            </button>
                        </div>
                    </form>
                </dialog>
            }
            <div className='w-11/12 py-10 px-5 bg-base-300 shadow-2xl my-10'>
                <p className='text-3xl font-bold my-5 text-center'>All Books: {allBooks.length}</p>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-red-600 text-white'>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Book Name</th>
                                <th>Seller Name</th>
                                <th>Seller email</th>
                                <th>Price</th>
                                <th>Quants</th>
                                <th>Feedback</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allBooks.map((books, index) =>
                                <tr key={books._id} className='hover'>
                                    <th>{index + 1}</th>
                                    <td><img className='w-20' src={books.image} alt="" /></td>
                                    <td>{books.bookName}</td>
                                    <td>{books.sellerName}</td>
                                    <td>{books.sellerEmail}</td>
                                    <td>{books.price}</td>
                                    <td>{books.seats}</td>
                                    <td><button onClick={() => handleModal(books._id)} className='button'>Feedback</button></td>
                                    {
                                        books.status === 'Pending' && <td><div className='text-sm p-3 rounded-full flex justify-center items-center border-2 border-yellow-600 font-semibold'>{books.status}</div></td>
                                    }
                                    {
                                        books.status === 'Approved' && <td><div className='text-sm p-3 rounded-full flex justify-center items-center border-2 border-green-700 font-semibold'>{books.status}</div></td>
                                    }
                                    {
                                        books.status === 'Denied' && <td><div className='text-sm p-3 rounded-full flex justify-center items-center border-2 border-red-800 font-semibold'>{books.status}</div></td>
                                    }
                                    <td><div className='flex justify-between'><button disabled={books.status === 'Approved' || books.status == 'Denied'} onClick={() => handleUpdate(books._id, 'approved')} className='button'>Approve</button><button disabled={books.status === 'Approved' || books.status == 'Denied'} onClick={() => handleUpdate(books._id, 'denied')} className='button ml-2'>Denied</button></div></td>
                                </tr>)}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageBooks;