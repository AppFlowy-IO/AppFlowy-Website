# ========== Stage 1: Dependencies ==========
FROM node:20-alpine AS deps
# Alpine doesn't have libc6-compat by default, needed for some node packages
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files for better layer caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally and install dependencies
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

# Build the application
RUN corepack enable pnpm && \
    pnpm run build

# ========== Stage 3: Runner ==========
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy only necessary files for production
# Copy public assets and static files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

# Copy node_modules for production
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# Copy blog content if needed at runtime
COPY --from=builder --chown=nextjs:nodejs /app/_blog ./_blog

# Set correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Use Node directly to run the application
CMD ["npm", "run", "start"]