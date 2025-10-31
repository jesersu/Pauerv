# Email Setup Guide

This guide explains how to set up the contact form email functionality for the Pauerv website.

## Overview

The contact form uses [Resend](https://resend.com) to send emails. When a visitor submits the contact form, an email is sent to `jesersu@gmail.com` with their details and message.

## Setup Steps

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to [API Keys](https://resend.com/api-keys)
3. Click "Create API Key"
4. Give it a name (e.g., "Pauerv Contact Form")
5. Copy the API key (it will only be shown once!)

### 3. Configure Environment Variables

1. Create a `.env.local` file in the root of your project:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Resend API key:
   ```bash
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

3. Save the file

### 4. Verify Your Domain (Optional but Recommended)

By default, the contact form sends emails from `onboarding@resend.dev`. For production, you should verify your own domain:

1. Go to [Domains](https://resend.com/domains) in your Resend dashboard
2. Click "Add Domain"
3. Enter your domain (e.g., `pauerv.com`)
4. Follow the DNS configuration instructions
5. Wait for domain verification (usually takes a few minutes)

6. Once verified, update the API route to use your domain:
   ```typescript
   // src/app/api/send-email/route.ts
   from: 'Contact Form <contact@yourdomain.com>',
   ```

### 5. Test the Contact Form

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact section on your website
3. Fill out and submit the form
4. Check `jesersu@gmail.com` for the email

## Email Features

- **Professional HTML email template** with gradient header
- **Reply-To address** set to the sender's email for easy responses
- **Formatted contact details** including name, email, and subject
- **Pre-formatted message** preserving line breaks
- **Error handling** with user-friendly messages
- **Loading states** with spinner animation
- **Success/error notifications** that auto-dismiss after 5 seconds

## Troubleshooting

### Email not sending

1. Check that `RESEND_API_KEY` is set in `.env.local`
2. Restart your development server after adding the environment variable
3. Check the browser console and terminal for error messages
4. Verify your API key is valid in the Resend dashboard

### Email goes to spam

1. Verify your domain in Resend (see step 4 above)
2. Configure SPF and DKIM records as instructed by Resend
3. Use a verified domain email address in the `from` field

### Rate limiting

Resend free tier limits:
- 100 emails per day
- 3,000 emails per month

For production with higher volume, consider upgrading your Resend plan.

## Production Deployment

When deploying to production (Vercel, etc.):

1. Add the `RESEND_API_KEY` environment variable in your hosting platform's dashboard
2. Update the `from` email address to use your verified domain
3. Test the form in production to ensure everything works

### Vercel Deployment

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add `RESEND_API_KEY` with your API key value
4. Redeploy your application

## Security Notes

- Never commit `.env.local` or expose your API key
- The API key is only used server-side (Next.js API routes)
- Form validation is performed both client-side and server-side
- Email addresses are validated with regex before sending

## Cost

Resend pricing:
- **Free tier**: 100 emails/day, 3,000 emails/month
- **Pro tier**: $20/month for 50,000 emails/month

For most small business websites, the free tier is sufficient.

## Support

For Resend support:
- Documentation: [https://resend.com/docs](https://resend.com/docs)
- Support: [https://resend.com/support](https://resend.com/support)
