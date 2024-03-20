import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "ap-northeast-1_JCVF5sUa6",
    ClientId: "5s07lfsioufivatghaagtcrj49",
};

export default new CognitoUserPool(poolData);
