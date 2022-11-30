import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30993441-ae129a01ad12f9b97eb01d4cf';

export const getImages = async (query, page = 1) => {
  const config = {
    params: {
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      q: query,
      page,
      per_page: 12,
    },
  };
  const { data } = await axios.get(BASE_URL, config);
  return data;
};
