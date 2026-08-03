import fs from 'fs';

const generateTours = () => {
  const tours = [];
  const domesticDestinations = [
    { name: 'Sapa', prefix: 'S' },
    { name: 'Đà Lạt', prefix: 'DL' },
    { name: 'Phú Quốc', prefix: 'PQ' },
    { name: 'Nha Trang', prefix: 'NT' },
    { name: 'Hà Giang', prefix: 'HG' },
    { name: 'Đà Nẵng', prefix: 'ĐN' }
  ];
  
  const internationalDestinations = [
    { name: 'Thái Lan', prefix: 'TL' },
    { name: 'Hàn Quốc', prefix: 'HQ' },
    { name: 'Nhật Bản', prefix: 'NB' },
    { name: 'Châu Âu', prefix: 'CA' },
    { name: 'Singapore', prefix: 'SG' }
  ];

  const durations = ['3 Ngày 2 Đêm', '4 Ngày 3 Đêm', '5 Ngày 4 Đêm', '2 Ngày 1 Đêm'];

  for (let i = 1; i <= 100; i++) {
    const isDomestic = Math.random() > 0.4;
    const destList = isDomestic ? domesticDestinations : internationalDestinations;
    const dest = destList[Math.floor(Math.random() * destList.length)];
    const duration = durations[Math.floor(Math.random() * durations.length)];
    
    // Base price in VND
    const basePrice = isDomestic 
      ? Math.floor(Math.random() * 4000000) + 2000000 // 2tr - 6tr
      : Math.floor(Math.random() * 15000000) + 5000000; // 5tr - 20tr

    const colors = ['0D8ABC', '16A085', '27AE60', '2980B9', '8E44AD', 'F39C12', 'D35400'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    tours.push({
      id: i.toString(),
      name: `Khám phá ${dest.name} tuyệt đẹp ${duration}`, // mapped to tourName
      image: `https://ui-avatars.com/api/?name=${dest.prefix}&background=${color}&color=fff&size=400`,
      description: `Hành trình ${duration} đưa bạn đến với ${dest.name}, trải nghiệm văn hóa địa phương và thưởng thức ẩm thực đặc sắc. Lịch trình chi tiết sẽ được hướng dẫn viên giới thiệu trong suốt chuyến đi.`, // mapped to itinerary
      category: isDomestic ? 'Trong nước' : 'Quốc tế',
      price: basePrice,
      // Extra fields for bonus points based on strategy.md
      destination: dest.name,
      duration: duration,
      departureDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  }
  return tours;
};

const mockoonData = {
  "uuid": "mockoon-env-product-showcase",
  "lastMigration": 32,
  "name": "Tour Showcase API",
  "endpointPrefix": "api",
  "latency": 0,
  "port": 3000, // Strategy explicitly says: "gọi đúng vào port 3000 của Mockoon container"
  "hostname": "0.0.0.0",
  "folders": [],
  "routes": [
    {
      "uuid": "route-login",
      "type": "http",
      "documentation": "",
      "method": "post",
      "endpoint": "login",
      "responses": [
        {
          "uuid": "resp-login",
          "body": "{\"token\": \"dummy-jwt-token-12345\"}",
          "latency": 0,
          "statusCode": 200,
          "label": "",
          "headers": [{ "key": "Content-Type", "value": "application/json" }],
          "bodyType": "INLINE",
          "filePath": "",
          "databucketID": "",
          "sendFileAsBody": false,
          "rules": [],
          "rulesOperator": "OR",
          "disableTemplating": false,
          "fallbackTo404": false,
          "default": true,
          "crudKey": "id",
          "callbacks": []
        }
      ],
      "enabled": true,
      "responseMode": null
    },
    {
      "uuid": "route-logout",
      "type": "http",
      "documentation": "",
      "method": "post",
      "endpoint": "logout",
      "responses": [
        {
          "uuid": "resp-logout",
          "body": "{\"message\": \"success\"}",
          "latency": 0,
          "statusCode": 200,
          "label": "",
          "headers": [{ "key": "Content-Type", "value": "application/json" }],
          "bodyType": "INLINE",
          "filePath": "",
          "databucketID": "",
          "sendFileAsBody": false,
          "rules": [],
          "rulesOperator": "OR",
          "disableTemplating": false,
          "fallbackTo404": false,
          "default": true,
          "crudKey": "id",
          "callbacks": []
        }
      ],
      "enabled": true,
      "responseMode": null
    },
    {
      "uuid": "route-product-list",
      "type": "http",
      "documentation": "",
      "method": "get",
      "endpoint": "product",
      "responses": [
        {
          "uuid": "resp-product-list",
          "body": JSON.stringify(generateTours()),
          "latency": 0,
          "statusCode": 200,
          "label": "",
          "headers": [{ "key": "Content-Type", "value": "application/json" }],
          "bodyType": "INLINE",
          "filePath": "",
          "databucketID": "",
          "sendFileAsBody": false,
          "rules": [],
          "rulesOperator": "OR",
          "disableTemplating": false,
          "fallbackTo404": false,
          "default": true,
          "crudKey": "id",
          "callbacks": []
        }
      ],
      "enabled": true,
      "responseMode": null
    },
    {
      "uuid": "route-product-detail",
      "type": "http",
      "documentation": "",
      "method": "get",
      "endpoint": "product/:id",
      "responses": [
        {
          "uuid": "resp-product-detail",
          "body": "{\n  \"id\": \"{{urlParam 'id'}}\",\n  \"name\": \"Khám phá Tour số {{urlParam 'id'}}\",\n  \"image\": \"https://ui-avatars.com/api/?name=T{{urlParam 'id'}}&background=0D8ABC&color=fff&size=400\",\n  \"description\": \"Hành trình đưa bạn khám phá những địa điểm thú vị. Lịch trình chi tiết được cập nhật đầy đủ.\",\n  \"category\": \"Trong nước\",\n  \"price\": 3500000,\n  \"destination\": \"Sapa\",\n  \"duration\": \"3 Ngày 2 Đêm\",\n  \"departureDate\": \"2024-12-01\"\n}",
          "latency": 0,
          "statusCode": 200,
          "label": "",
          "headers": [{ "key": "Content-Type", "value": "application/json" }],
          "bodyType": "INLINE",
          "filePath": "",
          "databucketID": "",
          "sendFileAsBody": false,
          "rules": [],
          "rulesOperator": "OR",
          "disableTemplating": false,
          "fallbackTo404": false,
          "default": true,
          "crudKey": "id",
          "callbacks": []
        }
      ],
      "enabled": true,
      "responseMode": null
    }
  ],
  "rootChildren": [
    { "type": "route", "uuid": "route-login" },
    { "type": "route", "uuid": "route-logout" },
    { "type": "route", "uuid": "route-product-list" },
    { "type": "route", "uuid": "route-product-detail" }
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

fs.writeFileSync('mockoon-data.json', JSON.stringify(mockoonData, null, 2));
console.log('Successfully updated mockoon-data.json with travel strategy!');
