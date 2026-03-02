FROM node:22-alpine
WORKDIR /app
COPY package*.json .
RUN npm ci 
COPY . .
RUN echo "linting app"
RUN npm run lint
RUN echo "linting successful"
RUN echo "building app"
RUN npm run build
RUN echo "building successful"
EXPOSE 3000
CMD ["npm", "start"]
