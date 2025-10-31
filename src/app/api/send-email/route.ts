import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Pauerv Contact Form <onboarding@resend.dev>', // You'll need to verify a domain in Resend
      to: ['pauerv.info@gmail.com'],
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>

            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #667eea; margin-top: 0; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h2>
                <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> <span style="color: #333;">${name}</span></p>
                <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
                <p style="margin: 10px 0;"><strong style="color: #555;">Subject:</strong> <span style="color: #333;">${subject}</span></p>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px;">
                <h2 style="color: #667eea; margin-top: 0; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message</h2>
                <p style="white-space: pre-wrap; color: #333; line-height: 1.8;">${message}</p>
              </div>

              <div style="margin-top: 20px; padding: 15px; background: #e8f4f8; border-left: 4px solid #667eea; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; color: #555;">
                  <strong>Tip:</strong> Reply directly to this email to respond to ${name}
                </p>
              </div>
            </div>

            <div style="margin-top: 20px; text-align: center; color: #999; font-size: 12px;">
              <p>This email was sent from the Pauerv contact form</p>
              <p>© ${new Date().getFullYear()} Pauerv. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    })

    return NextResponse.json(
      { message: 'Email sent successfully', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
