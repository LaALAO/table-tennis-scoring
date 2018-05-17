#build
FROM node:9.11.1 as builder

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app

RUN npm install --silent
RUN npm install react-scripts@latest -g silent

COPY . /app
RUN npm run build

# production
FROM nginx:1.13-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
