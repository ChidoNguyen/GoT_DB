INSERT INTO Locations (ID, Name, Continent, Slave) 
VALUES 
    (1, 'None', NULL, NULL), # Empty location for dropdown menu
    (2, 'Oldtown', 'Westeros', 0),
    (3, 'Lannisport', 'Westeros', 0),
    (4, 'Gulltown', 'Westeros', 0),
    (5, 'White Harbor', 'Westeros', 0),
    (6, 'Qarth', 'Essos', 1),
    (7, 'Braavos', 'Essos', 0),
    (8, 'Volantis', 'Essos', 1),
    (9, 'Pentos', 'Essos', 1),
    (10, 'Winterfell', 'Westeros', 0),
    (11, 'Casterly Rock', 'Westeros', 0),
    (12, 'Dragonstone', 'Westeros', 0),
    (13, 'Highgarden', 'Westeros', 0),
    (14, "Storm's End", 'Westeros', 0),
    (15, 'Bear Island', 'Westeros', 0),
    (16, 'Sunspear', 'Westeros', 0),
    (17, "King's Landing", 'Westeros', 0)
    ;
    
INSERT INTO Houses (ID, Name, Motto, Sigil, LocationID)
VALUES
    (1, 'None', NULL, NULL, NULL), # Empty house for dropdown menu
    (2, 'Lannister', 'Hear me roar', 'Lion', 11),
    (3, 'Targaryen', 'Fire and blood', 'Dragon', 12),
    (4, 'Tyrell', 'Growing strong' , 'Rose', 13),
    (5, 'Baratheon', 'Ours is the fury', 'Stag', 14),
    (6, 'Mormont', 'Here we stand', 'Bear', 15),
    (7, 'Martell', 'Unbowed, unbent, unbroken', 'Sun and spear', 16),
    (8, 'Stark', 'Winter is coming', 'Direwolf', 10)
    ;
    
INSERT INTO `Characters`(ID, Name, HouseID, Birthplace, Biography)
VALUES
    (1, 'Jon Snow', 8, NULL, "He knows nothing"),
    (2, 'Eddard Stark', 8, 10, "Was head of House Stark, and Warden of the North"),
    (3, 'Arya Stark', 8, 10, "Trained as a Faceless Man, on the path of revenge for her family"),
    (4, 'Tyrion Lannister', 2, 11, "For what he lacks in brawn, he makes up in wit. Currently assisting Daenerys Targaryen in the reclaimation of her throne"),
    (5, 'Daenerys Targaryen', 3, 12, "Just watch the clip of her introducing herself to Jon, enough said"),
    (6, 'Joffrey Baratheon', 5, 17, "Everyone hates him")
    ;

INSERT INTO `Episodes`(ID, Season, Season_ep, Title, Air_Date)
VALUES
    (1, 1, 1, "Winter Is Coming", '2011-04-17'),
    (20, 2, 10, "Valar Morghulis", '2012-06-03'),
    (29, 3, 9, "The Rains of Castamere", '2012-06-03'),
    (31, 4, 1, "Two Swords", '2014-04-06'),
    (42, 5, 2, "The House of Black and White", '2015-04-19'),
    (53, 6, 3, "Oathbreaker", '2016-05-08'),
	(61, 7, 1, "Dragonstone", '2017-07-16'),
	(62, 7, 2, "Stormborn", '2017-07-23'),
	(63, 7, 3,"The Queen's Justice", '2017-07-30'),
	(64, 7, 4, "The Spoils of War", '2017-07-06'),
	(65, 7, 5, "Eastwatch", '2017-08-13'),
    (66, 7, 6, "Beyond the Wall", '2017-08-20'),
	(67, 7, 7, "The Dragon and the Wolf", '2017-08-27')
    ;

INSERT INTO `Appearances`(EpisodeID, CharacterID) 
VALUES
    (29, 1),
    (29, 3),
    (29, 5),
    (66, 1),
    (66, 3),
    (66, 5),
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6)
    ;
    