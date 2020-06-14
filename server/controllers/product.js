const Product = require("../models/product");
const Category = require("../models/category");
const Tag = require("../models/tag");
const formidable = require("formidable");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");
const fs = require("fs");
const { smartTrim } = require("../helpers/product");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not upload",
      });
    }

    const {
      name,
      description,
      category,
      tags,
      price,
      quantity,
      shipping,
    } = fields;

    if (!name || !name.length) {
      return res.status(400).json({
        error: "Product Name is required",
      });
    }

    if (!description || description.length < 40) {
      return res.status(400).json({
        error: "Description is too short",
      });
    }

    if (!category || category.length === 0) {
      return res.status(400).json({
        error: "At least one category is required",
      });
    }

    if (!tags || tags.length === 0) {
      return res.status(400).json({
        error: "At least one tag is required",
      });
    }

    if (!price || price.length === 0) {
      return res.status(400).json({
        error: "Price cannot be zero",
      });
    }

    if (!quantity || quantity.length === 0) {
      return res.status(400).json({
        error: "Quantity cannot be zero",
      });
    }

    if (!shipping || shipping.length === 0) {
      return res.status(400).json({
        error: "Please mention regarding shipping",
      });
    }

    let product = new Product();
    product.name = name;
    product.description = description;
    product.category = category;
    product.quantity = quantity;
    product.price = price;
    product.excerpt = smartTrim(description, 25, " ", " ...");
    product.slug = slugify(name).toLowerCase();
    product.mtitle = `${name} | ${process.env.APP_NAME}`;
    product.mdesc = stripHtml(description.substring(0, 160));
    product.postedBy = req.user._id;

    // tags
    let arrayOfTags = tags && tags.split(",");

    // 1kb = 1000
    // 1mb = 1000000
    //Image Cannot be more than 2mb
    if (files.photo) {
      // photo not uploaded validation

      if (files.photo.size > 20000000) {
        return res.status(400).json({
          error: "Image should be less then 2mb in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      //arrayofcategories code is commented as we are doing category only for products
      //res.json(result);
      //console.log(`here results 1`);

      // Product.findByIdAndUpdate(
      //   result._id,
      //   { $push: { category: category } },
      //   { new: true }
      // ).exec((err, result) => {
      //   if (err) {
      //     return res.status(400).json({
      //       error: errorHandler(err),
      //     });
      //   } else {
      Product.findByIdAndUpdate(
        result._id,
        { $push: { tags: arrayOfTags } },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          res.json(result);
        }
      });
      //}
      //});
    });
  });
};

// list, listAllproductscategoryTags, read, remove, update

exports.list = (req, res) => {
  Product.find({})
    .populate("category", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name")
    .select("_id name slug excerpt category tags postedBy createdAt updatedAt")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.listAllProductsCategoryTags = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let products;
  let category;
  let tags;

  Product.find({})
    .populate("category", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name profile")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("_id name slug excerpt category tags postedBy createdAt updatedAt")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      products = data; // products
      // get all category
      Category.find({}).exec((err, c) => {
        if (err) {
          return res.json({
            error: errorHandler(err),
          });
        }
        category = c; // category
        // get all tags
        Tag.find({}).exec((err, t) => {
          if (err) {
            return res.json({
              error: errorHandler(err),
            });
          }
          tags = t;
          // return all products category tags
          res.json({ products, category, tags, size: products.length });
        });
      });
    });
};

exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Product.findOne({ slug })
    // .select("-photo")
    .populate("category", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name")
    .select(
      "_id name descriptionn slug mtitle mdesc category tags postedBy createdAt updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Product.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Product deleted successfully",
    });
  });
};

exports.update = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Product.findOne({ slug }).exec((err, oldProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not upload",
        });
      }

      let slugBeforeMerge = oldProduct.slug;
      oldProduct = _.merge(oldProduct, fields);
      oldProduct.slug = slugBeforeMerge;

      const { description, desc, category, tags } = fields;

      if (description) {
        oldProduct.excerpt = smartTrim(description, 320, " ", " ...");
        oldProduct.desc = stripHtml(description.substring(0, 160));
      }

      if (category) {
        oldProduct.category = category.split(",");
      }

      if (tags) {
        oldProduct.tags = tags.split(",");
      }

      if (files.photo) {
        if (files.photo.size > 20000000) {
          return res.status(400).json({
            error: "Image should be less then 2mb in size",
          });
        }
        oldProduct.photo.data = fs.readFileSync(files.photo.path);
        oldProduct.photo.contentType = files.photo.type;
      }

      oldProduct.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        // result.photo = undefined;
        res.json(result);
      });
    });
  });
};

exports.photo = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Product.findOne({ slug })
    .select("photo")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    });
};

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

exports.listBySellArrival = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
 */

exports.listRelated = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 3;
  const { _id, category } = req.body.product;
  console.log(req.body.product);
  Product.find({ _id: { $ne: _id }, category: { $in: categories } })
    .limit(limit)
    .populate("postedBy", "_id name profile")
    .select("name slug excerpt postedBy createdAt updatedAt")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "products not found",
        });
        res.json(products);
      }
    });
};

exports.photo = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Product.findOne({ slug })
    .select("photo")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    });
};

exports.listSearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};
  console.log(order, sortBy, limit, skip, req.body.filters);
  console.log("findArgs", findArgs);
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  console.log(findArgs);
  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.listCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Categories not found",
      });
    }
    res.json(categories);
  });
};

exports.listBySearch = (req, res) => {
  const { search } = req.query;
  if (search) {
    Product.find(
      {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      },
      (err, products) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        console.log(products);
        res.json(products);
      }
    ).select("-photo");
  }
};
