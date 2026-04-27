"use client";

import { motion } from "framer-motion";
import Section from "./Section";

const testimonials = [
  {
    name: "Артём Козлов",
    handle: "@artem_k",
    text: "Забыл отменить Яндекс Плюс после триала — списали 299 рублей. С ОтменYа такого больше не будет. Приложение напомнило за 2 дня.",
    avatar: "artem",
  },
  {
    name: "Мария Иванова",
    handle: "@masha_iv",
    text: "Очень удобно, что все подписки в одном месте. Раньше приходилось вспоминать, где я что подключала. Теперь всё наглядно.",
    avatar: "maria",
  },
  {
    name: "Дмитрий Петров",
    handle: "@dima_p",
    text: "Функция скрипта отмены — это гениально. Один тап и я на экране отмены сервиса. Не надо искать в настройках.",
    avatar: "dmitry",
  },
  {
    name: "Анна Сидорова",
    handle: "@anna_sid",
    text: "Сэкономила уже 8000 рублей за полгода. Оказалось, у меня было 3 подписки, которые я вообще не использовала.",
    avatar: "anna",
  },
  {
    name: "Игорь Волков",
    handle: "@igor_v",
    text: "Наконец-то приложение для СНГ! Все остальные трекеры заточены под западные сервисы. А тут и Яндекс, и Кинопоиск, и Okko.",
    avatar: "igor",
  },
  {
    name: "Елена Кузнецова",
    handle: "@lena_kuz",
    text: "Нравится, что данные хранятся только на устройстве. Никаких облаков и регистраций. Просто работает.",
    avatar: "elena",
  },
  {
    name: "Алексей Морозов",
    handle: "@alex_mz",
    text: "Подписался на ChatGPT Plus на триал, забыл, списали $20. Теперь всё под контролем. Рекомендую всем.",
    avatar: "alexey",
  },
  {
    name: "Ольга Новикова",
    handle: "@olga_n",
    text: "Аналитика расходов очень наглядная. Увидела, что трачу на подписки больше 5000 в месяц. Шок!",
    avatar: "olga",
  },
  {
    name: "Сергей Лебедев",
    handle: "@sergey_l",
    text: "Мультивалютность — топ! Живу в Казахстане, плачу в тенге и долларах. Всё корректно конвертирует.",
    avatar: "sergey",
  },
  {
    name: "Наталья Попова",
    handle: "@natasha_p",
    text: "Простой и минималистичный дизайн. Ничего лишнего. Добавила подписку за 10 секунд. Лучший трекер!",
    avatar: "natasha",
  },
  {
    name: "Руслан Ахметов",
    handle: "@ruslan_a",
    text: "Перешёл с SubsCrab — в ОтменYа намного лучше каталог сервисов для СНГ и скрипты отмены просто бомба.",
    avatar: "ruslan",
  },
  {
    name: "Камила Абдулина",
    handle: "@kamila_abd",
    text: "Виджет на главном экране iPhone — супер удобно. Вижу ближайшие списания не заходя в приложение.",
    avatar: "kamila",
  },
];

export default function Testimonials() {
  return (
    <Section label="Отзывы" title="Что говорят пользователи">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="mb-4 break-inside-avoid rounded-3xl bg-muted/60 p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://avatar.vercel.sh/${t.avatar}`}
                alt={t.name}
                className="h-10 w-10 rounded-full"
                width={40}
                height={40}
              />
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.handle}</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {t.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
