import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../constants/Constants";

const fetchRoomDetails = createAsyncThunk("fetchRoomDetails", async () => {
    const roomDetailsResponse = await axios.get(
        BACKEND_URL + "/api/v1/roomcartdetails"
    );
    return roomDetailsResponse.data;
});

export default fetchRoomDetails;
