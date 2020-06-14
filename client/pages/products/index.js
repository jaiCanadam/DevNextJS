import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useState } from "react";
import { listProductsWithCategoriesAndTags } from "../../actions/product";
import { API } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import LongCard from "../../components/products/longCard";
const Products = ({ products, categories, tags, size }) => {
  const showAllProducts = () => {
    return products.map((product, i) => {
      // ()
      return (
        <article key={i}>
          <LongCard product={product} />
          <hr />
        </article>
      );
    });
  };

  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center">
                Programming products and tutorials
              </h1>
            </div>
            <section>
              <p>show categories and tags</p>
            </section>
          </header>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">{showAllProducts()}</div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

Products.getInitialProps = () => {
  return listProductsWithCategoriesAndTags().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        products: data.products,
        categories: data.categories,
        tags: data.tags,
        size: data.size,
      };
    }
  });
};

export default Products;
