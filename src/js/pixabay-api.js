import axios from 'axios';

export const fetchPhotosByQuery = async (
  searchQuery,
  currentPage,
  perPage = 15
) => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        q: searchQuery,
        key: '48331487-0b79b5362db2718bcf5a2a310',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: perPage,
        page: currentPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Pixabay:', error);
    throw error;
  }
};
