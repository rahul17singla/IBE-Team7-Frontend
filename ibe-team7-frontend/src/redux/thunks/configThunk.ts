import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../constants/Constants";
import axios from "axios";

const fetchConfig = createAsyncThunk("fetchConfig", async () => {
    const response = await axios.get(BACKEND_URL + "/config");
    return response.data.propertyConfig.first;
});

export default fetchConfig;
