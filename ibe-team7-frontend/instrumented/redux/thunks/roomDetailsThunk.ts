function cov_2k1pet40jt() {
  var path = "/home/hp/Desktop/IBE-project/IBE-Front-end/IBE-Team7-Frontend/ibe-team7-frontend/src/redux/thunks/roomDetailsThunk.ts";
  var hash = "70f00ff4e7d3aa8b24cd36de69ff9cab25f6676c";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/hp/Desktop/IBE-project/IBE-Front-end/IBE-Team7-Frontend/ibe-team7-frontend/src/redux/thunks/roomDetailsThunk.ts",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 25
        },
        end: {
          line: 10,
          column: 2
        }
      },
      "1": {
        start: {
          line: 6,
          column: 32
        },
        end: {
          line: 8,
          column: 5
        }
      },
      "2": {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 36
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 5,
            column: 62
          },
          end: {
            line: 5,
            column: 63
          }
        },
        loc: {
          start: {
            line: 5,
            column: 74
          },
          end: {
            line: 10,
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
    hash: "70f00ff4e7d3aa8b24cd36de69ff9cab25f6676c"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2k1pet40jt = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2k1pet40jt();
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../constants/Constants";
const fetchRoomDetails = (cov_2k1pet40jt().s[0]++, createAsyncThunk("fetchRoomDetails", async () => {
  cov_2k1pet40jt().f[0]++;
  const roomDetailsResponse = (cov_2k1pet40jt().s[1]++, await axios.get(BACKEND_URL + "/api/v1/roomcartdetails"));
  cov_2k1pet40jt().s[2]++;
  return roomDetailsResponse.data;
}));
export default fetchRoomDetails;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMmsxcGV0NDBqdCIsImFjdHVhbENvdmVyYWdlIiwiY3JlYXRlQXN5bmNUaHVuayIsImF4aW9zIiwiQkFDS0VORF9VUkwiLCJmZXRjaFJvb21EZXRhaWxzIiwicyIsImYiLCJyb29tRGV0YWlsc1Jlc3BvbnNlIiwiZ2V0IiwiZGF0YSJdLCJzb3VyY2VzIjpbInJvb21EZXRhaWxzVGh1bmsudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQXN5bmNUaHVuayB9IGZyb20gXCJAcmVkdXhqcy90b29sa2l0XCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyBCQUNLRU5EX1VSTCB9IGZyb20gXCIuLi8uLi9jb25zdGFudHMvQ29uc3RhbnRzXCI7XG5cbmNvbnN0IGZldGNoUm9vbURldGFpbHMgPSBjcmVhdGVBc3luY1RodW5rKFwiZmV0Y2hSb29tRGV0YWlsc1wiLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qgcm9vbURldGFpbHNSZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChcbiAgICAgICAgQkFDS0VORF9VUkwgKyBcIi9hcGkvdjEvcm9vbWNhcnRkZXRhaWxzXCJcbiAgICApO1xuICAgIHJldHVybiByb29tRGV0YWlsc1Jlc3BvbnNlLmRhdGE7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZmV0Y2hSb29tRGV0YWlscztcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLFNBQVNFLGdCQUFnQixRQUFRLGtCQUFrQjtBQUNuRCxPQUFPQyxLQUFLLE1BQU0sT0FBTztBQUN6QixTQUFTQyxXQUFXLFFBQVEsMkJBQTJCO0FBRXZELE1BQU1DLGdCQUFnQixJQUFBTCxjQUFBLEdBQUFNLENBQUEsT0FBR0osZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBWTtFQUFBRixjQUFBLEdBQUFPLENBQUE7RUFDdEUsTUFBTUMsbUJBQW1CLElBQUFSLGNBQUEsR0FBQU0sQ0FBQSxPQUFHLE1BQU1ILEtBQUssQ0FBQ00sR0FBRyxDQUN2Q0wsV0FBVyxHQUFHLHlCQUNsQixDQUFDO0VBQUNKLGNBQUEsR0FBQU0sQ0FBQTtFQUNGLE9BQU9FLG1CQUFtQixDQUFDRSxJQUFJO0FBQ25DLENBQUMsQ0FBQztBQUVGLGVBQWVMLGdCQUFnQiIsImlnbm9yZUxpc3QiOltdfQ==