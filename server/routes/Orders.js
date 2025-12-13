const express = require("express");
const db = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE ORDER
router.post("/", auth, async (req, res) => {
  const { items, total } = req.body;
  const user_id = req.user.id;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items in order" });
  }

  try {
    const [orderResult] = await db.execute(
      "INSERT INTO orders (user_id, total) VALUES (?, ?)",
      [user_id, total]
    );

    const orderId = orderResult.insertId;

    const insertItems = items.map(item => [
      orderId,
      item.id,
      item.name,
      item.price,
      item.qty,
      item.chosenSize,
      item.chosenColor
    ]);

    await db.query(
      `INSERT INTO order_items 
      (order_id, product_id, name, price, qty, chosenSize, chosenColor)
      VALUES ?`,
      [insertItems]
    );

    return res.json({ success: true, orderId });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Order creation failed" });
  }
});

// USER ORDERS
router.get("/user/:userId", auth, async (req, res) => {
  const userId = req.params.userId;

  try {
    const [orders] = await db.execute(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    for (let order of orders) {
      const [items] = await db.execute(
        "SELECT * FROM order_items WHERE order_id = ?",
        [order.id]
      );
      order.items = items;
    }

    return res.json(orders);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// ADMIN ORDERS
router.get("/all", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    const [orders] = await db.execute(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );

    for (let order of orders) {
      const [items] = await db.execute(
        "SELECT * FROM order_items WHERE order_id = ?",
        [order.id]
      );
      order.items = items;
    }

    return res.json(orders);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to fetch all orders" });
  }
});

module.exports = router;
