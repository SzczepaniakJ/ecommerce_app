import React from "react";
import { connect } from "react-redux";
import Layout from "../../HOC/Layout/Layout";
import classes from "./CartPage.module.css";
import ProductInCart from "../../Components/ProductPageComponents/ProductInCart/ProductInCart";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    products: state.productsInCart,
  };
};

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      currency: { label: "", symbol: "" },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.setState({ ...this.state, products: this.props.products });
    }
  }

  getCurrency = (currency) => {
    this.setState({ ...this.state, currency: { ...currency } });
  };

  calcTotalPrice = () => {
    let totalPrice = 0;
    if (this.state.currency.label !== "") {
      this.props.products.forEach((product) => {
        const price = product.prices.filter(
          (price) => price.currency.label === this.state.currency.label
        );
        totalPrice += price[0].amount * product.amount;
      });
    }
    return totalPrice.toFixed(2);
  };

  calcTax = () => {
    let tax = 0;
    if (this.state.currency.label !== "") {
      this.props.products.forEach((product) => {
        const price = product.prices.filter(
          (price) => price.currency.label === this.state.currency.label
        );
        tax += price[0].amount * product.amount * 0.21;
      });
    }
    return tax.toFixed(2);
  };

  calcNumProductInBag = () => {
    let totalNum = 0;
    this.props.products.forEach((product) => {
      totalNum += product.amount;
    });
    return totalNum;
  };

  render() {
    return (
      <Layout>
        <div className={classes.CartPage}>
          <h3 className={classes.header}>Cart</h3>
          {this.props.products.length !== 0 ? (
            <>
              <div className={classes.products}>
                {this.props.products.map((product) => (
                  <ProductInCart
                    cartPage
                    product={product}
                    key={product.cartId}
                    setCurrency={this.getCurrency}
                  />
                ))}
              </div>
              <div className={classes.btnAndPriceContainer}>
                <div className={classes.summary}>
                  <div className={classes.totalPrice}>
                    <p>Tax 21%:</p>
                    <p className={classes.price}>
                      {this.calcTax()}
                    </p>
                  </div>
                  <div className={classes.totalPrice}>
                    <p>Quantity:</p>
                    <p className={classes.price}>
                      {this.calcNumProductInBag()}
                    </p>
                  </div>
                  <div className={classes.totalPrice}>
                    <p>Total:</p>
                    <p className={classes.price}>
                      {this.state.currency.symbol}
                      {this.calcTotalPrice()}
                    </p>
                  </div>
                </div>
                <button className={classes.checkoutBtn}>Order</button>
              </div>
            </>
          ) : (
            <div className={classes.noProducts}>
              <p>Your cart is empty.</p>
              <Link to="/">
                <button>Browse Products</button>
              </Link>
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, null)(CartPage);
