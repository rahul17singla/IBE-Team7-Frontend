import Carousel from "react-material-ui-carousel";

export const CarouselComponent = () => {
    return (
        <div className="carousel-container">
            <Carousel animation="slide" className="carousel">
                <img src="https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60" />
                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250" />
                <img src="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60" />
            </Carousel>
        </div>
    );
};
