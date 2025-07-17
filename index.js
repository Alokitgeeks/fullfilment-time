const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

// Shopify credentials (keep secure in real apps!)
const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_API_PASSWORD = process.env.SHOPIFY_ADMIN_API_PASSWORD;

const SHOPIFY_API_VERSION = "2024-01";
const BASE_URL = `https://${SHOPIFY_STORE_URL}/admin/api/${SHOPIFY_API_VERSION}`;

app.get("/api/fulfillment-stats", async (req, res) => {
  try {
    console.log(`📡 Calling Shopify API: ${BASE_URL}/orders.json`);

    const response = await axios.get(`${BASE_URL}/orders.json?status=any&limit=100&fields=id,created_at,fulfillments`, {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_API_PASSWORD,
        "Content-Type": "application/json",
      },
    });

    const orders = response.data.orders;

    const fulfillmentTimes = orders.map((order) => {
      if (order.fulfillments.length > 0) {
        const orderTime = new Date(order.created_at);
        const fulfillmentTime = new Date(order.fulfillments[0].created_at);
        const diffMinutes = Math.round((fulfillmentTime - orderTime) / (1000 * 60));
        return {
          orderId: order.id,
          fulfillmentDelayInMinutes: diffMinutes,
        };
      }
      return null;
    }).filter(Boolean);

    // Print in terminal
    console.log("📊 Fulfillment Time Analytics:");
    fulfillmentTimes.forEach((item) => {
      console.log(`🧾 Order #${item.orderId} → Fulfilled in ${item.fulfillmentDelayInMinutes} minutes`);
    });

    res.json({
      totalOrders: orders.length,
      fulfillmentTimes,
    });

  } catch (err) {
    console.error("Shopify API Error:", err.message);
    res.status(500).json({ error: "Failed to fetch fulfillment analytics" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
