CREATE DATABASE EmployeeDB;
GO
USE EmployeeDB;
GO 


-- DROP TABLE Employees;
TRUNCATE TABLE Employees;
CREATE TABLE Employees(
	empId INT IDENTITY(1,1) PRIMARY KEY,
	name VARCHAR(25) NOT NULL ,
	dept VARCHAR(10) NOT NULL
);

INSERT INTO Employees (name,dept) 
VALUES ('Rahul','Production'),
		('Shreya','Sales'),
		('Ram','Networking'),
		('Neha','Sales'),
		('Gokul','Production');

SELECT * FROM Employees WHERE empId=2;


DROP PROCEDURE IF EXISTS GetEmployeeDetails;
GO

CREATE PROCEDURE GetEmployeeDetails
 @EmpId INT
AS
BEGIN
 SELECT *
 FROM Employees
 WHERE empId = @EmpId;
END
GO

EXEC GetEmployeeDetails @EmpId = 1;


USE EmployeeDB;
GO
CREATE OR ALTER FUNCTION dbo.GetEmployeesByDept 
(
    @DepartmentName VARCHAR(10)
)
RETURNS TABLE 
AS
RETURN 
(
    SELECT empId, name, dept
    FROM dbo.Employees
    WHERE dept = @DepartmentName
);
GO

SELECT * FROM dbo.GetEmployeesByDept('Sales');