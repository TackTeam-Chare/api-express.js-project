import CategoryModel from '../../models/auth/Category.js';



const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.getAllCategories();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching districts:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};


const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await CategoryModel.getCategoryById(id);

        if (category) {
            res.json(category);
        } else {
            res.status(404).json({
                error: 'category not found for the category entity'
            });
        }
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

// Create a new category
const createCategory = async (req, res) => {
    const category = req.body;
    try {
        const insertId = await CategoryModel.create(category);
        res.json({
            message: 'Category created successfully',
            id: insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    const id = req.params.id;
    const category = req.body;
    try {
        const affectedRows = await CategoryModel.update(id, category);
        if (affectedRows > 0) {
            res.json({ message: `Category with ID ${id} updated successfully` });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await CategoryModel.remove(id);
        if (affectedRows > 0) {
            res.json({ message: `Category with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTouristEntitiesByCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const entities = await CategoryModel.getTouristEntitiesByCategory(id);
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
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getTouristEntitiesByCategory,
};