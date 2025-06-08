-- Create database
CREATE DATABASE IF NOT EXISTS sportcourt_db;
USE sportcourt_db;

-- Create Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL CHECK (role IN ('USER', 'MANAGER', 'ADMIN'))
);

-- Create Managers table (inherits from User)
CREATE TABLE managers (
    id BIGINT PRIMARY KEY,
    branchName VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES users(id)
);

-- Create Admins table (inherits from User)
CREATE TABLE admins (
    id BIGINT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES users(id)
);

-- Create SportsFields table
CREATE TABLE sportsfields (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    pricePerHour DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'available'
);

-- Create TimeSlots table
CREATE TABLE timeslots (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    scheduled_in BIGINT,
    FOREIGN KEY (scheduled_in) REFERENCES sportsfields(id)
);

-- Create Bookings table
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50) NOT NULL,
    createdAt DATETIME NOT NULL,
    user_id BIGINT NOT NULL,
    field_id BIGINT NOT NULL,
    time_slot_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (field_id) REFERENCES sportsfields(id),
    FOREIGN KEY (time_slot_id) REFERENCES timeslots(id)
);

-- Create BranchReports table
CREATE TABLE branchreports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content TEXT,
    createdAt DATETIME NOT NULL,
    manager_id BIGINT NOT NULL,
    FOREIGN KEY (manager_id) REFERENCES managers(id)
);

-- Create SystemReports table
CREATE TABLE systemreports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content TEXT,
    createdAt DATETIME NOT NULL,
    admin_id BIGINT NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES admins(id)
);

-- Create Payments table
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    method VARCHAR(100),
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    paidAt DATETIME,
    booking_id BIGINT NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- Insert sample data into Users
INSERT INTO users (username, password, email, phone, role) VALUES
('user1', 'pass123', 'user1@example.com', '1234567890', 'USER'),
('manager1', 'pass456', 'manager1@example.com', '0987654321', 'MANAGER'),
('admin1', 'pass789', 'admin1@example.com', '1112223333', 'ADMIN');

-- Insert sample data into Managers
INSERT INTO managers (id, branchName) VALUES
(2, 'Downtown Branch');

-- Insert sample data into Admins
INSERT INTO admins (id) VALUES
(3);

-- Insert sample data into SportsFields
INSERT INTO sportsfields (name, location, type, pricePerHour, status) VALUES
('Grand Slam Tennis Court', 'Downtown', 'Tennis', 10.00, 'available'),
('City Football Field', 'Uptown', 'Football', 15.00, 'available');

-- Insert sample data into TimeSlots
INSERT INTO timeslots (startTime, endTime, scheduled_in) VALUES
('14:00:00', '15:00:00', 1),
('16:00:00', '17:00:00', 2);

-- Insert sample data into Bookings
INSERT INTO bookings (status, createdAt, user_id, field_id, time_slot_id) VALUES
('confirmed', '2025-06-07 17:00:00', 1, 1, 1);

-- Insert sample data into BranchReports
INSERT INTO branchreports (content, createdAt, manager_id) VALUES
('Weekly report for Downtown Branch', '2025-06-07 17:30:00', 2);

-- Insert sample data into SystemReports
INSERT INTO systemreports (content, createdAt, admin_id) VALUES
('System maintenance scheduled', '2025-06-07 17:30:00', 3);

-- Insert sample data into Payments
INSERT INTO payments (method, amount, status, paidAt, booking_id) VALUES
('Credit Card', 10.00, 'paid', '2025-06-07 17:30:00', 1);