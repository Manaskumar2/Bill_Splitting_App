import { TryCatch } from '../middlewares/error.js';
import ErrorHandler from '../utils/utility-class.js';
export const getSinglePackage = TryCatch(async (req, res, next) => {
    if ()
        return next(new ErrorHandler("packages Not Found", 404));
    return res.status(200).json({
        success: true,
    });
});
export const updatePackage = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    console.log(req.body);
    const updateData = {};
    // Conditionally add fields to the update object if they are not undefined
    if (req.body.name !== undefined)
        updateData.name = req.body.name;
    if (req.body.price !== undefined)
        updateData.price = req.body.price;
    if (req.body.LabType !== undefined)
        updateData.LabType = req.body.LabType;
    if (req.body.category !== undefined)
        updateData.category = req.body.category;
    if (req.body.title !== undefined)
        updateData.title = req.body.title;
    if (req.body.description !== undefined)
        updateData.description = req.body.description;
    if (req.body.parameters !== undefined)
        updateData.parameters = req.body.parameters;
    if (req.body.isTrending !== undefined)
        updateData.isTrending = req.body.isTrending;
    let product = await Package.findById(id);
    if (!product)
        return next(new ErrorHandler("Product Not Found", 404));
    let updateProduct = await Package.findByIdAndUpdate(id, updateData, {
        new: true,
    });
    console.log(updateData);
    return res.status(200).json({
        success: true,
        updateProduct
    });
});
export const getAllPackages = TryCatch(async (req, res, next) => {
    let query = {};
    if (req.query.search) {
        query.name = {
            $regex: req.query.search,
            $options: "i",
        };
    }
    if (req.query.LabType) {
        query.LabType = req.query.LabType;
    }
    if (req.query.category) {
        query.category = req.query.category;
    }
    if (req.query.isTrending) {
        query.isTrending = req.query.isTrending;
    }
    if (req.query.priceMin !== undefined || req.query.priceMax !== undefined) {
        query.price = {};
        if (req.query.priceMin !== undefined) {
            query.price.$gte = req.query.priceMin;
        }
        if (req.query.priceMax !== undefined) {
            query.price.$lte = req.query.priceMax;
        }
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const packages = await Package.find(query).skip(skip).limit(limit);
    const total = await Package.countDocuments(query);
    return res.status(200).json({
        success: true,
        count: packages.length,
        total,
        page,
        pages: Math.ceil(total / limit),
        packages
    });
});
export const newPackage = TryCatch(async (req, res, next) => {
    const { name, price, title, description, LabType, reportFrequency, parameters, specialInstruction } = req.body;
    await Package.create({
        name,
        price,
        LabType,
        title,
        description,
        parameters,
        reportFrequency,
        specialInstruction
    });
    return res.status(201).json({
        success: true,
        message: "Package Created Successfully",
    });
});
export const excelCreate = TryCatch(async (req, res, next) => {
    const { LabType } = req.query;
    const packages = await Package.find({ LabType: LabType });
    return res.status(200).json({
        success: true,
        packages
    });
});
export const inquiryOfPackage = TryCatch(async (req, res, next) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Package ID is required'
        });
    }
    const packageCount = await Package.findByIdAndUpdate(id, { $inc: { inquiryCount: 1 } }, { new: true });
    if (!packageCount) {
        return res.status(404).json({
            success: false,
            message: 'Package not found'
        });
    }
    return res.status(200).json({
        success: true,
        packageCount
    });
});
export const getTopPackages = TryCatch(async (req, res, next) => {
    const packages = await Package.find().sort({ inquiryCount: -1 }).limit(20);
    return res.status(200).json({
        success: true,
        packages
    });
});
