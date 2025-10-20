import type { ApiResponse } from '../../../shared/types/api.js';
import sleep from './helpers.js';
import { toast } from 'react-toastify';
import { HTTP_CODES } from '../../../shared/constants/http.js';

export const identify = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:9000/', {
    method: 'POST',
    body: formData,
  });

  const res: ApiResponse = await response.json();

  // Artificial delay to make the identification feel more smarter to users
  await sleep(3000);

  if (!response.ok) {
    if (response.status === HTTP_CODES.BAD_REQUEST) {
      toast.warn(res.message)
    } else {
      toast.error(res.message)
    }

    throw new Error(res.message);
  }

  return res;
};

export default identify;