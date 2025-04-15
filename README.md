# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c093743a-50cf-4b33-b41e-09032ebba05a

## Environment Setup

### Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://your-connection-string

# JWT Secret for Authentication
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Server Configuration
PORT=3000
NODE_ENV=development
API_VERSION=v1
BASE_URL=http://localhost:3000

# Security
SESSION_SECRET=your-session-secret
PASSWORD_SALT_ROUNDS=10
COOKIE_SECURE=false # Set to true in production
COOKIE_SAME_SITE=lax
```

### Optional Environment Variables

These variables are required only if you want to enable specific features:

```env
# Email Service (for notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@careerpathpilot.com

# File Upload Configuration
MAX_FILE_SIZE=5242880 # 5MB in bytes
ALLOWED_FILE_TYPES=pdf,doc,docx
UPLOAD_DIR=uploads

# Rate Limiting
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
CORS_METHODS=GET,POST,PUT,DELETE
CORS_ALLOWED_HEADERS=Content-Type,Authorization

# External Job API Keys
INDEED_API_KEY=your-indeed-api-key
LINKEDIN_API_KEY=your-linkedin-api-key

# Feature Flags
ENABLE_EMAIL_VERIFICATION=true
ENABLE_TWO_FACTOR_AUTH=false
ENABLE_SOCIAL_LOGIN=false
```

### Security Notes

1. Never commit the `.env` file to version control
2. Use different secrets for development and production environments
3. Keep your MongoDB connection string secure
4. Regularly rotate your JWT and session secrets
5. Enable `COOKIE_SECURE=true` in production

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c093743a-50cf-4b33-b41e-09032ebba05a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c093743a-50cf-4b33-b41e-09032ebba05a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
