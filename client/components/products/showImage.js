import { API } from "../../config";

const ShowImage = ({ product, slug }) => (
  <img
    className="img img-fluid"
    style={{ maxHeight: "170px", width: "auto" }}
    src={`${API}/product/photo/${product.slug}`}
    alt={product.name}
  />
);

export default ShowImage;
