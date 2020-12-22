import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getArticles } from "../../http";

export default class Home extends Component {
  state = {
    articles: [],
  };
  componentDidMount() {
    getArticles().then((data) => {
      this.handleData(data);
    });
  }
  handleData = function (data) {
    this.setState({
      articles: data,
    });
    return data;
  };
  render() {
    let showArticles = this.state.articles?.map((article) => {
      return (
        <div
          className="card ml-auto mr-auto"
          style={{ width: "18rem" }}
          key={article.name}
        >
          <div className="card-body">
            <h5 className="card-title">
              <Link
                to={{
                  pathname: `/${article.name}`,
                }}
              >
                {article.name}
              </Link>
            </h5>
            <p className="card-text">{article.content}</p>
          </div>
        </div>
      );
    });
    return (
      <div className="container text-center">
        <h1 className=" mt-2 mb-4">Articles</h1>
        {showArticles}
      </div>
    );
  }
}
