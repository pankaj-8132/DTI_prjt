// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import path from "path";
// import axios from "axios"; // <-- Add this for weather fetch
// dotenv.config();
// import { connectDB } from "./db/connectDB.js";
// import authRoutes from "./routes/auth.route.js";



// const app = express();
// const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.get("/api/weather", async (req, res) => {
// 	try {
// 		const city = req.query.city;
// 		const apiKey = "65fe24226932fd6f65434db2e5568c82"; // <--- Hardcoded API key

// 		if (!city) return res.status(400).json({ error: "City is required" });

// 		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// 		const weatherRes = await axios.get(url);
// 		res.json(weatherRes.data);
// 	} catch (err) {
// 		console.error("❌ Weather fetch failed:", err.message);
// 		res.status(500).json({ error: err.message });
// 	}
// });


// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

// app.listen(PORT, () => {
// 	connectDB();
// 	console.log("Server is running on port:", PORT);
// });




import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import axios from "axios"; // For weather fetch
dotenv.config();

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import hairstyleRoutes from "./routes/hairstyle.route.js"; // ✅ Add this

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/hairstyles", hairstyleRoutes); // ✅ Add this line

// ✅ WEATHER API
app.get("/api/weather", async (req, res) => {
	try {
		const city = req.query.city;
		const apiKey = "65fe24226932fd6f65434db2e5568c82"; // <-- Hardcoded API key

		if (!city) return res.status(400).json({ error: "City is required" });

		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

		const weatherRes = await axios.get(url);
		res.json(weatherRes.data);
	} catch (err) {
		console.error("❌ Weather fetch failed:", err.message);
		res.status(500).json({ error: err.message });
	}
});

// ✅ DEPLOYMENT CONFIG
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// ✅ START SERVER
app.listen(PORT, () => {
	connectDB();
	console.log("🚀 Server is running on port:", PORT);
});
