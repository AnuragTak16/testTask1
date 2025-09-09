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
    },
    image: {
      type: String,
    },
    tag: {
      type: String,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'lost'],
      default: 'new',
    },
    employee: { type: String },
  },
  { timestamps: true }
);

const Lead = mongoose.model('Lead', leadSchema);
module.exports = Lead;
