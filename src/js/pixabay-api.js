export const fetchPhotosByQuery = searchedQuery => {
  const searchParams = new URLSearchParams({
    q: searchedQuery,
    key: '48331487-0b79b5362db2718bcf5a2a310',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};
