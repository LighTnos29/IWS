import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        required: [true, 'Product name is required']
    },
    productDesc: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    discountPrice: {
        type: Number,
        default: 0,
    },
    bestSeller: {
        type: Boolean,
        required: false
    },
    category: {
        type: String,
        required: [true, 'Product category is required']
    },
    productQty: {
        type: Number,
        required: [true, 'Product quantity is required'],
        min: [0, 'Quantity cannot be negative']
    },
    inStock:{
        type: Boolean,
        required: true
    },
    images: [
        {
            type: String,
        }
    ]
}, {
    timestamps: true
});

const productModel = mongoose.model('Product', productSchema)
export default productModel