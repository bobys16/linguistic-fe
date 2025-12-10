# Production Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Configuration
- [ ] Update `.env.production` with production API URL
- [ ] Verify all environment variables are set
- [ ] Remove any development/debug code
- [ ] Check API keys and secrets are secure

### 2. Testing
- [ ] Run full test suite
- [ ] Test all task types
- [ ] Verify authentication flow
- [ ] Check mobile responsiveness on real devices
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify all API endpoints work with production backend

### 3. Performance Optimization
- [ ] Run production build locally: `npm run build`
- [ ] Check bundle size: Look for large dependencies
- [ ] Optimize images (use Next.js Image component)
- [ ] Enable compression
- [ ] Configure caching headers

### 4. Security
- [ ] Ensure HTTPS is enabled
- [ ] Configure security headers
- [ ] Verify CORS settings on backend
- [ ] Check for exposed secrets/tokens
- [ ] Enable rate limiting on API

### 5. Monitoring & Analytics
- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Configure performance monitoring
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Create health check endpoint monitoring

---

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Built for Next.js
- Zero configuration
- Automatic HTTPS
- Global CDN
- Serverless functions

**Steps:**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Configure Environment Variables in Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_BASE_URL`
   - Add any other required variables

5. **Configure Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

**vercel.json Configuration:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_BASE_URL": "@api-url"
  }
}
```

---

### Option 2: Netlify

**Steps:**

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

4. **Configure in netlify.toml:**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [build.environment]
     NEXT_PUBLIC_API_BASE_URL = "https://api.yourdomain.com"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

---

### Option 3: Docker + Cloud Provider (AWS, GCP, Azure)

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**Build and run:**
```bash
docker build -t psychoworkbook-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com psychoworkbook-frontend
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
      - NODE_ENV=production
    restart: unless-stopped
```

---

### Option 4: Traditional VPS (DigitalOcean, Linode, etc.)

**Steps:**

1. **SSH into your server:**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone your repository:**
   ```bash
   git clone https://github.com/yourusername/psychoworkbook-frontend.git
   cd psychoworkbook-frontend
   ```

4. **Install dependencies and build:**
   ```bash
   npm ci
   npm run build
   ```

5. **Install PM2 for process management:**
   ```bash
   sudo npm install -g pm2
   ```

6. **Start the application:**
   ```bash
   pm2 start npm --name "psychoworkbook" -- start
   pm2 save
   pm2 startup
   ```

7. **Configure Nginx as reverse proxy:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Enable HTTPS with Let's Encrypt:**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Post-Deployment

### 1. Verify Deployment
- [ ] Visit production URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Complete at least one task
- [ ] Create a reflection
- [ ] Check dashboard loads correctly

### 2. Monitor Performance
- Check lighthouse scores
- Monitor API response times
- Watch for errors in logs
- Check user analytics

### 3. Set Up Continuous Deployment
- Connect git repository to hosting platform
- Configure automatic deployments on push to main branch
- Set up staging environment for testing

### 4. Backup Strategy
- Database backups (backend)
- User data backups
- Configuration backups

---

## Rollback Plan

If something goes wrong:

1. **Vercel/Netlify:**
   - Go to Deployments
   - Find previous working deployment
   - Click "Promote to Production"

2. **Docker:**
   ```bash
   docker pull yourusername/psychoworkbook-frontend:previous-tag
   docker stop current-container
   docker run -d --name psychoworkbook yourusername/psychoworkbook-frontend:previous-tag
   ```

3. **VPS with PM2:**
   ```bash
   git checkout previous-commit-hash
   npm ci
   npm run build
   pm2 restart psychoworkbook
   ```

---

## Performance Optimization

### 1. Enable Caching
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### 2. Image Optimization
Use Next.js Image component:
```tsx
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority // For above-fold images
/>
```

### 3. Code Splitting
Next.js handles this automatically, but you can optimize further:
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

---

## Monitoring & Logging

### Recommended Tools:
- **Error Tracking**: Sentry
- **Performance**: Vercel Analytics, New Relic
- **Logs**: Datadog, LogRocket
- **Uptime**: Pingdom, UptimeRobot

---

## Support & Maintenance

- Regularly update dependencies
- Monitor security vulnerabilities
- Keep backend API in sync
- Review user feedback
- Check performance metrics weekly

---

**Need Help?**
- Check logs first
- Review environment variables
- Test locally with production build
- Contact hosting provider support
