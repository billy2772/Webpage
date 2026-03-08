CREATE TABLE participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    year_of_study VARCHAR(20) NOT NULL,
    email VARCHAR(120) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    college_name VARCHAR(150) NOT NULL,
    event_category ENUM('Technical', 'Non-Technical') NOT NULL,
    payment_amount DECIMAL(10,2) NOT NULL,
    payment_id VARCHAR(60) NOT NULL,
    payment_photo_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE organizers (
    organizer_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) DEFAULT 'event_organizer'
);

-- Example query for organizer page
SELECT registration_id, full_name, year_of_study, email, mobile, college_name, payment_id
FROM participants
WHERE event_category = 'Technical'
ORDER BY created_at DESC;
