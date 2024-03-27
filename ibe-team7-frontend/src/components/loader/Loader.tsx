import { Oval } from "react-loader-spinner";

export const Loader = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Oval
                visible={true}
                height="50"
                width="50"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                color="#26266d"
            />
        </div>
    );
};
