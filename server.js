const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


/* ==========================================
   HEALTH CHECK
========================================== */

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "IAMVI LEADS API is running"
    });

});


/* ==========================================
   BUSINESS SEARCH
========================================== */

app.get("/api/search", async (req, res) => {

    try {

        const business =
            String(req.query.business || "").trim();

        const location =
            String(req.query.location || "").trim();


        if (!business || !location) {

            return res.status(400).json({
                success: false,
                message:
                    "Business type and location are required."
            });

        }


        const apiKey =
            process.env.GOOGLE_MAPS_API_KEY;


        if (!apiKey) {

            return res.status(500).json({
                success: false,
                message:
                    "Google Maps API key is not configured."
            });

        }


        const response =
            await fetch(
                "https://places.googleapis.com/v1/places:searchText",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "X-Goog-Api-Key": apiKey,

                        "X-Goog-FieldMask":
                            "places.id," +
                            "places.displayName," +
                            "places.formattedAddress," +
                            "places.nationalPhoneNumber," +
                            "places.websiteUri," +
                            "places.rating," +
                            "places.userRatingCount," +
                            "places.primaryType"
                    },

                    body: JSON.stringify({

                        textQuery:
                            `${business} in ${location}`,

                        pageSize: 20,

                        regionCode: "NG"

                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                "Google Places error:",
                data
            );

            return res.status(response.status).json({
                success: false,
                message:
                    "Business search failed.",
                error: data
            });

        }


        const places =
            (data.places || []).map(place => ({

                id:
                    place.id || "",

                name:
                    place.displayName?.text || "Unknown",

                address:
                    place.formattedAddress || "",

                phone:
                    place.nationalPhoneNumber || "",

                website:
                    place.websiteUri || "",

                rating:
                    place.rating || null,

                reviews:
                    place.userRatingCount || 0,

                category:
                    place.primaryType || business

            }));


        res.json({

            success: true,

            count: places.length,

            search: {
                business,
                location
            },

            leads: places

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Server error while searching businesses."

        });

    }

});


/* ==========================================
   START SERVER
========================================== */

app.listen(PORT, () => {

    console.log(
        `IAMVI LEADS server running on port ${PORT}`
    );

});
