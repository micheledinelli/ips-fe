#!/bin/sh

# Create a JavaScript file with the environment variables
cat <<EOF > /usr/share/nginx/html/env-config.js
window.env = {
  VITE_BACKEND_URL: "$VITE_BACKEND_URL"
};
EOF

# Start Nginx
nginx -g 'daemon off;'
