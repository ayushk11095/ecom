import express from "express";
import dbCon from "./database.js";
import Order from "./orderModel.js";
import moment from "moment";
import {
  orderCreateValidator,
  orderListValidator,
  orderUpdateValidator,
} from "./validator.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbCon();

// CRUD operations
// add a record
app.post("/orders/create", orderCreateValidator, async (req, res) => {
  const { order_id, item_name, cost, order_date, delivery_date } = req.body;

  try {
    const result = await Order.findOne({ order_id });
    if (result) {
      return res.json({
        success: false,
        message: "Record is already exist",
      });
    }

    const order = new Order();
    order.order_id = order_id;
    order.item_name = item_name;
    order.cost = cost;
    order.order_date = moment(order_date, "YYYY/MM/DD").format("YYYY-MM-DD");
    order.delivery_date = moment(delivery_date, "YYYY/MM/DD").format(
      "YYYY-MM-DD"
    );
    const data = await order.save();

    return res.json({
      success: true,
      message: "Record is added successfully",
      data,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});

// get details by email
app.get("/orders/search/:order_id", async (req, res) => {
  try {
    const result = await Order.findOne({ order_id: req.params.order_id });
    if (!result) {
      return res.json({
        success: false,
        message: "Record is not found",
      });
    }

    return res.json({
      success: true,
      message: "Record is fetched successfully",
      result,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});

// get list of records
app.post("/orders/list", orderListValidator, async (req, res) => {
  const filter = req.body.delivery_date
    ? {
        delivery_date: moment(req.body.delivery_date, "YYYY/MM/DD").format(
          "YYYY-MM-DD"
        ),
      }
    : {};

  try {
    const result = await Order.find({
      ...filter,
    });

    return res.json({
      success: true,
      message: "Record is fetched successfully",
      result,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});

// update a record by email
app.post("/orders/update/:order_id", orderUpdateValidator, async (req, res) => {
  const { delivery_date } = req.body;

  try {
    const data = await Order.findOneAndUpdate(
      { order_id: req.params.order_id },
      {
        $set: {
          delivery_date: moment(delivery_date, "YYYY/MM/DD").format(
            "YYYY-MM-DD"
          ),
        },
      },
      { upsert: false, new: true }
    );
    if (!data) {
      return res.json({
        success: false,
        message: "Record is not found",
      });
    }

    return res.json({
      success: true,
      message: "Record is updated successfully",
      result: data,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});

// delete a record by email
app.delete("/orders/delete/:order_id", async (req, res) => {
  try {
    const data = await Order.findOneAndDelete({
      order_id: req.params.order_id,
    });
    if (!data) {
      return res.json({
        success: false,
        message: "Record is not found",
      });
    }

    return res.json({
      success: true,
      message: "Record is deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log(`server is running at: 3000 port`);
});
