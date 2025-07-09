import productModel from '../models/productModel.js'
import userModel from '../models/userModel.js'

export const allProducts = async (req, res) => {
    try {
        const product = await productModel.find()
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ message: "Error loading products.", error })
    }
}
export const product = async (req, res) => {
    try {
        const { id } = req.params
        const product = await productModel.findById(id)
        if (!product) return res.status(404).json({ message: "Product not found" })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({
            message: "Error fetching product",
            error: error.message
        });
    }
}
export const createProducts = async (req, res) => {
    try {
        const { name, description, price, discountPrice, bestseller, category, productQty, inStock, images } = req.body

        if (!name || !price || !category || !productQty || inStock === undefined) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newProduct = await productModel.create({
            name,
            description,
            price,
            discountPrice: discountPrice || 0,
            bestseller,
            category,
            productQty,
            inStock,
            images
        });

        res.status(201).json({
            message: "Product created successfully",
            product: newProduct
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating product",
            error: error.message
        });
    }
}
export const bestsellerProducts = async (req, res) => {
    try {
        const products = await productModel.find({ bestseller: true });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({
            message: "Error fetching bestseller products",
            error: error.message
        });
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const {
            name,
            description,
            price,
            discountPrice,
            bestseller,
            category,
            productQty,
            inStock,
            images
        } = req.body;

        const updates = {};
        if (name !== undefined) updates.name = name;
        if (description !== undefined) updates.description = description;
        if (price !== undefined) updates.price = price;
        if (discountPrice !== undefined) updates.discountPrice = discountPrice;
        if (bestseller !== undefined) updates.bestseller = bestseller;
        if (category !== undefined) updates.category = category;
        if (productQty !== undefined) updates.productQty = productQty;
        if (inStock !== undefined) updates.inStock = inStock;
        if (images !== undefined) updates.images = images;

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        res.status(400).json({
            message: "Error updating product",
            error: error.message
        });
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the product first to check if it exists
        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete the product
        await productModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Error deleting product",
            error: error.message
        });
    }
}
