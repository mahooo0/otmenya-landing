import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "sevinmuhammed06@gmail.com";

// Simple in-memory store (in production use a database)
// For now, also store in Vercel KV or a JSON file
const subscribers: string[] = [];

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Store subscriber
    subscribers.push(email);

    // Send confirmation to user
    await resend.emails.send({
      from: "ОтменYа <onboarding@resend.dev>",
      to: email,
      subject: "Ты в списке! 🎉 ОтменYа скоро запустится",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; width: 60px; height: 60px; border-radius: 16px; overflow: hidden;">
              <div style="width: 60px; height: 30px; background: #111;"></div>
              <div style="width: 60px; height: 30px; background: #6B8E63;"></div>
            </div>
          </div>
          <h1 style="font-size: 24px; font-weight: 700; color: #111; margin: 0 0 16px; text-align: center;">
            Ты в списке!
          </h1>
          <p style="font-size: 16px; color: #555; line-height: 1.6; text-align: center;">
            Спасибо за интерес к <strong>ОтменYа</strong>. Мы отправим тебе письмо,
            как только приложение будет готово к скачиванию.
          </p>
          <div style="background: #f5f5f5; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
            <p style="font-size: 14px; color: #888; margin: 0 0 4px;">Первые 100 пользователей получат</p>
            <p style="font-size: 20px; font-weight: 700; color: #6B8E63; margin: 0;">Pro бесплатно</p>
          </div>
          <p style="font-size: 13px; color: #aaa; text-align: center; margin-top: 32px;">
            — Команда ОтменYа
          </p>
        </div>
      `,
    });

    // Notify admin
    await resend.emails.send({
      from: "ОтменYа <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: `Новая заявка: ${email}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; padding: 20px;">
          <h2>Новая заявка на ОтменYа</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Время:</strong> ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Baku" })}</p>
          <p><strong>Всего заявок:</strong> ${subscribers.length}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
  }
}

// GET — return count of subscribers (for admin)
export async function GET() {
  return NextResponse.json({ count: subscribers.length });
}
