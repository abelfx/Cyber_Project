var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Select the form element
var signupForm = document.querySelector("form");
if (signupForm) {
    signupForm.addEventListener("submit", function (event) { return __awaiter(_this, void 0, void 0, function () {
        var formData, name, email, password, role, response, result, errorData, error_1;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    // Prevent the default form submission
                    event.preventDefault();
                    formData = new FormData(signupForm);
                    name = ((_a = formData.get("username")) === null || _a === void 0 ? void 0 : _a.toString()) || "";
                    email = ((_b = formData.get("email")) === null || _b === void 0 ? void 0 : _b.toString()) || "";
                    password = ((_c = formData.get("password")) === null || _c === void 0 ? void 0 : _c.toString()) || "";
                    role = ((_d = formData.get("role")) === null || _d === void 0 ? void 0 : _d.toString()) || "";
                    // Validate inputs
                    if (!name || !email || !password || !role) {
                        alert("Please fill out all fields and select a role.");
                        return [2 /*return*/];
                    }
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, fetch("http://localhost:3000/api/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ name: name, email: email, password: password, role: role }),
                        })];
                case 2:
                    response = _e.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _e.sent();
                    window.location.href =
                        "/Cyber_Project/FrontEnd/src/login.html";
                    alert("Signup successful! You can now log in.");
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    errorData = _e.sent();
                    alert("Signup failed: ".concat(errorData.message || "Unknown error occurred"));
                    _e.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _e.sent();
                    console.error("Error during signup:", error_1);
                    alert("An error occurred while signing up. Please try again later.");
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); });
}
