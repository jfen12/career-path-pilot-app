# API Documentation

## Overview
Career Path Pilot provides a RESTful API for managing user data, applications, connections, and development activities. All endpoints require authentication unless otherwise specified.

## Authentication

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "user@example.com"
    }
  }
}
```

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "currentTitle": "Software Engineer",
  "currentCompany": "Tech Corp"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "user@example.com"
    }
  }
}
```

## User Management

### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com",
    "currentTitle": "Software Engineer",
    "currentCompany": "Tech Corp",
    "goalType": "new-job",
    "timeframe": "6-months",
    "networkingIntensity": "moderate",
    "skills": ["JavaScript", "React", "Node.js"]
  }
}
```

### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentTitle": "Senior Software Engineer",
  "skills": ["JavaScript", "React", "Node.js", "TypeScript"]
}
```

## Applications

### Get Applications
```http
GET /api/applications
Authorization: Bearer <token>
```

**Query Parameters**
- `status`: Filter by status (toApply, applied, interviewing, offer, rejected)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Response**
```json
{
  "success": true,
  "data": {
    "applications": [
      {
        "id": "456",
        "jobId": "789",
        "status": "applied",
        "applicationDate": "2024-01-15T00:00:00.000Z",
        "company": "Tech Corp",
        "position": "Senior Software Engineer"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 25
    }
  }
}
```

### Create Application
```http
POST /api/applications
Authorization: Bearer <token>
Content-Type: application/json

{
  "jobId": "789",
  "status": "toApply",
  "notes": "Need to update resume before applying"
}
```

### Update Application
```http
PUT /api/applications/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "applied",
  "applicationDate": "2024-01-20T00:00:00.000Z",
  "notes": "Submitted application with updated resume"
}
```

## Connections

### Get Connections
```http
GET /api/connections
Authorization: Bearer <token>
```

**Query Parameters**
- `status`: Filter by status (pending, accepted, rejected)
- `type`: Filter by type (mentor, peer, professional)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Create Connection
```http
POST /api/connections
Authorization: Bearer <token>
Content-Type: application/json

{
  "contactId": "789",
  "type": "mentor",
  "notes": "Met at tech conference"
}
```

### Update Connection
```http
PUT /api/connections/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "accepted",
  "notes": "Scheduled first mentoring session"
}
```

## Development Activities

### Get Activities
```http
GET /api/activities
Authorization: Bearer <token>
```

**Query Parameters**
- `type`: Filter by type (course, certification, workshop, project)
- `status`: Filter by status (planned, in-progress, completed)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Create Activity
```http
POST /api/activities
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "course",
  "title": "Advanced React Patterns",
  "provider": "Udemy",
  "startDate": "2024-02-01T00:00:00.000Z",
  "skills": ["React", "TypeScript"]
}
```

### Update Activity
```http
PUT /api/activities/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "in-progress",
  "completionDate": "2024-03-01T00:00:00.000Z",
  "certificateUrl": "https://example.com/certificate.pdf"
}
```

## Error Responses

### Validation Error
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "email": "must be a valid email address"
    }
  }
}
```

### Authentication Error
```json
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_ERROR",
    "message": "Invalid credentials"
  }
}
```

### Not Found Error
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

## Rate Limiting
- All endpoints are rate limited to 100 requests per 15 minutes
- Rate limit headers are included in responses:
  - `X-RateLimit-Limit`: Maximum requests per window
  - `X-RateLimit-Remaining`: Remaining requests in current window
  - `X-RateLimit-Reset`: Time until rate limit resets

## Pagination
- All list endpoints support pagination
- Default page size: 10 items
- Maximum page size: 100 items
- Pagination metadata included in responses:
  - `page`: Current page number
  - `limit`: Items per page
  - `total`: Total number of items

## Versioning
- API version is included in the URL path: `/api/v1/...`
- Current version: v1
- Breaking changes will be released in new versions 