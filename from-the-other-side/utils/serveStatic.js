const path = require('node:path');

function serveStatic(){
    const staticPath = path.join(__dirname, 'public');
    console.log(`Serving static files from: ${staticPath}`);
}

module.exports = serveStatic;