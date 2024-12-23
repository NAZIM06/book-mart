import { useAuth } from '../../../components/Hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddBook = () => {
    const { user } = useAuth()

    const handleSubmit = async event => {
        event.preventDefault()
        const form = event.target;
        const bookName = form.bookName.value;
        const bookImage = form.bookImage.files[0];
        const seats = parseInt(form.availableSeats.value);
        const price = parseFloat(form.price.value)

        const bookPhoto = new FormData()
        bookPhoto.append('image', bookImage)

        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_KEY}`, {
            method: 'POST',
            body: bookPhoto
        })
            .then(res => res.json())
            .then(data => {
                const image = data.data.display_url;
                const books = { bookName, image: image, sellerEmail: user?.email, sellerName: user?.displayName, seats, price, status: 'Pending', purchedSellers: 0, date: new Date() }

                axios.post(`${import.meta.env.VITE_BASE_URL}/all-books`, books)
                    .then(res => {
                        if (res.data.acknowledged) {
                            Swal.fire({
                                icon: 'success',
                                text: 'Book added successfully',
                            })
                        }
                    })
            })
    }
    return (
        <form onSubmit={handleSubmit} className='w-4/6 bg-base-300 shadow-2xl p-10 my-10'>
            <p className='text-3xl font-bold text-center my-5'>Add Book</p>
            <div className='flex justify-between w-full space-x-5'>
                <div className="form-control w-full">
                    <label htmlFor="" className='font-semibold mb-2'>Book name</label>
                    <input type="text" name="bookName" placeholder='Book Name' className='input input-bordered focus:outline-none' />
                </div>
                <div className="form-control w-full">
                    <label htmlFor="" className='font-semibold mb-2'>Book Image</label>
                    <input type="file" name='bookImage' className="file-input file-input-bordered w-full" />
                </div>
            </div>
            <div className='flex justify-between w-full space-x-5 mt-5'>
                <div className="form-control w-full">
                    <label htmlFor="" className='font-semibold mb-2'>Seller name</label>
                    <input type="text" name="instructorName" defaultValue={user?.displayName} placeholder='Seller Name' className='input input-bordered focus:outline-none' />
                </div>
                <div className="form-control w-full">
                    <label htmlFor="" className='font-semibold mb-2'>Seller Email</label>
                    <input type="text" name="instructorEmail" defaultValue={user?.email} placeholder='Seller email' className='input input-bordered focus:outline-none' />
                </div>
            </div>
            <div className='flex justify-between w-full space-x-5 mt-5'>
                <div className="form-control w-full">
                    <label htmlFor="" className='font-semibold mb-2'>Available Quants</label>
                    <input type="text" name="availableSeats" placeholder='Available Seats' className='input input-bordered focus:outline-none' />
                </div>
                <div className="form-control w-full">
                    <label htmlFor="" className='font-semibold mb-2'>Price</label>
                    <input type="text" name="price" placeholder='price' className='input input-bordered focus:outline-none' />
                </div>
            </div>
            <button type='submit' className='button mx-auto flex justify-center w-full'>Add Book</button>
        </form>
    );
};

export default AddBook;