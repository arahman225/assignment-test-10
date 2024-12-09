import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { FaStar } from "react-icons/fa";
const Watchlist = () => {

    const { user } = useContext(AuthContext)
    const loadedUserWatchlist = useLoaderData()

    // const loadedUserWatchlist = user ? watchlists.filter(watchlist => watchlist.reviewerEmail === user.email) : []

    const [userWatchlist, setWatchlist] = useState(loadedUserWatchlist)
    const [loadingTimer, setLoadingTimer] = useState(true)

    useEffect(() => {
      const loadingTimer = setTimeout(() => setLoadingTimer(false), 1000);
      return () => clearTimeout(loadingTimer); // Cleanup timer
    }, []);
    
    useEffect(() => {
        document.title = "My watchlist | Chill Gammer";
      }, []);

    console.log(userWatchlist)


    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            color: "#111",
            width: '450px',
            background: "#CDF7FF"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://assignment-test-10-server.vercel.app/watchlists/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {

                            Swal.fire({
                                title: "Good job!",
                                text: "You deleted the review!",
                                icon: "success",
                                color: "#111",
                                width: '450px',
                                background: "#CDF7FF"
                            });

                        }

                        const remainingWatchlist = userWatchlist.filter(watchlist => watchlist._id !== id)
                        setWatchlist(remainingWatchlist)
                    })

            }
        });

    }


    if (loadingTimer) {
        return (
          <div className="flex justify-center items-center h-screen bg-black">
            <span className="loading loading-bars loading-lg text-[#CDF7FF]"></span>
          </div>
        );
      }



    return (

        <div className='bg-[#102638]'>
            <div className="w-4/5 mx-auto py-16">
                <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black py-8 text-center mb-5">
                    <h1
                        className="md:text-5xl text-3xl font-bold uppercase tracking-wide text-transparent bg-clip-text"
                        style={{
                            WebkitTextStroke: '1px #CDF7FF', // Outline color
                            WebkitTextFillColor: 'transparent', // Transparent fill
                        }}
                    >
                        MY WATCH LIST
                    </h1>
                </div>
                {userWatchlist.length > 0 ? (
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-[#060D15] text-[#CDF7FF]">
                                <th className="border border-gray-300 px-4 py-2">Game Title</th>
                                <th className="border border-gray-300 px-4 py-2">Rating</th>
                                <th className="border border-gray-300 px-4 py-2">Publishing Year</th>
                                <th className="border border-gray-300 px-4 py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody>



                            {userWatchlist.map((watchlist) => (
                                <tr key={watchlist._id} className="text-center hover:bg-[#060D15] text-[#CDF7FF] hover:text-[#CDF7FF]">
                                    <td className="border border-gray-300 px-4 py-2">{watchlist.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <span className="ml-2 text-yellow-500 flex justify-center">
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <FaStar key={index} className={index < Math.floor(watchlist.reviewerRating) ? 'text-yellow-500' : 'text-gray-300'} />
                                            ))}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{watchlist.publishingYear}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            className="py-1 px-4 text-3xl bg-[#1a4270ad] rounded-md"
                                            onClick={() => handleDelete(watchlist._id)}
                                        >
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className='py-24'>
                        <p className="text-red-400">No watchlist available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Watchlist;