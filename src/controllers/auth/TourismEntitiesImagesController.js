import TourismEntitiesImagesModel from '../../models/auth/TourismEntitiesImages.js';

// Get all images
const getAllImages = async (req, res) => {
    try {
        const images = await TourismEntitiesImagesModel.getAllImages();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get image by ID
const getImageById = async (req, res) => {
    try {
        const id = req.params.id;
        const image = await TourismEntitiesImagesModel.getImageById(id);
        if (image) {
            res.json(image);
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new image
const createImage = async (req, res) => {
    const image = req.body;
    try {
        const insertId = await TourismEntitiesImagesModel.create(image);
        res.json({
            message: 'Image created successfully',
            id: insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an image
const updateImage = async (req, res) => {
    const id = req.params.id;
    const image = req.body;
    try {
        const affectedRows = await TourismEntitiesImagesModel.update(id, image);
        if (affectedRows > 0) {
            res.json({ message: `Image with ID ${id} updated successfully` });
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an image
const deleteImage = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await TourismEntitiesImagesModel.remove(id);
        if (affectedRows > 0) {
            res.json({ message: `Image with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getAllImages,
    getImageById,
    createImage,
    updateImage,
    deleteImage,
};
