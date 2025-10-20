const express = require('express');
const cors = require('cors');
const documentRoutes = require('./routes/documents');
const queryRoutes = require('./routes/query');
const compareRoutes = require("./routes/comparisons");
const compliance = require('./routes/compliance');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/documents', documentRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/compare', compareRoutes);
app.use('/api/compliance', compliance);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
