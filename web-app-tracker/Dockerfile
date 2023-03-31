FROM node:lts-alpine3.16

# Set the working directory
WORKDIR "/app"

# Add node module executable to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy over package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy over frontend React app
COPY . ./

# Run the React app
CMD ["npm", "start"]