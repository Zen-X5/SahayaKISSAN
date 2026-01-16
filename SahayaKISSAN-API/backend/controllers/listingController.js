import Listing from "../models/Listing.js";



export const getMyListings = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = status ? { status } : {};
    const listings = await Listing.find(filter).sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateListingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ================= DELETE LISTING ================= */
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
