const cron = require('node-cron');
const axios = require('axios');
const Asset = require('../models/asset');

async function fetchAssets() {
    let retries = 3;
    while (retries > 0) {
        try {
            const response = await axios.get('https://669ce22d15704bb0e304842d.mockapi.io/assets');
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.error(`API error (${error.response?.status}). Retrying...`);
            retries--;
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
    return [];
}

async function syncAssets() {
    try {
        const assets = await fetchAssets();
        if (!assets.length) {
            console.log('No assets to sync.');
            return;
        }

        for (const asset of assets) {
            await Asset.findOneAndUpdate(
                { id: asset.id },
                {
                    name: asset.name,
                    type: asset.type,
                    status: asset.status
                },
                { upsert: true, new: true }
            );
        }

        console.log('Assets synchronized successfully.');
        console.log(" Asset data:", assets);
    } catch (error) {
        console.error('Error syncing assets:', error);
    }
}

// run job
cron.schedule('*/5 * * * *', async () => {
    console.log("⏳ Running asset sync...");
    try {
        await syncAssets();
        console.log("Sync completed successfully.");
    } catch (error) {
        console.error(" Sync failed:", error);
    }
});

module.exports = syncAssets;
