import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import { IProductModel, ProductModel } from "../4-models/product-model";

// Get all products:
async function getAllProducts(): Promise<IProductModel[]> {
    return ProductModel.find().exec();
}

// Get one product: 
async function getOneProduct(_id: string): Promise<IProductModel> {
    const product = await ProductModel.findById(_id).exec();
    if (!product) throw new IdNotFoundError(_id);
    return product;
}

// Add product: 
async function addProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return product.save();
}

// Update product:
async function updateProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync();
    if (errors) throw new ValidationError(errors.message);
    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec(); // { returnOriginal: false } --> return back db product and not argument product.
    if (!updatedProduct) throw new IdNotFoundError(product._id);
    return updatedProduct;
}

// Delete product: 
async function deleteProduct(_id: string): Promise<void> {
    const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec();
    if (!deletedProduct) throw new IdNotFoundError(_id);
}

// ---------------------------

// MongoDB Query Language:
async function testMongoQueryLanguage(): Promise<IProductModel[]> {

    // SELECT _id, name, price FROM products
    // return ProductModel.find({}, ["name", "price"]).exec();

    // SELECT name, price FROM products
    // return ProductModel.find({}, { name: true, price: true, _id: false }).exec();

    // SELECT * FROM products WHERE price = 10
    // return ProductModel.find({ price: 10 }).exec();

    // SELECT * FROM products WHERE price = 10 AND name='Aniseed Syrup'
    // return ProductModel.find({ price: 10, name: "Aniseed Syrup" }).exec();

    // SELECT * FROM products WHERE price = 10 OR name='Ikura'
    // return ProductModel.find({ $or: [{ price: 10 }, { name: "Ikura" }] }).exec();

    // SELECT * FROM products WHERE price >= 10 AND price <= 20
    // return ProductModel.find({ price: { $gte: 10, $lte: 20 } }).exec();

    // SELECT * FROM products WHERE price >= 10 AND price <= 20 ORDER BY price
    return ProductModel.find({ price: { $gte: 10, $lte: 20 } }, null, { sort: { price: 1 } }).exec(); // 1 = ascending, -1 = descending
}

export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    testMongoQueryLanguage
};
