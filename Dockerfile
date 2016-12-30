# Use following version of Node as the base image
FROM node:7.2

# Copy everthiny in the current directory to our image, in the 'app' folder
COPY . /app

# Install dependencies
RUN cd /app; \
npm install

# Expose server port
EXPOSE 3000

# Run node
CMD ["node", "/app/index.js"]

