const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));

app.get('/', (req, res) => res.send('CRM API is running yash.'));

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});
