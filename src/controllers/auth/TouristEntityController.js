import TouristModel from '../../models/auth/TouristEntity.js';
import DistrictModel from '../../models/auth/District.js';
import CategoryModel from '../../models/auth/Category.js';


const getAllTouristEntities = async (req, res) => {
    try {
        const entities = await TouristModel.getAllTouristEntities();
        if (entities && entities.length > 0) {
            res.json(entities);
        } else {
            res.status(404).json({
                error: 'Tourist entity not found'
            });
        }
    } catch (error) {
        console.error('Error fetching tourist entity:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const getTouristEntityById = async (req, res) => {
    try {
      const id = req.params.id;
      const touristEntity = await TouristModel.getTouristEntityDetailsById(id);
      if (touristEntity) {
        res.json(touristEntity);
      } else {
        res.status(404).json({ error: 'Tourist entity not found' });
      }
    } catch (error) {
      console.error('Error fetching tourist entity:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const getNearbyTouristEntitiesHandler = async (req, res) => {
    try {
      const id = req.params.id;
      let { radius = 1500 } = req.query;
      radius = parseInt(radius, 10);
      if (isNaN(radius) || radius <= 0) {
        radius = 1500;
      }
      const entity = await TouristModel.getTouristEntityDetailsById(id);
      if (!entity) {
        return res.status(404).json({ error: 'Tourist entity not found' });
      }
      const nearbyEntities = await TouristModel.getNearbyTouristEntities(entity.latitude, entity.longitude, radius, id);
      res.json({ entity, nearbyEntities });
    } catch (error) {
      console.error('Error fetching tourist entity details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
// Create a new tourist entity
// const createTouristEntity = async (req, res) => {
//     const touristEntity = req.body;
//     try {
//         const insertId = await TouristModel.create(touristEntity);
//         res.json({
//             message: 'Tourist entity created successfully',
//             id: insertId
//         });
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };

const createTouristEntityOld = async (req, res) => {
    const touristEntity = req.body;
    const createdBy = req.user.id; // Assuming req.user.id contains the ID of the authenticated admin
    try {
        const insertId = await TouristModel.createOld(touristEntity, createdBy);
        res.json({
            message: 'Tourist entity created successfully',
            id: insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Update a tourist entity
const updateTouristEntityOld = async (req, res) => {
    const id = req.params.id;
    const touristEntity = req.body;
    try {
        const affectedRows = await TouristModel.updateOld(id, touristEntity);
        if (affectedRows > 0) {
            res.json({
                message: `Tourist entity with ID ${id} updated successfully`
            });
        } else {
            res.status(404).json({
                error: 'Tourist entity not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const createTouristEntity = async (req, res) => {
    const touristEntity = req.body;
    const imagePaths = req.files.map(file => `${file.filename}`); // Adjust the path as needed
    const { district_name, category_name } = touristEntity;

    console.log('Received Data:', touristEntity);
    console.log('Image Paths:', imagePaths);

    try {
        const districtId = await DistrictModel.getIdByName(district_name);
        const categoryId = await CategoryModel.getIdByName(category_name);

        touristEntity.district_id = districtId;
        touristEntity.category_id = categoryId;
        touristEntity.created_by = req.user.id; // Assuming user ID is available in req.user

        console.log('Tourist Entity to be Inserted:', touristEntity);

        const insertId = await TouristModel.create(touristEntity, imagePaths);

        console.log('Insert ID:', insertId);

        res.json({
            message: 'Tourist entity created successfully',
            id: insertId
        });
    } catch (error) {
        console.error('Error in createTouristEntity:', error);
        res.status(500).json({
            error: error.message
        });
    }
};

const updateTouristEntity = async (req, res) => {
  const id = req.params.id;
  const touristEntity = req.body;
  const imagePaths = req.files.map(file => `/uploads/${file.filename}`); // Adjust the path as needed
  const { district_name, category_name } = touristEntity;

  try {
    const districtId = await DistrictModel.getIdByName(district_name);
    const categoryId = await CategoryModel.getIdByName(category_name);

    touristEntity.district_id = districtId;
    touristEntity.category_id = categoryId;

    const affectedRows = await update(id, touristEntity, imagePaths);
    if (affectedRows > 0) {
      res.json({
        message: `Tourist entity with ID ${id} updated successfully`
      });
    } else {
      res.status(404).json({
        error: 'Tourist entity not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
// Delete a tourist entity
const deleteTouristEntity = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await TouristModel.remove(id);
        if (affectedRows > 0) {
            res.json({
                message: `Tourist entity with ID ${id} deleted successfully`
            });
        } else {
            res.status(404).json({
                error: 'Tourist entity not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

export default {
    getAllTouristEntities,
    getTouristEntityById,
    getNearbyTouristEntitiesHandler,
    createTouristEntityOld,
    updateTouristEntityOld,
    createTouristEntity,
    updateTouristEntity,
    deleteTouristEntity,
};