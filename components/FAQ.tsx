"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Section from "./Section";

const faqs = [
  {
    question: "Приложение получает доступ к банковским данным?",
    answer:
      "Нет. ОтменYа не подключается к банкам и не запрашивает данные карт. Все подписки добавляются вручную или из каталога. Данные хранятся только на вашем устройстве.",
  },
  {
    question: "Как оплатить Pro в России?",
    answer:
      "Pro-версия покупается разово через App Store. Если у вас российский Apple ID — оплата проходит через карту, привязанную к аккаунту. Также можно оплатить через подарочные карты Apple.",
  },
  {
    question: "Что делать, если нужного сервиса нет в каталоге?",
    answer:
      "Вы можете добавить любую подписку вручную — указать название, стоимость, валюту и дату списания. Также можно предложить сервис для добавления в каталог через форму обратной связи.",
  },
  {
    question: "Вы парсите email для поиска подписок?",
    answer:
      "Нет. Мы не читаем вашу почту и не запрашиваем доступ к email. Все подписки добавляются вручную из каталога или через ручной ввод. Приватность — наш приоритет.",
  },
  {
    question: "Чем ОтменYа отличается от SubsCrab?",
    answer:
      "ОтменYа создан специально для СНГ-пользователей. У нас каталог локальных сервисов (Яндекс Плюс, Кинопоиск, Okko и др.), скрипты отмены с deep-links и пошаговыми инструкциями, поддержка валют СНГ (₽, ₸, ₴). SubsCrab ориентирован на западный рынок.",
  },
];

export default function FAQ() {
  return (
    <Section id="faq" label="FAQ" title="Частые вопросы">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </Section>
  );
}
