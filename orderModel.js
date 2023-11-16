import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    unique: true,
    required: true,
  },
  item_name: {
    type: String,
    trim: true,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now(),
  },
  delivery_date: {
    type: Date,
    default: null,
    required: true,
  },
});

const User = mongoose.model("Orders", OrderSchema);

export default User;
