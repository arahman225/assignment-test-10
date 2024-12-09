import { useContext, useEffect, useState } from "react";
import { Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

const Details = () => {
    const { user } = useContext(AuthContext)
    const review = useLoaderData();
    const navigate = useNavigate()
    const location = useLocation();
    console.log(location)
    // console.log(review)

    const [loadingTimer, setLoadingTimer] = useState(true)


    useEffect(() => {
        document.title = "Details | chill Gammer";
      }, []);

    useEffect(() => {
      const loadingTimer = setTimeout(() => setLoadingTimer(false), 1000);
      return () => clearTimeout(loadingTimer); // Cleanup timer
    }, []);
    

    
    if (loadingTimer) {
        return (
          <div className="flex justify-center items-center h-screen bg-black">
            <span className="loading loading-bars loading-lg text-[#CDF7FF]"></span>
          </div>
        );
      }

      const handleWatchList = () => {
        if (user) {
            const detailInfo = {
                coverPhoto: review?.photoUrl,
                title: review?.gameTitle,
                reviewer: review?.name,
                reviewerEmail: review?.email,
                reviewerRating: review?.rating,
                genre: review?.genre,
                publishingYear: review?.publishingYear,
                reviewerDescription: review?.reviewDescription,
            };
    
            fetch('https://assignment-test-10-server.vercel.app/watchlists', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(detailInfo)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            title: "Good job!",
                            text: "You added the review!",
                            icon: "success",
                            background: "#CDF7FF",
                            color: "#111",
                            width: '450px',
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error adding to watchlist:", error);
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please register or login!",
                background: "#CDF7FF",
                color: "#111",
                width: '450px',
            });
    
            // Navigate to login page with redirect back to this page
            // navigate('/auth/login', { state: { from: location } });
            navigate('/auth/login', {state: {from: location}})
            
            
        }
    };
    return (
        <div className="bg-black text-[#CDF7FF] py-20">
            <div className="p-6 w-4/5 mx-auto">
                <div className="grid lg:grid-cols-2 gap-10">
                    <div>
                        <img
                            src={review.photoUrl}
                            alt={review.gameTitle}
                            className="w-full  object-cover rounded-lg"
                        />
                    </div>
                    <div>
                        <div className="space-y-6">
                            <h1 className="text-4xl font-bold mt-4">{review.gameTitle}</h1>
                            <p className="mt-2 text-gray-700">{review.reviewDescription}</p>
                            <span className="ml-2 text-yellow-500 flex">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <FaStar key={index} className={index < Math.floor(review.rating) ? 'text-yellow-500' : 'text-gray-300'} />
                                ))}
                            </span>
                        </div>
                        <div className="border my-10"></div>
                        <div className="space-y-3">
                            <p className="mt-2">Genre: {review.genre}</p>
                            <p className="mt-2">Reviewer: {review.name}</p>
                            <p className="mt-2">Publishin Year: {review.publishingYear}</p>
                            <p className="mt-2 text-gray-500">Email: {review.email}</p>
                        </div>
                        <button
                            onClick={handleWatchList}
                            className="mt-4 px-4 py-2 bg-[#CDF7FF] text-black rounded-lg hover:bg-[#9ad5e0]"
                        >
                            Add to WatchList
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;