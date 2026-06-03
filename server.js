const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const pricing = {
    "TechStore A": {
        "Laptop Pro": 899.99,
        "Wireless Mouse": 24.99,
        "Keyboard": 45.99,
        "Monitor": 299.99
    },
    "Gadget Hub": {
        "Laptop Pro": 920.00,
        "Keyboard": 42.00,
        "Monitor": 310.00
    },
    "ElectroMart": {
        "Laptop Pro": 880.00,
        "Keyboard": 48.00
    },
    "Accessory World": {
        "Wireless Mouse": 22.99,
        "Monitor": 289.99
    }
};

app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'dealer-pricing' });
});

// Giá của 1 dealer cho 1 sản phẩm
app.get('/price/:dealer/:product', (req, res) => {
    const { dealer, product } = req.params;
    const price = pricing[dealer]?.[product];
    if (price !== undefined) {
        res.json({ message: `${dealer} offers ${product} at $${price}` });
    } else {
        res.json({ message: `No pricing found for ${product} at ${dealer}` });
    }
});

// Giá của tất cả dealer cho 1 sản phẩm
app.get('/allprice/:product', (req, res) => {
    const { product } = req.params;
    const prices = [];
    for (const [dealer, products] of Object.entries(pricing)) {
        if (products[product] !== undefined) {
            prices.push({ key: dealer, value: `$${products[product]}` });
        }
    }
    res.json({ prices });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Dealer Pricing Service running on port ${PORT}`);
});
