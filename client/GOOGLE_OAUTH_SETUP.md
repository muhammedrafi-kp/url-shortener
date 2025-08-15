# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your URL shortener application.

## Prerequisites

- A Google account
- Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" at the top of the page
3. Click "New Project"
4. Enter a project name (e.g., "URL Shortener")
5. Click "Create"

## Step 2: Enable Google+ API

1. In your project, go to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on it and click "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. If prompted, configure the OAuth consent screen first:
   - Choose "External" user type
   - Fill in the required fields (App name, User support email, Developer contact information)
   - Add scopes: `email`, `profile`, `openid`
   - Add test users if needed
4. Back to creating credentials:
   - Application type: "Web application"
   - Name: "URL Shortener Web Client"
   - Authorized JavaScript origins: Add your development and production URLs
     - For development: `http://localhost:5173` (or your Vite dev server port)
     - For production: `https://yourdomain.com`
   - Authorized redirect URIs: Add your callback URLs
     - For development: `http://localhost:5173/auth/google/callback`
     - For production: `https://yourdomain.com/auth/google/callback`

## Step 4: Get Your Client ID

1. After creating the credentials, you'll see a popup with your client ID
2. Copy the client ID (it looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`)

## Step 5: Configure Your Application

1. Open `src/main.tsx` in your project
2. Replace `YOUR_GOOGLE_CLIENT_ID` with your actual client ID:

```tsx
<GoogleOAuthProvider clientId="123456789-abcdefghijklmnop.apps.googleusercontent.com">
```

## Step 6: Backend Integration (Optional)

If you want to verify the Google token on your backend:

1. In your backend service, you'll need to verify the JWT token from Google
2. Use Google's public keys to verify the token signature
3. Extract user information from the decoded token

## Environment Variables (Recommended)

For better security, consider using environment variables:

1. Create a `.env` file in your client directory:
```env
VITE_GOOGLE_CLIENT_ID=your_actual_client_id_here
```

2. Update `main.tsx`:
```tsx
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
```

3. Add `.env` to your `.gitignore` file to keep your client ID private

## Testing

1. Start your development server
2. Navigate to the login page
3. Click the "Continue with Google" button
4. You should see the Google OAuth popup
5. After successful authentication, check the browser console for the credential response

## Troubleshooting

- **"Invalid client" error**: Make sure your client ID is correct and the domain is authorized
- **"Redirect URI mismatch"**: Check that your redirect URIs match exactly
- **"OAuth consent screen not configured"**: Complete the OAuth consent screen setup
- **"API not enabled"**: Make sure you've enabled the Google+ API or Google Identity API

## Security Notes

- Never commit your client ID to version control
- Use environment variables for sensitive configuration
- Regularly rotate your OAuth credentials
- Monitor your OAuth usage in Google Cloud Console

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Documentation](https://github.com/MomenSherif/react-oauth)
- [Google Cloud Console](https://console.cloud.google.com/)
