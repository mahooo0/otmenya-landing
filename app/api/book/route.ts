import { NextResponse } from "next/server";
import { Resend } from "resend";
import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

const getResend = () => new Resend(process.env.RESEND_API_KEY!);
const ADMIN_EMAIL = "sevinmuhammed06@gmail.com";
const SITE = "https://otmenya.holy-water.app";

type Lang = "ru" | "en" | "uk" | "kk";

const t: Record<Lang, {
  subject: string;
  title: string;
  subtitle: string;
  greeting: string;
  body: string;
  proLabel: string;
  proTitle: string;
  proSub: string;
  features: string[];
  cta: string;
  footer: string;
}> = {
  ru: {
    subject: "Ты в списке! 🎉 ОтменYа скоро запустится",
    title: "Ты в списке!",
    subtitle: "Заявка на ранний доступ принята",
    greeting: "Привет! 👋",
    body: "Спасибо за интерес к <strong>ОтменYа</strong> — трекеру подписок для СНГ. Мы работаем над приложением и отправим тебе письмо, как только оно будет готово.",
    proLabel: "🎁 Бонус для ранних",
    proTitle: "Pro — бесплатно навсегда",
    proSub: "Первые 100 пользователей получат полный доступ",
    features: [
      "Триалы с обратным отсчётом",
      "50+ сервисов СНГ из коробки",
      "Готовый скрипт отмены к каждому",
      "Напоминания за 2 дня до списания",
      "Аналитика расходов и экономии",
    ],
    cta: "Узнать больше →",
    footer: "С заботой о подписках,<br>Команда ОтменYа",
  },
  en: {
    subject: "You're on the list! 🎉 OtmenYa is coming soon",
    title: "You're on the list!",
    subtitle: "Early access request confirmed",
    greeting: "Hey! 👋",
    body: "Thanks for your interest in <strong>OtmenYa</strong> — a subscription tracker for CIS. We're building the app and will email you as soon as it's ready.",
    proLabel: "🎁 Early bird bonus",
    proTitle: "Pro — free forever",
    proSub: "First 100 users get full access",
    features: [
      "Trials with countdown timer",
      "50+ CIS services built-in",
      "Ready-made cancel scripts",
      "Reminders 2 days before charge",
      "Spending analytics & savings",
    ],
    cta: "Learn more →",
    footer: "With care for your subscriptions,<br>Team OtmenYa",
  },
  uk: {
    subject: "Ти у списку! 🎉 ОтменYа скоро запуститься",
    title: "Ти у списку!",
    subtitle: "Заявку на ранній доступ прийнято",
    greeting: "Привіт! 👋",
    body: "Дякуємо за інтерес до <strong>ОтменYа</strong> — трекера підписок для СНД. Ми працюємо над додатком і надішлемо тобі листа, як тільки він буде готовий.",
    proLabel: "🎁 Бонус для ранніх",
    proTitle: "Pro — безкоштовно назавжди",
    proSub: "Перші 100 користувачів отримають повний доступ",
    features: [
      "Тріали зі зворотнім відліком",
      "50+ сервісів СНД з коробки",
      "Готовий скрипт відміни до кожного",
      "Нагадування за 2 дні до списання",
      "Аналітика витрат та економії",
    ],
    cta: "Дізнатись більше →",
    footer: "З турботою про підписки,<br>Команда ОтменYа",
  },
  kk: {
    subject: "Сіз тізімдесіз! 🎉 ОтменYа жақында іске қосылады",
    title: "Сіз тізімдесіз!",
    subtitle: "Ерте қол жеткізу сұрауы қабылданды",
    greeting: "Сәлем! 👋",
    body: "<strong>ОтменYа</strong> — ТМД елдеріне арналған жазылым трекеріне қызығушылық танытқаныңызға рахмет. Қолданба дайын болғанда хат жібереміз.",
    proLabel: "🎁 Ерте бонус",
    proTitle: "Pro — мәңгі тегін",
    proSub: "Алғашқы 100 пайдаланушы толық қол жеткізеді",
    features: [
      "Кері санақпен сынақ мерзімдері",
      "50+ ТМД сервистері",
      "Дайын бас тарту скрипті",
      "Ақша алынар 2 күн бұрын ескерту",
      "Шығындар мен үнемдеу талдауы",
    ],
    cta: "Көбірек білу →",
    footer: "Жазылымдарыңызға қамқорлықпен,<br>ОтменYа командасы",
  },
};

const logoHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 24px;">
  <tr>
    <td style="font-family: -apple-system, sans-serif; text-align: center;">
      <span style="font-size: 28px; font-weight: 800; color: #111; letter-spacing: -1px;">Отмен</span><span style="font-size: 28px; font-weight: 800; color: #6B8E63; letter-spacing: -1px;">Y</span><span style="font-size: 28px; font-weight: 800; color: #111; letter-spacing: -1px;">а</span>
    </td>
  </tr>
</table>`;

export async function POST(request: Request) {
  try {
    const { email, lang: rawLang } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const lang: Lang = (["ru", "en", "uk", "kk"].includes(rawLang) ? rawLang : "ru") as Lang;
    const i = t[lang];

    // Store in Redis
    const subscriber = { email, lang, date: new Date().toISOString() };
    await kv.hset(`subscriber:${email}`, subscriber);
    await kv.sadd("subscribers:emails", email);
    const count = await kv.scard("subscribers:emails");

    // Confirmation email to user
    await getResend().emails.send({
      from: "ОтменYа <noreply@gmail.holy-water.app>",
      to: email,
      subject: i.subject,
      html: `
<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #f9f9f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9f9f9; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="padding: 40px 40px 0; text-align: center;">
              ${logoHtml}
              <h1 style="color: #111; font-size: 28px; font-weight: 700; margin: 0 0 8px; letter-spacing: -0.5px;">${i.title}</h1>
              <p style="color: #888; font-size: 15px; margin: 0;">${i.subtitle}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px;">
              <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px;">${i.greeting}</p>
              <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px;">${i.body}</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #f0faf0; border-radius: 12px; border: 1px solid rgba(107,142,99,0.2); margin: 24px 0;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="font-size: 13px; color: #6B8E63; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">${i.proLabel}</p>
                    <p style="font-size: 22px; font-weight: 700; color: #111; margin: 0;">${i.proTitle}</p>
                    <p style="font-size: 13px; color: #888; margin: 8px 0 0;">${i.proSub}</p>
                  </td>
                </tr>
              </table>
              <table cellpadding="0" cellspacing="0" width="100%">
                ${i.features.map((f) => `<tr><td style="padding: 8px 0; font-size: 15px; color: #333;">✅ ${f}</td></tr>`).join("")}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 24px; text-align: center;">
              <a href="${SITE}" style="display: inline-block; background: #111; color: #fff; padding: 14px 36px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 15px;">${i.cta}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #f0f0f0; text-align: center;">
              <p style="font-size: 13px; color: #aaa; margin: 0;">${i.footer}</p>
              <p style="font-size: 11px; color: #ccc; margin: 12px 0 0;">holy-water.app</p>
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
    await getResend().emails.send({
      from: "ОтменYа <noreply@gmail.holy-water.app>",
      to: ADMIN_EMAIL,
      subject: `🔔 Новая заявка #${count} (${lang}): ${email}`,
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
    <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Язык</td><td style="padding: 8px 0;">${lang}</td></tr>
    <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Время</td><td style="padding: 8px 0;">${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Baku" })}</td></tr>
    <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Всего заявок</td><td style="padding: 8px 0; font-weight: 700; color: #6B8E63; font-size: 18px;">${count}</td></tr>
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
  const count = await kv.scard("subscribers:emails");
  const emails = await kv.smembers("subscribers:emails");
  return NextResponse.json({ count, emails });
}
