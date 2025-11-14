CREATE DATABASE itds242_1;
USE itds242_1;

create table personal_info (
	StudentID int(11),
	Firstname varchar(45),
    Lastname varchar(45),
    DOB datetime,
    Mobilephone varchar(10)
    );
    
insert into personal_info (StudentID,Firstname,Lastname,DOB,Mobilephone)
values
(1,'Robert','Dolls','1985-01-20','0919998877'),
(2,'Peter','Jones','1980-06-10','0834455667'),
(3,'Lily','James','1991-10-20','0889988776');
