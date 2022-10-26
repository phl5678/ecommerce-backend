"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = exports.createAuthToken = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../database");
/**
 * This creates jwt authentication token.
 * @param user User object. Id, and email are required.
 * @returns the signed token or undefined if failed to sign.
 */
const createAuthToken = (user) => {
    try {
        if (user.id === undefined)
            throw new Error('user ID is required.');
        return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, database_1.TOKEN_SECRET);
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`jwt.sign failed: ${err.message}`);
        }
    }
};
exports.createAuthToken = createAuthToken;
/**
 * This middleware verifies the jwt token by checking below 4 different places, and give authorization to users.
 * Admin serves as super user, has ultimate authority. For regular users, the token user id needs to match the uid
 * in the request parameter to gain access.
 * 1) Authorization key in request headers which is formatted as 'Bearer <token>'
 * 2) x-access-token key in request headers
 * 3) token parameter in request query
 * 4) token key in request body
 * @param req http request.
 * @param res htpp response.
 * @param next express next function.
 */
const verifyAuthToken = (req, res, next) => {
    try {
        let token = '';
        const ary = [
            req.headers.authorization,
            req.headers['x-access-token'],
            req.body.token,
            req.query.token,
        ]; //handle all possible ways to get tokens.
        //The format for req.headers.authorization is 'Bearer <token>'. Need special string handling, see the i===0 case.
        for (let i = 0; i < ary.length; i++) {
            if (token.length !== 0)
                break;
            if (ary[i] === undefined)
                continue;
            token = i === 0 ? ary[i].split(' ')[1] : ary[i];
        }
        if (token.length === 0)
            throw new Error('Token is missing.');
        const decoded = jsonwebtoken_1.default.verify(token, database_1.TOKEN_SECRET);
        const decodedUser = decoded;
        //Admin is the super user who can access any endpoints. Otherwise, end user can only access their own pages under /users/:uid/
        if (decodedUser.role === user_1.UserRole.Admin ||
            decodedUser.id === parseInt(req.params.uid)) {
            next();
        }
        else {
            throw new Error('User not permitted.');
        }
    }
    catch (err) {
        res.status(401);
        res.send(err);
    }
};
exports.verifyAuthToken = verifyAuthToken;
