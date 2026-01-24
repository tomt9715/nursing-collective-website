# Newsletter Setup Guide

## Quick Setup with Google Sheets (Free & Easy)

### Step 1: Create Google Sheet
1. Go to Google Sheets: https://sheets.google.com
2. Create a new blank spreadsheet
3. Name it "FlorenceBot Newsletter Subscribers"
4. In cell A1, type: `email`
5. In cell B1, type: `timestamp`

### Step 2: Connect to Sheet.best
1. Go to https://sheet.best
2. Sign up for a free account
3. Click "Create new connection"
4. Paste your Google Sheet URL
5. Copy the API endpoint URL they give you (looks like: `https://sheet.best/api/sheets/abc123xyz`)

### Step 3: Update Your Code
1. Open `script.js`
2. Find line 136: `const SHEET_URL = 'YOUR_SHEETBEST_URL';`
3. Replace `YOUR_SHEETBEST_URL` with your actual Sheet.best URL
4. Save the file

### Step 4: Test It
1. Push your changes to GitHub
2. Open your website
3. Scroll to the newsletter section
4. Enter a test email and click Subscribe
5. Check your Google Sheet - the email should appear!

---

## Alternative: Mailchimp (More Professional)

If you want a more professional solution with automated emails:

### Step 1: Create Mailchimp Account
1. Go to https://mailchimp.com
2. Sign up for free (up to 500 contacts)
3. Create a new Audience

### Step 2: Get Your API Key
1. In Mailchimp, click your profile icon
2. Go to Account → Extras → API keys
3. Create a new API key
4. Copy the key

### Step 3: Get Your Audience ID
1. Go to Audience → Settings → Audience name and defaults
2. Copy your Audience ID

### Step 4: Replace the Code in script.js

Replace the Google Sheets fetch code (lines 139-148) with:

```javascript
const response = await fetch('https://YOUR_REGION.api.mailchimp.com/3.0/lists/YOUR_AUDIENCE_ID/members', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('anystring:YOUR_API_KEY')
    },
    body: JSON.stringify({
        email_address: email,
        status: 'subscribed'
    })
});
```

**Note:** For security, you should NOT put your API key directly in frontend code. You'll need a backend server or serverless function (like Netlify Functions or Vercel Edge Functions) to handle this properly.

---

## Which Should You Choose?

### Google Sheets (Sheet.best)
- ✅ Completely free
- ✅ Easy setup (5 minutes)
- ✅ Simple email collection
- ✅ Safe to use in frontend code
- ❌ No automated emails
- ❌ You have to manually email subscribers

### Mailchimp
- ✅ Professional automated emails
- ✅ Email templates and campaigns
- ✅ Analytics and tracking
- ❌ Requires backend setup for security
- ❌ More complex to integrate
- ❌ Limited free tier (500 contacts)

**Recommendation:** Start with Google Sheets. When you have 50+ subscribers and want to send automated emails, upgrade to Mailchimp.

---

## Current Status

The code in `script.js` is ready for Google Sheets integration. Just replace line 136:

```javascript
const SHEET_URL = 'YOUR_SHEETBEST_URL';
```

With your actual Sheet.best URL:

```javascript
const SHEET_URL = 'https://sheet.best/api/sheets/abc123xyz';
```

Then commit and push!
