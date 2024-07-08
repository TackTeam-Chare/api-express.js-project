import express from 'express';
import TouristEntityController from '../../controllers/auth/TouristEntityController.js';
import TourismEntitiesImagesController from '../../controllers/auth/TourismEntitiesImagesController.js';
import SeasonEntityController from '../../controllers/auth/SeasonEntityController.js';
import SeasonsRelationController from '../../controllers/auth/SeasonsRelationController.js';
import CategoryEntityController from '../../controllers/auth/CategoryEntityController.js';
import OperatingHoursEntityController from '../../controllers/auth/OperatingHoursEntityController.js';
import DistrictEntityController from '../../controllers/auth/DistrictEntityController.js';


const router = express.Router();


// Tourist Entities
router.get('/tourist-entities', TouristEntityController.getAllTouristEntities); // ดึงข้อมูลตารางสถานที่ทั้งหมด
router.get('/tourist-entities/:id', TouristEntityController.getTouristEntityById); // ดึงข้อมูลตารางสถานที่ด้วยไอดี
router.get('/tourist-entities/:id/nearby', TouristEntityController.getNearbyTouristEntitiesHandler); // ดึงข้อมูลตารางสถานที่ด้วยไอดีและสถานที่ใกล้เคียง
router.post('/tourist-entities', TouristEntityController.createTouristEntity); // สร้างข้อมูลสถานที่ท่องเที่ยวใหม่
router.put('/tourist-entities/:id', TouristEntityController.updateTouristEntity); // อัปเดตข้อมูลสถานที่ท่องเที่ยวตามไอดี
router.delete('/tourist-entities/:id', TouristEntityController.deleteTouristEntity); // ลบข้อมูลสถานที่ท่องเที่ยวตามไอดี

// Tourism Entities Images
router.get('/tourism-entities-images', TourismEntitiesImagesController.getAllImages); // ดึงข้อมูลตารางสถานที่ทั้งหมด
router.get('/tourism-entities-images/:id', TourismEntitiesImagesController.getImageById); 
router.post('/tourism-entities-images', TourismEntitiesImagesController.createImage); // เพิ่มรูปภาพสถานที่ท่องเที่ยว
router.put('/tourism-entities-images/:id', TourismEntitiesImagesController.updateImage); // เพิ่มรูปภาพสถานที่ท่องเที่ยว
router.delete('/tourism-entities-images/:id', TourismEntitiesImagesController.deleteImage); // ลบรูปภาพสถานที่ท่องเที่ยวตามไอดี

// Operating Hours
router.get('/operating-hours', OperatingHoursEntityController.getAllOperatingHours); // ดึงข้อมูลเวลาทำการทั้งหมด
router.get('/operating-hours/:id', OperatingHoursEntityController.getOperatingHoursById); // ดึงข้อมูลเวลาทำการตามไอดี
router.get('/tourist-entities/operating-hours/:day_of_week/:opening_time/:closing_time', OperatingHoursEntityController.getTouristEntitiesByTime); // ดึงข้อมูลสถานที่ท่องเที่ยวตามเวลาที่เปิด-ปิด
router.post('/operating-hours', OperatingHoursEntityController.createOperatingHours); // เพิ่มเวลาทำการใหม่
router.put('/operating-hours/:id', OperatingHoursEntityController.updateOperatingHours); // อัปเดตเวลาทำการตามไอดี
router.delete('/operating-hours/:id', OperatingHoursEntityController.deleteOperatingHours); // ลบเวลาทำการตามไอดี

// Seasons
router.get('/seasons', SeasonEntityController.getAllSeasons); // ดึงข้อมูลฤดูกาลทั้งหมด
router.get('/seasons/:id', SeasonEntityController.getSeasonById); // ดึงข้อมูลสถานที่ท่องเที่ยวตามฤดูกาล
router.get('/tourist-entities/seasons/:id', SeasonEntityController.getTouristEntitiesBySeason); // ดึงข้อมูลสถานที่ท่องเที่ยวตามฤดูกาล
router.post('/seasons', SeasonEntityController.createSeason); // เพิ่มฤดูกาลใหม่
router.put('/seasons/:id', SeasonEntityController.updateSeason); // อัปเดตฤดูกาลตามไอดี
router.delete('/seasons/:id', SeasonEntityController.deleteSeason); // ลบฤดูกาลตามไอดี

// Seasons Relation
router.get('/seasons-relation', SeasonsRelationController.getAllSeasonsRelations); 
router.get('/seasons-relation/:id', SeasonsRelationController.getSeasonsRelationById); 
router.post('/seasons-relation', SeasonsRelationController.createSeasonsRelation); // เพิ่มความสัมพันธ์ฤดูกาล
router.put('/seasons-relation', SeasonsRelationController.updateSeasonsRelation); // เพิ่มความสัมพันธ์ฤดูกาล
router.delete('/seasons-relation/:id', SeasonsRelationController.deleteSeasonsRelation); // ลบความสัมพันธ์ฤดูกาลตามไอดี


// Districts
router.get('/districts', DistrictEntityController.getAllDistricts); // ดึงข้อมูลเขตทั้งหมด
router.get('/districts/:id', DistrictEntityController.getDistrictById); // ดึงข้อมูลสถานที่ท่องเที่ยวตามเขต
router.get('/tourist-entities/districts/:id', DistrictEntityController.getTouristEntitiesByDistrict); // ดึงข้อมูลสถานที่ท่องเที่ยวตามเขต
router.post('/districts', DistrictEntityController.createDistrict); // เพิ่มเขตใหม่
router.put('/districts/:id', DistrictEntityController.updateDistrict); // อัปเดตเขตตามไอดี
router.delete('/districts/:id', DistrictEntityController.deleteDistrict); // ลบเขตตามไอดี

// Categories
router.get('/categories', CategoryEntityController.getAllCategories); // ดึงข้อมูลหมวดหมู่ทั้งหมด
router.get('/tourist-entities/categories/:id', CategoryEntityController.getTouristEntitiesByCategory); // ดึงข้อมูลสถานที่ท่องเที่ยวตามหมวดหมู่
router.get('/categories/:id', CategoryEntityController.getCategoryById); // ดึงข้อมูลสถานที่ท่องเที่ยวตามหมวดหมู่
router.post('/categories', CategoryEntityController.createCategory); // เพิ่มหมวดหมู่ใหม่
router.put('/categories/:id', CategoryEntityController.updateCategory); // อัปเดตหมวดหมู่ตามไอดี
router.delete('/categories/:id', CategoryEntityController.deleteCategory); // ลบหมวดหมู่ตามไอดี

export default router;
