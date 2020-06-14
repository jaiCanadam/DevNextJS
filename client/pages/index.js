import Layout from "./../components/Layout";
import styles from "../static/css/styles.css";
import HomePageProducts from "../components/products/HomePageProducts";
import Search from "../components/products/Search";
const Index = () => {
  return (
    <Layout>
      <Search />
      <HomePageProducts />
    </Layout>
  );
};

export default Index;
