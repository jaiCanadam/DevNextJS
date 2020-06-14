import Link from "next/link";

import { Icon } from "semantic-ui-react";
import renderHTML from "react-render-html";
import moment from "moment";
import ShowImage from "./showImage";
import { API } from "../../config";

const RYCard = ({ product }) => {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          <p>{product.description.substring(0, 100)}</p>
          <p>${product.price}</p>
          <Link to="/">
            <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
              View Product
            </button>
          </Link>
          <button className="btn btn-outline-warning mt-2 mb-2">
            Add to card
          </button>
        </div>
      </div>
    </div>
  );
};

export default RYCard;
