const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Backend PPI_Equipo 3_cm');
});

app.listen(8080, function () {
    console.log("El servidor está en uso. (localHost8080)");
});
