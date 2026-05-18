const getDataFromDb = require('../database/db');

async function filteredData(search) {

    const { continent, country, is_open_to_public } = search;

    const data = await getDataFromDb();

    if (Object.keys(search).length === 0) {
        return data;
    }

    return data.filter(item => {

        if (
            country &&
            item.country.toLowerCase() !== country.toLowerCase()
        ) {
            return false;
        }

        if (
            continent &&
            item.continent.toLowerCase() !== continent.toLowerCase()
        ) {
            return false;
        }

        if (
            is_open_to_public &&
            item.is_open_to_public.toString().toLowerCase() !==
            is_open_to_public.toLowerCase()
        ) {
            return false;
        }

        return true;
    });
}

module.exports = filteredData;