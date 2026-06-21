# 🔥 Firebase Setup Guide

## Quick Setup (5 minutes)

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it: `kawerify-tournaments`
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firestore Database
1. In your Firebase project, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in **production mode**" (we'll configure rules later)
4. Select your region (closest to your users)
5. Click "Done"

### 3. Get Configuration Keys
1. Click the gear icon ⚙️ → "Project settings"
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Name your app: `kawerify-tournaments-web`
5. **Don't** check "Firebase Hosting"
6. Click "Register app"
7. **Copy the config object** (you'll need this!)

### 4. Configure Security Rules
1. Go to "Firestore Database" → "Rules"
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click "Publish"

### 5. Update Your App
1. Open `src/lib/firebase.ts`
2. Replace the `firebaseConfig` object with your copied config:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## ✅ That's it! Your app now has:

- **Permanent cloud storage** - Data never gets lost
- **Real-time sync** - All users see updates instantly
- **Works on Vercel** - No server configuration needed
- **Free tier** - Generous limits for your tournament

## 🚀 Features You Get:

### Real-time Sync
- When admin adds a player → Everyone sees it instantly
- When admin completes a match → Leaderboard updates for all users
- When admin schedules matches → Fixtures update everywhere

### Permanent Storage
- Data stored in Google's cloud forever
- Automatic backups
- No data loss even if browser cache is cleared

### Multi-user Support
- Multiple admins can work simultaneously
- All users see the same live data
- Perfect for tournaments with multiple organizers

## 🔧 Advanced Configuration (Optional)

### Custom Domain
You can set up a custom domain in Firebase Hosting if needed.

### User Authentication
If you want to restrict admin access, you can add Firebase Auth later.

### Offline Support
The app automatically works offline and syncs when back online.

## 🆘 Troubleshooting

### "Permission denied" errors
- Check that Firestore rules allow read/write access
- Make sure you published the rules

### "Project not found" errors
- Verify the projectId in firebase.ts matches your Firebase project
- Check that Firestore is enabled in your project

### Data not syncing
- Check browser console for errors
- Verify internet connection
- Try refreshing the page

## 📊 Usage Limits (Free Tier)

- **Reads**: 50,000 per day
- **Writes**: 20,000 per day
- **Storage**: 1 GB
- **Bandwidth**: 10 GB per month

Perfect for tournament management! You'd need thousands of matches to hit these limits.

---

**Need help?** The Firebase console has great documentation and the setup is very straightforward!
