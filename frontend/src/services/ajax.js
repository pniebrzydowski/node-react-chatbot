import { serverUrl } from '../config';

const ajax = {
  get: async (url) => {
    const response = await fetch(serverUrl + url);
    const result = await response.json();
    return result;
  },

  post: async (url, data) => {
    const response = await fetch(serverUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
  },
};

export default ajax;
