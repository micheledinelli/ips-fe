const config = {
  VITE_BACKEND_URL: window.env
    ? window.env.VITE_BACKEND_URL
    : process.env.VITE_BACKEND_URL,
};

export default config;
