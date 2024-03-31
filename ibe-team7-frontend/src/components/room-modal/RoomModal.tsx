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
import {
    addToCart,
    setRoomTotal,
    setShowItinerary,
    setTotal,
} from "../../redux/checkoutSlice";
import { findnextDate } from "../../utils/FindNextDateFunc";
import { CustomPromo } from "../../types/CustomPromo";
import checkmarkIcon from "../../assets/checkmark.png";
import { Currency } from "../../enums/Enums";

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

    const roomTotalPrice = useSelector(
        (state: RootState) => state.checkout.checkout.roomTotal
    );
    const sort = useSelector((state: RootState) => state.results.sort);

    const [customPromotions, setCustomPromotions] = useState<CustomPromo[]>([]);

    const currencyValue = useSelector(
        (state: RootState) => state.currency.value
    );

    const currencyType = useSelector(
        (state: RootState) => state.currency.currency
    );

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

    const handleSelectPackage = (promoName: string, priceFactor: number) => {
        console.log(promoName);

        dispatch(setShowItinerary(true));
        dispatch(setRoomTotal(room.avgPrice * priceFactor));
        dispatch(setTotal(roomTotalPrice * 1.205));
        dispatch(
            addToCart({
                room: room.roomTypeName,
                price: room.avgPrice,
                quantity: 1,
            })
        );

        const checkoutUrl = `/checkout?property=${property}&room=${property3}&startDate=${startDate?.toLocaleDateString(
            "en-GB"
        )}&endDate=${endDate?.toLocaleDateString(
            "en-GB"
        )}&adults=${guestsAdult}&teens=${guestsTeens}&kids=${guestsChildren}&sort=${sort}`;
        navigate(checkoutUrl);
    };

    const validatePromoCode = async () => {
        try {
            const response = await axios.get(
                `${BACKEND_URL}/api/v1/validatepromo`,
                {
                    params: {
                        promoCode: promoCode,
                        roomCount: property3,
                        startDate: findnextDate(startDate),
                        endDate: findnextDate(endDate),
                    },
                }
            );
            console.log(response);
            if (response.data !== "") {
                const invalidPromoPara =
                    document.getElementById("invalidPromoPara");
                if (invalidPromoPara) {
                    invalidPromoPara.style.display = "none";
                }

                // Check if the promotion already exists in the state
                if (
                    !customPromotions.some(
                        (promotion) =>
                            promotion.promoCodeTitle ===
                            response.data.promoCodeTitle
                    )
                ) {
                    setCustomPromotions([...customPromotions, response.data]);
                }

                // setCustomPromotions([...customPromotions, response.data]);

                // const checkoutUrl = `/checkout?property=${property}&room=${property3}&startDate=${startDate?.toLocaleDateString(
                //     "en-GB"
                // )}&endDate=${endDate?.toLocaleDateString(
                //     "en-GB"
                // )}&adults=${guestsAdult}&teens=${guestsTeens}&kids=${guestsChildren}&sort=${sort}`;
                // navigate(checkoutUrl);
            } else {
                const invalidPromoPara =
                    document.getElementById("invalidPromoPara");
                if (invalidPromoPara) {
                    invalidPromoPara.style.display = "block";
                }
            }
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
                                                src={checkmarkIcon}
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
                                            {currencyType === Currency.USD
                                                ? `$${(
                                                      room.avgPrice *
                                                      currencyValue
                                                  ).toFixed(2)}`
                                                : `₹${(
                                                      room.avgPrice *
                                                      currencyValue
                                                  ).toFixed(2)}`}
                                        </div>
                                        <p className="per-night">per night</p>
                                    </div>
                                    <button
                                        className="select-btn"
                                        onClick={() =>
                                            handleSelectPackage(
                                                "STANDARD RATES",
                                                1
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
                                                    {currencyType ===
                                                    Currency.USD
                                                        ? `$${(
                                                              room.avgPrice *
                                                              promotion.priceFactor *
                                                              currencyValue
                                                          ).toFixed(2)}`
                                                        : `₹${(
                                                              room.avgPrice *
                                                              promotion.priceFactor *
                                                              currencyValue
                                                          ).toFixed(2)}`}
                                                </div>
                                                <p className="per-night">
                                                    per night
                                                </p>
                                            </div>
                                            <button
                                                className="select-btn"
                                                onClick={() =>
                                                    handleSelectPackage(
                                                        promotion.promotionTitle,
                                                        promotion.priceFactor
                                                    )
                                                }
                                            >
                                                SELECT PACKAGE
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                            {/* {customPromotions. > 0 &&
                                customPromotions.map((promotion) => {
                                    return (
                                        <div
                                            key={promotion.promoCodeTitle}
                                            className="rate-card"
                                        >
                                            <div className="rate-description">
                                                <div className="description-title">
                                                    {promotion.promoCodeTitle}
                                                </div>
                                                <div className="description-data">
                                                    {
                                                        promotion.promoCodeDescription
                                                    }
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
                                                            promotion.promoCodeTitle,
                                                            promotion.priceFactor
                                                        )
                                                    }
                                                >
                                                    SELECT PACKAGE
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })} */}
                            {customPromotions.map((promotion) => {
                                return (
                                    <div
                                        key={promotion.promoCodeTitle}
                                        className="rate-card"
                                    >
                                        <div className="rate-description">
                                            <div className="description-title">
                                                {promotion.promoCodeTitle}
                                            </div>
                                            <div className="description-data">
                                                {promotion.promoCodeDescription}
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
                                                        promotion.promoCodeTitle,
                                                        promotion.priceFactor
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
                                <p
                                    id="invalidPromoPara"
                                    style={{ display: "none" }}
                                >
                                    Promo Invalid
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
}
