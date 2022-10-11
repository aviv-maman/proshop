const Order = require('../models/orderModel');
const factory = require('./handlerFactory');

exports.setUserIds = (req, res, next) => {
  // Allow nested routes
  //   if (!req.body.order) req.body.order = req.params.orderId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllOrders = factory.getAll(Order);
exports.getOrder = factory.getOne(Order);
exports.createOrder = factory.createOne(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
