const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const products = require('./data/products');
const blogs = require('./data/blogs');
const testimonials = require('./data/testimonials');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Blog = require('./models/blogModel');
const Testimonial = require('./models/testimonialModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();
        await Blog.deleteMany();
        await Testimonial.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        const sampleBlogs = blogs.map((blog) => {
            return { ...blog, author: adminUser };
        });

        await Product.insertMany(sampleProducts);
        await Blog.insertMany(sampleBlogs);
        await Testimonial.insertMany(testimonials);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await Blog.deleteMany();
        await Testimonial.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
