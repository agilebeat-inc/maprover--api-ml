'use strict';

module.exports.inferHandler = async (event, context) => {
    const maprover_config = {
        'highway-motorway':  ['highway-motorway', '/infer/highway-motorway'],
        'highway-trunk':  ['highway-trunk', '/infer/highway-trunk'],
        'highway-primary':  ['highway-primary', '/infer/highway-primary'],
        'highway-secondary':  ['highway-secondary', '/infer/highway-secondary'],
        'aeroway-helipad':  ['aeroway-helipad', '/infer/aeroway-helipad'],
        'amenity-hospital':  ['amenity-hospital', '/infer/amenity-hospital'],
        'amenity-police':  ['amenity-police', '/infer/amenity-police'],
        'amenity-firestation':  ['amenity-firestation', '/infer/amenity-firestation'],
        'landuse-quarry':  ['landuse-quarry', '/infer/landuse-quarry']
    }

    const response = {
        statusCode: 200,
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(maprover_config)
    }; 
    return response;
};