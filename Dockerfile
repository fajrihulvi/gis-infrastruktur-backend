# Use the latest Node.js image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the required dependencies
RUN npm install

# Copy all source code to the container
COPY . .

# RUN cp .env.example .env

# Set the necessary environment variables
COPY .env.example .env

# Generate the application key
# RUN adonis key:generate

# Run database migrations (optional)
# RUN node ace migration:run

# Run the Adonis server
EXPOSE 3000
CMD ["node ace", "serve", "--watch"]
