# Password Reset Implementation Guide

## Overview
This document explains how to implement the password reset functionality for The Nursing Collective. The frontend is complete - you just need to add the backend endpoints and email service.

---

## 🎯 What's Already Done (Frontend)

✅ **Forgot Password Modal** - Users can enter their email
✅ **Reset Password Page** (`reset-password.html`) - Users set their new password
✅ **Professional Email Template** (`email-templates/password-reset.html`)
✅ **All JavaScript** - API calls ready to go

---

## 📧 Step 1: Set Up Resend (Recommended Email Service)

### Why Resend?
- **Free tier**: 3,000 emails/month
- **Easy API**: Simple REST API
- **Great deliverability**: Professional email infrastructure
- **No credit card required** for free tier

### Setup Instructions

1. **Sign up at [resend.com](https://resend.com)**

2. **Verify your domain** (or use their test domain)
   - Go to Domains → Add Domain
   - Add DNS records (SPF, DKIM, DMARC)
   - Or use `onboarding@resend.dev` for testing

3. **Get your API key**
   - Go to API Keys → Create API Key
   - Copy the key (starts with `re_`)
   - Add to your environment variables: `RESEND_API_KEY`

4. **Install Resend SDK** (for your Python backend)
   ```bash
   pip install resend
   ```

---

## 🔧 Step 2: Backend Implementation

You need to add **2 endpoints** to your Railway backend:

### Endpoint 1: Request Password Reset

**POST** `/auth/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Python Example (Flask/FastAPI):**
```python
import resend
import secrets
import hashlib
from datetime import datetime, timedelta

# Configure Resend
resend.api_key = os.getenv("RESEND_API_KEY")

@app.route('/auth/forgot-password', methods=['POST'])
async def forgot_password():
    data = request.json
    email = data.get('email')

    # 1. Find user by email
    user = db.users.find_one({'email': email})

    if not user:
        # SECURITY: Don't reveal if email exists
        return jsonify({'message': 'If that email exists, we sent a reset link'}), 200

    # 2. Generate reset token (secure random string)
    reset_token = secrets.token_urlsafe(32)

    # 3. Hash token for storage (never store plain tokens!)
    token_hash = hashlib.sha256(reset_token.encode()).hexdigest()

    # 4. Store token with expiration (1 hour)
    expires_at = datetime.utcnow() + timedelta(hours=1)

    db.users.update_one(
        {'_id': user['_id']},
        {
            '$set': {
                'reset_token_hash': token_hash,
                'reset_token_expires': expires_at
            }
        }
    )

    # 5. Create reset URL
    reset_url = f"https://thenursingcollective.pro/reset-password.html?token={reset_token}"

    # 6. Read email template
    with open('email-templates/password-reset.html', 'r') as f:
        html_template = f.read()

    # 7. Replace placeholders
    html_content = html_template.replace('{{firstName}}', user.get('first_name', 'there'))
    html_content = html_content.replace('{{resetUrl}}', reset_url)

    # 8. Send email via Resend
    try:
        params = {
            "from": "The Nursing Collective <noreply@thenursingcollective.pro>",  # Use your verified domain
            "to": [email],
            "subject": "Reset your The Nursing Collective password",
            "html": html_content
        }

        resend.Emails.send(params)

        return jsonify({'message': 'Password reset email sent'}), 200

    except Exception as e:
        print(f"Email error: {e}")
        return jsonify({'error': 'Failed to send email'}), 500
```

---

### Endpoint 2: Reset Password with Token

**POST** `/auth/reset-password`

**Request Body:**
```json
{
  "token": "abc123...",
  "new_password": "newSecurePassword123!"
}
```

**Python Example:**
```python
import bcrypt

@app.route('/auth/reset-password', methods=['POST'])
async def reset_password():
    data = request.json
    reset_token = data.get('token')
    new_password = data.get('new_password')

    # 1. Validate input
    if not reset_token or not new_password:
        return jsonify({'error': 'Missing token or password'}), 400

    if len(new_password) < 8:
        return jsonify({'error': 'Password must be at least 8 characters'}), 400

    # 2. Hash the token to find in database
    token_hash = hashlib.sha256(reset_token.encode()).hexdigest()

    # 3. Find user with this token
    user = db.users.find_one({
        'reset_token_hash': token_hash,
        'reset_token_expires': {'$gt': datetime.utcnow()}  # Check not expired
    })

    if not user:
        return jsonify({'error': 'Invalid or expired reset token'}), 400

    # 4. Hash new password
    password_hash = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt())

    # 5. Update password and clear reset token
    db.users.update_one(
        {'_id': user['_id']},
        {
            '$set': {
                'password_hash': password_hash
            },
            '$unset': {
                'reset_token_hash': '',
                'reset_token_expires': ''
            }
        }
    )

    return jsonify({'message': 'Password reset successful'}), 200
```

---

## 🗄️ Step 3: Database Schema Updates

Add these fields to your `users` collection:

```python
{
    "_id": ObjectId("..."),
    "email": "user@example.com",
    "password_hash": "...",
    "first_name": "John",
    "last_name": "Doe",

    # Add these new fields for password reset:
    "reset_token_hash": "hashed_token",      # Optional, only when reset requested
    "reset_token_expires": datetime(2026, 1, 16, 15, 30)  # Optional, expiration time
}
```

---

## 🔒 Security Best Practices

### ✅ DO:
- **Hash tokens** before storing (SHA-256)
- **Set expiration** (1 hour recommended)
- **Use HTTPS** for reset URLs
- **Rate limit** the forgot-password endpoint (max 3 requests per email per hour)
- **Don't reveal** if an email exists or not
- **Delete token** after successful password reset
- **Hash passwords** with bcrypt

### ❌ DON'T:
- Store plain text tokens in database
- Allow tokens to last forever
- Send passwords via email
- Reveal whether email exists
- Skip validation on new password strength

---

## 🧪 Testing the Flow

### 1. Test Forgot Password:
```bash
curl -X POST https://your-api.railway.app/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

Expected: User receives email with reset link

### 2. Test Reset Password:
```bash
curl -X POST https://your-api.railway.app/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "the_token_from_email",
    "new_password": "newPassword123!"
  }'
```

Expected: Password updated successfully

---

## 📨 Alternative Email Services

If you don't want to use Resend, here are alternatives:

### SendGrid (Free: 100 emails/day)
```python
import sendgrid
from sendgrid.helpers.mail import Mail

sg = sendgrid.SendGridAPIClient(api_key=os.getenv('SENDGRID_API_KEY'))

message = Mail(
    from_email='noreply@thenursingcollective.pro',
    to_emails=email,
    subject='Reset your password',
    html_content=html_content
)

sg.send(message)
```

### AWS SES (Very cheap: $0.10 per 1,000 emails)
```python
import boto3

ses = boto3.client('ses', region_name='us-east-1')

ses.send_email(
    Source='noreply@thenursingcollective.pro',
    Destination={'ToAddresses': [email]},
    Message={
        'Subject': {'Data': 'Reset your password'},
        'Body': {'Html': {'Data': html_content}}
    }
)
```

---

## 🎨 Customizing the Email Template

The email template is at: `email-templates/password-reset.html`

You can customize:
- **Logo**: Replace the 🎓 emoji with `<img>` tag
- **Colors**: Update the gradient colors
- **Text**: Modify the messaging
- **Branding**: Add your logo image URL

**Placeholders to replace:**
- `{{firstName}}` - User's first name
- `{{resetUrl}}` - The password reset link

---

## 🚀 Deployment Checklist

Before going live:

- [ ] Add `RESEND_API_KEY` to Railway environment variables
- [ ] Verify your domain with Resend
- [ ] Test email delivery (check spam folder!)
- [ ] Add rate limiting to prevent abuse
- [ ] Set up monitoring for failed emails
- [ ] Update `reset_url` domain to production URL
- [ ] Test the complete flow end-to-end
- [ ] Add logging for security events

---

## ❓ FAQ

**Q: Why hash the token before storing?**
A: If someone gains database access, they can't use the tokens to reset passwords.

**Q: What if the email never arrives?**
A: Check spam folder, verify domain DNS settings, check Resend dashboard for delivery status.

**Q: Should I delete expired tokens?**
A: Yes! Add a cleanup job to delete expired tokens daily.

**Q: Can users request multiple reset emails?**
A: Yes, but rate limit to prevent abuse (e.g., max 3 per hour).

---

## 📞 Support

If you need help:
1. Check Resend dashboard for email delivery logs
2. Check Railway logs for backend errors
3. Test with curl to isolate frontend vs backend issues

---

**You're all set!** The frontend is ready - just add these 2 endpoints and you'll have a professional password reset system. 🎉
