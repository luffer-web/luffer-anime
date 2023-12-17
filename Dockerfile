FROM node:20.9.0
WORKDIR /app
RUN corepack enable
COPY pnpm-lock.yaml ./
RUN pnpm config set store-dir /workdir/.pnpm-store
RUN pnpm fetch 
RUN pnpm install -r --offline
CMD ["pnpm", "run", "dev"]
EXPOSE 3000

