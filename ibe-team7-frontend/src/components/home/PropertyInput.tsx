import { useEffect } from "react";
import { ListProperty } from "../../types/Property";
import axios from "axios";
import { t } from "i18next";
import { setData, setProperty } from "../../redux/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const PropertyInput = () => {
    const dispatch = useDispatch();
    const property = useSelector(
        (state: RootState) => state.filterStates.property
    );
    const data = useSelector((state: RootState) => state.filterStates.data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    // "http://localhost:8088/api/v1/property"
                    "https://d0rh6hot93.execute-api.ap-northeast-1.amazonaws.com/api/v1/property"
                    // "https://swhytqcdde.execute-api.ap-northeast-1.amazonaws.com/team7/api/v1/property"
                    // "http://team7ibe.ap-northeast-1.elasticbeanstalk.com/api/v1/property"
                );
                dispatch(setData(response.data.data.listProperties));
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <label htmlFor="property" className="dropdown-heading">
                <p>{t("property-name")}*</p>
            </label>
            <select
                id="property"
                className="dropdown"
                value={property}
                onChange={(e) => dispatch(setProperty(e.target.value))}
            >
                <option value="" disabled>
                    {t("search-properties")}
                </option>
                {data.map((property: ListProperty) => (
                    <option
                        key={property.property_id}
                        value={property.property_name}
                        className="dropdown-item"
                    >
                        {property.property_name}
                    </option>
                ))}
            </select>
        </>
    );
};
