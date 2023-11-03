# syntax=docker/dockerfile:1

# Start from my Ubuntu-based Node.js image
FROM ghcr.io/viral32111/nodejs:20-ubuntu

# Configure the directory for the project
ARG PROJECT_DIRECTORY=/usr/local/project

# Add build artifact
COPY --chown=${USER_ID}:${USER_ID} . ${PROJECT_DIRECTORY}

# Install production dependencies
WORKDIR ${PROJECT_DIRECTORY}
RUN npm install --omit=dev

# Listen on all IP addresses & point to the browser directory
ENV EXPRESS_ADDRESS=0.0.0.0 \
	EXPRESS_BROWSER_DIRECTORY=${PROJECT_DIRECTORY}/browser

# Launch the project
ENTRYPOINT [ "node", "." ]
