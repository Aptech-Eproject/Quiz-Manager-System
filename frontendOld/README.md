# Frontend - Quiz App

## Tech Stack
- **React 18** - UI Framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **React Query** - Data fetching & caching
- **Zustand** - State management
- **React Router** - Routing

## Project Structure
```
src/
├── lib/           # Axios instance, QueryClient config
├── stores/        # Zustand stores
├── services/      # API services
├── hooks/         # Custom hooks
├── components/    # React components
└── App.jsx        # Main app
```

## Environment Variables
```env
VITE_API_URL=http://localhost:8000
```

## Scripts
```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
```

## API Integration
- Auth: `/api/auth/*`
- Quiz: `/api/quiz/*`
- Result: `/api/result/*`

## Features
- ✅ Axios interceptors (auth token, error handling)
- ✅ React Query (caching, refetching)
- ✅ Zustand (global state)
- ✅ TailwindCSS (responsive design)
