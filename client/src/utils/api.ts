import type { ApiResponse } from '../../../shared/types/api.js'
import sleep from './helpers.js';

export const identify = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:9000/', {
      method: 'POST',
      body: formData,
    });

    const res: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(res.message);
    }
    
    // Artificial delay to make the identification feel more smarter to users
    await sleep(3000);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export default identify;