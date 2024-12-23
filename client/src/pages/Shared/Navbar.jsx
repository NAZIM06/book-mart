import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import Tools from "./Tools";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, signOutUser, updateUserProfile } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOutUser()
      .then(() => { })
      .catch(error => {
        console.log(error.message);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserProfile({
      displayName: displayName || user.displayName,
      email: email || user.email,
      photoURL: photoURL || user.photoURL
    })
      .then(() => {
        alert("Profile updated successfully!");
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  const renderAuthButtons = () => {
    if (user) {
      return (
        <div className="flex items-center space-x-2 md:space-x-4">
          <div  onClick={() => setIsModalOpen(true)}> 
          <Tools text={`${user.displayName} ${user.email} [Click here to edit.]`} >
            {user.photoURL ? (
              <img className="rounded-full h-6 w-6" src={user.photoURL} alt="" />
            ) : (
              <HiOutlineUserCircle className="h-8 w-8" />
            )}
          </Tools></div>
          <button
            onClick={handleSignOut}
            className="bg-[#FF1949] hover:bg-[#385777] text-white font-bold py-2 px-4 rounded-md"
          >
            Log Out
          </button>
        </div>
      );
    } else {
      return (
        <Link to="/login">
          <button className="bg-[#FF1949] hover:bg-[#385777] text-white font-bold py-2 px-4 rounded-md">
            Login
          </button>
        </Link>
      );
    }
  };

  return (
    <nav className=" py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className=" text-4xl font-bold">book
              <span className="text-[#E12503]">Mart</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex font-semibold items-baseline space-x-4 text-lg">
              <NavLink to="/">
                Home
              </NavLink>
              <NavLink to="/about-us">
                About
              </NavLink>
              <NavLink to="/books">
               Books
              </NavLink>
              <NavLink to="/contact">
                Contact
              </NavLink>
              {user && <NavLink to="/dashboard" className="text-white">Dashboard</NavLink>}
              {renderAuthButtons()}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 mt-5 ml-3">
            {renderAuthButtons()}
            <NavLink
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </NavLink>
            <NavLink
              to="/about-us"
              className="block px-3 py-2 rounded-md text-base font-medium "
            >
              About
            </NavLink>
            <NavLink
              to="/books"
              className="block px-3 py-2 rounded-md text-base font-medium "
            >
              Books
            </NavLink>
            <NavLink
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium"
            >
             Contact
            </NavLink>
            {user && <NavLink to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium">Dashboard</NavLink>}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Profile Image URL</label>
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF1949] hover:bg-[#385777] text-white font-bold py-2 px-4 rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
