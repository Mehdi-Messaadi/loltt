# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and install dependencies for both frontend and backend
COPY package*.json ./
RUN npm install

# Copy the entire project
COPY . .

# Build the frontend using Vite
RUN npm run build

# Expose ports
# For the backend
EXPOSE 4000
# For the frontend
EXPOSE 3000 

# Run both backend and frontend servers using concurrently
CMD ["npm", "run", "start"]
