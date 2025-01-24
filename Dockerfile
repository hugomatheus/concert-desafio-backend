FROM node:22-slim AS build
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY ./package*.json ./
RUN npm install

# Copy source code and build
COPY ./ ./
RUN npm run build

# Production stage
FROM node:22-slim AS prod
WORKDIR /usr/src/app

# Copy only the necessary files from build stage
COPY --from=build /usr/src/app/dist ./dist
COPY ./package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Set user and run the app
USER node
CMD ["sh", "-c", "npm run migration:run && node dist/main"]
