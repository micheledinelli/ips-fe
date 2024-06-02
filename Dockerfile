FROM node:16 as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache curl

ENV VITE_BACKEND_URL=http://localhost:7777

COPY --from=build /app/dist /usr/share/nginx/html

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]