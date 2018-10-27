import * as Questions from "../index";

import SQL from "sql.js";

let defaultDatabaseSQL = `BEGIN TRANSACTION;
DROP TABLE IF EXISTS Shippers;
CREATE TABLE IF NOT EXISTS Shippers (
	ShipperID	INTEGER,
	CompanyName	VARCHAR ( 60 ),
	Phone	VARCHAR ( 20 ),
	PRIMARY KEY(ShipperID)
);
INSERT INTO Shippers (ShipperID,CompanyName,Phone) VALUES (1,'USPS','1 (800) 275-8777'),
 (2,'Federal Express','1-800-463-3339'),
 (3,'UPS','1 (800) 742-5877'),
 (4,'DHL','1-800-CALL-DHL');
DROP TABLE IF EXISTS Orders;
CREATE TABLE IF NOT EXISTS Orders (
	OrderID	INTEGER,
	CustomerID	INTEGER,
	EmployeeID	INTEGER,
	OrderDate	VARCHAR ( 25 ),
	RequiredDate	VARCHAR ( 25 ),
	ShippedDate	VARCHAR ( 25 ),
	ShipVia	INTEGER,
	FreightCharge	REAL,
	PRIMARY KEY(OrderID)
);
INSERT INTO Orders (OrderID,CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,FreightCharge) VALUES (1,1,1,'2012-01-04','2012-01-09','2012-01-05',1,3.75),
 (2,2,2,'2012-01-27','2012-02-01','2012-01-28',1,7.25),
 (3,4,1,'2012-02-19','2012-02-24','2012-02-23',2,5.5),
 (4,2,4,'2012-03-13','2012-03-18','2012-03-14',2,13.5),
 (5,4,2,'2012-04-05','2012-04-10','2012-04-06',3,8.75),
 (6,3,3,'2012-04-28','2012-05-03','2012-04-29',2,11.0),
 (7,4,3,'2012-05-21','2012-05-26','2012-05-22',1,11.25),
 (8,1,4,'2012-06-13','2012-06-18','2012-06-14',4,13.5),
 (9,2,1,'2012-07-06','2012-07-11','2012-07-07',3,4.75),
 (10,3,2,'2012-07-29','2012-08-03','2012-08-04',1,7.75),
 (11,3,3,'2012-08-21','2012-08-26','2012-08-22',4,11.5),
 (12,1,4,'2012-09-13','2012-09-18','2012-09-14',2,13.0),
 (13,5,3,'2012-10-06','2012-10-11','2012-10-07',3,12.25),
 (14,2,2,'2012-10-29','2012-11-03','2012-10-30',2,7.5),
 (15,4,2,'2012-11-21','2012-11-26','2012-11-22',1,8.25),
 (16,3,4,'2012-12-14','2012-12-19','2012-12-15',2,14.0),
 (17,5,1,'2013-01-06','2013-01-11','2013-01-07',3,6.25),
 (18,3,3,'2013-01-29','2013-02-03','2013-01-30',1,10.75),
 (19,2,4,'2013-02-21','2013-02-26','2013-03-01',4,14.0),
 (20,3,1,'2013-03-16','2013-03-21','2013-03-17',4,5.5);
DROP TABLE IF EXISTS OrderDetails;
CREATE TABLE IF NOT EXISTS OrderDetails (
	OrderDetailID	INTEGER,
	OrderID	INTEGER,
	ProductID	INTEGER,
	UnitPrice	REAL,
	Quantity	INTEGER,
	PRIMARY KEY(OrderDetailID)
);
INSERT INTO OrderDetails (OrderDetailID,OrderID,ProductID,UnitPrice,Quantity) VALUES (1,1,1,1.1,30),
 (2,1,2,0.25,60),
 (3,2,3,5.0,80),
 (4,2,4,1.39,110),
 (5,2,5,9.97,140),
 (6,3,6,14.69,160),
 (7,3,1,1.1,30),
 (8,3,2,0.25,50),
 (9,4,3,5.0,80),
 (10,5,4,1.39,100),
 (11,5,5,9.97,130),
 (12,5,6,14.69,150),
 (13,6,1,1.1,20),
 (14,6,2,0.25,50),
 (15,6,3,5.0,70),
 (16,7,4,1.39,90),
 (17,7,5,9.97,120),
 (18,8,6,14.69,130),
 (19,8,1,1.1,20),
 (20,8,2,0.25,40),
 (21,9,3,5.0,60),
 (22,10,4,1.39,80),
 (23,10,1,1.1,20),
 (24,11,2,0.25,40),
 (25,11,3,5.0,60),
 (26,11,4,1.39,80),
 (27,12,1,1.1,20),
 (28,12,2,0.25,40),
 (29,13,3,5.0,50),
 (30,14,4,1.39,60),
 (31,14,5,9.97,80),
 (32,15,6,14.69,90),
 (33,15,1,1.1,20),
 (34,16,2,0.25,30),
 (35,16,3,5.0,40),
 (36,17,4,1.39,50),
 (37,17,5,9.97,70),
 (38,17,6,14.69,80),
 (39,18,1,1.1,10),
 (40,18,2,0.25,20),
 (41,18,3,5.0,40),
 (42,18,4,1.39,50),
 (43,19,5,9.97,60),
 (44,19,6,14.69,70),
 (45,20,1,1.1,10),
 (46,20,2,0.25,20),
 (47,20,3,5.0,30);
DROP TABLE IF EXISTS Employees;
CREATE TABLE IF NOT EXISTS Employees (
	EmployeeID	INTEGER,
	LastName	VARCHAR ( 20 ),
	FirstName	VARCHAR ( 20 ),
	Title	VARCHAR ( 60 ),
	Address	VARCHAR ( 40 ),
	HireDate	VARCHAR ( 25 ),
	PRIMARY KEY(EmployeeID)
);
INSERT INTO Employees (EmployeeID,LastName,FirstName,Title,Address,HireDate) VALUES (1,'White','James','Account Manager',NULL,'2011-04-03'),
 (2,'Lee','Patty','Account Manager',NULL,'2008-09-15'),
 (3,'Smith','Robert','Account Manager',NULL,'2004-06-28'),
 (4,'Baker','Lisa','Account Manager',NULL,'2010-11-20');
DROP TABLE IF EXISTS Customers;
CREATE TABLE IF NOT EXISTS Customers (
	CustomerID	INTEGER,
	CompanyName	VARCHAR ( 60 ),
	ContactName	VARCHAR ( 40 ),
	ContactTitle	VARCHAR ( 60 ),
	Address	VARCHAR ( 60 ),
	City	VARCHAR ( 60 ),
	State	VARCHAR ( 2 ),
	PRIMARY KEY(CustomerID)
);
INSERT INTO Customers (CustomerID,CompanyName,ContactName,ContactTitle,Address,City,State) VALUES (1,'Deerfield Tile','Dick Terrcotta','Owner','450 Village Street','Deerfield','IL'),
 (2,'Sagebrush Carpet','Barbara Berber','Director of Installations','10 Industrial Drive','El Paso','TX'),
 (3,'Floor Co.','Jim Wood','Installer','34218 Private Lane','Monclair','NJ'),
 (4,'Main Tile and Bath','Toni Faucet','Owner','Suite 23, Henry Building','Orlando','FL'),
 (5,'Slots Carpet','Jack Diamond III','Purchaser','3024 Jackpot Drive','Las Vegas','NV');
COMMIT;`;

describe("The question configurations", async () => {
  let db;

  beforeAll(async () => {
    db = new SQL.Database();

    db.exec(defaultDatabaseSQL);

    // Reset the question cache.
    window.questionCache = {};
  });

  it("renders all the questions successfully", () => {
    Questions.default.map(question => expect(question.build(db)).toBeTruthy());
  });
});
