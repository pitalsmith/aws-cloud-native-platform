# Use official Node image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code (including server.ts)
COPY . .

# Run your server.ts using npx ts-node
CMD ["npx", "ts-node", "server.ts"]