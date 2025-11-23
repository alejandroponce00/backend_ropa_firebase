import express from "express";
import admin from "firebase-admin";
import cors from "cors";

// Inicializar Firebase solo una vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_CLIENT_ID
    }),
  });
}

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas -------------------------------------

app.get("/productos", async (req, res) => {
  try {
    const snapshot = await db.collection("productos").get();
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/productos", async (req, res) => {
  try {
    const nuevo = await db.collection("productos").add(req.body);
    res.json({ id: nuevo.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/productos/:id", async (req, res) => {
  try {
    await db.collection("productos").doc(req.params.id).delete();
    res.json({ message: "Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exportar Express como función de Vercel
export default app;
