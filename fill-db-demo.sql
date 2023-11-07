-- Добавит пользователей
INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar-1.jpg'),
('ivanova@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'София', 'Иванова', 'avatar-2.jpg'),
('petrova@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Анна', 'Петрова', 'avatar-3.jpg'),
('sidorova@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Мария', 'Сидорова', 'avatar-4.jpg'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar-5.jpg');

-- Добавит категории
INSERT INTO categories(name) VALUES
('Деревья'),
('За жизнь'),
('Без рамки'),
('Разное'),
('IT'),
('Музыка'),
('Кино'),
('Программирование'),
('Железо');

-- Добавит статьи
ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles(title, announce, full_text, picture, user_id) VALUES
('Ёлки. История деревьев', 'Ёлки — это не просто красивое дерево.', 'Это прочная древесина. Первая большая ёлка была установлена только в 1938 году.', 'image1.jpg', 1),
('Вы можете достичь всего', 'Стоит только немного постараться и запастись книгами.', 'Стоит только немного постараться и запастись книгами.', 'image2.jpg', 2),
('Этот смартфон — настоящая находка', 'Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.', 'Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.', 'image3.jpg', 3);
ALTER TABLE articles ENABLE TRIGGER ALL;

ALTER TABLE article_categories DISABLE TRIGGER ALL;
INSERT INTO article_categories(article_id, category_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 6);
ALTER TABLE article_categories ENABLE TRIGGER ALL;

-- Добавит комментарии
ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments(text, user_id, article_id) VALUES
('Это где ж такие красоты?', 2, 1),
('Совсем немного...', 3, 1),
('Согласен с автором!', 4, 1),
('Мне кажется или я уже читал это где-то?', 5, 2),
('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.', 4, 2),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 3, 2),
('Хочу такую же футболку :-)', 2, 3),
('Плюсую, но слишком много букв!', 1, 3),
('Планируете записать видосик на эту тему?', 2, 3);
ALTER TABLE comments ENABLE TRIGGER ALL;
