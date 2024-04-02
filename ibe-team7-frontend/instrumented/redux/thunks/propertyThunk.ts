function cov_2qgtekozny() {
  var path = "/home/hp/Desktop/IBE-project/IBE-Front-end/IBE-Team7-Frontend/ibe-team7-frontend/src/redux/thunks/propertyThunk.ts";
  var hash = "065828b4944a4c0e567485de8da3aee2fcb46af9";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/hp/Desktop/IBE-project/IBE-Front-end/IBE-Team7-Frontend/ibe-team7-frontend/src/redux/thunks/propertyThunk.ts",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 18
        },
        end: {
          line: 8,
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
          column: 70
        }
      },
      "2": {
        start: {
          line: 7,
          column: 4
        },
        end: {
          line: 7,
          column: 45
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 5,
            column: 48
          },
          end: {
            line: 5,
            column: 49
          }
        },
        loc: {
          start: {
            line: 5,
            column: 60
          },
          end: {
            line: 8,
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
      "2": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "065828b4944a4c0e567485de8da3aee2fcb46af9"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2qgtekozny = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2qgtekozny();
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../constants/Constants";
const fetchData = (cov_2qgtekozny().s[0]++, createAsyncThunk("fetchData", async () => {
  cov_2qgtekozny().f[0]++;
  const response = (cov_2qgtekozny().s[1]++, await axios.get(BACKEND_URL + "/api/v1/property"));
  cov_2qgtekozny().s[2]++;
  return response.data.data.listProperties;
}));
export default fetchData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMnFndGVrb3pueSIsImFjdHVhbENvdmVyYWdlIiwiY3JlYXRlQXN5bmNUaHVuayIsImF4aW9zIiwiQkFDS0VORF9VUkwiLCJmZXRjaERhdGEiLCJzIiwiZiIsInJlc3BvbnNlIiwiZ2V0IiwiZGF0YSIsImxpc3RQcm9wZXJ0aWVzIl0sInNvdXJjZXMiOlsicHJvcGVydHlUaHVuay50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVBc3luY1RodW5rIH0gZnJvbSBcIkByZWR1eGpzL3Rvb2xraXRcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IEJBQ0tFTkRfVVJMIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9Db25zdGFudHNcIjtcblxuY29uc3QgZmV0Y2hEYXRhID0gY3JlYXRlQXN5bmNUaHVuayhcImZldGNoRGF0YVwiLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoQkFDS0VORF9VUkwgKyBcIi9hcGkvdjEvcHJvcGVydHlcIik7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YS5saXN0UHJvcGVydGllcztcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBmZXRjaERhdGE7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUFTRSxnQkFBZ0IsUUFBUSxrQkFBa0I7QUFDbkQsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFDekIsU0FBU0MsV0FBVyxRQUFRLDJCQUEyQjtBQUV2RCxNQUFNQyxTQUFTLElBQUFMLGNBQUEsR0FBQU0sQ0FBQSxPQUFHSixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsWUFBWTtFQUFBRixjQUFBLEdBQUFPLENBQUE7RUFDeEQsTUFBTUMsUUFBUSxJQUFBUixjQUFBLEdBQUFNLENBQUEsT0FBRyxNQUFNSCxLQUFLLENBQUNNLEdBQUcsQ0FBQ0wsV0FBVyxHQUFHLGtCQUFrQixDQUFDO0VBQUNKLGNBQUEsR0FBQU0sQ0FBQTtFQUNuRSxPQUFPRSxRQUFRLENBQUNFLElBQUksQ0FBQ0EsSUFBSSxDQUFDQyxjQUFjO0FBQzVDLENBQUMsQ0FBQztBQUVGLGVBQWVOLFNBQVMiLCJpZ25vcmVMaXN0IjpbXX0=