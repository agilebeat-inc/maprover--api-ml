'use strict';

module.exports.inferHandler = async (event, context) => {

    const stage = event['requestContext']['stage'];
    const domainName = event['requestContext']['domainName'];

    const maprover_config = {
        'airway-runway':  {
            "model-name": "airway runway",
            "model-label": "Runway",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/airway-runway"
        },
        'railway-rail':  {
            "model-name": "railway rail",
            "model-label": "Railway",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/railway-rail"
        },
        'highway-motorway':  {
            "model-name": "highway motorway",
            "model-label": "Highway",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/highway-motorway"
        },
        'highway-trunk':  {
            "model-name": "highway trunk",
            "model-label": "Highway",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/highway-trunk"
        },
        'highway-primary':  {
            "model-name": "highway primary",
            "model-label": "Highway",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/highway-primary"
        },
        'highway-secondary':  {
            "model-name": "highway secondary",
            "model-label": "Highway",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/highway-secondary"
        },
        'aeroway-helipad':  {
            "model-name": "aeroway helipad",
            "model-label": "Helipad",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/aeroway-helipad"
        },
        'amenity-hospital':  {
            "model-name": "amenity hospital",
            "model-label": "Hospital",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/amenity-hospital"
        },
        'amenity-police':  {
            "model-name": "amenity police",
            "model-label": "Police",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/amenity-police"
        },
        'amenity-firestation':  {
            "model-name": "amenity firestation",
            "model-label": "Firestation",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/amenity-firestation"
        },
        'landuse-quarry': {
            "model-name": "landuse quarry",
            "model-label": "Quarry",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/landuse-quarry"
          }
    }

    const response = {
        statusCode: 200,
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(maprover_config)
    }; 
    return response;
};