
import axios from "axios";
 // HTTP request
export default async function getPostsByUser(query,page) {
    const BASE_URL = "https://pixabay.com";
    const END_POINT = '/api/';
    const API_KEY = '42305658-75508782eac06a666c1fb928b';

    const params = {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        q: query,
        per_page: 15,
        page: page
    
    };


const url = `${BASE_URL}${END_POINT}?${new URLSearchParams(params)}`;
  const response = await axios.get(url);
 return response.data
    };
