import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/bfhl';

export interface BFHLRequest {
  data: string[];
}

export interface BFHLResponse {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers: string[];
  alphabets: string[];
  highest_alphabet: string[];
}

export const sendDataToBackend = async (jsonData: BFHLRequest): Promise<BFHLResponse | null> => {
  try {
    console.log('Sending request to:', API_URL);
    console.log('Request data:', jsonData);
    
    const response = await axios.post<BFHLResponse>(API_URL, jsonData);
    console.log('Response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    return null; // Return null instead of throwing an error to handle it gracefully
  }
};