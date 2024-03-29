import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import Pool from "../../aws/UserPool";
import { createContext } from "react";

export const AccountContext = createContext<any>(null);

export const Account = (props: any) => {
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();

            if (user) {
                user.getSession((err: any, session: any) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(session);
                    }
                });
            } else {
                reject();
            }
        });
    };

    const authenticate = async (Username: string, Password: string) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool });

            const authDetails = new AuthenticationDetails({
                Username,
                Password,
            });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSuccess:", data);
                    resolve(data);
                },
                onFailure: (err) => {
                    console.error("onFailure:", err);
                    reject(err);
                    alert(err.message);
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired:", data);
                    alert("New Password Required");
                },
            });
        });
    };

    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    };

    return (
        <AccountContext.Provider value={{ authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
    );
};
