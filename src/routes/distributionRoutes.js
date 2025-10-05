// src/routes/distributionRoutes.js
import express from 'express';
import * as distributionController from '../controllers/distributionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// semua route butuh login
router.use(authMiddleware);

router.post('/', distributionController.createDistribution);
router.get('/', distributionController.getDistributions);
router.get('/:id', distributionController.getDistribution);
router.put('/:id', distributionController.updateDistribution);
router.delete('/:id', distributionController.deleteDistribution);

export default router;
