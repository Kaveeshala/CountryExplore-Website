const Favorite = require('../models/Favorite');

// Add to favorites
exports.addFavorite = async (req, res) => {
  const { countryCode, countryName, flag, capital, currency, language } = req.body;

  try {
    const exists = await Favorite.findOne({ user: req.user.id, countryCode });
    if (exists) return res.status(400).json({ message: 'Already in favorites' });

    const favorite = new Favorite({
      user: req.user.id,
      countryCode,
      countryName,
      flag,
      capital,
      currency,
      language
    });

    await favorite.save();
    res.status(201).json({ message: 'Added to favorites', favorite });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's favorites
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteFavorite = async (req, res) => {
    const userId = req.user.id;
    const { countryCode } = req.params;
  
    try {
      const favorite = await Favorite.findOneAndDelete({ user: userId, countryCode });
  
      if (!favorite) {
        return res.status(404).json({ message: "Favorite not found" });
      }
  
      res.status(200).json({ message: "Removed from favorites" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };