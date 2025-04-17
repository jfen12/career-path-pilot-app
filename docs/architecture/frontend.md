# Frontend Architecture

## Overview
The frontend of Career Path Pilot is built using React with TypeScript, following modern best practices and architectural patterns. This document outlines the frontend structure, components, and development guidelines.

## Directory Structure
```
src/
├── components/
│   ├── common/         # Shared components
│   ├── layout/         # Layout components
│   ├── networking/     # Networking feature components
│   ├── jobs/          # Jobs feature components
│   ├── development/   # Development feature components
│   └── ui/            # UI components
├── pages/             # Route components
├── services/          # API and external service integrations
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── lib/               # Utility functions
└── styles/            # Global styles
```

## Component Architecture

### Layout Components
```typescript
// AppLayout.tsx
const AppLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <Outlet />
        </main>
        <MobileBottomNav />
      </div>
      <Toaster position="top-center" />
    </>
  );
};
```

### Feature Components
```typescript
// ContactCard.tsx
interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
}

const ContactCard = ({ contact, onEdit, onDelete }: ContactCardProps) => {
  // Component implementation
};
```

## State Management

### React Query Implementation
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    },
  },
});
```

### Custom Hooks
```typescript
// useAuth.ts
const useAuth = () => {
  const { data: user } = useQuery(['user'], fetchUser);
  const login = useMutation(loginUser);
  const logout = useMutation(logoutUser);
  
  return { user, login, logout };
};
```

## Routing System

### Route Configuration
```typescript
const routes = {
  dashboard: '/',
  networking: '/networking',
  development: '/development',
  jobs: {
    main: '/jobs',
    applications: '/jobs/applications',
    saved: '/jobs/saved',
  },
  marketplace: '/business/marketplace',
  settings: '/settings',
  help: '/help',
};
```

### Protected Routes
```typescript
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
};
```

## Styling System

### Tailwind Configuration
```typescript
const config: Config = {
  theme: {
    extend: {
      colors: {
        career: {
          purple: '#8B5CF6',
          'light-purple': '#9b87f5',
          'dark-purple': '#7E69AB',
          'soft-purple': '#E5DEFF',
          blue: '#1EAEDB',
          'soft-blue': '#D3E4FD',
          'dark-gray': '#1A1F2C',
          gray: '#8E9196',
          'light-gray': '#F1F0FB',
        },
      },
    }
  }
};
```

### CSS Utilities
```css
@layer components {
  .card-hover {
    @apply transition-all duration-300 hover:shadow-lg hover:scale-[1.01];
  }
  
  .btn-primary {
    @apply bg-gold-ochre text-deep-teal rounded-button px-4 py-2;
  }
}
```

## Performance Optimization

### Code Splitting
```typescript
const JobApplications = lazy(() => import('./pages/jobs/JobApplications'));
const Development = lazy(() => import('./pages/Development'));
```

### Image Optimization
```typescript
// Using next/image for optimized images
<Image
  src={company.logo}
  alt={company.name}
  width={100}
  height={100}
  className="rounded-lg"
/>
```

## Error Handling

### Error Boundary
```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error tracking service
    logError(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}
```

### API Error Handling
```typescript
const useApiError = () => {
  const handleError = (error: unknown) => {
    if (error instanceof ApiError) {
      toast.error(error.message);
    } else {
      toast.error('An unexpected error occurred');
    }
  };

  return { handleError };
};
```

## Testing Strategy

### Component Testing
```typescript
describe('ContactCard', () => {
  it('should render contact information', () => {
    render(<ContactCard {...mockProps} />);
    expect(screen.getByText(mockContact.name)).toBeInTheDocument();
  });
});
```

### Hook Testing
```typescript
describe('useAuth', () => {
  it('should handle login', async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.login(mockCredentials);
    });
    expect(result.current.user).toBeDefined();
  });
});
```

## Development Guidelines

### Code Style
- Use TypeScript strict mode
- Follow ESLint configuration
- Use Prettier for formatting
- Follow component naming conventions

### Component Guidelines
1. Keep components small and focused
2. Use TypeScript interfaces for props
3. Implement proper error handling
4. Add loading states
5. Include accessibility attributes

### State Management Guidelines
1. Use React Query for server state
2. Use local state for UI state
3. Implement proper loading states
4. Handle error states
5. Cache data appropriately

## Accessibility

### ARIA Attributes
```typescript
<button
  aria-label="Create new contact"
  aria-expanded={isExpanded}
  onClick={handleClick}
>
  <PlusIcon />
</button>
```

### Keyboard Navigation
```typescript
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick();
  }
};
```

## Future Considerations

### Feature Roadmap
1. Real-time updates
2. Offline support
3. Progressive Web App
4. Enhanced analytics
5. Advanced search capabilities

### Technical Improvements
1. Micro-frontend architecture
2. Enhanced state management
3. Improved performance monitoring
4. Advanced caching strategies
5. Enhanced security measures 