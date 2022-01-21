const fs = require('fs');
const sizeOf = require('image-size');

const dimensions = sizeOf('./tests/1557417594311.jpeg');
const files = fs.readdirSync('./tests');
console.log(dimensions.width, dimensions.height);
console.log("🚀 ~ file: app.js ~ line 11 ~ files", files)
