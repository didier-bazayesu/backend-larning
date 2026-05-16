const getDataFromDb = require('../database/db');

async function filteredData(search,otherSearch) {    
 const data = await getDataFromDb();

    if(search && otherSearch){
        return data.filter(
            (item) =>       (item.continent.toLowerCase() === search.toLowerCase() && item.country.toLowerCase() === otherSearch.toLowerCase()) ||
            (item.continent.toLowerCase() === otherSearch.toLowerCase() && item.country.toLowerCase() === search.toLowerCase())
        );
    }

    return data.filter(
    (item) =>
        item.continent.toLowerCase() === search.toLowerCase() ||
        item.country.toLowerCase() === search.toLowerCase()
    );
}

module.exports = filteredData;