import { useState } from "react";
import axios from "axios";

const AiOutfitSuggestionsPage = () => {
	const [city, setCity] = useState("");
	const [weather, setWeather] = useState(null);
	const [suggestion, setSuggestion] = useState("");
	const [loading, setLoading] = useState(false);

	const getSuggestion = (temp, weatherMain) => {
		if (weatherMain.includes("Rain")) return "Wear a waterproof jacket and boots.";
		if (temp < 10) return "It's cold. A hoodie and thermal wear is recommended.";
		if (temp > 30) return "It's hot. Go for a summer dress or light cotton clothes.";
		return "Mild weather. A casual outfit would work fine.";
	};

	const fetchWeather = async () => {
        if (!city) return;
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/weather?city=${city}`, {
                withCredentials: true,
            });
            const data = res.data;
            setWeather(data);
            const suggestionText = getSuggestion(data.main.temp, data.weather[0].main);
            setSuggestion(suggestionText);
        } catch (err) {
            alert("Failed to fetch weather. Check city name.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

	return (
		<div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
			<h1 className="text-2xl font-bold text-gray-800 mb-4">AI Outfit Suggestions</h1>
			<input
				type="text"
				placeholder="Enter city"
				value={city}
				onChange={(e) => setCity(e.target.value)}
				className="w-full p-2 border rounded mb-4"
			/>
			<button
				onClick={fetchWeather}
				className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
				disabled={loading}
			>
				{loading ? "Checking..." : "Get Suggestion"}
			</button>

			{weather && (
				<div className="mt-6">
					<h2 className="text-lg font-semibold">Weather in {weather.name}:</h2>
					<p>Temperature: {weather.main.temp}°C</p>
					<p>Condition: {weather.weather[0].main}</p>
					<p className="mt-4 font-medium text-green-700">Suggested Outfit: {suggestion}</p>
				</div>
			)}
		</div>
	);
};

export default AiOutfitSuggestionsPage; 
