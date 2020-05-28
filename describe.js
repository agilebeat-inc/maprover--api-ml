'use strict';

module.exports.inferHandler = async (event, context) => {

    const stage = event['requestContext']['stage'];
    const domainName = event['requestContext']['domainName'];

    const maprover_config = {
        'format-description': '{model-name, [command, domain name, deployment stage, rel_path]}}',
        'highway-motorway':  ['highway motorway', domainName, stage, '/infer/highway-motorway'],
        'highway-trunk':  ['highway trunk', domainName, stage, '/infer/highway-trunk'],
        'highway-primary':  ['highway primary', domainName, stage, '/infer/highway-primary'],
        'highway-secondary':  ['highway secondary', domainName, stage, '/infer/highway-secondary'],
        'aeroway-helipad':  ['aeroway helipad', domainName, stage, '/infer/aeroway-helipad'],
        'amenity-hospital':  ['amenity hospital', domainName, stage, '/infer/amenity-hospital'],
        'amenity-police':  ['amenity police', domainName, stage, '/infer/amenity-police'],
        'amenity-firestation':  ['amenity firestation', domainName, stage, '/infer/amenity-firestation'],
        'landuse-quarry':  ['landuse quarry', domainName, stage, '/infer/landuse-quarry']
    }

    const response = {
        statusCode: 200,
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(maprover_config)
    }; 
    return response;
};