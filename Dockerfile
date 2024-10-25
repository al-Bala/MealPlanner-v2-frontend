FROM node:20.18.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN yarn config set unsafe-perm true
RUN yarn install --silent
COPY . /app
RUN yarn run build

# production environment
FROM nginx:1.27.2-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]