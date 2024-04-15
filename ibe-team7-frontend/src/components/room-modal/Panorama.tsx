import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import image from "../../assets/panorama.avif";
import image2 from "../../assets/panorama2.jpg";
import image3 from "../../assets/panorama3.jpg";
import image4 from "../../assets/panorama4.jpg";

export const Panorama = () => {
    const imageArray = [image, image2, image3, image4];

    return (
        <div className="App">
            <ReactPhotoSphereViewer
                src={imageArray[Math.floor(Math.random() * imageArray.length)]}
                height={"100vh"}
                width={"100%"}
            ></ReactPhotoSphereViewer>
        </div>
    );
};
