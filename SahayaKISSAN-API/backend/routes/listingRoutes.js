import express from "express";
import Listing from "../models/Listing.js";
import upload from "../middlewares/upload.js";
import {
  getMyListings,
  updateListingStatus,
  deleteListing
} from "../controllers/listingController.js";
const router = express.Router();


router.post("/", upload.array("images", 6), async (req, res) => {
  try {
    console.log("New item sold:", req.body);
    console.log("🔥 POST /api/listings HIT");
   console.log("🔥 HEADERS:", req.headers["content-type"]);
    const {
      cropName,
      category,
      variety,
      description,
      quantity,
      unit,
      price,
      minOrder,
      state,
      city,
      harvestDate,
      organic,
      mobile
    } = req.body;

    if (!cropName || !category || !quantity || !price) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const imageUrls = req.files?.map(file => file.path) || [];

    const listing = await Listing.create({
      cropName,
      category,
      variety,
      description,
      quantity,
      unit,
      price,
      minOrder,
      state,
      city,
      harvestDate,
      organic,
      mobile,
      images:imageUrls, 
      status: "active"   
    });


    res.status(201).json({
      success: true,
      message: "Listing saved successfully",
      data: listing
    });

  } catch (error) {
    console.error("SAVE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Add this route to your existing routes
router.patch("/edit/:id", upload.array("images", 6), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    // Update form fields
    const updates = {
      cropName: req.body.cropName,
      category: req.body.category,
      variety: req.body.variety,
      description: req.body.description,
      quantity: req.body.quantity,
      unit: req.body.unit,
      price: req.body.price,
      minOrder: req.body.minOrder,
      state: req.body.state,
      city: req.body.city,
      harvestDate: req.body.harvestDate,
      organic: req.body.organic,
      mobile: req.body.mobile
    };

    // Handle image deletion
    if (req.body.deleteImages) {
      const deleteImages = Array.isArray(req.body.deleteImages) 
        ? req.body.deleteImages 
        : [req.body.deleteImages];
      updates.images = listing.images.filter(img => 
        !deleteImages.includes(img)
      );
    }

    if (req.files && req.files.length > 0) {
      const newImageUrls = req.files.map(file => file.path);
      updates.images = [...updates.images || listing.images, ...newImageUrls];
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id, 
      updates, 
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Listing updated successfully",
      data: updatedListing
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get("/my", getMyListings);
router.patch("/:id/status", updateListingStatus);
router.delete("/:id", deleteListing);



export default router;
