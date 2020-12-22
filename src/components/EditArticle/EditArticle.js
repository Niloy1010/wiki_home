import React, { Component } from "react";

import { withRouter, Link } from "react-router-dom";
import axios from "axios";
class EditArticle extends Component {
  state = {
    name: "",
    content: "",
    originalContent: "",
    error: false,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:9090/articles/${this.props.match.params.name}`)
      .then((res) => {
        let data = res.data ? res.data : "";
        this.setState({
          name: this.props.match.params.name,
          content: res.data,
          originalContent: res.data,
        });
      })
      .catch((err) =>
        this.setState({
          name: this.props.match.params.name,
          hasArticle: false,
        })
      );
  }

  onChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };
  cancelArticle = () => {
    this.setState({
      content: this.state.originalContent,
    });
  };
  saveArticle = () => {
    if (this.state.content != "") {
      axios
        .put(
          `http://localhost:9090/articles/${this.state.name}`,
          this.state.content
        )
        .then((res) =>
          this.setState({
            error: false,
            originalContent: this.state.content,
          })
        )
        .catch((err) => console.log(err));
    } else {
      this.setState({
        error: true,
      });
    }
  };
  render() {
    return (
      <div className="container text-center mt-5">
        <div className="card ml-auto mr-auto" style={{ width: "auto" }}>
          <Link
            to={{
              pathname: `/${this.state.name}`,
            }}
          >
            <div className="btn btn-secondary mt-3">Back</div>
          </Link>
          <div className="card-body">
            <h4 className="card-title">{this.state.name}</h4>
            <p className="card-text">{this.state.content}</p>

            <p className="card-text font-weight-bold">Edit Content</p>
            <input
              className="mb-3"
              type="text"
              style={{ width: "50%", padding: "1%" }}
              value={this.state.content}
              onChange={this.onChange}
            />
            <br></br>
            <button
              className="btn btn-primary mr-5"
              onClick={this.saveArticle}
              disabled={this.state.name === ""}
            >
              Save
            </button>
            <button className="btn btn-danger" onClick={this.cancelArticle}>
              Cancel
            </button>
            {this.state.error ? (
              <div className="alert alert-danger mt-3" role="alert">
                Please fill up the form
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(EditArticle);
