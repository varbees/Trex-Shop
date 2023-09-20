import mongoose from 'mongoose';
import colors from 'colors';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import users from './data/users.js';
import products from './data/products.js';
import connectDB from './config/db.js';

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    //upload users and find admin user
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    //add admin to product users and upload products
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed'.yellow.inverse);
    process.exit();
  } catch (err) {
    console.log(`${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
