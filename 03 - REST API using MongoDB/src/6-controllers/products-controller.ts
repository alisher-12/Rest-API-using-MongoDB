import express, { NextFunction, Request, Response } from "express";
import { ProductModel } from "../4-models/product-model";
import productsLogic from "../5-logic/products-logic";

const router = express.Router();

// GET http://localhost:3001/api/products
router.get("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/products/:_id
router.get("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const product = await productsLogic.getOneProduct(_id);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/products
router.post("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = new ProductModel(request.body);
        const addedProduct = await productsLogic.addProduct(product);
        response.status(201).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:3001/api/products/:_id
router.put("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;
        const product = new ProductModel(request.body);
        const updatedProduct = await productsLogic.updateProduct(product);
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/products/:_id
router.delete("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await productsLogic.deleteProduct(_id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// --------------------------------

// Mongo Query Language:

// GET http://localhost:3001/api/mongo-query-language
router.get("/mongo-query-language", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsLogic.testMongoQueryLanguage();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;
