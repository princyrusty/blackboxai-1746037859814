const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const policies = [
  {
    id: '1',
    title: 'Energy Efficiency Standards',
    description: 'Government mandates energy efficiency standards for appliances to reduce power consumption.'
  },
  {
    id: '2',
    title: 'Renewable Energy Incentives',
    description: 'Incentives and subsidies for households using renewable energy sources like solar panels.'
  },
  {
    id: '3',
    title: 'Time-of-Use Pricing',
    description: 'Electricity pricing varies based on time of day to encourage usage during off-peak hours.'
  },
  {
    id: '4',
    title: 'Smart Metering',
    description: 'Installation of smart meters to monitor and manage electricity consumption effectively.'
  }
];

app.get('/policies', (req, res) => {
  res.json(policies);
});

app.post('/calculate', (req, res) => {
  const appliances = req.body.appliances;
  if (!appliances || !Array.isArray(appliances)) {
    return res.status(400).json({ error: 'Invalid appliances data' });
  }

  // Calculate total power consumption in kWh
  const totalPowerConsumption = appliances.reduce((total, appliance) => {
    return total + (appliance.powerRating * appliance.usageHours) / 1000;
  }, 0);

  // Assuming a fixed rate per kWh (can be adjusted or fetched from API)
  const ratePerKWh = 0.12; // example rate in dollars
  const estimatedBill = totalPowerConsumption * ratePerKWh;

  res.json({
    totalPowerConsumption,
    estimatedBill,
    appliances: appliances.map(appliance => ({
      ...appliance,
      consumption: ((appliance.powerRating * appliance.usageHours) / 1000)
    }))
  });
});

app.listen(port, () => {
  console.log('Server running on http://localhost:' + port);
});
