import mongoose from "mongoose";

// 1. Model interface - describing the data:
export interface IProductModel extends mongoose.Document {
    name: string;
    price: number;
    stock: number;
}

// 2. Model schema - describing validation, data, constraints...
export const ProductSchema = new mongoose.Schema<IProductModel>({
    name: {
        type: String, // JavaScript String
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [100, "Name to long"]
    },
    price: {
        type: Number, // JavaScript Number
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"]
    },
    stock: {
        type: Number, // JavaScript Number
        required: [true, "Missing stock"],
        min: [0, "Stock can't be negative"],
        max: [1000, "Stock can't exceed 1000"]
    }
}, { // Options
    versionKey: false // Don't add __v for new documents.
});

// 3. Model Class - the final model class:
export const ProductModel = mongoose.model<IProductModel>("ProductModel", ProductSchema, "products"); // Model name, schema name, collection name
