# Backend Architecture

## Overview
The backend of Career Path Pilot is built using Node.js with Express and TypeScript, following a modular and scalable architecture. This document outlines the backend structure, API design, and development guidelines.

## Directory Structure
```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── types/           # TypeScript types
├── tests/               # Test files
└── config/              # Configuration files
```

## API Architecture

### RESTful API Design
```typescript
// Example route structure
router.get('/users', authenticate, getUsers);
router.post('/users', validateUser, createUser);
router.get('/users/:id', authenticate, getUser);
router.put('/users/:id', authenticate, validateUser, updateUser);
router.delete('/users/:id', authenticate, deleteUser);
```

### Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}
```

## Database Models

### User Model
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  currentTitle: string;
  currentCompany: string;
  goalType: "new-job" | "promotion" | "skill-development";
  timeframe: "3-months" | "6-months" | "1-year";
  networkingIntensity: "low" | "moderate" | "high";
  skills: string[];
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### Application Model
```typescript
interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: "toApply" | "applied" | "interviewing" | "offer" | "rejected";
  applicationDate: Date;
  notes: string;
  documents: {
    resumeUrl: string;
    coverLetterUrl: string;
  };
  interviews: Array<{
    date: Date;
    type: string;
    notes: string;
    status: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
```

## Authentication & Authorization

### JWT Implementation
```typescript
const generateToken = (user: User) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );
};

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
```

### Authentication Middleware
```typescript
const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id);
    
    if (!user) throw new Error('User not found');
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
```

## Error Handling

### Custom Error Classes
```typescript
class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string
  ) {
    super(message);
  }
}

class ValidationError extends ApiError {
  constructor(message: string) {
    super(400, message, 'VALIDATION_ERROR');
  }
}
```

### Error Middleware
```typescript
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message
      }
    });
  }
  
  // Log unexpected errors
  console.error(err);
  
  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred'
    }
  });
};
```

## Validation

### Request Validation
```typescript
const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }
  next();
};
```

### Schema Definition
```typescript
const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  currentTitle: Joi.string(),
  currentCompany: Joi.string(),
  goalType: Joi.string().valid('new-job', 'promotion', 'skill-development'),
  timeframe: Joi.string().valid('3-months', '6-months', '1-year'),
  networkingIntensity: Joi.string().valid('low', 'moderate', 'high'),
  skills: Joi.array().items(Joi.string()),
  preferences: Joi.object({
    notifications: Joi.boolean(),
    emailUpdates: Joi.boolean()
  })
});
```

## Logging

### Logger Implementation
```typescript
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

### Request Logging
```typescript
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info({
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
};
```

## Testing

### Unit Tests
```typescript
describe('User Controller', () => {
  it('should create a new user', async () => {
    const mockUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    
    const result = await userController.createUser(mockUser);
    expect(result).toHaveProperty('id');
    expect(result.email).toBe(mockUser.email);
  });
});
```

### Integration Tests
```typescript
describe('Authentication Flow', () => {
  it('should authenticate user and return token', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
```

## Performance Optimization

### Caching
```typescript
const cacheMiddleware = (duration: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);
    
    if (cachedResponse) {
      return res.json(cachedResponse);
    }
    
    res.originalJson = res.json;
    res.json = (body) => {
      cache.set(key, body, duration);
      return res.originalJson(body);
    };
    
    next();
  };
};
```

### Database Indexing
```typescript
// User model indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ 'preferences.notifications': 1 });
```

## Security

### Rate Limiting
```typescript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### Security Headers
```typescript
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Deployment

### Environment Configuration
```typescript
const config = {
  development: {
    port: 3000,
    mongoUri: 'mongodb://localhost:27017/career-dev',
    jwtSecret: 'dev-secret'
  },
  production: {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI!,
    jwtSecret: process.env.JWT_SECRET!
  }
};
```

### Health Check
```typescript
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## Future Considerations

### Scalability
1. Implement microservices architecture
2. Add message queue for async operations
3. Implement database sharding
4. Add caching layer
5. Implement load balancing

### Monitoring
1. Add APM integration
2. Implement distributed tracing
3. Add performance monitoring
4. Implement alerting system
5. Add log aggregation 