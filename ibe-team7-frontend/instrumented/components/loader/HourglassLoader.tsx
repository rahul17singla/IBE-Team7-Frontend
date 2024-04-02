import { Hourglass } from "react-loader-spinner";

export const HourglassLoader = () => {
    return (
        <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#26266d", "#72a1ed"]}
        />
    );
};
