import { RoomCard } from "./card/RoomCard";
import down from "../../assets/Down.svg";
import "./RoomCards.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { setSort } from "../../redux/resultSlice";
import axios from "axios";
import { BACKEND_URL } from "../../constants/Constants";
import { Loader } from "../loader/Loader";
import fetchRoomDetails from "../../redux/thunks/roomDetailsThunk";

export const RoomCards = () => {
    const [openSortPriceDropdown, setOpenSortPriceDropdown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3); // Number of items to display per page

    const roomDetails = useSelector((state: RootState) => state.roomDetails);

    const dispatch = useAppDispatch();

    const sort = useSelector((state: RootState) => state.results.sort);
    const property = useSelector(
        (state: RootState) => state.filterStates.property
    );
    const startDate = useSelector(
        (state: RootState) => state.filterStates.startDate
    );
    const endDate = useSelector(
        (state: RootState) => state.filterStates.endDate
    );
    const property3 = useSelector(
        (state: RootState) => state.filterStates.property3
    );
    const bedTypes = useSelector((state: RootState) => state.results.bedType);
    const roomType = useSelector((state: RootState) => state.results.roomType);
    const priceLessThan = useSelector(
        (state: RootState) => state.results.priceLessThan
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.post(BACKEND_URL + "/api/v1/dates", {
                    property: property,
                    startDate: startDate?.toISOString(),
                    endDate: endDate?.toISOString(),
                    roomCount: property3,
                    bedType: bedTypes,
                    roomType: roomType,
                    priceLessThan: priceLessThan,
                    sort: sort,
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData().then(() => {
            dispatch(fetchRoomDetails());
        });
    }, [sort]);

    // Calculate index of the last item to display
    const indexOfLastItem = currentPage * itemsPerPage;
    // Calculate index of the first item to display
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Get current items to display based on pagination
    const currentItems = roomDetails.slice(indexOfFirstItem, indexOfLastItem);

    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [currentPage, sort]);
    if (loading) {
        return <Loader />;
    }

    return (
        <div className="listrooms">
            <div className="listrooms_menubar">
                <p className="roomresult_txt">Room Results</p>
                <div className="roomresults_page_div">
                    <div className="pagination">
                        <button
                            onClick={() =>
                                setCurrentPage((prevPage) =>
                                    Math.max(prevPage - 1, 1)
                                )
                            }
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        <button
                            onClick={() =>
                                setCurrentPage((prevPage) =>
                                    Math.min(
                                        prevPage + 1,
                                        Math.ceil(
                                            roomDetails.length / itemsPerPage
                                        )
                                    )
                                )
                            }
                            disabled={
                                currentPage ===
                                Math.ceil(roomDetails.length / itemsPerPage)
                            }
                        >
                            &gt;
                        </button>
                    </div>
                    <p className="roomresults_result_txt">
                        {" "}
                        Showing 1-3 of 6 Results{" "}
                    </p>
                    <p className="space"> | </p>
                    <div>
                        <button
                            className="roomresults_price_dropdown"
                            onClick={() => {
                                setOpenSortPriceDropdown(
                                    !openSortPriceDropdown
                                );
                            }}
                        >
                            Price
                            <div className="roomresults_dropdown_div">
                                <img
                                    src={down}
                                    className="roomresults_dropdown_img"
                                />
                            </div>
                        </button>
                        {
                            // sort price dropdown
                            openSortPriceDropdown && (
                                <div className="sort_price_dropdown">
                                    <button
                                        className="sort_button"
                                        onClick={() => dispatch(setSort(1))}
                                    >
                                        Low to High
                                    </button>
                                    <button
                                        className="sort_button"
                                        onClick={() => dispatch(setSort(2))}
                                    >
                                        High to Low
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="listrooms_div">
                {currentItems.map((room) => (
                    <RoomCard key={room.roomId} room={room} />
                ))}
            </div>
        </div>
    );
};
