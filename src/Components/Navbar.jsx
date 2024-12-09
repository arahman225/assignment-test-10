import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";

const Navbar = () => {


    const { user, signOutUser } = useContext(AuthContext)
    const [dropdown, setDropdown] = useState(false);


    const links = (
        <>
            <NavLink to="/" className="flex items-center gap-1 hover:text-[#0d83fd]">

                Home
            </NavLink>
            <NavLink to="/all-reviews" className="flex items-center gap-1 hover:text-[#0d83fd]">

                All Reviews
            </NavLink>

            {
                user ? <NavLink to='/add-review' className="flex items-center gap-1 hover:text-[#0d83fd]">Add Review</NavLink> : ''
            }
            {
                user ? <NavLink to='/watch-list' className="flex items-center gap-1 hover:text-[#0d83fd]">My WatchList</NavLink> : ''
            }

            {
                user ? <NavLink to='/my-reviews' className="flex items-center gap-1 hover:text-[#0d83fd]">My Reviews</NavLink> : ''
            }

        </>
    );


    const handleLogOut = () => {
        signOutUser()
            .then(res => {
                console.log(res)
                setDropdown(false);
            }).catch(error => {
                console.log(error)
            })
    }


    return (
        <div className="w-full shadow-xl rounded-md bg-[#101A23]">
            <div className="navbar   w-4/5 mx-auto p-7">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="p-3 rounded-md bg-[#CDF7FF] text-[#101A23] lg:hidden">
                            <FaBars md:size={25} size={15}></FaBars>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content rounded-box  mt-3 w-52 p-2 shadow gap-5 text-[#CDF7FF] bg-[#101A23] z-50">
                            {links}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost  md:text-3xl text-xl font-bold font-Roboto text-[#CDF7FF]">Chill Gammer</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5  font-Roboto text-[#CDF7FF] text-base z-50">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end text-[#ffffffa6]">
                    {user ? (
                        <div className="relative">
                            <img
                                src={user.photoURL || "/default-avatar.png"}
                                alt="User"
                                className="w-10 h-10 rounded-full cursor-pointer"
                                onClick={() => setDropdown(!dropdown)}
                            />
                            {dropdown && (
                                <div className="absolute right-0 mt-2 bg-[#101A23] shadow-md rounded-lg  z-50 border w-[300px] p-8">
                                    <div className="w-500px">
                                        <div>
                                            <img
                                                className="w-10 h-10 rounded-full mx-auto"
                                                src={user.photoURL} alt="" />
                                        </div>
                                        <p className="text-[#CDF7FF] font-semibold text-center">{user.displayName || "User"}</p>
                                        <hr className="my-2" />
                                        <button
                                            onClick={handleLogOut}
                                            className="block w-full text-left px-2 md:px-4 py-2 text-red-600 hover:bg-[#e4e6f8] rounded flex items-center gap-2"
                                        >
                                            <FaSignOutAlt />
                                            Sign Out

                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/auth/login" className=" bg-[#CDF7FF] rounded-full px-4 md:px-6 py-2 text-black font-semibold font-Roboto">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;