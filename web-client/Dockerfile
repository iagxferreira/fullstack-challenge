# ------------ STAGE 1: Build ------------
    FROM node:22-alpine AS builder

    # Enable pnpm via corepack
    RUN corepack enable && corepack prepare pnpm@latest --activate
    
    WORKDIR /app
    
    # Copy and install dependencies
    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install
    
    # Copy the full project
    COPY . .
    
    # Build the Next.js app
    RUN pnpm build
    
    
    # ------------ STAGE 2: Production ------------
    FROM node:22-alpine AS runner
    
    # Enable pnpm
    RUN corepack enable && corepack prepare pnpm@latest --activate
    
    WORKDIR /app
    
    # Copy only necessary files
    COPY --from=builder /app/package.json ./
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/next.config.ts ./next.config.ts
    
    EXPOSE 3000
    
    # Start Next.js app
    CMD ["pnpm", "start"]
    