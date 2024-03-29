import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../constants/Constants";
import axios from "axios";

const fetchConfig = createAsyncThunk("fetchConfig", async () => {
    const response = await axios.get(BACKEND_URL + "/config");
    console.log(response);
    return response.data[0].propertyConfig.first;
});

export default fetchConfig;
