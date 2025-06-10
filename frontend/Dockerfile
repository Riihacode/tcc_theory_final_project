# Gunakan base image Node.js
FROM node:18-alpine

# Set working directory di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh source code
COPY . .

# Ekspos port yang digunakan Vite (default 5173)
EXPOSE 5173

# Jalankan Vite dev server
CMD ["npm", "run", "dev"]
