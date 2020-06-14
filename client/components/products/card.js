import Link from "next/link";
import { Icon } from "semantic-ui-react";
import renderHTML from "react-render-html";
import moment from "moment";
//import ShowImage from "./ShowImage";
import { API } from "../../config";

const Card = ({ product }) => {
  return (
    <React.Fragment>
      <div class="col-12 col-sm-3 col-md-4  col-lg-3">
        <div class="card">
          <img
            className="img img-fluid"
            style={{ maxHeight: "170px", width: "auto" }}
            src={`${API}/product/photo/${product.slug}`}
            alt={product.name}
          />

          <div class="card-img-overlay d-flex justify-content-end">
            <a href="#" class="card-link text-danger like">
              <i class="fas fa-heart"></i>
            </a>
            <a
              href={`/products/${product.slug}`}
              className="btn btn-primary pt-2"
            >
              Read more
            </a>
          </div>

          <div class="card-body">
            <h4 class="card-title">{product.name}</h4>
            {/*<h6 class="card-subtitle mb-2 text-muted">Style: VA33TXRJ5</h6>*/}
            <p class="card-text">{product.description.substring(0, 300)}</p>
            <div class="options d-flex flex-fill">
              <select class="custom-select mr-1">
                <option selected>Quantity</option>
                <option value="1">Green</option>
                <option value="2">Blue</option>
                <option value="3">Red</option>
              </select>
              <select class="custom-select ml-1">
                <option selected>Size</option>
                <option value="1">41</option>
                <option value="2">42</option>
                <option value="3">43</option>
              </select>
            </div>
            <div class="buy d-flex justify-content-between align-items-center">
              <div class="price text-success">
                <h5 class="mt-4">Rs {product.price}</h5>
              </div>
              <a href="#" class="btn btn-danger mt-3">
                <i class="fas fa-shopping-cart"></i> Add to Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
