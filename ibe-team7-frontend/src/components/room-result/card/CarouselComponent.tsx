import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { BACKEND_URL } from "../../../constants/Constants";

export const CarouselComponent = ({ name }: any) => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await axios.get(BACKEND_URL + "/config");

            setImages(response.data.propertyConfig.first[name]);
        };
        fetchImages();
    }, []);

    return (
        <div className="carousel-container" style={{ minHeight: "235px" }}>
            {
                <Carousel animation="slide" className="carousel">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt="room"
                            className="carousel-image"
                            width={"320px"}
                            height={"200px"}
                        />
                    ))}
                </Carousel>
            }
        </div>
    );
};
