import axios from "axios";

export const getArticles = () => {
  return axios
    .get("http://localhost:9090/articles")
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};
export const getSingleArticle = (article) => {
  return axios.get(`http://localhost:9090/articles/${article}`).then((res) => {
    return res.data;
  });
};
