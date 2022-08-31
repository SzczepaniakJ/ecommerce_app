import React from "react";
import classes from "./ShoppingCart.module.css";
import { connect } from "react-redux";
import MiniCart from "../MiniCart/MiniCart";

const mapStateToProps = (state) => {
  return {
    products: state.productsInCart,
  };
};

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productLength: 0,
      showOverlay: false,
      redirectToCart: false,
    };
    this.iconRef = React.createRef();
  }

  setNumProducts = () => {
    let totalNum = 0;
    this.props.products.forEach((product) => {
      totalNum += product.amount;
    });
    this.setState({
      ...this.state,
      productLength: totalNum,
    });
  };

  componentDidMount() {
    if (Object.keys(this.props.products).length !== 0) {
      this.setNumProducts();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.setNumProducts();
    }
  }

  clickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.state.showOverlay) {
      this.setState({ ...this.state, showOverlay: true });
    }
  };

  hideOverlayHandler = () => {
    this.setState({ ...this.state, showOverlay: false });
  };

  render() {
    return (
      <div className={classes.ShoppingCart}>
          <div
            className={classes.cartIcon}
            onClick={this.clickHandler}
            ref={this.iconRef}
          >
            <img src="/images/cart_icon.png" alt="cartIcon"/>
            {this.state.productLength > 0 && (
              <div className={classes.numProductsPopup}>
                <p>{this.state.productLength}</p>
              </div>
            )}
          </div>
        {this.state.showOverlay && (
          <MiniCart
            closeMiniCart={this.hideOverlayHandler}
            cartIconRef={this.iconRef}
          />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ShoppingCart);
