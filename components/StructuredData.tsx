export default function StructuredData() {
  const siteUrl = "https://otmenya.holy-water.app";

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ОтменYа",
    url: siteUrl,
    logo: `${siteUrl}/og-image.png`,
    description:
      "Трекер подписок и триалов для жителей СНГ. Все подписки в одном приложении.",
    sameAs: [],
  };

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ОтменYа",
    operatingSystem: "iOS, Android",
    applicationCategory: "FinanceApplication",
    description:
      "Трекер подписок и триалов для СНГ. Напоминания об отмене, каталог 50+ сервисов, готовые скрипты отмены, аналитика расходов.",
    url: siteUrl,
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "RUB",
        name: "Бесплатно",
        description: "До 5 подписок, основные функции, пуш-напоминания",
      },
      {
        "@type": "Offer",
        price: "299",
        priceCurrency: "RUB",
        name: "Pro",
        description:
          "Без лимита на подписки, виджеты, аналитика, экспорт, бэкап",
      },
    ],
    featureList: [
      "Триалы на первом экране с обратным отсчётом",
      "Каталог 50+ сервисов СНГ",
      "Готовый скрипт отмены с deep-link",
      "Пуш-напоминания за 2 дня и за 1 день",
      "Аналитика расходов на подписки",
      "Виджеты на домашний экран",
      "Локальное хранение без облаков",
      "Мультивалютность: ₽, ₸, ₴, $, €",
    ],
    availableOnDevice: "iOS, Android",
    countriesSupported: ["RU", "UA", "KZ", "BY"],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Нужны ли мои банковские данные?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Нет. ОтменYа не подключается ни к каким банкам и не читает выписки. Все подписки добавляешь вручную — это занимает 30 секунд на каждую.",
        },
      },
      {
        "@type": "Question",
        name: "Как работает оплата Pro в России?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Через RuStore — российские карты Mir / СБП. На iOS — через App Store или через веб-страницу с оплатой через ЮKassa / СБП. Никаких VPN не нужно.",
        },
      },
      {
        "@type": "Question",
        name: "Что если моего сервиса нет в каталоге?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Любую подписку можно добавить вручную: название, иконку, цену, длительность триала. Каталог постоянно расширяется по запросам пользователей.",
        },
      },
      {
        "@type": "Question",
        name: "Будет ли email-парсинг?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, в версии 1.5. Полностью on-device — твои письма не покидают устройство.",
        },
      },
      {
        "@type": "Question",
        name: "Чем отличается от SubsCrab от Касперского?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Тремя вещами: триалы — главный экран; к каждой подписке готовый скрипт отмены с deep-link; Pro можно оплатить из РФ через RuStore и СБП.",
        },
      },
    ],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "ОтменYа — Трекер подписок и триалов для СНГ",
    description:
      "Не дай забыть отменить триал. Все подписки СНГ в одном приложении с готовым скриптом отмены.",
    url: siteUrl,
    inLanguage: "ru",
    isPartOf: {
      "@type": "WebSite",
      name: "ОтменYа",
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
    </>
  );
}
