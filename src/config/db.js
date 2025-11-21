import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.db_url);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
