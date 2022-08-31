import React from "react";
import classes from "./NavbarCategories.module.css";
import { connect } from "react-redux";
import { setSelectedCategory } from "../../../../Store/categoriesSlice";
import withRouter from "../../../../HOC/withRouter/withRouter";

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = {
  setSelectedCategory,
};

class NavbarCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selected: ""
    };
  }

  fetchStates = () => {
    const categories = this.props.categories;
    this.setState({
      ...this.state,
      categories: categories.data,
      selected: categories.selected
    });
  };

  componentDidMount() {
    this.fetchStates();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categories.selected !== this.props.categories.selected) {
      this.fetchStates();
    }
  }

  clickHandler = (category) => {
    this.setState({ ...this.state, selected: category });
    this.props.setSelectedCategory(category);
    const { pathname } = this.props.location;
    if (pathname !== "/") {
      this.props.navigate("/");
    }
  };

  render() {
    return (
      <div className={classes.NavbarCategories}>
        {this.state.categories.map((category) => (
            <p key={category.name}
              className={[
                classes.category,
                this.state.selected === category.name && classes.selected,
              ].join(" ")}
              onClick={() => this.clickHandler(category.name)}
            >
              
              {category.name}
              <span className={classes.borderBottom}></span>
            </p>
        ))}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavbarCategories));
