import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { BACKEND_URL } from "../../../constants/Constants";

export const CarouselComponent = ({ name }: any) => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await axios.get(
                // "http://localhost:8088/config"
                BACKEND_URL + "/config"
                // "https://swhytqcdde.execute-api.ap-northeast-1.amazonaws.com/team7/config"
                // "http://team7ibe.ap-northeast-1.elasticbeanstalk.com/config"
            );

            setImages(response.data.propertyConfig.first[name]);
        };
        fetchImages();
    }, []);

    return (
        <div className="carousel-container">
            <Carousel animation="slide" className="carousel">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt="room"
                        className="carousel-image"
                        width={"320px"}
                    />
                ))}
            </Carousel>
        </div>
    );
};
