import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../constants/Constants";

const fetchRoomDetails = createAsyncThunk(
    "fetchRoomDetails",
    async (params: any) => {
        const roomDetailsResponse = await axios.get(
            BACKEND_URL + "/api/v1/roomcartdetails",
            {
                params: {
                    property: params.property,
                    startDate: params.startDate,
                    endDate: params.endDate,
                    roomCount: params.roomCount,
                    bedType: params.bedType,
                    roomType: params.roomType,
                    priceLessThan: params.priceLessThan,
                    // guestsAdult: params.guestsAdult,
                    // guestsTeens: params.guestsTeens,
                    // guestsChildren: params.guestsChildren,
                    sort: params.sort,
                },
            }
        );
        return roomDetailsResponse.data;
    }
);

export default fetchRoomDetails;
