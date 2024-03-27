import { useEffect } from "react";
import { ListProperty } from "../../types/Property";
import { t } from "i18next";
import { setProperty } from "../../redux/searchSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import fetchData from "../../redux/thunks/propertyThunk";
import { Loader } from "../loader/Loader";

export const PropertyInput = () => {
    const dispatch = useAppDispatch();
    const propertyStatus = useSelector(
        (state: RootState) => state.filterStates.loading
    );
    const property = useSelector(
        (state: RootState) => state.filterStates.property
    );
    const data = useSelector((state: RootState) => state.filterStates.data);
    const loading = useSelector(
        (state: RootState) => state.filterStates.propertyLoading
    );

    useEffect(() => {
        const fetchDataFunction = async () => {
            dispatch(fetchData());
        };
        fetchDataFunction();
    }, [dispatch, propertyStatus]);

    if (loading === "pending") {
        return <Loader />;
    }

    return (
        <>
            {propertyStatus === "succeeded" && (
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
            )}
        </>
    );
};
