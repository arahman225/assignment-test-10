import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../AuthProvider';
import googleImg from '../assets/images/google.png'
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebaseInit';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';


const Register = () => {

    const { createUser, signInWithGoogle } = useContext(AuthContext)
    const [success, setSuccess] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const handleRegister = e => {
        e.preventDefault();
        console.log('clicked')

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photoUrl.value;

        console.log(email, password, name, photo)

        if (password.length < 6) {
            return Swal.fire({
                title: 'Error!',
                text: 'Passwords must be 6 characters or longer',
                icon: 'error',
                confirmButtonText: 'Ok'
                
            })
        }
        // if (password !== confirmPassword) {
        //     return setErrorMessage('Passwords do not match');
        // }
        if (!/[a-z]/.test(password)) {
            return Swal.fire({
                title: 'Error!',
                text: 'Passwords must contain at least one lowercase letter',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        if (!/[A-Z]/.test(password)) {
            return Swal.fire({
                title: 'Error!',
                text: 'Passwords must contain at least one uppercase letter',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }


        // Create user
        createUser(email, password)
            .then((res) => {
                console.log(res);
                const profile = {
                    displayName: name,
                    photoURL: photo,
                };

                // Update user profile
                return updateProfile(auth.currentUser, profile);
            })
            .then(() => {
                setSuccess(true);
                Swal.fire({
                    title: "Good job!",
                    text: "Welcome back! You are successfully registered!",
                    icon: "success",
                    background: "#CDF7FF",
                    color: "#111",
                    width: '450px',
                });
                navigate('/');
                form.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                setSuccess(false);
                setErrorMessage('Registration failed. Please try again.');
                Swal.fire({
                    title: 'Error!',
                    text: 'This email is already in use. Please provide a different email address.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            });
    }

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then((res) => {
                console.log("Google sign-in successful:", res.user);
                Swal.fire({
                    title: "Good job!",
                    text: "Welcome back! You are successfully registered.!",
                    icon: "success"
                });
                navigate('/')
            })
            .catch((error) => {
                console.error("Google sign-in error:", error);
                Swal.fire({
                    title: "Good job!",
                    text: "Welcome back! You are successfully registered.!",
                    icon: "success"
                });
            });
    };


    return (
        <div style={{ minHeight: 'calc(100vh - 200px)' }} className=' flex items-center'>
            <div className="max-w-lg mx-auto bg-[#060D15]  rounded-lg shadow-xl px-8 py-10 flex flex-col items-center justify-center w-full relative border">
                <h1 className="text-xl font-bold text-center  dark:text-gray-200 mb-8 text-[#CDF7FF]">Register</h1>
                <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="firstName" className="text-sm text-[#CDF7FF]  mr-2">Name:</label>
                        <input
                            type="text"
                            placeholder='name'
                            id="name"
                            name="name"
                            required
                            className="w-full px-3 text-[#CDF7FF] bg-[#101A23] py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            data-tooltip-id="name-tooltip"
                            data-tooltip-content="Enter your name"
                        />
                        <Tooltip id="name-tooltip" />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="email" className="text-sm text-[#CDF7FF] dark:text-gray-200 mr-2">Email:</label>
                        <input
                            type="email"
                            placeholder='email'
                            id="email"
                            name="email"
                            required
                            className="w-full px-3 text-[#CDF7FF] bg-[#101A23] py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-[#101A23]"
                            data-tooltip-id="email-tooltip"
                            data-tooltip-content="Enter your registered email address"
                        />
                        <Tooltip id="email-tooltip" />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="firstName" className="text-sm text-[#CDF7FF] dark:text-gray-200 mr-2">Photo Url:</label>
                        <input
                            type="text"
                            placeholder='Photo url'
                            id="firstName"
                            name="photoUrl"
                            className="w-full px-3 text-[#CDF7FF] bg-[#101A23] py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            data-tooltip-id="email-tooltip"
                            data-tooltip-content="Enter your photo url"
                        />
                        <Tooltip id="photo-tooltip" />
                    </div>


                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="password" className="text-sm text-[#CDF7FF] dark:text-gray-200 mr-2">Password:</label>
                        <input
                            type={showPassword?"text":"password"}
                            placeholder='password'
                            id="password"
                            name="password"
                            required
                            className="w-full px-3 text-[#CDF7FF]  py-2 rounded-md bg-[#101A23] border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            data-tooltip-id="email-tooltip"
                            data-tooltip-content="Enter your password"
                        />
                        <Tooltip id="password-tooltip" />
                    </div>

                    <button type="submit" className="bg-[#CDF7FF] text-[#060D15] hover:bg-[#b4eefa] transition ease-in duration-200 font-medium py-2 px-4 rounded-md shadow-sm">
                        Register
                    </button>
                </form>

                <div onClick={() => setShowPassword(!showPassword)} className='absolute bottom-[250px] right-10 cursor-pointer text-[#b4eefa]'>
                    {showPassword ? "Hide" : "Show"}
                </div>

                <div className="mt-4 text-center ">
                    <p className='text-[#CDF7FF]'>Already have an account? <Link to='/auth/login' className="text-[#9be9f8] cursor-pointer">Login now</Link></p>

                </div>
                <div className="divider text-[#9be9f8]">OR</div>
                <div onClick={handleSignInWithGoogle}
                    data-tooltip-id="google-tooltip"
                    data-tooltip-content="Sign in with your Google account"
                    className="flex gap-2 cursor-pointer border px-5 py-3 rounded-md text-white hover:bg-[#CDF7FF] hover:text-black transition duration-200">
                    <img className="w-7 h-7" src={googleImg} alt="" />
                    <h1 className="">Login With Google</h1>
                </div>
                <Tooltip id="google-tooltip" />
            </div>
        </div>
    );
};

export default Register;