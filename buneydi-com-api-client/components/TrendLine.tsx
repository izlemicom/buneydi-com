import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
import Link from "next/link";

function TrendLine({ posts }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  function azalt() {
    if (currentSlide === 0) setCurrentSlide(posts.length - 1);
    else setCurrentSlide(currentSlide - 1);
  }
  function artir() {
    if (currentSlide === posts.length - 1) setCurrentSlide(0);
    else setCurrentSlide(currentSlide + 1);
  }
  return (
    <div className="relative flex py-2 my-1 items-center justify-between rounded-lg">
      <div className="flex space-x-2 mx-2">
        <span className="flex font-bold px-3 py-1 text-red-100 bg-red-700 rounded-lg whitespace-nowrap">
          En Son İçerikler:
        </span>
        <Carousel
          autoPlay={true}
          showThumbs={false}
          interval={3000}
          infiniteLoop={true}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          selectedItem={currentSlide}
          dynamicHeight={false}
        >
          {posts.map((post) => (
            <div key={post.id}>
              <Link href={`/icerik/${post.slug}`}>
                <a
                  href="/"
                  className="flex flex-row py-1 text-gray-700 font-medium hover:underline hover:text-indigo-500 truncate"
                >
                  {post.title}
                </a>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="flex absolute right-0 z-10 space-x-2 mx-2">
        <label
          onClick={azalt}
          className=" text-red-700 cursor-pointer bg-gray-200 rounded-full active:translate-y-0.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <label
          onClick={artir}
          className=" text-red-700 cursor-pointer bg-gray-200 rounded-full active:translate-y-0.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
    </div>
  );
}

export default TrendLine;
