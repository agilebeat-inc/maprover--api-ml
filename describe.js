'use strict';

module.exports.inferHandler = async (event, context) => {

    const stage = event['requestContext']['stage'];
    const domainName = event['requestContext']['domainName'];

    const maprover_config = {
        'airway-runway':  {
            "model-name": "airway runway",
            "model-label": "Airway - Runway",
            "domain": domainName,
            "stage": stage,
            "api_path": "/api/airway-runway"
        },
        'landuse-commercial':  {
            "model-name": "landuse-commercial",
            "model-label": "Commercial zoning",
            "domain": domainName,
            "stage": stage,
            "api_path": "/api/landuse-commercial"
        },
        'landuse-construction':  {
            "model-name": "landuse-construction",
            "model-label": "Construction",
            "domain": domainName,
            "stage": stage,
            "api_path": "/api/landuse-construction"
        },
        'landuse-industrial':  {
            "model-name": "landuse-industrial",
            "model-label": "Industrial zoning",
            "domain": domainName,
            "stage": stage,
            "api_path": "/api/landuse-industrial"
        },
        'landuse-military':  {
            "model-name": "landuse-military",
            "model-label": "Military land use",
            "domain": domainName,
            "stage": stage,
            "api_path": "/api/landuse-military"
        },
        'railway-rail':  {
            "model-name": "railway rail",
            "model-label": "Railroads/railways",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/railway-rail"
        },
        'highway-motorway':  {
            "model-name": "highway motorway",
            "model-label": "Highway, motorway",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/highway-motorway"
        },
        'highway-trunk':  {
            "model-name": "highway trunk",
            "model-label": "Highway, trunk",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/highway-trunk"
        },
        'highway-primary':  {
            "model-name": "highway primary",
            "model-label": "Highway, primary",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/highway-primary"
        },
        'highway-secondary':  {
            "model-name": "highway secondary",
            "model-label": "Highway, secondary",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/highway-secondary"
        },
        'aeroway-helipad':  {
            "model-name": "aeroway helipad",
            "model-label": "Helipads",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/aeroway-helipad"
        },
        'amenity-hospital':  {
            "model-name": "amenity hospital",
            "model-label": "Hospitals",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/amenity-hospital"
        },
        'amenity-police':  {
            "model-name": "amenity police",
            "model-label": "Police stations",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/amenity-police"
        },
        'amenity-firestation':  {
            "model-name": "amenity firestation",
            "model-label": "Fire stations",
            "domain": domainName,
            "stage": stage,
            "api_path": "/infer/amenity-firestation"
        },
        'landuse-quarry': {
            "model-name": "landuse quarry",
            "model-label": "Quarries",
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