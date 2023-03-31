FROM node:latest

# Set the working directory
WORKDIR "/app"

# Add node module executable to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy over package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy over backend Express app
COPY . ./

# Run the React app
CMD ["node", "src/server.js"]