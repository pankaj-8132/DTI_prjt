import { useState } from "react";
import axios from "axios";

const HairstyleGeneratorPage = () => {
	const [occasion, setOccasion] = useState("");
	const [styles, setStyles] = useState([]);
	const [error, setError] = useState("");

	const generateHairstyles = async () => {
		try {
			const res = await axios.get("http://localhost:5000/api/hairstyles", {
				params: { occasion },
			});
			setStyles(res.data.suggestions); // array of style names
			setError("");
		} catch (err) {
			setError("No styles found");
			setStyles([]);
		}
	};

	const getImageUrl = (styleName) =>
		`https://source.unsplash.com/400x400/?hairstyle,${encodeURIComponent(styleName)},${encodeURIComponent(occasion)}`;

	return (
		<div className='p-8 bg-gradient-to-br from-gray-900 to-black text-white min-h-screen'>
			<h2 className='text-4xl font-bold text-center mb-8'>Find Hairstyles for Your Occasion</h2>

			<div className='max-w-md mx-auto mb-6'>
				<select
					className='w-full p-3 text-black rounded'
					value={occasion}
					onChange={(e) => setOccasion(e.target.value)}
				>
					<option value=''>Select Occasion</option>
					<option value='reception'>Reception</option>
					<option value='wedding'>Wedding</option>
					<option value='party'>Party</option>
					<option value='casual'>Casual</option>
				</select>
				<button
					onClick={generateHairstyles}
					className='mt-4 w-full bg-emerald-500 hover:bg-emerald-600 py-2 rounded text-lg font-medium'
				>
					Show Hairstyles
				</button>
			</div>

			{styles.length > 0 && (
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
					{styles.map((style, idx) => (
						<div
							key={idx}
							className='rounded overflow-hidden shadow-md bg-white bg-opacity-10 backdrop-blur-md hover:scale-105 transform transition'
						>
							<img
								src={getImageUrl(style.name || style)}
								alt={style.name || style}
								className='w-full h-60 object-cover'
							/>
							<div className='p-2 text-center'>
								<p className='text-sm'>{style.name || style}</p>
							</div>
						</div>
					))}
				</div>
			)}

			{error && <p className='text-red-400 mt-6 text-center'>{error}</p>}
		</div>
	);
};

export default HairstyleGeneratorPage;
