# Quick Start Guide

Get the Digital Psycholinguistics Workbook frontend up and running in minutes!

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Backend API running (see backend documentation)

## Installation Steps

### 1. Navigate to Project Directory
```bash
cd psychoworkbook-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_API_TIMEOUT=10000
NEXT_PUBLIC_ENV=development
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## First-Time Setup

### Using Demo Account
You can test the application immediately with the demo account:
- Email: `demo@example.com`
- Password: `password123`

### Creating a New Account
1. Click "Sign Up" in the navigation
2. Fill in your details
3. Click "Create Account"
4. You'll be automatically logged in and redirected to the dashboard

## Testing Features

### 1. Explore Modules
- Click "Modules" in the navigation
- Browse available psycholinguistic modules
- Click on a module to see its tasks

### 2. Complete a Task
- Select any task from a module
- Read the instructions
- Complete the interactive exercise
- View your results and feedback

### 3. Track Progress
- Visit the Dashboard to see your statistics
- View module completion percentages
- Check recent activity

### 4. Write Reflections
- Click "Journal" in the navigation
- Click "New Reflection"
- Write your thoughts and add tags
- Submit to save your reflection

## Project Structure Overview

```
psychoworkbook-frontend/
├── app/                  # Pages and routing
├── components/           # Reusable components
│   ├── layout/          # Layout components
│   ├── tasks/           # Task components
│   └── ui/              # UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and API client
└── context/             # React context providers
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linter
- `npm run type-check` - Check TypeScript types

## Common Issues

### Port Already in Use
If port 3000 is already in use:
```bash
PORT=3001 npm run dev
```

### API Connection Failed
- Ensure backend is running on port 3001
- Check `.env.local` has correct API URL
- Verify CORS is enabled on backend

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Review [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## Need Help?

- Check the troubleshooting section in README.md
- Review the API documentation in the backend repository
- Open an issue on GitHub

---

**You're all set! Start exploring psycholinguistics! 🧠**
