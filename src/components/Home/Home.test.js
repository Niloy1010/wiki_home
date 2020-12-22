import React from "react";
import mockData from "../../mockData";
import Home from "./Home";
import { getArticles } from "../../__mocks__/http";

test("Testing api call", () => {
  let articles = getArticles();
  expect(articles).toEqual([
    {
      name: "wiki",
      content: "first wiki",
    },
    {
      name: "wiki2",
      content: "second content",
    },
  ]);
});

test("Testing setting state with fetched Data", () => {
  let h = new Home();
  expect(h.handleData(mockData)).toEqual([
    {
      name: "wiki",
      content: "first wiki",
    },
    {
      name: "wiki2",
      content: "second content",
    },
  ]);
});
