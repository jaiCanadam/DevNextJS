import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import CategoriesTags from "../../../components/admin/CategoriesTags";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <CategoriesTags />
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
