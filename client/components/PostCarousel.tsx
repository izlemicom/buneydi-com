import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function PostCarousel() {
  return (
    <Carousel
      autoPlay={true}
      showThumbs={false}
      interval={3000}
      infiniteLoop={true}
      showArrows={false}
      showIndicators={false}
      showStatus={false}
    >
      <div className="flex"></div>
      <div className="flex"></div>
      <div className="flex"></div>
    </Carousel>
  );
}

export default PostCarousel;
