const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5001;
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const seedAdmin = require('./seedAdmin'); // Seed Admin user

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Conexión a la base de datos MongoDB y ejecución del seeding
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await seedAdmin();
        app.listen(PORT, () => console.log(`Server running on port : ${PORT} `));
    })
    .catch(err => console.error(err));
