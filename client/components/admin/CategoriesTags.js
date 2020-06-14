import Category from "../crud/Category";
import Tag from "../crud/Tag";
import Link from "next/link";
import { Button, Icon } from "semantic-ui-react";

const CategoriesTags = () => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 pt-5 pb-5">
            <h2>Manage Categories and Tags</h2>
          </div>

          <div className="col-md-6">
            <Category />
          </div>
          <div className="col-md-6">
            <Tag />
          </div>
        </div>
        <br />
        <br />
        <Button className="col-md-1" icon labelPosition="left">
          <Link href="/admin">
            <a>Back</a>
          </Link>
          <Icon name="left arrow" />
        </Button>
      </div>
    </React.Fragment>
  );
};

export default CategoriesTags;
