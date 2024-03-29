import { useContext, useEffect, useState } from "react";
import { AccountContext } from "./Account";

export const Status = () => {
    const [status, setStatus] = useState<boolean>(false);

    const { getSession } = useContext(AccountContext);

    useEffect(() => {
        getSession()
            .then((session: any) => {
                console.log("Session: ", session);
                setStatus(true);
            })
            .catch(() => {
                setStatus(false);
            });
    }, []);

    return <div>{status ? "You are logged in" : "Please login"}</div>;
};
