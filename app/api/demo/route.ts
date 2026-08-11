import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, companyName, product } = await req.json()

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'info@fueldigi.in',
        pass: 'M0cXTYuqfSFv',
      },
      tls: {
        rejectUnauthorized: true,
      },
    })

    await transporter.sendMail({
      from: '"FuelDigi Demo" <info@fueldigi.in>',
      to: 'info@fueldigi.in',
      replyTo: email,
      subject: `New ${product} Demo Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #870d23; border-bottom: 2px solid #870d23; padding-bottom: 10px;">New ${product} Demo Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; font-weight: bold; color: #555; width: 140px;">Name:</td><td style="padding: 10px 0; color: #333;">${name}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 10px 0; color: #333;">${email}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 10px 0; color: #333;">${phone}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold; color: #555;">Company:</td><td style="padding: 10px 0; color: #333;">${companyName || 'Not provided'}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold; color: #555;">Product:</td><td style="padding: 10px 0; color: #333;">${product}</td></tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">This email was sent from the FuelDigi ${product} demo booking form.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Mail error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
  }
}
