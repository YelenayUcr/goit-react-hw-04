import axios from 'axios';

const ACCESS_KEY = 'FbqqJMaPqFzkjxpCjfMv_SvkJaN-1p1FSt32R42m6EU';

const instance = axios.create({
  baseURL: 'https://api.unsplash.com/',
  params: {
    client_id: ACCESS_KEY,
  },
});

export const fetchImages = async (keyword, page = 1, itemsPerPage = 12) => {
  const response = await instance.get('/search/photos', {
    params: {
      query: keyword,
      page: page,
      per_page: itemsPerPage,
    },
  });
  return response.data;
};
