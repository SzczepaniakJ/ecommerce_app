import React from "react";
import ProductsList from "../../Components/ProductsList/ProductsList";
import Layout from "../../HOC/Layout/Layout";
import classes from "./ProductsPage.module.css";

class ProductsPage extends React.Component {
  render() {
    return (
      <div className={classes.ProductsPage}>
        <Layout>
          <ProductsList />
        </Layout>
      </div>
    );
  }
}

export default ProductsPage;
