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
var loginForm = document.querySelector("form");
if (loginForm) {
    loginForm.addEventListener("submit", function (event) { return __awaiter(_this, void 0, void 0, function () {
        var formData, emailOrUsername, password, response, result, userRole, errorData, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    event.preventDefault();
                    formData = new FormData(loginForm);
                    emailOrUsername = ((_a = formData.get("username")) === null || _a === void 0 ? void 0 : _a.toString()) || "";
                    password = ((_b = formData.get("password")) === null || _b === void 0 ? void 0 : _b.toString()) || "";
                    // Validate inputs
                    if (!emailOrUsername || !password) {
                        alert("Please fill in all fields.");
                        return [2 /*return*/];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, fetch("http://localhost:3000/api/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: emailOrUsername,
                                password: password,
                            }),
                            credentials: "include",
                        })];
                case 2:
                    response = _c.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _c.sent();
                    localStorage.setItem("user", result.name);
                    localStorage.setItem("token", result.token);
                    userRole = result.role;
                    if (userRole === "seller") {
                        window.location.href =
                            "/Cyber_Project/FrontEnd/src/Dashboard.html";
                    }
                    else if (userRole === "buyer") {
                        window.location.href =
                            "/Cyber_Project/FrontEnd/src/Buyerdashborad.html";
                    }
                    else {
                        alert("Invalid user role received.");
                    }
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    errorData = _c.sent();
                    alert(errorData.message || "Login failed. Please try again.");
                    _c.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _c.sent();
                    console.error("Error during login:", error_1);
                    alert("An error occurred. Please check your connection and try again.");
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); });
}
// Utility function to check if the user is already logged in
var checkAuth = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, checker, user, userRole, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, fetch("http://localhost:3000/api/auth-check", {
                        method: "GET",
                        credentials: "include", // Send cookies with the request
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                checker = _a.sent();
                if (!response) return [3 /*break*/, 4];
                return [4 /*yield*/, response.json()];
            case 3:
                user = _a.sent();
                userRole = user.role;
                // Redirect based on the role if already logged in
                if (userRole === "seller") {
                    window.location.href = "/seller-dashboard.html";
                }
                else if (userRole === "buyer") {
                    window.location.href = "/buyer-dashboard.html";
                }
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.warn("User is not authenticated:", error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
// Check authentication when the page loads
checkAuth();
