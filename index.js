const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

// Create a MySQL connection
const db = mysql.createConnection({
  host: "34.138.170.30",
  user: "carlos",
  password: "",
  database: "db_cosechas",
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

// Create an Express application
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(bodyParser.json());

// Define routes
app.get("/predios", (req, res) => {
  const sql = "SELECT * FROM predio";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/predios", (req, res) => {
  const { descripcion, area, latitud, longitud, clima } = req.body;

  const data = { descripcion, area, latitud, longitud, clima };
  db.query("INSERT INTO predio SET ?", data, (err, result) => {
    if (err) {
      console.log("Error inserting data:", err);
      res.status(500).json({ error: "An error occurred while inserting data" });
    } else {
      console.log("Data inserted successfully:", result);
      res.status(200).json({ message: "Data inserted successfully" });
    }
  });
});



app.get("/parcelas", (req, res) => {
  const sql = "SELECT * FROM parcela";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


app.post("/parcelas", (req, res) => {
  const { cultivo, longitud, latitud, direccion, predio_idpredio } = req.body;

  const data = { cultivo, longitud, latitud, direccion, predio_idpredio };
  db.query("INSERT INTO parcela SET ?", data, (err, result) => {
    if (err) {
      console.log("Error inserting data:", err);
      res.status(500).json({ error: "An error occurred while inserting data" });
    } else {
      console.log("Data inserted successfully:", result);
      res.status(200).json({ message: "Data inserted successfully" });
    }
  });
});


app.get("/cosechas", (req, res) => {
  const sql = "SELECT * FROM cosecha";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/cosechas", (req, res) => {
  const { fecha, area, toneladas, desperdicio, recurso, parcela_idparcela } = req.body;

  const data = { fecha, area, toneladas, desperdicio, recurso, parcela_idparcela };
  db.query("INSERT INTO cosecha SET ?", data, (err, result) => {
    if (err) {
      console.log("Error inserting data:", err);
      res.status(500).json({ error: "An error occurred while inserting data" });
    } else {
      console.log("Data inserted successfully:", result);
      res.status(200).json({ message: "Data inserted successfully" });
    }
  });
});

// Start the server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
