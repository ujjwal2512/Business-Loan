const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.options('/submit-application', cors());

app.post('/submit-application', (req, res) => {
  const { businessName, yearEstablished, loanAmount, accountingProvider } = req.body;

  const balanceSheet = [
    {
        "year": 2020,
        "month": 12,
        "profitOrLoss": 250000,
        "assetsValue": 1234
    },
    {
        "year": 2020,
        "month": 11,
        "profitOrLoss": 1150,
        "assetsValue": 5789
    },
    {
        "year": 2020,
        "month": 10,
        "profitOrLoss": 2500,
        "assetsValue": 22345
    },
    {
        "year": 2020,
        "month": 9,
        "profitOrLoss": -187000,
        "assetsValue": 223452
    }

  ];

  function DecisionEngine(profit, avgAssetsValue, loanAmount) {
    if (profit > 0) {
      return 60;
    } else if (avgAssetsValue > loanAmount) {
      return 100;
    } else {
      return 20;
    }
  }

 
  const profit = balanceSheet.reduce((total, entry) => total + entry.profitOrLoss, 0) / 12;
  const avgAssetsValue = balanceSheet.reduce((total, entry) => total + entry.assetsValue, 0) / 12;
  const preAssessment = DecisionEngine(profit, avgAssetsValue, loanAmount);

  const result = {
    preAssessment
  };

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
