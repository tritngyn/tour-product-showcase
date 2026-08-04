import fs from 'fs';
import { allToursData } from './data/toursData.js';
import { toursData } from './data/tourData.js';

const generateMockoonData = () => {
  // Sinh 100 tours
  const generatedTours = [];
  for (let i = 0; i < 100; i++) {
    const baseTour = allToursData[i % allToursData.length];
    const newId = `${baseTour.id}-${i + 1}`;
    
    let image = baseTour.image;

    generatedTours.push({
      ...baseTour,
      id: newId,
      name: baseTour.name,
      image: image,
      price: baseTour.price + ((i * 50000) % 1000000), // Giá thay đổi chút xíu
      rating: Number((4.0 + (i % 10) / 10).toFixed(1)),
      reviews: baseTour.reviews + i * 5,
    });
  }

  const mockoonData = {
    "uuid": "mockoon-env-product-showcase",
    "lastMigration": 32,
    "name": "Tour Showcase API",
    "endpointPrefix": "api",
    "latency": 0,
    "port": 3000,
    "hostname": "0.0.0.0",
    "folders": [],
    "routes": [
      {
        "uuid": "route-login",
        "type": "http",
        "method": "post",
        "endpoint": "login",
        "responses": [
          {
            "uuid": "resp-login",
            "body": "{\"token\": \"dummy-jwt-token-12345\"}",
            "statusCode": 200,
            "headers": [{ "key": "Content-Type", "value": "application/json" }],
            "bodyType": "INLINE",
            "default": true
          }
        ],
        "enabled": true
      },
      {
        "uuid": "route-logout",
        "type": "http",
        "method": "post",
        "endpoint": "logout",
        "responses": [
          {
            "uuid": "resp-logout",
            "body": "{\"message\": \"success\"}",
            "statusCode": 200,
            "headers": [{ "key": "Content-Type", "value": "application/json" }],
            "bodyType": "INLINE",
            "default": true
          }
        ],
        "enabled": true
      },
      {
        "uuid": "route-product-list",
        "type": "http",
        "method": "get",
        "endpoint": "product",
        "responses": [
          {
            "uuid": "resp-product-list",
            "body": JSON.stringify(generatedTours),
            "statusCode": 200,
            "headers": [{ "key": "Content-Type", "value": "application/json" }],
            "bodyType": "INLINE",
            "default": true
          }
        ],
        "enabled": true
      }
    ],
    "rootChildren": [
      { "type": "route", "uuid": "route-login" },
      { "type": "route", "uuid": "route-logout" },
      { "type": "route", "uuid": "route-product-list" }
    ],
    "proxyMode": false,
    "proxyHost": "",
    "proxyRemovePrefix": false,
    "tlsOptions": {
      "enabled": false,
      "type": "CERT",
      "pfxPath": "",
      "certPath": "",
      "keyPath": "",
      "caPath": "",
      "passphrase": ""
    },
    "cors": true,
    "headers": [
      { "key": "Content-Type", "value": "application/json" }
    ],
    "proxyReqHeaders": [{ "key": "", "value": "" }],
    "proxyResHeaders": [{ "key": "", "value": "" }],
    "data": [],
    "callbacks": []
  };

  // Tạo các Route Detail cho từng Tour (100 routes)
  generatedTours.forEach((tour, index) => {
    // Lấy chi tiết dựa trên tour gốc
    const baseId = allToursData[index % allToursData.length].id;
    const detailData = toursData[baseId] || {};
    
    let parsedImages = [];
    if (detailData.images && detailData.images.length > 0) {
      if (typeof detailData.images[0] === 'string') {
        parsedImages = detailData.images;
      } else {
        parsedImages = detailData.images.map(i => i.url || i);
      }
      

    } else {
      parsedImages = [tour.image];
    }

    const fullData = {
      id: tour.id,
      name: tour.name,
      destination: tour.destination,
      image: parsedImages[0],
      images: parsedImages,
      description: detailData.description?.overview || tour.description,
      detailDescription: detailData.description?.detail || '',
      category: tour.category || tour.type?.[0] || 'Khám phá',
      price: tour.price,
      duration: tour.duration,
      rating: tour.rating || detailData.rating,
      reviewCount: tour.reviews || detailData.reviewCount,
      tags: detailData.tags || tour.type || [],
      highlights: detailData.highlights || tour.highlights || [],
      itinerary: detailData.itinerary || [],
      departureDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    const routeUuid = `route-product-detail-${tour.id}`;
    
    mockoonData.routes.push({
      "uuid": routeUuid,
      "type": "http",
      "method": "get",
      "endpoint": `product/${tour.id}`,
      "responses": [
        {
          "uuid": `resp-product-detail-${tour.id}`,
          "body": JSON.stringify(fullData),
          "latency": 0,
          "statusCode": 200,
          "headers": [{ "key": "Content-Type", "value": "application/json" }],
          "bodyType": "INLINE",
          "default": true
        }
      ],
      "enabled": true
    });
    
    mockoonData.rootChildren.push({ "type": "route", "uuid": routeUuid });
  });

  return mockoonData;
};

const mockoonData = generateMockoonData();
fs.writeFileSync('mockoon-data.json', JSON.stringify(mockoonData, null, 2));
console.log('Successfully generated mockoon-data.json with 100 tours!');
