Реализован весь функционал и требования кроме тестов

Команда для запуска проекта в dev mode npm run start:dev
Команда для запуска проекта в prod mode npm run start:prod
Команда для запуска проекта c горизонтальным маштабированием npm run start:multi

Примеры запросов:

GET http://localhost:5000/api/users

POST http://localhost:5000/api/users  
Body ({
    "username": "Aleh",
    "age": 10,
    "hobbies": ["nodeJs", "ReactJs"]
})

PUT http://localhost:5000/api/users/{id}
Body ({
    "username": "Aleh",
    "age": 12,
    "hobbies": ["Angular"]
})

DELETE http://localhost:5000/api/users/{id}
