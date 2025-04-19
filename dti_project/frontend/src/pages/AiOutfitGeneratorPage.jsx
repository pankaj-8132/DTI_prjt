import { useState } from "react";
import axios from "axios";

function AiOutfitGeneratorPage() {
	const [formData, setFormData] = useState({
		size: "M",
		color: "black",
		weight: 65,
		occasion: "casual",
	});
	const [result, setResult] = useState("");

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		try {
			const res = await axios.post("http://localhost:5000/api/ai-outfit", formData);
			setResult(res.data.suggestion);
		} catch (err) {
			console.error("Error generating outfit:", err);
		}
	};

	return (
		<div className='p-8'>
			<h2 className='text-2xl font-bold mb-4'>AI Outfit Generator</h2>
			<div className='space-y-4'>
				<select name="size" value={formData.size} onChange={handleChange} className='p-2 rounded'>
					<option value="S">Small</option>
					<option value="M">Medium</option>
					<option value="L">Large</option>
					<option value="XL">XL</option>
				</select>

				<input
					type="text"
					name="color"
				 placeholder="Preferred color"
					value={formData.color}
					onChange={handleChange}
					className='p-2 rounded block'
				/>

				<input
					type="number"
					name="weight"
					placeholder="Weight (kg)"
					value={formData.weight}
					onChange={handleChange}
					className='p-2 rounded block'
				/>

				<select name="occasion" value={formData.occasion} onChange={handleChange} className='p-2 rounded'>
					<option value="casual">Casual</option>
					<option value="formal">Formal</option>
					<option value="party">Party</option>
					<option value="gym">Gym</option>
				</select>

				<button onClick={handleSubmit} className='bg-green-500 text-white px-4 py-2 rounded'>
					Generate Outfit
				</button>

				{result && <p className='mt-4 bg-gray-800 p-4 rounded'>{result}</p>}
			</div>
		</div>
	);
}

export default AiOutfitGeneratorPage;
