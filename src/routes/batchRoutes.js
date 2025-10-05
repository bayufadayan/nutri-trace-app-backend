// src/routes/batchRoutes.js
import express from 'express';
import * as batchController from '../controllers/batchController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', batchController.createBatch);
router.get('/', batchController.getBatches);
router.get('/:id', batchController.getBatch);
router.put('/:id', batchController.updateBatch);
router.delete('/:id', batchController.deleteBatch);

export default router;
