import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    db.once('open', () => {
      console.log('Connected to MongoDB');
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

export default DatabaseConnection;
