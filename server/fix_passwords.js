const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/userModel.js');
const Admin = require('./models/adminModel.js');
const connectDB = require('./config/db.js');

dotenv.config();

const fixPasswords = async () => {
    try {
        await connectDB();

        console.log('Fixing User passwords...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        // Update all users directly to avoid middleware
        await User.updateMany({}, { password: hashedPassword });
        console.log(`Updated Users to password '123456'`);

        // Update all admins
        await Admin.updateMany({}, { password: hashedPassword });
        console.log(`Updated Admins to password '123456'`);

        console.log('Done!');
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

fixPasswords();
