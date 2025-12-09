-- Tạo databases
CREATE DATABASE IF NOT EXISTS auth_db;
CREATE DATABASE IF NOT EXISTS quiz_db;
CREATE DATABASE IF NOT EXISTS result_db;

-- Tạo users và cấp quyền
CREATE USER IF NOT EXISTS 'auth_user'@'%' IDENTIFIED BY 'auth_pass';
CREATE USER IF NOT EXISTS 'quiz_user'@'%' IDENTIFIED BY 'quiz_pass';
CREATE USER IF NOT EXISTS 'result_user'@'%' IDENTIFIED BY 'result_pass';

GRANT ALL PRIVILEGES ON auth_db.* TO 'auth_user'@'%';
GRANT ALL PRIVILEGES ON quiz_db.* TO 'quiz_user'@'%';
GRANT ALL PRIVILEGES ON result_db.* TO 'result_user'@'%';

FLUSH PRIVILEGES;
