const mockData = require("../mockData");
module.exports.getArticles = function () {
  console.log(mockData);
  return mockData;
};

module.exports.getSingleArticle = function (articleName) {
  let foundArticle = mockData.find((data) => {
    return data.name === articleName;
  });
  return foundArticle;
};
