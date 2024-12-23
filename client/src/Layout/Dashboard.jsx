import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaUniversity, FaUsers, FaUsersCog, FaWallet, } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { IoMdSchool } from 'react-icons/io';
import { MdAssignmentAdd, MdOutlineClass } from "react-icons/md";
import { BiSelectMultiple} from "react-icons/bi";
import { useAuth } from '../components/Hooks/useAuth';


const Dashboard = () => {
    const { user } = useAuth();
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/current-user?email=${user.email}`)
            .then(res => {
                if (res.data) {
                    setCurrentUser(res.data);
                  }
                
            })
    }, [user.email])

    return (
        <div className="drawer lg:drawer-open ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center">
                <Outlet />
                <label htmlFor="my-drawer-2" className="button drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side rounded-sm">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                {
                    currentUser.role === 'seller' && (
                        <ul id='active-route' className="menu p-4 w-80 h-full bg-[#263B5E] text-white">
                            {/* Sidebar content here */}
                            <li><NavLink className="font-bold text-base flex items-center"  to='/dashboard/add-book'><MdAssignmentAdd className='mr-2' />Add Book</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/my-books'><MdOutlineClass className='w-5 h-5 mr-3' />My Books</NavLink></li>
                            <div className='w-full px-3 border my-10'></div>
                            <li><NavLink className='font-bold text-base flex items-center' to='/'><FaHome className='w-5 h-5 mr-3' />Home</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/about'><GiTeacher className='mr-3' />About Us</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/Books'><IoMdSchool className='w-5 h-5 mr-2' />Books</NavLink></li>
                        </ul>
                    )
                }
                {
                    currentUser.role === 'admin' && (
                        <ul className="menu p-4 w-80 h-full bg-[#263B5E] text-white">
                            {/* Sidebar content here */}
                            <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/manage-books'><FaUsersCog className='w-5 h-5 mr-3' />Manage Books</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/manage-users'><FaUsers className='w-5 h-5 mr-3' /> Manage Users</NavLink></li>
                            <div className='w-full px-3 border my-10'></div>
                            <li><NavLink className='font-bold text-base flex items-center' to='/'><FaHome className='w-5 h-5 mr-3' />Home</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/about'><GiTeacher className='mr-3' />About Us</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/books'><IoMdSchool className='w-5 h-5 mr-2' />Books</NavLink></li>
                        </ul>
                    )
                }
                {
                    currentUser.role === 'buyer' && (
                        <ul className="menu p-4 w-80 h-full bg-[#263B5E] text-white">
                            {/* Sidebar content here */}
                            <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/my-selected-books'><BiSelectMultiple className='mr-3' />Selected Books</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/my-purched-books'><FaUniversity className='w-5 h-5 mr-3' />Purched Books</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/payment-history'><FaWallet className='w-5 h-5 mr-3' />Payment History</NavLink></li>
                            <div className='w-full px-3 border my-10'></div>
                            <li><NavLink className='font-bold text-base flex items-center' to='/'><FaHome className='w-5 h-5 mr-3' />Home</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/about'><GiTeacher className='mr-3' />About Us</NavLink></li>
                            <li><NavLink className='font-bold text-base flex items-center' to='/Books'><IoMdSchool className='w-5 h-5 mr-2' />Books</NavLink></li>
                        </ul>
                    )
                }
            </div>
        </div>
    );
};

export default Dashboard;