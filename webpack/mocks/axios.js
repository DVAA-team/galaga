const axios = {
  get() {
    return Promise.resolve({
      data: {},
    });
  },
  create() {
    return {
      interceptors: {
        response: {
          use: () => {},
        },
        request: {
          use: () => {},
        },
      },
    };
  },
};

module.exports = axios;
