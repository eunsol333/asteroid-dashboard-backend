import { Request, Response } from "express";
import fetch from "node-fetch";
import { Neo, NeoResponse } from "../models/asteroids";

const nasaApiUrl = "https://api.nasa.gov/neo/rest/v1/feed";

export const getAsteroids = async (req: Request, res: Response) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const searchString = String(req.query.searchString);
  try {
    const response = await fetch(
      `${nasaApiUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from NASA API");
    }

    const responseData: NeoResponse = await response.json();

    var data: Neo[] = Object.entries(responseData.near_earth_objects).flatMap(
      ([date, asteroids]) => {
        return asteroids;
      }
    );

    if (searchString?.trim() !== "") {
      data = data.filter((asteroid) =>
        asteroid.name.toLowerCase().includes(searchString.toLowerCase())
      );
    }
    res.status(200).json(data);
  } catch (e) {
    res
      .status(500)
      .json({ error: (e as Error).message || "Internal Server Error" });
  }
};
