const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // ✅ Prevents CORS errors
app.use(express.json()); // ✅ Allows JSON requests

const budget = {
    myBudget: [
        { title: "Eat out", budget: 25 },
        { title: "Rent", budget: 275 },
        { title: "Grocery", budget: 110 },
        { title: "Entertainment", budget: 50 },
        { title: "Transportation", budget: 60 },
        { title: "Utilities", budget: 100 },
        { title: "Savings", budget: 150 }
    ]
};

// ✅ Fix missing `/budget` route
app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`✅ API running at http://localhost:${port}`);
});

