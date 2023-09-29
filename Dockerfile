FROM denoland/deno:alpine-1.37.0 as cache

WORKDIR /app

# These steps will be re-run upon each file change in your working directory:
ADD . .

# Change the cache directory
ENV DENO_DIR /var/tmp/deno_cache

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache ./main.ts --lock=deps.lock

FROM denoland/deno:alpine-1.37.0

WORKDIR /app

# Change the cache directory
ENV DENO_DIR /var/tmp/deno_cache

# Copy cached files from previous stage
COPY --from=cache /var/tmp/deno_cache /var/tmp/deno_cache

# Run the app
CMD ["deno", "task", "preview"]
