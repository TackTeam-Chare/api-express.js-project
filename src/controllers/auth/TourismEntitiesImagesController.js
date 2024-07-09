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

const createImage = async (req, res) => {
    try {
        const tourism_entities_id = req.body.tourism_entities_id;
        const images = req.files.map(file => ({
            tourism_entities_id: tourism_entities_id,
            image_path: file.filename
        }));

        const insertIds = await TourismEntitiesImagesModel.create(images);

        res.json({
            message: 'Images uploaded successfully',
            ids: insertIds
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateImages = async (req, res) => {
    const id = req.params.id;
    const imagePaths = req.files.map(file => file.filename);

    try {
        const affectedRows = await TourismEntitiesImagesModel.update(id, imagePaths);

        if (affectedRows > 0) {
            res.json({ message: `Images for entity with ID ${id} updated successfully` });
        } else {
            res.status(404).json({ error: 'Entity not found or no images updated' });
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
    updateImages,
    deleteImage,
};
