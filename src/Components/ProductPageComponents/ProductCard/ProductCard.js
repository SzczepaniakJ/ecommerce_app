import React from "react";
import classes from "./ProductCard.module.css";
import { CSSTransition } from "react-transition-group";
import { Navigate } from "react-router-dom";
import "./transitions.css";
import { connect } from "react-redux";
import { addProductToCart } from "../../../Store/productsInCartSlice";

const mapDispatchToProps = {
  addProductToCart,
};

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.product,
      currency: this.props.currency,
      hovered: false,
      navigate: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currency !== this.props.currency) {
      this.setState({ ...this.state, currency: this.props.currency });
    }
  }

  hoverHandler = (state) => {
      this.setState({ ...this.state, hovered: state });
  };

  touchHandler = (state) => {
      if (state) {
        this.setState({ ...this.state, hovered: state });
      } else {
        setTimeout(() => {
          this.setState({ ...this.state, hovered: state });
        }, 1000);
      }
  };

  btnClickHandler = (e) => {
    e.stopPropagation();
    if (this.state.inStock) {
      const selectedAttr = {};
      this.state.attributes.forEach((attr) => {
        selectedAttr[attr.id] = attr.items[0].id;
      });
      this.props.addProductToCart({
        ...this.props.product,
        selectedAttr: selectedAttr,
      });
    }
  };

  cardClickHandler = () => {
    this.setState({ ...this.state, navigate: true });
  };

  render() {
    if (this.state.navigate) {
      return <Navigate to={`/products/${this.state.id}`} />;
    }
    return (
      <div
        className={[
          classes.ProductCard,
          !this.state.inStock && classes.outOfStock
        ].join(" ")}
        onMouseEnter={() => this.hoverHandler(true)}
        onMouseLeave={() => this.hoverHandler(false)}
        onTouchStart={() => this.touchHandler(true)}
        onTouchEnd={() => this.touchHandler(false)}
        onClick={this.cardClickHandler}
      >
        <div className={classes.previewImage}>
          <img src={this.state.gallery[0]} alt="Preview" />
          {!this.state.inStock && (
            <div className={classes.outOfStockOverlay}>
              <p>Out of Stock</p>
            </div>
          )}
        </div>
        <div className={classes.text}>
          <CSSTransition
            timeout={1000000}
            in={this.state.hovered}
            classNames="hover-transition"
          >
            <img src="/images/add_cart_icon.png" alt="cartIcon" className={classes.cartIcon} onClick={this.btnClickHandler}/>
          </CSSTransition>
          <p className={classes.name}>{this.state.brand + " " + this.state.name}</p>       
          <p className={classes.price}>
            {this.state.currency.symbol}
            {
              this.state.prices.filter(
                (price) => price.currency.label === this.state.currency.label
              )[0].amount
            }
          </p>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(ProductCard);
