// src/controllers/distributionController.js
import * as distributionService from '../services/distributionService.js';

export async function createDistribution(req, res) {
    try {
        const { batchId, driverName, truckId, fromLocation, toLocation, sentAt } = req.body;
        const distribution = await distributionService.createDistribution({
            batchId,
            driverName,
            truckId,
            fromLocation,
            toLocation,
            sentAt,
            userId: req.user.id
        });
        res.status(201).json(distribution);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function getDistributions(req, res) {
    try {
        const distributions = await distributionService.getAllDistributions();
        res.json(distributions);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function getDistribution(req, res) {
    try {
        const distribution = await distributionService.getDistributionById(req.params.id);
        res.json(distribution);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function updateDistribution(req, res) {
    try {
        const updated = await distributionService.updateDistribution(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function deleteDistribution(req, res) {
    try {
        await distributionService.deleteDistribution(req.params.id);
        res.json({ message: 'Distribution deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
