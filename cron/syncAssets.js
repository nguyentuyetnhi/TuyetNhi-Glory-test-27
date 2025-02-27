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

module.exports = syncAssets;


// run 5 mins
cron.schedule('*/5 * * * *', syncAssets);

module.exports = syncAssets;
