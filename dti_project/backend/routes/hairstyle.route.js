import express from "express";
const router = express.Router();

const sampleStyles = [
  "Elegant Updo",
  "Braided Crown",
  "Messy Bun",
  "Beach Waves",
  "Classic Ponytail",
];

router.get("/", (req, res) => {
  const { occasion } = req.query;

  if (!occasion) {
    return res.status(400).json({ error: "Occasion not provided" });
  }

  const suggestions = sampleStyles.map((name, index) => ({
    name,
    image: "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9",
  }));

  return res.json({ occasion, suggestions });
});

export default router;
