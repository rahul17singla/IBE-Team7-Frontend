import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../constants/Constants";

const fetchData = createAsyncThunk("fetchData", async () => {
    const response = await axios.get(BACKEND_URL + "/api/v1/property");
    return response.data.data.listProperties;
});

export default fetchData;
