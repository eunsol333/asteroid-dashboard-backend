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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAsteroids = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const nasaApiUrl = "https://api.nasa.gov/neo/rest/v1/feed";
const getAsteroids = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const searchString = String(req.query.searchString);
    try {
        const response = yield (0, node_fetch_1.default)(`${nasaApiUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.API_KEY}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data from NASA API");
        }
        const responseData = yield response.json();
        var data = Object.entries(responseData.near_earth_objects).flatMap(([date, asteroids]) => {
            return asteroids;
        });
        // /////
        // var data: Neo[] = Object.entries(testData.near_earth_objects).flatMap(
        //   ([date, asteroids]) => {
        //     return asteroids;
        //   }
        // );
        // /////
        if ((searchString === null || searchString === void 0 ? void 0 : searchString.trim()) !== "") {
            data = data.filter((asteroid) => asteroid.name.toLowerCase().includes(searchString.toLowerCase()));
        }
        res.status(200).json(data);
    }
    catch (e) {
        res
            .status(500)
            .json({ error: e.message || "Internal Server Error" });
    }
});
exports.getAsteroids = getAsteroids;
