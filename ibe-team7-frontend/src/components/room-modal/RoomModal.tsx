import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useState } from "react";
import "./RoomModal.scss";
import { BACKEND_URL } from "../../constants/Constants";
import { RoomDetails } from "../../types/RoomDetails";
import Carousel from "react-material-ui-carousel";
import User from "../../assets/user.svg";
import Doublebed from "../../assets/doublebed.svg";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { setTotal } from "../../redux/checkoutSlice";
import { findnextDate } from "../../utils/FindNextDateFunc";

export interface RoomModalProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    room: RoomDetails;
}

const amenitiesList = [
    "Wireless Internet Access",
    "In Room Safe",
    "Cable & Pay TV Channels",
    "Iron and Ironing Board",
    "Alarm Clock",
    "Writing Desk and Chair",
    "Hair Dryer",
];

export function RoomModal({ setOpen, room }: RoomModalProps) {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const [images, setImages] = useState<string[]>([]);

    const [promoCode, setPromoCode] = useState("");

    const {
        property,
        property3,
        startDate,
        endDate,
        guestsAdult,
        guestsTeens,
        guestsChildren,
    } = useSelector((state: RootState) => state.filterStates);

    const sort = useSelector((state: RootState) => state.results.sort);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await axios.get(BACKEND_URL + "/config");
            setImages(response.data[0].propertyConfig.first[room.roomTypeName]);
        };
        fetchImages();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectPackage = (promoName: string) => {
        console.log(promoName);

        dispatch(setTotal(room.avgPrice));

        const checkoutUrl = `/checkout?property=${property}&room=${property3}&startDate=${startDate?.toLocaleDateString(
            "en-GB"
        )}&endDate=${endDate?.toLocaleDateString(
            "en-GB"
        )}&adults=${guestsAdult}&teens=${guestsTeens}&kids=${guestsChildren}&sort=${sort}`;
        navigate(checkoutUrl);
    };

    const validatePromoCode = async () => {
        try {
            const response = await axios.get<boolean>(
                `http://localhost:8080/validatepromo`,
                {
                    params: {
                        promoCode: promoCode,
                        roomCount: property3,
                        startDate: findnextDate(startDate),
                        endDate: findnextDate(endDate),
                    },
                }
            );
            setIsValid(response.data);
        } catch (error) {
            console.error("Error validating promo code:", error);
        }
    };

    return (
        <Box className="room-modal">
            <div className="image-carousel">
                <div
                    className="carousel-container"
                    style={{ minHeight: "235px", width: "100%" }}
                >
                    {
                        <>
                            <Carousel animation="slide" className="carousel">
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt="room"
                                        className="carousel-image"
                                        width={"100%"}
                                        height={"500px"}
                                    />
                                ))}
                            </Carousel>
                            <p className="para-carousel">
                                {room.roomTypeName} ROOM
                            </p>
                        </>
                    }
                </div>

                <div className="room-title">{room.roomTypeName}</div>
                <button className="close-modal-btn" onClick={handleClose}>
                    X
                </button>
            </div>
            <div className="modal-content">
                <div className="room-info">
                    <div className="room-description-container">
                        <div className="room-amenities">
                            <div className="room-information">
                                <div className="room-capacity">
                                    <div className="room-info-div">
                                        <img src={User} alt="user" />
                                        <span>&nbsp; 1-{room.maxCapacity}</span>
                                    </div>
                                    <div className="room-info-div">
                                        <img src={Doublebed} alt="bed" />
                                        {/* <span>
                                            &nbsp; {room.doubleBed > 0 && room.doubleBed}{" "}
                                            {room.doubleBed > 0 && (
                                            <FormattedMessage id="king" defaultMessage="King" />
                                            )}
                                            {room.doubleBed > 0 && room.singleBed > 0 && " & "}
                                            {room.singleBed > 0 && room.singleBed}{" "}
                                            {room.singleBed > 0 && (
                                            <FormattedMessage id="queen" defaultMessage="Queen" />
                                            )}
                                        </span> */}
                                    </div>
                                    <div className="room-info-div">
                                        &nbsp; &nbsp;{room.area} ft²
                                    </div>
                                </div>
                                <div className="description">
                                    {`Smoke free and decorated in contemporary
                                    jewel and earth tones, the 15-story Casino
                                    Tower rooms are located directly above the
                                    casino. The ${room.area} sq.ft. Casino Tower rooms
                                    are appointed with classic furnishings and
                                    include pillow-top mattresses, 40 inch flat
                                    panel plasma TV and Wi-Fi internet access.`}
                                </div>
                            </div>
                            <div className="amenities-container">
                                <span className="title">Amenities</span>
                                <div className="amenities">
                                    {amenitiesList.map((amenity) => (
                                        <div key={amenity} className="amenity">
                                            <img
                                                src="/src/assets/checkmark.png"
                                                style={{
                                                    height: "16px",
                                                    width: "16px",
                                                }}
                                                alt="amenities"
                                            />
                                            <span>&nbsp;{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="standard-rates">
                            <div className="rate-title">Standard Rates</div>
                            <div className="rate-card">
                                <div className="rate-description">
                                    <div className="description-title">
                                        <div>STANDARD RATES</div>
                                    </div>
                                    <div className="description-data">
                                        Spend $10 every night you stay and earn
                                        $150 in dining credit at the resort.
                                    </div>
                                </div>
                                <div className="rate">
                                    <div className="nightly-rate">
                                        <div className="value">
                                            ${room.avgPrice}
                                        </div>
                                        <p className="per-night">per night</p>
                                    </div>
                                    <button
                                        className="select-btn"
                                        onClick={() =>
                                            handleSelectPackage(
                                                "STANDARD RATES"
                                            )
                                        }
                                    >
                                        SELECT PACKAGE
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="standard-rates">
                            <div className="rate-title">Deals & Packages</div>
                            {room.promotionsDtoList.map((promotion) => {
                                return (
                                    <div
                                        key={promotion.promotionId}
                                        className="rate-card"
                                    >
                                        <div className="rate-description">
                                            <div className="description-title">
                                                {promotion.promotionTitle}
                                            </div>
                                            <div className="description-data">
                                                {promotion.promotionDescription}
                                            </div>
                                        </div>
                                        <div className="rate">
                                            <div className="nightly-rate">
                                                <div className="value">
                                                    $
                                                    {room.avgPrice *
                                                        promotion.priceFactor}
                                                </div>
                                                <p className="per-night">
                                                    per night
                                                </p>
                                            </div>
                                            <button
                                                className="select-btn"
                                                onClick={() =>
                                                    handleSelectPackage(
                                                        promotion.promotionTitle
                                                    )
                                                }
                                            >
                                                SELECT PACKAGE
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="promocode-apply">
                            <div className="promocode-name">
                                <p className="promo-title">Enter a promocode</p>
                                <div className="promocode-button">
                                    <input
                                        className="promocode-input"
                                        type="text"
                                        placeholder="Enter promocode"
                                        onChange={(e) =>
                                            setPromoCode(e.target.value)
                                        }
                                    />
                                    <button
                                        className="apply-btn"
                                        onClick={validatePromoCode}
                                    >
                                        APPLY
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
}
