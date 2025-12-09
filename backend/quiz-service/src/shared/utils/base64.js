const fs = require('fs');

const image = fs.readFileSync('../images/quiz-banner-default.jpg');
const base64 = `data:image/png;base64, ${image.toString('base64')}`;

console.log(base64);