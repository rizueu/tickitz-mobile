const config = {
  screens: {
    SignIn: {
      path: 'activate/:id',
      parse: {
        id: (id) => `${id}`,
      },
    },
  },
};

const linking = {
  prefixes: ['tickitz://'],
  config,
};

export default linking;
