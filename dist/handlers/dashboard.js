"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dashboard_1 = __importDefault(require("../services/dashboard"));
var dashboard = new dashboard_1["default"]();
/**
 * This gets all products that have been included in orders.
 * @param _req http request object (unused)
 * @param res http response object
 */
var productsInOrders = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dashboard.productsInOrders()];
            case 1:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); };
/**
 * This gets top X expensive products. Default 5. To change, add limit=x in the URL query. x is positive integer.
 * Ex. this gets top 3 expensive products: /dashboard/top_expensive_products?limit=3
 * @param req http request object
 * @param res http response object
 */
var topExpensiveProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, limit, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                query = req.query;
                limit = query.limit === undefined ? 5 : query.limit;
                limit = Number(limit);
                if (isNaN(limit) || Number.isInteger(limit) === false || limit <= 0) {
                    throw new Error('invalid limit query value.');
                }
                return [4 /*yield*/, dashboard.topExpensiveProducts(limit)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * This gets top X popular products (products that have been included in the order the most).
 * Default 5. To change, add limit=x in the URL query. x is positive integer.
 * Ex. this gets top 3 popular products: /dashboard/top_popular_products?limit=3
 * @param req http request object
 * @param res http response object
 */
var topPopularProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, limit, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                query = req.query;
                limit = query.limit === undefined ? 5 : query.limit;
                limit = Number(limit);
                if (isNaN(limit) || Number.isInteger(limit) === false || limit <= 0) {
                    throw new Error('invalid limit query value.');
                }
                return [4 /*yield*/, dashboard.topPopularProducts(limit)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * This gets all users that have placed orders.
 * @param _req http request object (unused)
 * @param res http response object
 */
var usersWithOrders = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dashboard.usersWithOrders()];
            case 1:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); };
var dashboardRoutes = function (app) {
    app.get('/dashboard/products_in_orders', productsInOrders);
    app.get('/dashboard/top_expensive_products', topExpensiveProducts);
    app.get('/dashboard/top_popular_products', topPopularProducts);
    app.get('/dashboard/users_with_orders', usersWithOrders);
};
exports["default"] = dashboardRoutes;
