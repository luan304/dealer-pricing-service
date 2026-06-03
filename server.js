const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dealerPricing = {
    "1": {
        "product_id": "1",
        "dealer_name": "Tech Store A",
        "original_price": 999.99,
        "dealer_price": 899.99,
        "discount": "10%",
        "location": "New York"
    },
    "2": {
        "product_id": "2",
        "dealer_name": "Gadget Shop B",
        "original_price": 29.99,
        "dealer_price": 24.99,
        "discount": "17%",
        "location": "Los Angeles"
    }
};

app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'dealer-pricing' });
});

app.get('/dealer-pricing', (req, res) => {
    res.json(Object.values(dealerPricing));
});

app.get('/dealer-pricing/:product_id', (req, res) => {
    const pricing = dealerPricing[req.params.product_id];
    if (pricing) {
        res.json(pricing);
    } else {
        res.status(404).json({ error: 'Pricing not found' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Dealer Pricing Service running on port ${PORT}`);
});
