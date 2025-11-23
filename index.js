require('dotenv').config();
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const fs = require('fs');

// Inicializar Firebase
import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID
  })
});

const db = admin.firestore();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



const app = express();
app.use(cors());
app.use(express.json());

// RUTAS ----------------------------------------

// GET: obtener todos los documentos
app.get("/productos", async (req, res) => {
  try {
    const snapshot = await db.collection("productos").get();
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: crear documento
app.post("/productos", async (req, res) => {
  try {
    const nuevo = await db.collection("productos").add(req.body);
    res.json({ id: nuevo.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: borrar documento
app.delete("/productos/:id", async (req, res) => {
  try {
    await db.collection("productos").doc(req.params.id).delete();
    res.json({ message: "Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Servidor
app.listen(3000, () => {
  console.log("API funcionando en http://localhost:3000");
});
app.post("/seed", async (req, res) => {
  try {
    for (const producto of productosSeed) {
      await db.collection("productos").doc(producto.id).set(producto);
    }

    res.json({ message: "Productos cargados exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const productosSeed = [
  {
    id: "9xfT2uhFabu9sPailvfA",
    name: "Zapatillas deportivas Nike",
    description: "Zapatillas running última generación",
    category: "calzado",
    active: true,
    createdAt: "2025-07-15T10:14:20.151Z",
    price: 85000,
    stock: 20,
    updatedAt: "2025-07-15T11:13:21.035Z",
    imageUrl: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw6aa56dfe/products/NIHJ9198-003/NIHJ9198-003-2.JPG"
  },
  {
    id: "dRVrDqLmGJeGJLBE3cL2",
    category: "futbol",
    active: true,
    createdAt: "2025-07-10T21:16:10.212Z",
    name: "Pelota de fútbol Adidas",
    description: "Pelota oficial torneo local",
    price: 55000,
    stock: 20,
    updatedAt: "2025-07-15T10:54:35.152Z",
    imageUrl: "https://assets1.afa.com.ar/NewFolder-1/WebN-Argentum25.jpg"
  },
  {
    id: "TtCC8wZ3MyhZg9iuOf73",
    price: 45000,
    category: "futbol",
    stock: 12,
    active: true,
    createdAt: "2025-07-09T15:26:10.935Z",
    updatedAt: "2025-07-09T15:26:10.935Z",
    description: "Botines de Calidad ",
    imageUrl: "https://newsport.vtexassets.com/arquivos/ids/20626036-1200-auto?v=638962162897770000&width=1200&height=auto&aspect=true",
    name: "Botines Nike Phantom 6 "
  },
  {
    id: "eDjXffJY5pFjdQvos2iQ",
    price: 50000,
    category: "futbol",
    stock: 10,
    active: true,
    createdAt: "2025-07-09T15:20:09.387Z",
    updatedAt: "2025-07-09T15:20:09.387Z",
    imageUrl: "https://www-cdn.solodeportes.com.ar/media/catalog/product/c/a/camiseta-de-argentina-adidas-oficial-blanca-11018079-100020ip8400001-1.jpg?width=700&height=700&store=solodeportes&image-type=image",
    description: "Camiseta De Argentina",
    name: "Adidas Oficial Blanca"
  },
  {
    id: "4dthjRGSiHnpaj3QUylX",
    name: "Uniforme de Baloncesto Reversible",
    description: "Conjunto de camiseta y pantalón, dos colores en uno.",
    price: 150000,
    category: "baloncesto",
    stock: 30,
    active: true,
    createdAt: "2024-03-22T13:00:00.000Z",
    updatedAt: "2024-03-22T13:00:00.000Z",
    imageUrl: "https://m.media-amazon.com/images/I/51XGxFBxvsL._AC_SX569_.jpg"
  },
  {
    id: "sa7MFZIXUboZOohq9iO5",
    name: "Termo de Agua 1L",
    description: "Termo de acero inoxidable para mantener tus bebidas frías.",
    price: 55000,
    category: "accesorios",
    stock: 120,
    active: true,
    createdAt: "2024-03-20T11:30:00.000Z",
    updatedAt: "2024-03-20T11:30:00.000Z",
    imageUrl: "https://bremenar.vtexassets.com/arquivos/ids/161905-1200-auto?v=638779194453170000&width=1200&height=auto&aspect=true"
  },
  {
    id: "sh2TzEMFEPl4Bc0ndUU6",
    name: "Sudadera con Capucha",
    description: "Sudadera de felpa para confort después del entrenamiento.",
    price: 180000,
    category: "indumentaria",
    stock: 60,
    active: true,
    createdAt: "2024-03-15T16:45:00.000Z",
    updatedAt: "2024-03-15T16:45:00.000Z",
    imageUrl: "https://footballkits.co/wp-content/uploads/2023/01/Joma-CREW-V-SWEATSHIRT-RED-NAVY-WHITE.png"
  },
  {
    id: "9TPnnCSUHcFfp5buAk5m",
    name: "Espinilleras de Carbono",
    description: "Protección ligera y resistente para fútbol.",
    price: 75000,
    category: "futbol",
    stock: 40,
    active: true,
    createdAt: "2024-03-12T12:00:00.000Z",
    updatedAt: "2024-03-12T12:00:00.000Z",
    imageUrl: "https://newsport.vtexassets.com/arquivos/ids/20327403-1200-auto?v=638842068393330000&width=1200&height=auto&aspect=true"
  },
  {
    id: "hE8kAHYOIUIXF4PbXu3Y",
    name: "Gorra Deportiva",
    description: "Gorra con protección UV y banda para el sudor.",
    price: 45000,
    category: "accesorios",
    stock: 80,
    active: true,
    createdAt: "2024-03-10T10:00:00.000Z",
    updatedAt: "2024-03-10T10:00:00.000Z",
    imageUrl: "https://www.nakaoutdoors.com.ar/img/articulos/2024/11/gorra-plegable-anti-uv-color-clash_sync_img1.webp"
  },
  {
    id: "1rpjBcxHTUHKPd2grgbS",
    name: "Medias Deportivas (Pack 3)",
    description: "Medias de algodón para alto rendimiento.",
    price: 35000,
    category: "indumentaria",
    stock: 150,
    active: true,
    createdAt: "2024-03-05T18:00:00.000Z",
    updatedAt: "2024-03-05T18:00:00.000Z",
    imageUrl: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwf2f7398d/products/NI_SX7676-964/NI_SX7676-964-1.JPG"
  }
];
