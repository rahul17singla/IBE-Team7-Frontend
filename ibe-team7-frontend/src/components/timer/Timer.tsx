import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { setMinutes, setSeconds } from "../../redux/timerSlice";
import { useNavigate } from "react-router-dom";
import "./Timer.scss";

export const Timer = () => {
    const minutes = useSelector((state: RootState) => state.timer.minutes);
    const seconds = useSelector((state: RootState) => state.timer.seconds);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    useEffect(() => {
        const myInterval = setInterval(() => {
            if (seconds > 0) {
                dispatch(setSeconds(seconds - 1));
                //setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval);
                } else {
                    dispatch(setMinutes(minutes - 1));
                    dispatch(setSeconds(59));
                }
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    });
    if (minutes === 0 && seconds === 0) {
        dispatch(setMinutes(10));
        dispatch(setSeconds(0));
        navigate("/");
    }

    return (
        <div className="timer">
            {minutes === 0 && seconds === 0 ? null : (
                <h1>
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </h1>
            )}
        </div>
    );
};
