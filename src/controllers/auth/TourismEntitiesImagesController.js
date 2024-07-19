import TourismEntitiesImagesModel from '../../models/auth/TourismEntitiesImages.js';

// ดึงภาพทั้งหมด
const getAllImages = async (req, res) => {
    try {
        const images = await TourismEntitiesImagesModel.getAllImages();
        console.log('All Images:', images);
        res.json(images);
    } catch (error) {
        console.error('Error fetching all images:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ดึงภาพตามไอดี
const getImageById = async (req, res) => {
    try {
        const id = req.params.id;
        const image = await TourismEntitiesImagesModel.getImageById(id);
        console.log(`Image with ID ${id}:`, image);
        if (image) {
            res.json(image);
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
    } catch (error) {
        console.error('Error fetching image by ID:', error);
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
        console.log('Created Images IDs:', insertIds);

        res.json({
            message: 'Images uploaded successfully',
            ids: insertIds
        });
    } catch (error) {
        console.error('Error creating images:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateImages = async (req, res) => {
    const id = req.params.id;
    const imagePaths = req.files.map(file => file.filename);

    try {
        const [entity] = await pool.query('SELECT id FROM tourist_entities WHERE id = ?', [id]);
        console.log('Tourist Entity:', entity);

        if (entity.length === 0) {
            return res.status(404).json({ error: 'Tourist entity not found' });
        }

        const affectedRows = await TourismEntitiesImagesModel.update(id, imagePaths);
        console.log('Updated Rows:', affectedRows);

        if (affectedRows > 0) {
            res.json({ message: `Images for entity with ID ${id} updated successfully` });
        } else {
            res.status(404).json({ error: 'Entity not found or no images updated' });
        }
    } catch (error) {
        console.error('Error updating images:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteImage = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await TourismEntitiesImagesModel.remove(id);
        console.log('Deleted Rows:', affectedRows);
        if (affectedRows > 0) {
            res.json({ message: `Image with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
    } catch (error) {
        console.error('Error deleting image:', error);
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
