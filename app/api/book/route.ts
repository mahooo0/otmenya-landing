import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "sevinmuhammed06@gmail.com";
const SITE = "https://otmenya.holy-water.app";

const subscribers: string[] = [];

const logoHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 32px;">
  <tr>
    <td style="width: 72px; height: 72px; border-radius: 18px; overflow: hidden; mso-hide: all;">
      <table cellpadding="0" cellspacing="0" border="0" width="72">
        <tr><td style="background: #111; height: 36px; font-size: 0; line-height: 0;">&nbsp;</td></tr>
        <tr><td style="background: #6B8E63; height: 36px; font-size: 0; line-height: 0;">&nbsp;</td></tr>
      </table>
    </td>
  </tr>
</table>`;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    subscribers.push(email);

    // Confirmation email to user
    await resend.emails.send({
      from: "ОтменYа <noreply@gmail.holy-water.app>",
      to: email,
      subject: "Ты в списке! 🎉 ОтменYа скоро запустится",
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #f9f9f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9f9f9; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="background: #111; padding: 40px 40px 32px; text-align: center;">
              ${logoHtml}
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px; letter-spacing: -0.5px;">
                Ты в списке!
              </h1>
              <p style="color: rgba(255,255,255,0.6); font-size: 15px; margin: 0;">
                Заявка на ранний доступ принята
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 32px 40px;">
              <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px;">
                Привет! 👋
              </p>
              <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px;">
                Спасибо за интерес к <strong>ОтменYа</strong> — трекеру подписок для СНГ.
                Мы работаем над приложением и отправим тебе письмо, как только оно будет готово.
              </p>
              <!-- Pro badge -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #f0faf0; border-radius: 12px; border: 1px solid rgba(107,142,99,0.2); margin: 24px 0;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="font-size: 13px; color: #6B8E63; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">🎁 Бонус для ранних</p>
                    <p style="font-size: 22px; font-weight: 700; color: #111; margin: 0;">Pro — бесплатно навсегда</p>
                    <p style="font-size: 13px; color: #888; margin: 8px 0 0;">Первые 100 пользователей получат полный доступ</p>
                  </td>
                </tr>
              </table>
              <!-- What you'll get -->
              <p style="font-size: 14px; color: #888; margin: 24px 0 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Что тебя ждёт:</p>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr><td style="padding: 8px 0; font-size: 15px; color: #333;">✅ Триалы с обратным отсчётом</td></tr>
                <tr><td style="padding: 8px 0; font-size: 15px; color: #333;">✅ 50+ сервисов СНГ из коробки</td></tr>
                <tr><td style="padding: 8px 0; font-size: 15px; color: #333;">✅ Готовый скрипт отмены к каждому</td></tr>
                <tr><td style="padding: 8px 0; font-size: 15px; color: #333;">✅ Напоминания за 2 дня до списания</td></tr>
                <tr><td style="padding: 8px 0; font-size: 15px; color: #333;">✅ Аналитика расходов и экономии</td></tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding: 0 40px 24px; text-align: center;">
              <a href="${SITE}" style="display: inline-block; background: #111; color: #fff; padding: 14px 36px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 15px;">
                Узнать больше →
              </a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #f0f0f0; text-align: center;">
              <p style="font-size: 13px; color: #aaa; margin: 0;">
                С заботой о подписках,<br>Команда ОтменYа
              </p>
              <p style="font-size: 11px; color: #ccc; margin: 12px 0 0;">
                holy-water.app
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    // Notify admin
    await resend.emails.send({
      from: "ОтменYа <noreply@gmail.holy-water.app>",
      to: ADMIN_EMAIL,
      subject: `🔔 Новая заявка #${subscribers.length}: ${email}`,
      html: `
<div style="font-family: -apple-system, sans-serif; padding: 24px; max-width: 400px;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
    <div style="width: 40px; height: 40px; border-radius: 10px; overflow: hidden;">
      <div style="width: 40px; height: 20px; background: #111;"></div>
      <div style="width: 40px; height: 20px; background: #6B8E63;"></div>
    </div>
    <h2 style="margin: 0; font-size: 18px;">Новая заявка</h2>
  </div>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td><td style="padding: 8px 0; font-weight: 600;">${email}</td></tr>
    <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Время</td><td style="padding: 8px 0;">${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Baku" })}</td></tr>
    <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Всего заявок</td><td style="padding: 8px 0; font-weight: 700; color: #6B8E63; font-size: 18px;">${subscribers.length}</td></tr>
  </table>
</div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ count: subscribers.length });
}
