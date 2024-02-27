const fs = require('fs');
const path = require('path');

const directories = [
    'src/components',
    'src/pages',
    'src/utils',
    'src/services',
    'src/contexts',
    'src/assets/images',
    'src/assets/fonts',
    'src/styles'
];

const files = [
    'src/App.js',
    'src/index.js',
    'src/styles/global.css'
];

directories.forEach(directory => {
    fs.mkdirSync(directory, { recursive: true });
});

files.forEach(file => {
    fs.writeFileSync(file, '');
});
