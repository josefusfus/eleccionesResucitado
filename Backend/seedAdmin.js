const User = require('./models/User');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    const existingAdmin = await User.findOne({ username: 'Admin' });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('Josefus1106', 10);
        const admin = new User({ username: 'Admin', password: hashedPassword, role: 'admin' });
        await admin.save();
        console.log('Admin user created: Admin / Josefus1106');
    } else {
        console.log('Admin user already exists');
    }
};

module.exports = seedAdmin;
