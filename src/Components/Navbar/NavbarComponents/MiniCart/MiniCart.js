import React from "react";
import { Link } from "react-router-dom";
import classes from "./MiniCart.module.css";
import ProductInCart from "../../../ProductPageComponents/ProductInCart/ProductInCart";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    products: state.productsInCart,
    currency: state.currencies.selected,
  };
};

class MiniCart extends React.Component {
  constructor(props) {
    super(props);
    this.cartRef = React.createRef();
    this.overlayRef = React.createRef();
    this.state = {
      currency: { label: "", symbol: "" },
      show: false,
    };
  }

  componentDidMount() {
    if (Object.keys(this.props.currency).length !== 0) {
      this.setState({
        ...this.state,
        show: true,
        currency: { ...this.props.currency },
      });
    } else {
      this.setState({ ...this.state, show: true });
    }
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.overlayRef.current.contains(event.target)
    ) {
      this.closeMiniCart();
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.setState({ ...this.state, products: this.props.products });
    }
    if (prevProps.currency !== this.props.currency) {
      this.setState({ ...this.state, currency: { ...this.props.currency } });
    }
  }

  calcNumProductInBag = () => {
    let totalNum = 0;
    this.props.products.forEach((product) => {
      totalNum += product.amount;
    });
    return totalNum;
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

  closeMiniCart = () => {
    this.setState({ ...this.state, show: false });
    this.props.closeMiniCart();
  };

  render() {
    return (
      <>
          <div className={classes.MiniCart} ref={this.cartRef}>
            <div className={classes.header}>
              <p className={classes.title}>
                <span>My Bag, </span>
                {this.calcNumProductInBag()}{" "}
                {this.calcNumProductInBag() === 1 ? "item" : "items"}
              </p>              
            </div>
            {this.props.products.length !== 0 ? (
              <>
                <div className={classes.products}>
                  {this.props.products.map((product) => (
                    <ProductInCart
                      product={product}
                      key={product.cartId}
                      setCurrency={(c) => {}}
                    />
                  ))}
                </div>
                <div className={classes.footer}>
                  <div className={classes.totalPrice}>
                    <p>Total</p>
                    <p>
                      {this.state.currency.symbol}
                      {this.calcTotalPrice()}
                    </p>
                  </div>
                  <div className={classes.btnsContainer}>
                    <Link to="/cart" onClick={this.props.closeMiniCart}>
                      <button className={classes.viewBagBtn}>View Bag</button>
                    </Link>
                    <button
                      className={classes.checkoutBtn}
                      onClick={this.props.closeMiniCart}
                    >
                      Check out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className={classes.noProducts}>
                <p>Your bag is empty.</p>
              </div>
            )}
          </div>
        <div className={classes.MiniCartOverlay} ref={this.overlayRef}></div>
      </>
    );
  }
}

export default connect(mapStateToProps, null)(MiniCart);
