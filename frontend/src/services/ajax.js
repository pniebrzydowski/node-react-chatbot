const ajax = {
  get: async (url) => {
    const response = await fetch('http://localhost:8000/' + url);
    const result = await response.json();
    return result;
  },

  post: async (url, data) => {
    const response = await fetch('http://localhost:8000/' + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
  },
};

export default ajax;
