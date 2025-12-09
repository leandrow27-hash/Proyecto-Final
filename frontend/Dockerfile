FROM node:18-alpine

WORKDIR /app

# Copy package manifest and install using npm (yarn.lock may not exist)
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

COPY . /app

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host"]