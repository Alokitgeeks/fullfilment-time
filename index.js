// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const app = express();
// const PORT = 3000;

// // Shopify credentials (keep secure in real apps!)

// const SHOPIFY_API_VERSION = "2024-01";
// const BASE_URL = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}`;

// app.get("/api/fulfillment-stats", async (req, res) => {
//   try {
//     console.log(`📡 Calling Shopify API: ${BASE_URL}/orders.json`);

//     const response = await axios.get(`${BASE_URL}/orders.json?status=any&limit=100&fields=id,created_at,fulfillments`, {
//       headers: {
//         "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API,
//         "Content-Type": "application/json",
//       },
//     });

//     const orders = response.data.orders;

//     const fulfillmentTimes = orders.map((order) => {
//       if (order.fulfillments.length > 0) {
//         const orderTime = new Date(order.created_at);
//         const fulfillmentTime = new Date(order.fulfillments[0].created_at);
//         const diffMinutes = Math.round((fulfillmentTime - orderTime) / (1000 * 60));
//         return {
//           orderId: order.id,
//           fulfillmentDelayInMinutes: diffMinutes,
//         };
//       }
//       return null;
//     }).filter(Boolean);

//     // Print in terminal
//     console.log("📊 Fulfillment Time Analytics:");
//     fulfillmentTimes.forEach((item) => {
//       console.log(`🧾 Order #${item.orderId} → Fulfilled in ${item.fulfillmentDelayInMinutes} minutes`);
//     });

//     res.json({
//       totalOrders: orders.length,
//       fulfillmentTimes,
//     });

//   } catch (err) {
//     console.error("Shopify API Error:", err.message);
//     res.status(500).json({ error: "Failed to fetch fulfillment analytics" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });





// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 3000;
// app.use(cors());

// // Shopify API
// const SHOPIFY_API_VERSION = "2024-01";
// const BASE_URL = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}`;

// app.get("/api/fulfillment-stats", async (req, res) => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/orders.json?status=any&limit=100&fields=id,created_at,fulfillments`,
//       {
//         headers: {
//           "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const orders = response.data.orders;

//     const fulfillmentTimes = orders
//       .map((order) => {
//         if (order.fulfillments.length > 0) {
//           const orderTime = new Date(order.created_at);
//           const fulfillmentTime = new Date(order.fulfillments[0].created_at);
//           const diffMinutes = Math.round(
//             (fulfillmentTime - orderTime) / (1000 * 60)
//           );
//           return {
//             orderId: order.id,
//             fulfillmentDelayInMinutes: diffMinutes,
//           };
//         }
//         return null;
//       })
//       .filter(Boolean);

//     res.json({
//       totalOrders: orders.length,
//       fulfillmentTimes,
//     });
//   } catch (err) {
//     console.error("❌ Shopify API Error:", err.message);
//     res.status(500).json({ error: "Failed to fetch fulfillment analytics" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });




// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 3000;
// app.use(cors());

// const SHOPIFY_API_VERSION = "2024-01";
// const BASE_URL = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}`;

// function calculateAverage(arr) {
//   if (arr.length === 0) return 0;
//   const sum = arr.reduce((a, b) => a + b, 0);
//   return (sum / arr.length).toFixed(2);
// }

// app.get("/api/fulfillment-stats", async (req, res) => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/orders.json?status=any&limit=250&fields=id,created_at,fulfillments`,
//       {
//         headers: {
//           "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const orders = response.data.orders;

//     // Filter orders with fulfillment and calculate fulfillment time in hours
//     const fulfillmentTimes = orders
//       .map((order) => {
//         if (order.fulfillments.length > 0) {
//           const orderDate = new Date(order.created_at);
//           const fulfilledDate = new Date(order.fulfillments[0].created_at);
//           const diffHours = (fulfilledDate - orderDate) / (1000 * 60 * 60);
//           return { orderDate, diffHours };
//         }
//         return null;
//       })
//       .filter(Boolean);

//     const now = new Date();
//     const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
//     const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

//     const last7Days = fulfillmentTimes.filter((f) => f.orderDate >= sevenDaysAgo);
//     const last30Days = fulfillmentTimes.filter((f) => f.orderDate >= thirtyDaysAgo);

//     const avg7 = calculateAverage(last7Days.map((f) => f.diffHours));
//     const avg30 = calculateAverage(last30Days.map((f) => f.diffHours));

//     res.json({
//       average_7_days: avg7,
//       average_30_days: avg30,
//     });
//   } catch (err) {
//     console.error("Shopify API Error:", err.response?.data || err.message);
//     res.status(500).json({ error: "Failed to fetch fulfillment analytics" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

const SHOPIFY_API_VERSION = "2024-01";
const BASE_URL = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}`;

function calculateMedian(arr) {
  if (arr.length === 0) return 0;
  const sorted = arr.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  } else {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
}

app.get("/api/fulfillment-stats", async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/orders.json?status=any&limit=250&fields=id,created_at,fulfillments`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API,
          "Content-Type": "application/json",
        },
      }
    );

    const orders = response.data.orders;

    const fulfillmentTimes = orders
      .map((order) => {
        if (order.fulfillments.length > 0) {
          const orderDate = new Date(order.created_at);
          const fulfilledDate = new Date(order.fulfillments[0].created_at);
          const diffHours = (fulfilledDate - orderDate) / (1000 * 60 * 60);
          return { orderDate, diffHours };
        }
        return null;
      })
      .filter(Boolean);

    const now = new Date();
    const todayDaysAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const todayFulfillments = fulfillmentTimes.filter((f) => f.orderDate >= todayDaysAgo);
    const last7Days = fulfillmentTimes.filter((f) => f.orderDate >= sevenDaysAgo);
    const last30Days = fulfillmentTimes.filter((f) => f.orderDate >= thirtyDaysAgo);

    const todayDiffHours = todayFulfillments.map((f) => f.diffHours);
    const median7 = calculateMedian(last7Days.map((f) => f.diffHours));
    const median30 = calculateMedian(last30Days.map((f) => f.diffHours));

    res.json({
      today_fulfillment_times: todayDiffHours,
      median_7_days: median7.toFixed(2),
      median_30_days: median30.toFixed(2),
    });
  } catch (err) {
    console.error("Shopify API Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch fulfillment analytics" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
