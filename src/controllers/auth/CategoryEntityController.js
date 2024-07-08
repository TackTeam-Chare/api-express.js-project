import CategoryModel from '../../models/auth/Category.js';


const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.getAllCategories();
        if (categories && categories.length > 0) {
            res.json(categories);
        } else {
            res.status(404).json({
                error: 'Tourist entity not found'
            });
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const getTouristEntitiesByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const entities = await CategoryModel.getTouristEntitiesByCategory(categoryId);
        res.json(entities);
    } catch (error) {
        console.error('Error fetching tourist entities by category:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};


export default {
    getAllCategories,
    getTouristEntitiesByCategory,
};