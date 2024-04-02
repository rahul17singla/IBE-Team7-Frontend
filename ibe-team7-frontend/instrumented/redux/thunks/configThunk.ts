function cov_1jptqtkbyu() {
  var path = "/home/hp/Desktop/IBE-project/IBE-Front-end/IBE-Team7-Frontend/ibe-team7-frontend/src/redux/thunks/configThunk.ts";
  var hash = "38f528a1eb7cb4f93ee40a0d1f2a4791c970fa73";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/hp/Desktop/IBE-project/IBE-Front-end/IBE-Team7-Frontend/ibe-team7-frontend/src/redux/thunks/configThunk.ts",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 20
        },
        end: {
          line: 9,
          column: 2
        }
      },
      "1": {
        start: {
          line: 6,
          column: 21
        },
        end: {
          line: 6,
          column: 61
        }
      },
      "2": {
        start: {
          line: 7,
          column: 4
        },
        end: {
          line: 7,
          column: 26
        }
      },
      "3": {
        start: {
          line: 8,
          column: 4
        },
        end: {
          line: 8,
          column: 49
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 5,
            column: 52
          },
          end: {
            line: 5,
            column: 53
          }
        },
        loc: {
          start: {
            line: 5,
            column: 64
          },
          end: {
            line: 9,
            column: 1
          }
        },
        line: 5
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "38f528a1eb7cb4f93ee40a0d1f2a4791c970fa73"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1jptqtkbyu = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1jptqtkbyu();
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../constants/Constants";
import axios from "axios";
const fetchConfig = (cov_1jptqtkbyu().s[0]++, createAsyncThunk("fetchConfig", async () => {
  cov_1jptqtkbyu().f[0]++;
  const response = (cov_1jptqtkbyu().s[1]++, await axios.get(BACKEND_URL + "/config"));
  cov_1jptqtkbyu().s[2]++;
  console.log(response);
  cov_1jptqtkbyu().s[3]++;
  return response.data[0].propertyConfig.first;
}));
export default fetchConfig;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMWpwdHF0a2J5dSIsImFjdHVhbENvdmVyYWdlIiwiY3JlYXRlQXN5bmNUaHVuayIsIkJBQ0tFTkRfVVJMIiwiYXhpb3MiLCJmZXRjaENvbmZpZyIsInMiLCJmIiwicmVzcG9uc2UiLCJnZXQiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsInByb3BlcnR5Q29uZmlnIiwiZmlyc3QiXSwic291cmNlcyI6WyJjb25maWdUaHVuay50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVBc3luY1RodW5rIH0gZnJvbSBcIkByZWR1eGpzL3Rvb2xraXRcIjtcbmltcG9ydCB7IEJBQ0tFTkRfVVJMIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9Db25zdGFudHNcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcblxuY29uc3QgZmV0Y2hDb25maWcgPSBjcmVhdGVBc3luY1RodW5rKFwiZmV0Y2hDb25maWdcIiwgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KEJBQ0tFTkRfVVJMICsgXCIvY29uZmlnXCIpO1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YVswXS5wcm9wZXJ0eUNvbmZpZy5maXJzdDtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBmZXRjaENvbmZpZztcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosU0FBU0UsZ0JBQWdCLFFBQVEsa0JBQWtCO0FBQ25ELFNBQVNDLFdBQVcsUUFBUSwyQkFBMkI7QUFDdkQsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFFekIsTUFBTUMsV0FBVyxJQUFBTCxjQUFBLEdBQUFNLENBQUEsT0FBR0osZ0JBQWdCLENBQUMsYUFBYSxFQUFFLFlBQVk7RUFBQUYsY0FBQSxHQUFBTyxDQUFBO0VBQzVELE1BQU1DLFFBQVEsSUFBQVIsY0FBQSxHQUFBTSxDQUFBLE9BQUcsTUFBTUYsS0FBSyxDQUFDSyxHQUFHLENBQUNOLFdBQVcsR0FBRyxTQUFTLENBQUM7RUFBQ0gsY0FBQSxHQUFBTSxDQUFBO0VBQzFESSxPQUFPLENBQUNDLEdBQUcsQ0FBQ0gsUUFBUSxDQUFDO0VBQUNSLGNBQUEsR0FBQU0sQ0FBQTtFQUN0QixPQUFPRSxRQUFRLENBQUNJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsY0FBYyxDQUFDQyxLQUFLO0FBQ2hELENBQUMsQ0FBQztBQUVGLGVBQWVULFdBQVciLCJpZ25vcmVMaXN0IjpbXX0=