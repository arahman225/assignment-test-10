import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import { Fade, Zoom } from "react-awesome-reveal";


const Slider = () => {
  // Array with image URLs and text for each slide
  const slides = [
    {
      img: "https://i.ibb.co/NWfT592/brain.jpg",
      title: "Braining",
      description: "The Game!",

    },
    {
      img: "https://i.ibb.co/thmVMyf/car-racing.jpg",
      title: "Car Racing",
      description: "The Game!",

    },
    {
      img: "https://i.ibb.co.com/WFSk3nx/dragon.jpg",
      title: "The Best",
      description: "Dragon Game!",

    },
  ];

  return (
    <Swiper
      className="z-0"
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      effect="fade"
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          {/* Background Image */}
          <div
            className="w-full h-[500px] md:h-[100vh]  bg-cover bg-center rounded-lg transition-transform duration-700 transform hover:scale-105"
            style={{ backgroundImage: `url(${slide.img})` }}
          ></div>

          {/* Overlay with Animated Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#000] bg-opacity-65 rounded-lg">
            {/* Fade Animation for Title */}
            <Fade triggerOnce>
              <h2 className="md:text-9xl text-6xl font-bold font-Roboto text-[#CDF7FF] uppercase text-center">
                {slide.title}
              </h2>

            </Fade>

            {/* Zoom Animation for Description */}
            <Zoom triggerOnce>
              <p className="md:text-9xl text-6xl font-bold font-Roboto text-[#CDF7FF] uppercase text-center"style={{
                WebkitTextStroke: '1px #CDF7FF', 
                WebkitTextFillColor: 'transparent', 
              }} >{slide.description}</p>
            </Zoom>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;






