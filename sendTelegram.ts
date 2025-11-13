import fetch from 'node-fetch';

const token = process.env.TG_BOT_TOKEN;
const chatId = process.env.TG_CHAT_ID;
const message =
  'Ссылка на отчет: https://zh4ng1r.github.io/otus-qa-js-2005-06-zhangir/test-report.html';

fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ chat_id: chatId, text: message }),
})
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);
