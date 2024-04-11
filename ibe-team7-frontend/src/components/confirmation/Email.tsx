import { Html } from "@react-email/html";
import { render } from "@react-email/render";
import { Confirmation } from "./Confirmation";

export const Email = () => {
    const confirmationHtml = render(<Confirmation />);

    return <Html lang="en">{confirmationHtml}</Html>;
};
