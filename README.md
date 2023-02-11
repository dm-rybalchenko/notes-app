# Note app

[ENG](https://github.com/dm-rybalchenko/notes-app/tree/develop/docs/README.md)

Fullstack-приложение для заметок. Создано в команде web-разработчика и UI/UX-дизайнера.

[Ссылка на приложение](https://notes-app-umber.vercel.app)

### Стек

* Клиент: React, TypeScript, Redux-Toolkit, SCSS-modules, axios

* Сервер: Node, Express, MongoDB, Mongoose, JWT, Cloudinary, nodeMailer ([Ссылка на исходный код сервера](https://github.com/dm-rybalchenko/notes-app-server))

### Функционал

* Регистрация пользователей с подтверждением аккаунта по email

* Создание, удаление и редактирование заметок индивидуально для каждого пользователя

* Возможность загрузки(удаления, апдейта) и прикрепления к каждой заметке файла с изображением, в т.ч. drag-and-drop'ом. Последующий просмотр картинок в поп-апе

* На странице редактирования в теле заметки присутствует добавление тегов в реальном времени через символ `#`

* Теги подсвечиваются, отображаются списком внизу, можно их выделать, удалять

* Различные фильтры и сортировки заметок на главной, в т.ч. по тегам. Поиск, выбор lazy-loading или пагинации

* Заметки можно закреплять наверх, добавлять в избранное

* Лоадер-скелетон при загрузке заметок

* Страница регистрации и входа с валидацией полей

* Диалоговое окно удаления заметки, появляющееся в месте клика

* Предусмотрены всплывающие ошибки и предупреждения

* Кастомная страница 404

* Адаптивная верстка


## Скриншоты

Главная, диалоговое окно удаления
![Screenshot-app-notes](/docs/screenshots/Screenshot-main.jpg)

Страница редактирования заметки, загрузка файла, тег
![Screenshot-app-notes-edit](/docs/screenshots/Screenshot-edit.jpg)

Сортировка и избранное
![Screenshot-app-notes-filter](/docs/screenshots/Screenshot-filters.jpg)

Поиск и пагинация
![Screenshot-app-notes-search](/docs/screenshots/Screenshot-search.jpg)

Страница входа и валидация полей
![Screenshot-app-notes-login](/docs/screenshots/Screenshot-login.jpg)


*Реализованы версии для ПК и мобильных устройств.*

[Для разработчиков](https://github.com/dm-rybalchenko/notes-app/tree/develop/docs/for-developers.md)