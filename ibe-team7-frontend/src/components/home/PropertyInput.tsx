import { useEffect } from "react";
import { ListProperty } from "../../types/Property";
import axios from "axios";
import { t } from "i18next";

interface PropertyInputProps {
    property: string;
    setProperty: (property: string) => void;
    data: ListProperty[];
    setData: (data: ListProperty[]) => void;
}

export const PropertyInput = ({
    property,
    setProperty,
    data,
    setData,
}: PropertyInputProps) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    // "http://localhost:8088/api/v1/property"
                    "https://swhytqcdde.execute-api.ap-northeast-1.amazonaws.com/team7/api/v1/property"
                    // "http://team7ibe.ap-northeast-1.elasticbeanstalk.com/api/v1/property"
                );
                setData(response.data.data.listProperties);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <label htmlFor="property1" className="dropdown-heading">
                <p>{t("property-name")}*</p>
            </label>
            <select
                id="property1"
                className="dropdown"
                value={property}
                onChange={(e) => setProperty(e.target.value)}
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
