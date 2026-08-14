import { NextResponse } from "next/server"
import { transporter } from "@/lib/mailer"

export async function GET() {
  try {
    await transporter.verify()
    const info = await transporter.sendMail({
      from: `"AI-Boutique Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      subject: "Test Email — ai-boutique",
      text: "SMTP connection works correctly."
    })
    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      response: info.response
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 })
  }
}
