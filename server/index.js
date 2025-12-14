const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const orderRoutes = require("./routes/Orders");


dotenv.config();

const app = express();

const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
  
    if (!token)
      return res.status(401).json({ error: "No token provided" });
  
    // If frontend sends "Bearer <token>"
    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.status(401).json({ error: "Invalid token" });
  
      req.user = decoded;
      next();
    });
  };
  
  

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://nike-clone-beta-weld.vercel.app",
    "https://nike-clone-rmj0c3j14-karim-korkomazs-projects.vercel.app",
    "https://nike-clone-m839.onrender.com",
  ],
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use("/api/orders", orderRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('Nike backend is running');
});


app.get("/api/admin-protected", verifyToken, (req, res) => {
    if (req.user.role !== "admin")
      return res.status(403).json({ error: "Access denied" });
  
    res.json({ message: "Valid admin" });
  });
  
// GET products (all, by section, or by ID)
app.get('/api/products', async (req, res) => {
  const { section, id } = req.query;

  try {
    let query = 'SELECT * FROM products';
    let params = [];

    if (id) {
      query += ' WHERE id = ?';
      params.push(id);
    } 
    else if (section) {
      query += ' WHERE section = ?';
      params.push(section);
    }

    const [rows] = await pool.query(query, params);
    res.json(rows);

  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


// SEARCH route
app.get("/api/search", async (req, res) => {
    const { q } = req.query;
  
    if (!q) return res.json([]);
  
    try {
      const searchTerm = `%${q}%`;
  
      const [results] = await pool.query(
        `SELECT * FROM products 
         WHERE name LIKE ? OR category LIKE ? OR section LIKE ?`,
        [searchTerm, searchTerm, searchTerm]
      );
  
      res.json(results);
  
    } catch (err) {
      console.error("Search error:", err);
      res.status(500).json({ error: "Search failed" });
    }
  });
  

// POST a product
app.post('/api/products', async (req, res) => {
  try {
    const { name, category, section, price, imageUrl } = req.body;

    if (!name || !category || !section || !price || !imageUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await pool.query(
      `INSERT INTO products (name, category, section, price, image_url)
       VALUES (?, ?, ?, ?, ?)`,
      [name, category, section, price, imageUrl]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      category,
      section,
      price,
      image_url: imageUrl,
    });

  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json({ message: "Product deleted" });
  
    } catch (err) {
      console.error("Error deleting product:", err);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  const multer = require("multer");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

// Upload route
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";

  res.json({
    imageUrl: `${baseUrl}/uploads/${req.file.filename}`,
  });
});

// SIGNUP route
app.post("/api/signup", async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password)
      return res.status(400).json({ error: "Missing fields" });
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await pool.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );
  
      res.json({ message: "User registered successfully" });
  
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Email already exists" });
      }
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });
    // LOGIN route
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password)
      return res.status(400).json({ error: "Missing fields" });
  
    try {
      const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  
      if (users.length === 0)
        return res.status(400).json({ error: "Invalid email or password" });
  
      const user = users[0];
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Invalid email or password" });
  
      // Generate token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      res.json({
        message: "Login successful",
        token,
        role: user.role,
        name: user.name,
        id: user.id
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save message in database
    await pool.query(
      "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    res.json({ success: true, message: "Message received!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

app.get("/api/messages", verifyToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});


app.delete("/api/messages/:id", verifyToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }

  const { id } = req.params;

  try {
    await pool.query("DELETE FROM messages WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete message" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
