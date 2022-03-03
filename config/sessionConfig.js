const session = require('express-session');
const sessionFileStore = require('session-file-store');

const FileStore = sessionFileStore(session);

const sessionConfig = {
  store: new FileStore(), // тип хранилища - FileStore, который создаёт нам папку с файлами
  key: 'user_id', // ключ - название куки
  secret: `${process.env.SECRET_WORD}`, // слово используемое для шифрования, может быть любым
  resave: true, // настройка пересохранения куки, при каждом запросе
  saveUninitialized: false, // настройка для создания сессии, даже без авторизации
  cookie: {
    expires: 1000 * 60 * 60 * 12, // время "протухания" куки в миллисекундах
    httpOnly: true, // серверная установка флага httpOnly, запрет доступа к куке для клиентского JS
  },
};

module.exports = sessionConfig;
