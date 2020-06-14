import React, { useState, useEffect } from "react";
import { getProducts } from "../../actions/product";
import Card from "./card";
import css from "./HomePageProducts.css";
import { API } from "../../config";

const HomePageProducts = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
        console.log(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <div
      title="Home Page"
      description="Node React E-commerce App"
      classname="container-fluid"
    >
      <h2 className="mb-4">New Arrivals</h2>
      <div className={css.card}>
        <div className="row">
          {productsByArrival.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePageProducts;
