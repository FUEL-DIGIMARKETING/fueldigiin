import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, companyName, customFeatures, product = 'FuelDigi CRM' } = await req.json()

    if (!name || !email || !customFeatures) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and custom features are required' },
        { status: 400 }
      )
    }

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
      from: '"FuelDigi Custom Plan" <info@fueldigi.in>',
      to: 'info@fueldigi.in',
      replyTo: email,
      subject: `New Custom Plan Request for ${product} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #870d23; border-bottom: 2px solid #870d23; padding-bottom: 12px; margin-top: 0;">
            New Custom Plan Inquiry
          </h2>
          <p style="font-size: 14px; color: #555; margin-bottom: 20px;">
            A user has requested a custom plan from the <strong>${product}</strong> pricing section.
          </p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; font-weight: bold; color: #555; width: 160px;">Product:</td>
              <td style="padding: 10px 0; color: #222;">${product}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Client Name:</td>
              <td style="padding: 10px 0; color: #222; font-weight: 600;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 10px 0; color: #222;"><a href="mailto:${email}" style="color: #870d23;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Phone Number:</td>
              <td style="padding: 10px 0; color: #222;"><a href="tel:${phone}" style="color: #222;">${phone || 'Not provided'}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Company Name:</td>
              <td style="padding: 10px 0; color: #222;">${companyName || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Pricing Model:</td>
              <td style="padding: 10px 0; color: #870d23; font-weight: 600;">Platform fee you choose + custom feature fee / month</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #555; vertical-align: top;">Custom Features Required:</td>
              <td style="padding: 12px 0; color: #222; white-space: pre-wrap; line-height: 1.5; background-color: #fafafa; padding: 10px; border-radius: 6px;">${customFeatures}</td>
            </tr>
          </table>
          <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
            Sent automatically from FuelDigi Website — CRM Custom Plan Inquiry.
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Mail error in custom-plan:', error)
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
  }
}
