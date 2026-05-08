-- USERS TABLE (Passengers + Admins)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    role VARCHAR(50) DEFAULT 'passenger',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DRIVERS TABLE
CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    license_number VARCHAR(100),
    rating FLOAT DEFAULT 5.0,
    safety_score FLOAT DEFAULT 100,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- VEHICLES TABLE
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    vehicle_code VARCHAR(100) UNIQUE NOT NULL, -- QR identifier
    plate_number VARCHAR(50),
    driver_id INTEGER REFERENCES drivers(id),
    insurance_status BOOLEAN DEFAULT FALSE,
    inspection_status BOOLEAN DEFAULT FALSE,
    safety_score FLOAT DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TRIPS TABLE
CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    vehicle_id INTEGER REFERENCES vehicles(id),
    driver_id INTEGER REFERENCES drivers(id),
    start_location TEXT,
    end_location TEXT,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active',
    risk_level VARCHAR(50) DEFAULT 'low'
);

-- GPS / LOCATION TRACKING
CREATE TABLE trip_locations (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id),
    latitude FLOAT,
    longitude FLOAT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SAFETY ALERTS (AI + Emergency System)
CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id),
    alert_type VARCHAR(100), -- e.g. "route_deviation", "sos", "risk_detected"
    severity VARCHAR(50), -- low, medium, high
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DRIVER REVIEWS
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    driver_id INTEGER REFERENCES drivers(id),
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI ANALYTICS CACHE (for recommendations & agent memory)
CREATE TABLE ai_insights (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50), -- driver, trip, vehicle
    entity_id INTEGER,
    insight TEXT,
    risk_score FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
