import { ProgressBar } from "react-loader-spinner";

export const Loader = () => {
    return (
        <ProgressBar
            visible={true}
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            barColor="#26266d"
        />
    );
};
