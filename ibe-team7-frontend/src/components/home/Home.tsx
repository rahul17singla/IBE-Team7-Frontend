import "./Home.scss";
import LanguageConversion from "../language-conversion/LanguageConversion";
import { useEffect, useState } from "react";
import axios from "axios";
import { ListProperty } from "../../types/Property";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { RoomRate } from "../../types/RoomRate";

export function Home() {
    const env = import.meta.env.VITE_REACT_APP_ENV;

    const { currency, value } = useSelector(
        (state: RootState) => state.currency
    );

    // Define a method that intentionally throws an error
    const methodThatThrowsError = () => {
        throw new Error("This is an intentional error!");
    };

    const [data, setData] = useState([]);
    const [rooms, setRooms] = useState<RoomRate[]>([]);

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8088/api/v1/rooms"
                );
                console.log(response.data);
                setRooms(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8088/api/v1/property"
                );
                console.log(response.data);
                console.log(response.data.data.listProperties);
                setData(response.data.data.listProperties);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        fetchRoomData();
    }, []);

    return (
        <div className="main">
            <div>
                <p>Welcome, {env}</p>
                <button onClick={methodThatThrowsError} className="btn">
                    Break the world
                </button>
            </div>

            <div>
                <LanguageConversion />
            </div>

            <div>{currency + " " + value}</div>
            <div style={{ fontSize: "2rem" }}>
                TEST DATA
                {data.map((property: ListProperty) => (
                    <div key={property.property_id}>
                        <p>{property.property_id}</p>
                        <p>{property.property_name}</p>
                    </div>
                ))}
            </div>
            <div style={{ fontSize: "2rem" }}>
                TEST ROOM DATA
                {rooms.map((room: RoomRate) => (
                    <div key={room.roomRateId}>
                        <p>{room.date}</p>
                        <p>{room.basicNightlyRate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
