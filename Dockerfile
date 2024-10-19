# Use the official Deno 2 image from Docker Hub
FROM denoland/deno:2.0.0

# Set the working directory in the container
WORKDIR /app

# Expose the application port (adjust if necessary)
EXPOSE 8000

# Copy your project files into the container (optional for production builds)
# COPY . .

# Set the default command to run your application using deno serve
CMD ["deno", "task", "serve"]
