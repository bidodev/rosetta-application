export const configs = {
  defaultLanguage: "en",
  rows: 8, //how many items generate in each page (pagination)
  maxResults: 32, //how many items get from the API.
  noCover:
    "https://www.forewordreviews.com/books/covers/strategic-market-research.jpg", //img replace when google return empty cover (to fix the path)
  baseURL: "https://www.googleapis.com/books/v1/volumes", //base url for api calls
};
