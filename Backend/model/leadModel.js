import mongoose from 'mongoose';
const { Schema } = mongoose;

const leadSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    tags: {
      type: [String], // Array of strings
      default: [],
    },
    status: {
      type: String,
      enum: ['new', 'Contacted', 'Qualified', 'Pending'], // restrict values
      default: 'new',
    },
    employee: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
