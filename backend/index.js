const express = require('express');
const app = express();
const cors = require ('cors');
app.use(cors());

app.get('/', function (req, res) {
    res.send('Backend PPI_Equipo 3_cm');
});
/**
 solucione una parte, pero la base de datos no se quiere conectar
 
 */
app.listen(8080, function () {
    console.log("El servidor está en uso. (localHost8080)");
});
app.listen(8080, function () {
    console.log("El servidor está en uso. (localHost8080)");
});
