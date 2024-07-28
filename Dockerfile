# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install pnpm and http-server globally
RUN npm install -g pnpm http-server

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN pnpm run build

# Expose the port that the application will run on
EXPOSE 8080

# Start the server with http-server in the dist directory
CMD ["http-server", "dist", "-p", "8080"]
