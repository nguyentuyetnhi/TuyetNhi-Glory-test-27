const cron = require('node-cron');
const axios = require('axios');
const Asset = require('../models/asset');


async function syncAssets() {
    try {
        const response = await axios.get('https://669ce22d15704bb0e304842d.mockapi.io/assets');
        const assets = response.data;

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
        console.log("data", assets);
    } catch (error) {
        console.error('Error syncing assets:', error);
    }


}

async function fetchAssets() {
    let retries = 3;
    while (retries > 0) {
        try {
            const response = await axios.get('https://br-company.com/api/assets');
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.error(` API error (${error.response?.status}). try again ...`);
            retries--;
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
    return [];
}


module.exports = syncAssets;


cron.schedule('*/5 * * * *', async () => {
    console.log("processing...");
    try {
        await syncAssets();
        console.log("sync successful.");
    } catch (error) {
        console.error("error sync:", error);
    }
});

module.exports = syncAssets;
