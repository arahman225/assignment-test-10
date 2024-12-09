import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import googleImg from '../assets/images/google.png';
import { AuthContext } from '../AuthProvider';
import Swal from 'sweetalert2';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Login = () => {
    const { signInWithGoogle, loginUser, setUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location)
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    title: "Good job!",
                    text: "Welcome back! You are successfully registered!",
                    icon: "success",
                    background: "#CDF7FF",
                    color: "#111",
                    width: '450px',
                });
                const user = res.user;
                console.log(user)
                setUser(user);
                navigate(location?.state ? location.state: '/')
                const from = location.state?.from?.pathname || "/"
                navigate(from, {replace: true})
                // const from = location.state?.from?.pathname || "/";
                
                // navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Login failed. Please check your email or password!",
                    background: "#CDF7FF",
                    color: "#111",
                    width: '450px',
                  });
            });
    };

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then((res) => {
                Swal.fire({
                    title: "Good job!",
                    text: "Welcome back! You are successfully registered!",
                    icon: "success",
                    background: "#CDF7FF",
                    color: "#111",
                    width: '450px',
                });
                const user = res.user;
                setUser(user)
                
                const from = location.state?.from?.pathname || "/";
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    text: "Google sign-in failed. Please try again!",
                    icon: "error",
                    background: "#CDF7FF",
                    color: "#111",
                    width: '450px',
                });
            });
    };

    return (
        <div style={{ minHeight: 'calc(100vh - 200px)' }} className="flex items-center">
            <div className="max-w-lg mx-auto bg-[#060D15] text-[#CDF7FF] dark:bg-gray-800 rounded-lg shadow-xl px-8 py-10 flex flex-col items-center justify-center w-full relative border">
                <h1 className="text-xl font-bold text-center mb-8">Login</h1>
               
                <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
                    {/* Email Input */}
                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="email" className="text-sm mr-2">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-3 text-[#CDF7FF] bg-[#101A23] py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            data-tooltip-id="email-tooltip"
                            data-tooltip-content="Enter your registered email address"
                        />
                        <Tooltip id="email-tooltip" />
                    </div>

                    {/* Password Input */}
                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="password" className="text-sm mr-2">Password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            id="password"
                            name="password"
                            required
                            className="w-full px-3 dark:text-gray-200 bg-[#101A23] py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            data-tooltip-id="password-tooltip"
                            data-tooltip-content="Password must be at least 8 characters long"
                        />
                        <Tooltip id="password-tooltip" />
                    </div>

                    <button type="submit" className="bg-[#CDF7FF] text-[#060D15] hover:bg-[#abeefc] font-medium py-2 px-4 rounded-md shadow-sm">
                        Login
                    </button>
                </form>

                <div onClick={() =>setShowPassword(!showPassword)} className='absolute top-52 right-9 cursor-pointer'>
                {showPassword? "Hide":"Show"}
                </div>
                <div className="mt-4 text-center">
                    <p>Don't have an account? <Link to="/auth/register" className="text-red-500 cursor-pointer hover:text-red-700">Register Now</Link></p>
                </div>
                <div className="divider">OR</div>
                {/* Google Login Button */}
                <div
                    onClick={handleSignInWithGoogle}
                    className="flex gap-2 cursor-pointer border px-5 py-3 rounded-md text-white hover:bg-[#CDF7FF] hover:text-black transition duration-200"
                    data-tooltip-id="google-tooltip"
                    data-tooltip-content="Sign in with your Google account"
                >
                    <img className="w-7 h-7" src={googleImg} alt="Google Logo" />
                    <h1 className="">Login With Google</h1>
                </div>
                <Tooltip id="google-tooltip" />
            </div>
        </div>
    );
};

export default Login;
