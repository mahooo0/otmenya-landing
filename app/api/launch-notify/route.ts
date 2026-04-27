import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_SECRET = process.env.LAUNCH_SECRET || "otmenya-launch-2026";

export async function POST(request: Request) {
  try {
    const { secret, emails } = await request.json();

    // Simple auth — check secret
    if (secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: "No emails provided" }, { status: 400 });
    }

    // Send launch notification to all subscribers
    // Resend supports batch sending
    const batchSize = 50;
    let sent = 0;

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);

      await Promise.all(
        batch.map((email: string) =>
          resend.emails.send({
            from: "ОтменYа <onboarding@resend.dev>",
            to: email,
            subject: "ОтменYа запустилась! 🚀 Скачай приложение",
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
                <div style="text-align: center; margin-bottom: 32px;">
                  <div style="display: inline-block; width: 72px; height: 72px; border-radius: 18px; overflow: hidden;">
                    <div style="width: 72px; height: 36px; background: #111;"></div>
                    <div style="width: 72px; height: 36px; background: #6B8E63;"></div>
                  </div>
                </div>
                <h1 style="font-size: 28px; font-weight: 700; color: #111; margin: 0 0 16px; text-align: center;">
                  ОтменYа запустилась! 🚀
                </h1>
                <p style="font-size: 16px; color: #555; line-height: 1.6; text-align: center;">
                  Приложение, которое ты ждал — уже доступно для скачивания.
                  Все подписки под контролем, готовые скрипты отмены, напоминания.
                </p>
                <div style="text-align: center; margin: 32px 0;">
                  <a href="https://otmenya.holy-water.app" style="display: inline-block; background: #111; color: #fff; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px;">
                    Скачать ОтменYа
                  </a>
                </div>
                <div style="background: #f0faf0; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center; border: 1px solid #6B8E6330;">
                  <p style="font-size: 14px; color: #6B8E63; font-weight: 600; margin: 0;">
                    🎁 Ты в числе первых — Pro активирован бесплатно!
                  </p>
                </div>
                <p style="font-size: 13px; color: #aaa; text-align: center; margin-top: 32px;">
                  — Команда ОтменYа
                </p>
              </div>
            `,
          })
        )
      );

      sent += batch.length;
    }

    return NextResponse.json({ success: true, sent });
  } catch (error) {
    console.error("Launch notify error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
