// src/controllers/batchController.js
import * as batchService from '../services/batchServices.js';

export async function createBatch(req, res) {
    try {
        const { materialName, weight, status } = req.body;
        const batch = await batchService.createBatch({
            producerId: req.user.id,
            materialName,
            weight,
            status
        });
        res.status(201).json(batch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function getBatches(req, res) {
    const batches = await batchService.getAllBatches();
    res.json(batches);
}

export async function getBatch(req, res) {
    const batch = await batchService.getBatchById(req.params.id);
    res.json(batch);
}

export async function updateBatch(req, res) {
    try {
        const updated = await batchService.updateBatch(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function deleteBatch(req, res) {
    try {
        await batchService.deleteBatch(req.params.id);
        res.json({ message: 'Batch deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
