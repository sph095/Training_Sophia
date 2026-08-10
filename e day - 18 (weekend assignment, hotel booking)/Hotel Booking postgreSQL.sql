DROP TABLE IF EXISTS hotels CASCADE;
SELECT * FROM hotels;
SELECT * FROM customers;

CREATE TABLE hotels (
    hotel_id        SERIAL PRIMARY KEY,
    hotel_name            VARCHAR(150) NOT NULL,
    city            VARCHAR(100),
    country         VARCHAR(100),
    created_at      TIMESTAMP DEFAULT now()
);

CREATE TABLE rooms (
    room_id         SERIAL PRIMARY KEY,
    hotel_id        INT NOT NULL REFERENCES hotels(hotel_id) ON DELETE CASCADE,
    room_number     VARCHAR(20) NOT NULL,
    room_type       VARCHAR(50),          
    price_per_night NUMERIC(10,2) NOT NULL,
    max_occupancy   INT DEFAULT 2,
    UNIQUE (hotel_id, room_number)
);

CREATE TABLE customers (
    customer_id     SERIAL PRIMARY KEY,
    full_name       VARCHAR(150) NOT NULL,
    email           VARCHAR(150) UNIQUE NOT NULL,
    phone           VARCHAR(20),
    created_at      TIMESTAMP DEFAULT now()
);

CREATE TABLE bookings (
    booking_id      SERIAL PRIMARY KEY,
    room_id         INT NOT NULL REFERENCES rooms(room_id) ON DELETE CASCADE,
    customer_id     INT NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
    check_in        DATE NOT NULL,
    check_out       DATE NOT NULL,
    status          VARCHAR(20) DEFAULT 'confirmed',
    created_at      TIMESTAMP DEFAULT now(),

    CHECK (check_out > check_in),

    EXCLUDE USING gist (
        int4range(room_id, room_id + 1) WITH &&,
        daterange(check_in, check_out, '[)') WITH &&
    ) WHERE (status <> 'cancelled')
);

CREATE TABLE payments (
    payment_id      SERIAL PRIMARY KEY,
    booking_id      INT NOT NULL REFERENCES bookings(booking_id) ON DELETE CASCADE,
    amount          NUMERIC(10,2) NOT NULL,
    payment_date    TIMESTAMP DEFAULT now(),
    payment_method  VARCHAR(30),           
    payment_status  VARCHAR(20) DEFAULT 'success' 
);

CREATE TABLE reviews (
    review_id       SERIAL PRIMARY KEY,
    hotel_id        INT NOT NULL REFERENCES hotels(hotel_id) ON DELETE CASCADE,
    customer_id     INT NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
    rating          SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment         TEXT,
    created_at      TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_bookings_room_dates ON bookings (room_id, check_in, check_out);
CREATE INDEX idx_bookings_customer ON bookings (customer_id, check_in);
CREATE INDEX idx_payments_booking ON payments (booking_id);
CREATE INDEX idx_reviews_hotel ON reviews (hotel_id);


INSERT INTO hotels (hotel_name, city, country) VALUES
('Taj Coromandel', 'Chennai', 'India'),
('The Leela Palace', 'Bengaluru', 'India'),
('ITC Grand Chola', 'Chennai', 'India'),
('The Oberoi', 'New Delhi', 'India'),
('Taj Lands End', 'Mumbai', 'India'),
('The Ritz', 'London', 'UK'),
('Four Seasons', 'New York', 'USA'),
('Marina Bay Sands', 'Singapore', 'Singapore'),
('Burj Al Arab', 'Dubai', 'UAE'),
('Shangri-La', 'Bangkok', 'Thailand');

SELECT * FROM hotels;

INSERT INTO rooms (hotel_id, room_number, room_type, price_per_night, max_occupancy) VALUES
(1, '101', 'Double', 5500.00, 2),
(2, '102', 'Suite', 12000.00, 4),
(3, '103', 'Single', 4000.00, 1),
(4, '201', 'Double', 6200.00, 2),
(5, '202', 'Suite', 15000.00, 4),
(6, '301', 'Double', 22000.00, 2),
(7, '302', 'Suite', 45000.00, 4),
(8, '401', 'Double', 18000.00, 2),
(9, '402', 'Suite', 60000.00, 3),
(10, '501', 'Double', 9000.00, 2);
INSERT INTO rooms (hotel_id, room_number, room_type, price_per_night, max_occupancy) VALUES
(1, '102', 'Single', 4200.00, 1), (1, '103', 'Double', 5800.00, 2), (1, '104', 'Suite', 13000.00, 4),
(2, '103', 'Single', 4500.00, 1), (2, '104', 'Double', 6000.00, 2), (2, '105', 'Suite', 14000.00, 4),
(3, '104', 'Double', 5200.00, 2), (3, '105', 'Suite', 11500.00, 4), (3, '106', 'Single', 4100.00, 1),
(4, '202', 'Suite', 16000.00, 4), (4, '203', 'Single', 4800.00, 1), (4, '204', 'Double', 6400.00, 2),
(5, '203', 'Double', 6800.00, 2), (5, '204', 'Single', 5000.00, 1), (5, '205', 'Suite', 17000.00, 4),
(6, '302', 'Suite', 24000.00, 4), (6, '303', 'Double', 21000.00, 2), (6, '304', 'Single', 15000.00, 1),
(7, '303', 'Double', 40000.00, 2), (7, '304', 'Suite', 48000.00, 4), (7, '305', 'Single', 32000.00, 1),
(8, '402', 'Single', 16000.00, 1), (8, '403', 'Double', 19000.00, 2), (8, '404', 'Suite', 62000.00, 4),
(9, '403', 'Double', 55000.00, 2), (9, '404', 'Suite', 65000.00, 3), (9, '405', 'Single', 48000.00, 1),
(10, '502', 'Single', 7000.00, 1), (10, '503', 'Double', 9500.00, 2), (10, '504', 'Suite', 20000.00, 4);

SELECT * FROM rooms;

INSERT INTO customers (full_name, email, phone) VALUES
('Lorelai Gilmore', 'lorelai.gilmore@example.com', '+91-9800000001'),
('Rory Gilmore', 'rory.gilmore@example.com', '+91-9800000002'),
('Luke Danes', 'luke.danes@example.com', '+91-9800000003'),
('Emily Gilmore', 'emily.gilmore@example.com', '+91-9800000004'),
('Richard Gilmore', 'richard.gilmore@example.com', '+91-9800000005'),
('Sookie St. James', 'sookie.stjames@example.com', '+91-9800000006'),
('Michel Gerard', 'michel.gerard@example.com', '+91-9800000007'),
('Paris Geller', 'paris.geller@example.com', '+91-9800000008'),
('Jess Mariano', 'jess.mariano@example.com', '+91-9800000009'),
('Sherman-Williams Kirk', 'kirk.gleason@example.com', '+91-9800000010');

INSERT INTO customers (customer_id, full_name, email, phone) VALUES
(11, 'Elena Gilbert', 'elena.gilbert@example.com', '+91-9800000011'),
(12, 'Stefan Salvatore', 'stefan.salvatore@example.com', '+91-9800000012'),
(13, 'Damon Salvatore', 'damon.salvatore@example.com', '+91-9800000013'),
(14, 'Caroline Forbes', 'caroline.forbes@example.com', '+91-9800000014'),

(15, 'Bonnie Bennett', 'bonnie.bennett@example.com', '+91-9800000015'),
(16, 'Klaus Mikaelson', 'klaus.mikaelson@example.com', '+91-9800000016'),
(17, 'Katherine Pierce', 'katherine.pierce@example.com', '+91-9800000017'),
(18, 'Matt Donovan', 'matt.donovan@example.com', '+91-9800000018'),

(19, 'Cruella de Vil', 'cruella.devil@example.com', '+91-9800000019'),
(20, 'Estella Miller', 'estella.miller@example.com', '+91-9800000020'),
(21, 'Baroness von Hellman', 'baroness.vonhellman@example.com', '+91-9800000021'),
(22, 'Anita Darling', 'anita.darling@example.com', '+91-9800000022'),

(23, 'Cinderella Tremaine', 'cinderella.tremaine@example.com', '+91-9800000023'),
(24, 'Prince Charming', 'prince.charming@example.com', '+91-9800000024'),
(25, 'Fairy Godmother', 'fairy.godmother@example.com', '+91-9800000025'),
(26, 'Lady Tremaine', 'lady.tremaine@example.com', '+91-9800000026'),

(27, 'Anastasia Tremaine', 'anastasia.tremaine@example.com', '+91-9800000027'),
(28, 'Drizella Tremaine', 'drizella.tremaine@example.com', '+91-9800000028'),
(29, 'Elsa Arendelle', 'elsa.arendelle@example.com', '+91-9800000029'),
(30, 'Anna Arendelle', 'anna.arendelle@example.com', '+91-9800000030'),

(31, 'Belle French', 'belle.french@example.com', '+91-9800000031'),
(32, 'Ariel Triton', 'ariel.triton@example.com', '+91-9800000032'),
(33, 'Aurora Briar', 'aurora.briar@example.com', '+91-9800000033'),
(34, 'Moana Waialiki', 'moana.waialiki@example.com', '+91-9800000034'),

(35, 'Rapunzel Corona', 'rapunzel.corona@example.com', '+91-9800000035'),
(36, 'Jasmine Agrabah', 'jasmine.agrabah@example.com', '+91-9800000036'),
(37, 'Mulan Fa', 'mulan.fa@example.com', '+91-9800000037'),
(38, 'Tiana Naveen', 'tiana.naveen@example.com', '+91-9800000038'),

(39, 'Regina George', 'regina.george@example.com', '+91-9800000039'),
(40, 'Cady Heron', 'cady.heron@example.com', '+91-9800000040'),
(41, 'Gretchen Wieners', 'gretchen.wieners@example.com', '+91-9800000041'),
(42, 'Karen Smith', 'karen.smith@example.com', '+91-9800000042'),

(43, 'Janis Ian', 'janis.ian@example.com', '+91-9800000043'),
(44, 'Damian Leigh', 'damian.leigh@example.com', '+91-9800000044'),
(45, 'Jasper Badun', 'jasper.badun@example.com', '+91-9800000045'),
(46, 'Horace Badun', 'horace.badun@example.com', '+91-9800000046'),

(47, 'Jeremy Gilbert', 'jeremy.gilbert@example.com', '+91-9800000047'),
(48, 'Alaric Saltzman', 'alaric.saltzman@example.com', '+91-9800000048'),
(49, 'Tyler Lockwood', 'tyler.lockwood@example.com', '+91-9800000049'),
(50, 'Enzo St. John', 'enzo.stjohn@example.com', '+91-9800000050');

SELECT * FROM customers;

INSERT INTO bookings (room_id, customer_id, check_in, check_out, status) VALUES
(1, 1, '2026-08-15', '2026-08-18', 'confirmed'),
(2, 2, '2026-08-20', '2026-08-23', 'confirmed'),
(3, 3, '2026-05-01', '2026-05-04', 'completed'),
(4, 4, '2026-09-01', '2026-09-05', 'confirmed'),
(5, 5, '2026-09-10', '2026-09-12', 'confirmed'),
(6, 6, '2026-06-15', '2026-06-18', 'completed'),
(7, 7, '2026-10-01', '2026-10-07', 'confirmed'),
(8, 8, '2026-07-01', '2026-07-03', 'completed'),
(9, 9, '2026-11-05', '2026-11-08', 'confirmed'),
(10, 10, '2026-08-25', '2026-08-27', 'cancelled');

INSERT INTO bookings (room_id, customer_id, check_in, check_out, status) VALUES
-- Hotel 1 (rooms 1,11,12,13 / customers 11-14)
(1, 11, '2026-09-01', '2026-09-03', 'confirmed'), (11, 12, '2026-09-05', '2026-09-08', 'confirmed'),
(12, 13, '2026-09-10', '2026-09-12', 'confirmed'), (13, 14, '2026-09-15', '2026-09-18', 'confirmed'),
-- Hotel 2 (rooms 2,14,15,16 / customers 15-18)
(2, 15, '2026-09-02', '2026-09-04', 'confirmed'), (14, 16, '2026-09-06', '2026-09-09', 'confirmed'),
(15, 17, '2026-09-11', '2026-09-13', 'confirmed'), (16, 18, '2026-09-16', '2026-09-19', 'confirmed'),
-- Hotel 3 (rooms 3,17,18,19 / customers 19-22)
(3, 19, '2026-09-03', '2026-09-05', 'confirmed'), (17, 20, '2026-09-07', '2026-09-10', 'confirmed'),
(18, 21, '2026-09-12', '2026-09-14', 'confirmed'), (19, 22, '2026-09-17', '2026-09-20', 'confirmed'),
-- Hotel 4 (rooms 4,20,21,22 / customers 23-26)  -- FIXED: room 4 date shifted to avoid overlap with existing Sep 1-5 booking
(4, 23, '2026-09-06', '2026-09-08', 'confirmed'), (20, 24, '2026-09-08', '2026-09-11', 'confirmed'),
(21, 25, '2026-09-13', '2026-09-15', 'confirmed'), (22, 26, '2026-09-18', '2026-09-21', 'confirmed'),
-- Hotel 5 (rooms 5,23,24,25 / customers 27-30)
(5, 27, '2026-09-05', '2026-09-07', 'confirmed'), (23, 28, '2026-09-09', '2026-09-12', 'confirmed'),
(24, 29, '2026-09-14', '2026-09-16', 'confirmed'), (25, 30, '2026-09-19', '2026-09-22', 'confirmed'),
-- Hotel 6 (rooms 6,26,27,28 / customers 31-34)
(6, 31, '2026-09-06', '2026-09-08', 'confirmed'), (26, 32, '2026-09-10', '2026-09-13', 'confirmed'),
(27, 33, '2026-09-15', '2026-09-17', 'confirmed'), (28, 34, '2026-09-20', '2026-09-23', 'confirmed'),
-- Hotel 7 (rooms 7,29,30,31 / customers 35-38)
(7, 35, '2026-09-07', '2026-09-09', 'confirmed'), (29, 36, '2026-09-11', '2026-09-14', 'confirmed'),
(30, 37, '2026-09-16', '2026-09-18', 'confirmed'), (31, 38, '2026-09-21', '2026-09-24', 'confirmed'),
-- Hotel 8 (rooms 8,32,33,34 / customers 39-42)
(8, 39, '2026-09-08', '2026-09-10', 'confirmed'), (32, 40, '2026-09-12', '2026-09-15', 'confirmed'),
(33, 41, '2026-09-17', '2026-09-19', 'confirmed'), (34, 42, '2026-09-22', '2026-09-25', 'confirmed'),
-- Hotel 9 (rooms 9,35,36,37 / customers 43-46)
(9, 43, '2026-09-09', '2026-09-11', 'confirmed'), (35, 44, '2026-09-13', '2026-09-16', 'confirmed'),
(36, 45, '2026-09-18', '2026-09-20', 'confirmed'), (37, 46, '2026-09-23', '2026-09-26', 'confirmed'),
-- Hotel 10 (rooms 10,38,39,40 / customers 47-50)
(10, 47, '2026-09-10', '2026-09-12', 'confirmed'), (38, 48, '2026-09-14', '2026-09-17', 'confirmed'),
(39, 49, '2026-09-19', '2026-09-21', 'confirmed'), (40, 50, '2026-09-24', '2026-09-27', 'confirmed');

SELECT * FROM bookings;

INSERT INTO payments (booking_id, amount, payment_method, payment_status) VALUES
(1, 16500.00, 'card', 'success'),
(2, 36000.00, 'upi', 'success'),
(3, 12000.00, 'card', 'success'),
(4, 24800.00, 'card', 'success'),
(5, 30000.00, 'upi', 'success'),
(6, 66000.00, 'card', 'success'),
(7, 315000.00, 'card', 'success'),
(8, 36000.00, 'upi', 'success'),
(9, 180000.00, 'card', 'success'),
(10, 18000.00, 'card', 'refunded');

INSERT INTO payments (booking_id, amount, payment_method, payment_status) VALUES
(11, 11000.00, 'card', 'success'), (12, 17400.00, 'upi', 'success'),
(13, 11600.00, 'card', 'success'), (14, 39000.00, 'card', 'success'),
(15, 12400.00, 'upi', 'success'), (16, 18000.00, 'card', 'success'),
(17, 10400.00, 'upi', 'success'), (18, 18000.00, 'card', 'success'),
(19, 8200.00, 'card', 'success'), (20, 34500.00, 'upi', 'success'),
(21, 23000.00, 'card', 'success'), (22, 12300.00, 'card', 'success'),
(23, 12800.00, 'upi', 'success'), (24, 14400.00, 'card', 'success'),
(25, 12800.00, 'card', 'success'), (26, 19200.00, 'upi', 'success'),
(27, 13600.00, 'card', 'success'), (28, 20400.00, 'card', 'success'),
(29, 10000.00, 'upi', 'success'), (30, 51000.00, 'card', 'success'),
(31, 44000.00, 'card', 'success'), (32, 60000.00, 'upi', 'success'),
(33, 44000.00, 'card', 'success'), (34, 63000.00, 'card', 'success'),
(35, 80000.00, 'upi', 'success'), (36, 120000.00, 'card', 'success'),
(37, 96000.00, 'card', 'success'), (38, 96000.00, 'upi', 'success'),
(39, 38000.00, 'card', 'success'), (40, 57000.00, 'card', 'success'),
(41, 38000.00, 'upi', 'success'), (42, 186000.00, 'card', 'success'),
(43, 110000.00, 'card', 'success'), (44, 195000.00, 'upi', 'success'),
(45, 130000.00, 'card', 'success'), (46, 144000.00, 'card', 'success'),
(47, 18000.00, 'upi', 'success'), (48, 28500.00, 'card', 'success'),
(49, 19000.00, 'card', 'success'), (50, 60000.00, 'upi', 'success');

SELECT * FROM payments;

INSERT INTO reviews (hotel_id, customer_id, rating, comment) VALUES
(1, 1, 5, 'Coffee was strong, service was stronger.'),
(2, 2, 5, 'Loved the reading nook by the window.'),
(3, 3, 4, 'Quiet room, great for burger cravings at midnight.'),
(4, 4, 5, 'Impeccable, as expected from a proper establishment.'),
(5, 5, 4, 'Distinguished stay, would recommend to the DAR.'),
(6, 6, 5, 'Kitchen staff were incredibly accommodating.'),
(7, 7, 3, 'Front desk could be more efficient.'),
(8, 8, 5, 'Ran a tight schedule and the hotel kept up.'),
(9, 9, 4, 'Moody lighting, good ambience.'),
(10, 10, 4, 'Quirky decor, surprisingly comfortable.');

INSERT INTO reviews (hotel_id, customer_id, rating, comment) VALUES
(1, 11, 5, 'An offer of hospitality I could not refuse.'),
(1, 12, 4, 'Here''s looking at you, front desk.'),
(1, 13, 5, 'Survived the stay, would come back.'),
(1, 14, 4, 'Took the red pill, got a great room.'),
(2, 15, 5, 'I''ll be back — for another stay.'),
(2, 16, 5, 'Found the fortune and the room both first-rate.'),
(2, 17, 4, 'Life is like a box of amenities.'),
(2, 18, 5, 'An offer this hotel made too good to refuse.'),
(3, 19, 4, 'Strength and honor, decent breakfast.'),
(3, 20, 3, 'Say hello to my little upgrade request.'),
(3, 21, 5, 'Quiet, no fava beans required.'),
(3, 22, 5, 'King of the world, or at least this floor.'),
(4, 23, 5, 'Never let go of this hotel''s comfort.'),
(4, 24, 4, 'First rule: don''t skip the spa.'),
(4, 25, 5, 'Fast checkout, furious approval.'),
(4, 26, 4, 'Bueller? Bueller? Great stay anyway.'),
(5, 27, 5, 'Great Scott, what a room.'),
(5, 28, 4, 'Game over for bad hotels, this one wins.'),
(5, 29, 5, 'Welcome to the party, pal — great service.'),
(5, 30, 4, 'Royale with cheese, and a royal suite.'),
(6, 31, 5, 'Say what again about this hotel, I dare you — love it.'),
(6, 32, 3, 'A nice hotel with a nice room, nice.'),
(6, 33, 5, 'May the odds be ever in your favor here.'),
(6, 34, 4, 'Identity confirmed: excellent stay.'),
(7, 35, 5, 'I''m the hotel guest Gotham deserves.'),
(7, 36, 5, 'Themyscira has nothing on this suite.'),
(7, 37, 4, 'Genius, billionaire, satisfied guest.'),
(7, 38, 5, 'Avengers assemble, especially at breakfast.'),
(8, 39, 4, 'We are room service, and family.'),
(8, 40, 5, 'What a lovely stay, oh what a day.'),
(8, 41, 5, 'Got busy living, got busy enjoying this hotel.'),
(8, 42, 4, 'These walls are comfortably tall.'),
(9, 43, 5, 'Brilliant amenities, top marks.'),
(9, 44, 5, 'One does not simply dislike this hotel.'),
(9, 45, 5, 'My precious stay, absolutely.'),
(9, 46, 4, 'A star among hotels, if I do say so.'),
(10, 47, 5, 'Was I the star of my own great stay? Yes.'),
(10, 48, 5, 'Le fabuleux stay of this hotel.'),
(10, 49, 4, 'This is the day you should remember this hotel.'),
(10, 50, 5, 'Savvy travelers pick this place.');

SELECT * FROM reviews;


--available rooms for custom date, hotel id (Parameters are :hotel_id, :start_date, :end_date)
SELECT * FROM bookings 
SELECT * FROM rooms
-- rooms available on this date range
SELECT r.room_id, r.room_number, r.room_type, r.price_per_night
FROM rooms r
WHERE r.hotel_id = 5
  AND NOT EXISTS (
      SELECT 1
      FROM bookings b
      WHERE b.room_id = r.room_id
        AND b.status <>'cancelled'
        AND daterange(b.check_in, b.check_out, '[)') && daterange('2026-07-01', '2026-07-03', '[)')
  )
ORDER BY r.room_number;

--hotels with rating above 4.5
SELECT h.hotel_id, h.hotel_name, ROUND(AVG(rv.rating), 2) AS avg_rating, COUNT(rv.review_id) AS num_reviews
FROM hotels h
JOIN reviews rv ON rv.hotel_id = h.hotel_id
GROUP BY h.hotel_id, h.hotel_name
HAVING AVG(rv.rating) > 4.5
ORDER BY avg_rating DESC;

--total revenue of a hotel in past 3 months
SELECT h.hotel_id, h.hotel_name, COALESCE(SUM(p.amount), 0) AS total_revenue
FROM hotels h
JOIN rooms r ON r.hotel_id = h.hotel_id
JOIN bookings b ON b.room_id = r.room_id
JOIN payments p ON p.booking_id = b.booking_id
WHERE p.payment_status = 'success'
  AND p.payment_date >= (CURRENT_DATE - INTERVAL '3 months')
GROUP BY h.hotel_id, h.hotel_name
ORDER BY total_revenue DESC;

--customers with 3+ booking in past 6 months
SELECT c.customer_id, c.full_name, c.email, COUNT(b.booking_id) AS booking_count
FROM customers c
JOIN bookings b ON b.customer_id = c.customer_id
WHERE b.created_at >= (CURRENT_DATE - INTERVAL '6 months')
  AND b.status <>'cancelled'
GROUP BY c.customer_id, c.full_name, c.email
HAVING COUNT(b.booking_id) >= 3
ORDER BY booking_count DESC;

--booked rooms in hotel 5
SELECT
    r.room_id,
    r.room_number,
    r.room_type,
    r.price_per_night,
    c.full_name AS customer_name
FROM rooms r
JOIN bookings b
    ON b.room_id = r.room_id
JOIN customers c
    ON c.customer_id = b.customer_id
WHERE r.hotel_id = 5
  AND b.status <> 'cancelled'
ORDER BY r.room_number;

-- function to book a new room
CREATE OR REPLACE FUNCTION book_room(
    p_customer_id   INT,
    p_room_id       INT,
    p_check_in      DATE,
    p_check_out     DATE
)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    v_booking_id INT;
BEGIN
    IF p_check_out <= p_check_in THEN
        RAISE EXCEPTION 'check_out (%) must be after check_in (%)', p_check_out, p_check_in;
    END IF;

    -- Availability check (same logic as the availability query)
    IF EXISTS (
        SELECT 1
        FROM bookings b
        WHERE b.room_id = p_room_id
          AND b.status <> 'cancelled'
          AND daterange(b.check_in, b.check_out, '[)') && daterange(p_check_in, p_check_out, '[)')
    ) THEN
        RAISE EXCEPTION 'Room % is not available from % to %', p_room_id, p_check_in, p_check_out;
    END IF;

    INSERT INTO bookings (room_id, customer_id, check_in, check_out, status)
    VALUES (p_room_id, p_customer_id, p_check_in, p_check_out, 'confirmed')
    RETURNING booking_id INTO v_booking_id;

    RETURN v_booking_id;
END;
$$;

SELECT book_room(13, 10, '2026-09-01', '2026-09-04');
SELECT book_room(6, 14, '2026-08-20', '2026-08-23');
SELECT book_room(6, 24, '2026-07-01', '2026-07-03');
---call the function and raise notice
DO $$
DECLARE
    v_id INT;
BEGIN
    v_id = book_room(13, 3, '2026-10-7', '2026-10-9');
    RAISE NOTICE 'New booking id: %', v_id;
END $$;

--function to cancel booking
CREATE OR REPLACE FUNCTION cancel_booking(
    p_booking_id    INT,
    p_issue_refund  BOOLEAN DEFAULT TRUE
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    v_status        VARCHAR(20);
    v_paid_amount   NUMERIC(10,2);
BEGIN
    SELECT status INTO v_status
    FROM bookings
    WHERE booking_id = p_booking_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Booking % does not exist', p_booking_id;
    END IF;

    IF v_status = 'cancelled' THEN
        RAISE EXCEPTION 'Booking % is already cancelled', p_booking_id;
    END IF;

    UPDATE bookings
    SET status = 'cancelled'
    WHERE booking_id = p_booking_id;

    IF p_issue_refund THEN
        SELECT COALESCE(SUM(amount), 0) INTO v_paid_amount
        FROM payments
        WHERE booking_id = p_booking_id
          AND payment_status = 'success';

        IF v_paid_amount > 0 THEN
            INSERT INTO payments (booking_id, amount, payment_method, payment_status)
            VALUES (p_booking_id, v_paid_amount, 'refund', 'refunded');
        END IF;
    END IF;
END;
$$;


SELECT cancel_booking(52);
--no refund
SELECT cancel_booking(52, FALSE);

select * from bookings




