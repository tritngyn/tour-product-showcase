import fs from 'fs';

const generateTours = () => {
  const tours = [];
  // Sử dụng data giống với toursData.js để map chuẩn
  const domesticDestinations = [
    { id: 'halong-hanoi', name: 'Khám phá Hà Nội & Vịnh Hạ Long', destination: 'Hạ Long', category: 'Biển đảo', image: 'https://images.unsplash.com/photo-1668000018482-a02acf02b22a?w=1080', price: 2990000 }, 
    { id: 'danang-hoian', name: 'Hội An Cổ Kính & Bà Nà Hills', destination: 'Hội An', category: 'Văn hóa', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1080', price: 3490000 }, 
    { id: 'phuquoc', name: 'Phú Quốc - Thiên Đường Biển Đảo', destination: 'Phú Quốc', category: 'Biển đảo', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1080', price: 3990000 }, 
    { id: 'sapa-hagiang', name: 'Sapa - Chinh Phục Fansipan', destination: 'Sapa', category: 'Khám phá', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1080', price: 3990000 }, 
    { id: 'nha-trang', name: 'Nha Trang - 4 Đảo & Vinpearl', destination: 'Nha Trang', category: 'Biển đảo', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1080', price: 2490000 }, 
    { id: 'saigon-mekong', name: 'Sài Gòn & Đồng bằng sông Cửu Long', destination: 'Mỹ Tho', category: 'Khám phá', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1080', price: 2790000 } 
  ];
  
  const internationalDestinations = [
    { name: 'Thái Lan', image: 'https://picsum.photos/seed/thailan123/800/600', category: 'Mua sắm' }, 
    { name: 'Hàn Quốc', image: 'https://picsum.photos/seed/hanquoc123/800/600', category: 'Văn hóa' }, 
    { name: 'Nhật Bản', image: 'https://picsum.photos/seed/nhatban123/800/600', category: 'Văn hóa' }, 
    { name: 'Châu Âu', image: 'https://picsum.photos/seed/chauau123/800/600', category: 'Khám phá' }, 
    { name: 'Singapore', image: 'https://picsum.photos/seed/singapore123/800/600', category: 'Nghỉ dưỡng' } 
  ];

  const durations = ['3 Ngày 2 Đêm', '4 Ngày 3 Đêm', '5 Ngày 4 Đêm', '2 Ngày 1 Đêm'];

  // 1. Chèn 6 tour trong nước với ID chuẩn trước
  domesticDestinations.forEach(dest => {
    tours.push({
      id: dest.id,
      name: dest.name,
      image: dest.image,
      description: `Hành trình khám phá ${dest.name}, trải nghiệm văn hóa địa phương và thưởng thức ẩm thực đặc sắc.`,
      category: dest.category,
      price: dest.price,
      destination: dest.destination,
      duration: '4 Ngày 3 Đêm',
      departureDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  });

  // 2. Sinh thêm các tour khác (quốc tế hoặc trong nước random)
  for (let i = 7; i <= 100; i++) {
    const isDomestic = Math.random() > 0.4;
    const destList = isDomestic ? domesticDestinations : internationalDestinations;
    const dest = destList[Math.floor(Math.random() * destList.length)];
    const duration = durations[Math.floor(Math.random() * durations.length)];
    
    const basePrice = isDomestic 
      ? Math.floor(Math.random() * 4000000) + 2000000
      : Math.floor(Math.random() * 15000000) + 5000000;

    tours.push({
      id: i.toString(),
      name: `Khám phá ${dest.name} tuyệt đẹp ${duration}`,
      image: dest.image,
      description: `Hành trình ${duration} đưa bạn đến với ${dest.name}, trải nghiệm văn hóa địa phương và thưởng thức ẩm thực đặc sắc.`,
      category: isDomestic ? dest.category : 'Quốc tế',
      price: basePrice,
      destination: dest.destination || dest.name,
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
          "body": "{\n  \"id\": \"{{urlParam 'id'}}\",\n  \"name\": \"Khám phá Tour số {{urlParam 'id'}}\",\n  \"image\": \"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=80\",\n  \"description\": \"Hành trình đưa bạn khám phá những địa điểm thú vị. Lịch trình chi tiết được cập nhật đầy đủ.\",\n  \"category\": \"Trong nước\",\n  \"price\": 3500000,\n  \"destination\": \"Sapa\",\n  \"duration\": \"3 Ngày 2 Đêm\",\n  \"departureDate\": \"2024-12-01\"\n}",
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
