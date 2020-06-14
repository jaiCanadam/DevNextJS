import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

const LongCard = ({ product }) => {
  //   const showProductCategories = (product) => {
  //     return product.categories.map((c, i) => {
  //       return (
  //         <Link key={i} href={`/categories/${c.slug}`}>
  //           <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
  //         </Link>
  //       );
  //     });
  //   };
  console.log(product);
  const showProductTags = (product) => {
    return product.tags.map((t, i) => {
      return (
        <Link key={i} href={`/tags/${t.slug}`}>
          <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
        </Link>
      );
    });
  };

  const showProductCategories = (product) => {
    return (
      <Link href={`/categories/`}>
        <a>
          <div className="col-4">{JSON.stringify(product.category.name)}</div>
        </a>
      </Link>
    );
  };

  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/products/${product.slug}`}>
          <a>
            <h2 className="pt-3 pb-3 font-weight-bold">{product.name}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className="mark ml-1 pt-2 pb-2">
          Written by {product.postedBy.name} | Published{" "}
          {moment(product.updatedAt).fromNow()}
        </p>
      </section>
      <section>
        {showProductCategories(product)}

        {/* {JSON.stringify(product.category.name)} */}
        {showProductTags(product)}
        <br />
        <br />
      </section>

      <div className="row">
        <div className="col-md-4">image</div>
        <div className="col-md-8">
          <section>
            <div className="pb-3">{renderHTML(product.excerpt)}</div>
            <Link href={`/products/${product.slug}`}>
              <a className="btn btn-primary pt-2">Read more</a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LongCard;
