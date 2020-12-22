import React, { Component } from "react";

import axios from "axios";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { getSingleArticle } from "../../http";
class SingleArticle extends Component {
  state = {
    name: "",
    content: "",
    hasArticle: true,
  };

  componentDidMount() {
    getSingleArticle(this.props.match.params.name)
      .then((res) => {
        this.setState({
          name: this.props.match.params.name,
          content: res,
          hasArticle: true,
        });
      })
      .catch((err) => {
        this.setState({
          name: this.props.match.params.name,
          hasArticle: false,
        });
      });
  }
  render() {
    let showContent = this.state.hasArticle ? (
      <div className="card ml-auto mr-auto" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{this.state.name}</h5>

          <p className="card-text">{this.state.content}</p>
        </div>
      </div>
    ) : (
      <div className="alert alert-primary" role="alert">
        No article With the exact name found. Press Edit button to add it
      </div>
    );
    return (
      <div className="container text-center">
        <Link
          to={{
            pathname: `/`,
          }}
        >
          <div className="btn btn-secondary mt-5 mb-3 mr-5">Back</div>
        </Link>
        <Link
          to={{
            pathname: `/edit/${this.state.name}`,
          }}
        >
          <div className="btn btn-primary mt-5 mb-3">Edit</div>
        </Link>
        {showContent}
      </div>
    );
  }
}
export default withRouter(SingleArticle);
