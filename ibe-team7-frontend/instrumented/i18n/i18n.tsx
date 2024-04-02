function cov_sau4bu3g3() {
  var path = "/home/hp/Desktop/IBE-project/IBE-Front-end/IBE-Team7-Frontend/ibe-team7-frontend/src/i18n/i18n.tsx";
  var hash = "5e3be516fd5fdcbfff704840f1745f30d5093165";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/hp/Desktop/IBE-project/IBE-Front-end/IBE-Team7-Frontend/ibe-team7-frontend/src/i18n/i18n.tsx",
    statementMap: {
      "0": {
        start: {
          line: 6,
          column: 0
        },
        end: {
          line: 17,
          column: 5
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
    hash: "5e3be516fd5fdcbfff704840f1745f30d5093165"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_sau4bu3g3 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_sau4bu3g3();
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
cov_sau4bu3g3().s[0]++;
i18n.use(LanguageDetector).use(initReactI18next).use(Backend).init({
  debug: true,
  fallbackLng: "en",
  returnObjects: true,
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  }
});
export default i18n;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3Zfc2F1NGJ1M2czIiwiYWN0dWFsQ292ZXJhZ2UiLCJpMThuIiwiaW5pdFJlYWN0STE4bmV4dCIsIkxhbmd1YWdlRGV0ZWN0b3IiLCJCYWNrZW5kIiwicyIsInVzZSIsImluaXQiLCJkZWJ1ZyIsImZhbGxiYWNrTG5nIiwicmV0dXJuT2JqZWN0cyIsImludGVycG9sYXRpb24iLCJlc2NhcGVWYWx1ZSJdLCJzb3VyY2VzIjpbImkxOG4udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpMThuIGZyb20gXCJpMThuZXh0XCI7XG5pbXBvcnQge2luaXRSZWFjdEkxOG5leHR9IGZyb20gXCJyZWFjdC1pMThuZXh0XCI7XG5pbXBvcnQgTGFuZ3VhZ2VEZXRlY3RvciBmcm9tIFwiaTE4bmV4dC1icm93c2VyLWxhbmd1YWdlZGV0ZWN0b3JcIjtcbmltcG9ydCBCYWNrZW5kIGZyb20gXCJpMThuZXh0LWh0dHAtYmFja2VuZFwiO1xuXG5pMThuXG4gIC51c2UoTGFuZ3VhZ2VEZXRlY3RvcilcbiAgLnVzZShpbml0UmVhY3RJMThuZXh0KVxuICAudXNlKEJhY2tlbmQpXG4gIC5pbml0KHtcbiAgICBkZWJ1ZzogdHJ1ZSxcbiAgICBmYWxsYmFja0xuZzogXCJlblwiLFxuICAgIHJldHVybk9iamVjdHM6IHRydWUsXG4gICAgaW50ZXJwb2xhdGlvbjoge1xuICAgICAgZXNjYXBlVmFsdWU6IGZhbHNlLCAvLyBub3QgbmVlZGVkIGZvciByZWFjdCBhcyBpdCBlc2NhcGVzIGJ5IGRlZmF1bHRcbiAgICB9LFxuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgaTE4bjsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsYUFBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsYUFBQTtBQWZaLE9BQU9FLElBQUksTUFBTSxTQUFTO0FBQzFCLFNBQVFDLGdCQUFnQixRQUFPLGVBQWU7QUFDOUMsT0FBT0MsZ0JBQWdCLE1BQU0sa0NBQWtDO0FBQy9ELE9BQU9DLE9BQU8sTUFBTSxzQkFBc0I7QUFBQ0wsYUFBQSxHQUFBTSxDQUFBO0FBRTNDSixJQUFJLENBQ0RLLEdBQUcsQ0FBQ0gsZ0JBQWdCLENBQUMsQ0FDckJHLEdBQUcsQ0FBQ0osZ0JBQWdCLENBQUMsQ0FDckJJLEdBQUcsQ0FBQ0YsT0FBTyxDQUFDLENBQ1pHLElBQUksQ0FBQztFQUNKQyxLQUFLLEVBQUUsSUFBSTtFQUNYQyxXQUFXLEVBQUUsSUFBSTtFQUNqQkMsYUFBYSxFQUFFLElBQUk7RUFDbkJDLGFBQWEsRUFBRTtJQUNiQyxXQUFXLEVBQUUsS0FBSyxDQUFFO0VBQ3RCO0FBQ0YsQ0FBQyxDQUFDO0FBRUosZUFBZVgsSUFBSSIsImlnbm9yZUxpc3QiOltdfQ==