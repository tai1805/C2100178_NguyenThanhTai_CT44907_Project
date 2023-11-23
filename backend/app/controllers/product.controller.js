const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const path = require('path');
const ResizeImage = require("../services/resize-image.service");
exports.create = async (req, res, next) => {
    // console.log(req.body.subDescription);
    // console.log(req.file);

    if (!req.body?.name || !req.body?.description || !req.body?.price || !req.body?.itemsInStock) {
        return next(new ApiError(400, "Name can not be empty!"));
    }
    try {
        const productService = new ProductService(MongoDB.client);
        const imagePath = path.join(__dirname, '../../public/images');
        console.log(__dirname);
        const fileUpload = new ResizeImage(imagePath);
        console.log(fileUpload);
        if (!req.file) {
            return res.send({error: 'Please! provide an image'});
        }
        const filename = await fileUpload.save(req.file.path);
        
        const subDescription = handleSubDescription(req.body.subDescription);
        const document = await productService.create({...req.body, image: filename, subDescription: subDescription});
        // console.log(document);
        // console.log("hi");
        return res.send("Đã thêm sản phẩm");
        // return res.send(document);
    } catch (error) {
        return next (
            new ApiError(500, `An error occurred while creating the product! ${error}`)
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const productService = new ProductService(MongoDB.client);
        const {name} = req.query;
        if (name) {
            documents = await productService.findByName(name);
        }
        else {
            documents = await productService.find({})
        }
            
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while retrieving product")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(
                500,
                `Error retrieving product with id = ${req.params.id}`
            )
        );
    }
}; 


exports.update = async (req, res, next) => {
    // console.log(req.body);
    // console.log(req.file);
    if (Object.keys(req.body).length === 0) {
        return next (new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const productService = new ProductService(MongoDB.client);
        const subDescription = handleSubDescription(req.body.subDescription);
        req.body.subDescription = subDescription;
        var filename = '';
        if(req.file){
            
            const imagePath = path.join(__dirname, '../../public/images');
            const fileUpload = new ResizeImage(imagePath);
            filename = await fileUpload.save(req.file.path);
            console.log(filename);
            req.body.image = filename;
        } else {
            const foundData = productService.findById(req.params.id);
            if(foundData) {
                req.body.image = foundData.image;
            }
        }
        
        
        const document = await productService.update(req.params.id, req.body);
        if (!document) {
            return next (new ApiError(404, "Product not found"));
        }
        return res.send({message: "Product was updated successfully"});
    } catch (error) {
        new ApiError(
            500,
            `Error updating product with id = ${req.params.id}`
        )
    }
};

exports.delete = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send({message: "Product was deleted successfully"});
    } catch (error) {
        return next (
            new ApiError(
                500,
                `Error deleting product with id = ${req.params.id}`
            )
        );
    }
};

const handleSubDescription = (data) => {
    // console.log(data);
    const subDescription = JSON.parse(data);
    return subDescription;
}