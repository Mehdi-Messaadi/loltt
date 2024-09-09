# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and install dependencies for both frontend and backend
COPY package*.json ./
COPY vite.config.ts ./

RUN npm install

RUN npm install vite

RUN npm install typescript

# Copy the entire project
COPY . .

# Set environment variable for the API key
ENV API_KEY=""

# Build the frontend using Vite
RUN npm run build



# Expose ports
# For the backend
EXPOSE 4000
# For the frontend
EXPOSE 3000 

# Run both backend and frontend servers using concurrently
CMD ["npm", "run", "start"]
