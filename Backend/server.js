const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5001;
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const seedAdmin = require('./seedAdmin'); // Seed Admin user
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();
const app = express();

app.use(cors({
    origin: 'https://eleccionesresucitado-1.onrender.com', // URL de tu frontend en Render
    credentials: true
}));
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

// Crear usuario administrador si no existe
async function createAdminUser() {
    try {
        const adminExists = await User.findOne({ username: 'Admin' });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('Josefus1106', 10); // Asegúrate de hashear la contraseña
            const admin = new User({
                username: 'Admin',
                password: hashedPassword,
                role: 'admin',
            });
            await admin.save();
            console.log('Admin user created: Admin');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}

// Llama a esta función cuando el servidor se inicie
createAdminUser();