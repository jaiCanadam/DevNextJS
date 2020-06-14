const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const tagRoutes = require("./routes/tag");
const productRoutes = require("./routes/product");

//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`\n DB Connected...`));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

//routes middleware
app.use("/agm/us", authRoutes);
app.use("/agm/us", userRoutes);
app.use("/agm/us", categoryRoutes);
app.use("/agm/us", tagRoutes);
app.use("/agm/us", productRoutes);

//cors
if (process.env.NODE_ENV == "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
  console.log(
    `\n NODE_ENV is ${process.env.NODE_ENV} \n Client_URL is ${process.env.CLIENT_URL}`
  );
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(` Server is running on ${port}`);
});
