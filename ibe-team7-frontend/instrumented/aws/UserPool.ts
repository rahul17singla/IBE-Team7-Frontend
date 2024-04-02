function cov_rfhl1fsdg() {
  var path = "/home/hp/Desktop/IBE-project/IBE-Front-end/IBE-Team7-Frontend/ibe-team7-frontend/src/aws/UserPool.ts";
  var hash = "a2cd133aabddb949c84ca6c14fc28be30f87da43";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/hp/Desktop/IBE-project/IBE-Front-end/IBE-Team7-Frontend/ibe-team7-frontend/src/aws/UserPool.ts",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 17
        },
        end: {
          line: 6,
          column: 1
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0
    },
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "a2cd133aabddb949c84ca6c14fc28be30f87da43"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_rfhl1fsdg = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_rfhl1fsdg();
import { CognitoUserPool } from "amazon-cognito-identity-js";
const poolData = (cov_rfhl1fsdg().s[0]++, {
  UserPoolId: "ap-northeast-1_JCVF5sUa6",
  ClientId: "5s07lfsioufivatghaagtcrj49"
});
export default new CognitoUserPool(poolData);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfcmZobDFmc2RnIiwiYWN0dWFsQ292ZXJhZ2UiLCJDb2duaXRvVXNlclBvb2wiLCJwb29sRGF0YSIsInMiLCJVc2VyUG9vbElkIiwiQ2xpZW50SWQiXSwic291cmNlcyI6WyJVc2VyUG9vbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2duaXRvVXNlclBvb2wgfSBmcm9tIFwiYW1hem9uLWNvZ25pdG8taWRlbnRpdHktanNcIjtcblxuY29uc3QgcG9vbERhdGEgPSB7XG4gICAgVXNlclBvb2xJZDogXCJhcC1ub3J0aGVhc3QtMV9KQ1ZGNXNVYTZcIixcbiAgICBDbGllbnRJZDogXCI1czA3bGZzaW91Zml2YXRnaGFhZ3Rjcmo0OVwiLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbmV3IENvZ25pdG9Vc2VyUG9vbChwb29sRGF0YSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsYUFBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsYUFBQTtBQWZaLFNBQVNFLGVBQWUsUUFBUSw0QkFBNEI7QUFFNUQsTUFBTUMsUUFBUSxJQUFBSCxhQUFBLEdBQUFJLENBQUEsT0FBRztFQUNiQyxVQUFVLEVBQUUsMEJBQTBCO0VBQ3RDQyxRQUFRLEVBQUU7QUFDZCxDQUFDO0FBRUQsZUFBZSxJQUFJSixlQUFlLENBQUNDLFFBQVEsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==