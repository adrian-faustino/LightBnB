INSERT INTO users (id, name, email, password)
VALUES (1, 'Sebastian', 'sebastian@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Jenny', 'jenny@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Bob', 'bob@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street,city, province, post_code, active)
VALUES (1, 1, 'Ooof', 'description', 'thumbnail_photo_url.com', 'cover_photo_url.com', 2, 3, 1, 'canada1', 'street1', 'city1', 'alberta', 'post_code1', 'true'),
(2, 3, 'Ooof', 'description', 'thumbnail_photo_url.com', 'cover_photo_url.com', 2, 3, 1, 'canada1', 'street1', 'city1', 'ontario', 'post_code2', 'false'),
(3, 1, 'Ooof', 'description', 'thumbnail_photo_url.com', 'cover_photo_url.com', 2, 3, 1, 'canada1', 'street2', 'city1', 'alberta', 'post_code3', 'true');

INSERT INTO reservations (id, start_date, end_date, property_id, guest_id)
VALUES (1, '2018-2-11', '2018-3-12', 2, 3),
(2, '2018-3-13', '2018-3-29', 2, 3),
(3, '2018-4-11', '2018-4-12', 2, 3);