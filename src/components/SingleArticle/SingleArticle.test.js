import mockData from "../../mockData";
import { getSingleArticle } from "../../__mocks__/http";

test("Testing single api call", () => {
  let articleName = "wiki";
  let singleArticle = mockData.find((data) => data.name === articleName);
  expect(getSingleArticle(articleName)).toEqual(singleArticle);
});
