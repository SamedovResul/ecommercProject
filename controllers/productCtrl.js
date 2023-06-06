import Products from "../models/productModel.js";
import cloudinary from "cloudinary";

// Filter, sorting and paginating

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      const products = await features.query;
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  uploadImage: async (req, res) => {
    try {
      let img = req.file.path;
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
      });
      cloudinary.v2.uploader.upload(
        img,
        { folder: "test" },
        async (err, result) => {
          if (err) throw err;

          res.json({ public_id: result.public_id, url: result.secure_url });
        }
      );
    } catch (error) {
      console.log({ msg: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;

      if (!images) return res.status(400).json({ msg: "No image upload" });

      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: "This product already exists." });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });

      await newProduct.save();
      res.json(newProduct);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json(req.params.id);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body;
      // if(!images) return res.status(400).json({msg: "No image upload"})
			let update
      if (!images) {
         await Products.findOneAndUpdate(
          { _id: req.params.id },
          {
            title: title.toLowerCase(),
            price,
            description,
            content,
            category,
          }
        );
				
      }else{
				await Products.findOneAndUpdate(
          { _id: req.params.id },
          {
            title: title.toLowerCase(),
            price,
            description,
            content,
            images,
            category,
          }
        );
			}
			update = await Products.findById({ _id: req.params.id })
      res.json(update);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default productCtrl;
