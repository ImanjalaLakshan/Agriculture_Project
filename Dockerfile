# Step 1: Build the Vite app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Explicit output dir
RUN npm run build -- --outDir=/app/dist

# Step 2: Serve with Nginx
FROM nginx:alpine

# Copy the generated build folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
