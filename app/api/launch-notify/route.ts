import { NextResponse } from "next/server";
import { Resend } from "resend";
import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

const getResend = () => new Resend(process.env.RESEND_API_KEY!);
const ADMIN_SECRET = process.env.LAUNCH_SECRET || "otmenya-launch-2026";
const SITE = "https://otmenya.holy-water.app";

const logoHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 24px;">
  <tr>
    <td style="width: 80px; height: 80px; border-radius: 20px; overflow: hidden;">
      <table cellpadding="0" cellspacing="0" border="0" width="80">
        <tr><td style="background: #111; height: 40px; font-size: 0; line-height: 0;">&nbsp;</td></tr>
        <tr><td style="background: #6B8E63; height: 40px; font-size: 0; line-height: 0;">&nbsp;</td></tr>
      </table>
    </td>
  </tr>
</table>`;

function getLaunchEmailHtml() {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #f9f9f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9f9f9; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          <tr>
            <td style="background: #111; padding: 48px 40px 40px; text-align: center;">
              ${logoHtml}
              <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0 0 8px; letter-spacing: -0.5px;">
                &#x1F680; Мы запустились!
              </h1>
              <p style="color: rgba(255,255,255,0.5); font-size: 15px; margin: 0;">
                ОтменYа уже в App Store и Google Play
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px;">
              <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px;">Привет! &#x1F44B;</p>
              <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px;">
                Приложение <strong>ОтменYа</strong> которое ты ждал — уже доступно!
                Все подписки под контролем, готовые скрипты отмены, умные напоминания.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #f0faf0; border-radius: 12px; border: 1px solid rgba(107,142,99,0.2); margin: 24px 0;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="font-size: 22px; margin: 0 0 4px;">&#x1F381;</p>
                    <p style="font-size: 16px; font-weight: 700; color: #111; margin: 0 0 4px;">Pro активирован бесплатно!</p>
                    <p style="font-size: 13px; color: #6B8E63; margin: 0;">Ты в числе первых — полный доступ навсегда</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 32px; text-align: center;">
              <p style="font-size: 14px; color: #888; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Скачай сейчас</p>
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="padding-right: 12px;">
                    <a href="#" style="display: inline-block; text-decoration: none;">
                      <table cellpadding="0" cellspacing="0" border="0" style="background: #111; border-radius: 10px;">
                        <tr><td style="padding: 10px 20px;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr><td style="color: #fff; font-size: 10px; line-height: 1.2;">Загрузите в</td></tr>
                            <tr><td style="color: #fff; font-size: 17px; font-weight: 600; line-height: 1.3;">App Store</td></tr>
                          </table>
                        </td></tr>
                      </table>
                    </a>
                  </td>
                  <td>
                    <a href="#" style="display: inline-block; text-decoration: none;">
                      <table cellpadding="0" cellspacing="0" border="0" style="background: #111; border-radius: 10px;">
                        <tr><td style="padding: 10px 20px;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr><td style="color: #fff; font-size: 10px; line-height: 1.2;">Доступно в</td></tr>
                            <tr><td style="color: #fff; font-size: 17px; font-weight: 600; line-height: 1.3;">Google Play</td></tr>
                          </table>
                        </td></tr>
                      </table>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 32px; text-align: center;">
              <a href="${SITE}" style="display: inline-block; background: #6B8E63; color: #fff; padding: 14px 36px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 15px;">
                Открыть сайт &#x2192;
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #f0f0f0; text-align: center;">
              <p style="font-size: 13px; color: #aaa; margin: 0;">С заботой о подписках,<br>Команда ОтменYа</p>
              <p style="font-size: 11px; color: #ccc; margin: 12px 0 0;">holy-water.app</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const { secret } = await request.json();

    if (secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all subscribers from Redis
    const emails = await kv.smembers("subscribers:emails") as string[];

    if (!emails || emails.length === 0) {
      return NextResponse.json({ error: "No subscribers yet" }, { status: 400 });
    }

    const batchSize = 50;
    let sent = 0;

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      await Promise.all(
        batch.map((email: string) =>
          getResend().emails.send({
            from: "ОтменYа <noreply@gmail.holy-water.app>",
            to: email,
            subject: "ОтменYа запустилась! Скачай приложение",
            html: getLaunchEmailHtml(),
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
