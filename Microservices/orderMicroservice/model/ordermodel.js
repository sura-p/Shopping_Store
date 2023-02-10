import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      Address: { type: String, required: true },
      City: { type: String, required: true },
      Postal: { type: String, required: true },
    },
    PaymentMethod:{type: String, required: true},
    PaymentResult:{
        id:String,
        status:String,
        update_time:String,
        email_address:String,
    },
    itemsPrice:{type:Number,required:true},
    shippingPrice:{type:Number,required:true},
    taxPrice:{type:Number,required:true},
    totalPrice:{type:Number,required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    isPaid:{type:Boolean,default:false},
    paidAt:{type:Date},
    isDelivered:{type:Boolean,default:false},
    DeliveredAt:{type:Date}
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('Order', orderSchema);
export default Order;
