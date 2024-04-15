import { SES } from "@aws-sdk/client-ses";
import { render } from "@react-email/render";
import { Email } from "./Email";

const ses = new SES({ region: "ap-southeast-1" });

const emailHtml = render(<Email />);

const params = {
    Source: "rahul.singla@kickdrumtech.com",
    Destination: {
        ToAddresses: ["arunain.mahant@kickdrumtech.com"],
    },
    Message: {
        Body: {
            Html: {
                Charset: "UTF-8",
                Data: emailHtml,
            },
        },
        Subject: {
            Charset: "UTF-8",
            Data: "hello world",
        },
    },
};

ses.sendEmail(params);
