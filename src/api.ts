import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

export const getEmbarcaciones = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/embarcaciones`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener las embarcaciones:', error);
    throw error; 
  }
};