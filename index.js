const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(3000, () => {
    console.log('Server is on http://127.0.0.1:3000')
});