import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useState } from "react";
import { singleProduct } from "../../actions/product";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";

const SingleProduct = ({ product }) => {
  //   const showProductCategories = (product) =>
  //     product.categories.map((c, i) => (
  //       <Link key={i} href={`/categories/${c.slug}`}>
  //         <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
  //       </Link>
  //     ));

  const showProductTags = (product) =>
    product.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

  return (
    <React.Fragment>
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: "-30px" }}>
                  <img
                    src={`${API}/product/photo/${product.slug}`}
                    alt={product.name}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>

              <section>
                <p className="lead mt-3 mark">
                  Written by {product.postedBy.name} | Published{" "}
                  {moment(product.updatedAt).fromNow()}
                </p>

                <div className="pb-3">
                  {/* {showProductCategories(product)} */}
                  {showProductTags(product)}
                  <br />
                  <br />
                </div>
              </section>
            </div>

            <div className="container">
              <section>
                <div className="col-md-12 lead">{product.description}</div>
              </section>
            </div>

            <div className="container">
              <h4 className="text-center pt-5 pb-5 h2">Related products</h4>
              <hr />
              <p>show related products</p>
            </div>

            <div className="container pb-5">
              <p>show comments</p>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

SingleProduct.getInitialProps = ({ query }) => {
  return singleProduct(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      // console.log('GET INITIAL PROPS IN SINGLE Product', data);
      return { product: data };
    }
  });
};

export default SingleProduct;
