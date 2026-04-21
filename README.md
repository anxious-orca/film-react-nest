# FILM!

Проект доступен по ссылке:

http://absolute.cinema.nomorepartiessite.ru/

## Запуск проекта у себя локально

### 1 способ (через Docker)

Запустите команду 'docker compose up --build'

Проект запустится на http://localhost/

### 2 способ (через свой pgAdmin 4)

Создайте и наполните базу данных в pgAdmin 4, SQL файлы хранятся в /backend/test\
Cоздайте .env файл из .env.example в директории /backend и /frontend (измените переменные в соответствии с вашей DB)\
Перейдите в папку с исходным кодом бэкенда `cd backend`\
Запустите `npm i`\
Перейдите в папку с исходным кодом фронтэнда `cd frontend`\
Запустите `npm i`\
Запустите backend в /backend `npm run start`\
Запустите frontend в /frontend `npm run dev`\

Проект запустится на http://localhost:5173/




