# ========== Stage 1: Dependencies ==========
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files for better layer caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile

# ========== Stage 2: Builder ==========
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml ./

# Copy source code
COPY . .

# Set production environment for optimal build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application (will create standalone output due to next.config.mjs)
RUN corepack enable pnpm && \
    pnpm run build && \
    # Clean up build cache to reduce size
    rm -rf .next/cache

# ========== Stage 3: Runner (Optimized for Standalone) ==========
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Copy the standalone build output (much smaller than full build)
# Standalone includes only necessary files and dependencies
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy blog content (required at runtime)
COPY --from=builder --chown=nextjs:nodejs /app/_blog ./_blog

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Use Node directly to run the standalone server
CMD ["node", "server.js"]