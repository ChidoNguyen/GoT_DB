/*
* CS340 Final Porject by Alexander Johnson and Chido Nguyen
* Format for queries document will be to split into sections
* based on pages to be rendered which will help keep relevant 
* queries localized to its page for better tracking. 
*/

-- Appearances Page --

-- Selecting initial data for table population
SELECT E.ID as EID, E.Title as Title, E.Season as Season, E.season_ep as Episode, C.ID as CID, C.Name as Name FROM `Appearances` A
  INNER JOIN `Episodes` E ON A.EpisodeID = E.ID
  INNER JOIN `Characters` C on A.CharacterID = C.ID
  ORDER BY C.Name;

-- Filtering of episodes a CHARACTER appears in
SELECT E.ID as EID, E.Title as Title, E.Season as Season, E.Season_ep as Episode, C.ID as CID, C.Name as Name FROM Appearances A
  INNER JOIN Episodes E ON A.EpisodeID = E.ID
  INNER JOIN Characters C ON A.CharacterID = C.ID
  WHERE C.ID = [USER_Inputs_Name];

-- Get all characters that appear in our Relationship table
SELECT E.ID as EID, E.Title as Title, E.Season as Season, E.Season_ep as Episode, C.ID as CID, C.Name as Name FROM Appearances A
  INNER JOIN Episodes E ON A.EpisodeID = E.ID
  INNER JOIN Characters C ON A.CharacterID = C.ID
  GROUP BY C.Name ORDER BY C.Name;

-- Get DISTINCT seasons that appear in our Episodes table
SELECT distinct(Season) From `Episodes` ORDER BY Season;

-- Get all the characters name + ID from Characters table
SELECT ID, Name FROM `Characters`;

-- Get episodes from SPECIFIED season
SELECT ID, Season, Season_ep as episodes FROM `Episodes`
  WHERE Season = [UserChoice];
  
-- Inserting an Episode + Character relationship
INSERT INTO `Appearances` (EpisodeID,CharacterID)
  VALUES [UserSelectsEpisode, UserSelectsChar];
  
-- Deleting a relationship from the table
DELETE FROM `Appearances`
  WHERE EpisodeID = [User] AND CharacterID = [User];
  /* User clicks on delete button linked with each row, 
  *  row will have EpisodeID and CharacterID linked with 
  *  the delete button accordingly. */



-- Characters Page --

-- Select initial characters for table population
SELECT C.ID, C.Name, H.Name AS House, L.Name AS Location, C.Biography FROM Characters C
  LEFT JOIN Houses H ON C.HouseID = H.ID
  LEFT JOIN Locations L ON C.Birthplace = L.ID;
  
-- Gets one SPECIFIED character's information for update
SELECT ID, Name, HouseID, Birthplace, Biography FROM `Characters`
  WHERE id = [UserChoice];
  
-- Get Location Name to replace LocationID with via Joins
SELECT ID, Name FROM `Locations`;

-- Update a specific Character and their information
UPDATE `Characters`
  SET Name = [UserParam] , HouseID = [UserParam], Birthplace = [UserParam], Biography = [UserParam]
  WHERE ID = [UserInput];
  
-- Inserting new characters
INSERT INTO `Characters` (Name,HouseID,Birthplace,Biography)
  VALUES [User,User,User,User];
  
-- Deleting a character
DELETE FROM `Characters` WHERE ID = [UserChoice];



-- Episodes Page --

-- Initial data selection to populate table
SELECT ID, Season, Season_ep, Title, Air_Date
  FROM `Episodes`;
-- Get one Single episode
SELECT ID, Season, Season_ep, Title, Air_Date
  FROM `Episodes` WHERE ID = [UserInput];
-- Updating Episode Info
UPDATE `Episodes`
  SET Season = [UserParam] , Season_ep = [UserParam], Title = [UserParam], Air_Date = [UserParam]
  WHERE ID = [UserChoice];
-- Inserting new characters
INSERT INTO `Episodes` (Season,Season_ep,Title,Air_Date)
  VALUES [User,User,User,UserParam];
-- Deleting Episodes
DELETE FROM `Episodes` WHERE ID = [UserChoice];



-- Houses Page --

-- Selecting house information for initial table
SELECT H.ID, H.Name as Name, H.Motto as Motto, H.Sigil as Sigil, L.Name as Location
  FROM `Houses` H
  INNER JOIN `Locations` L ON H.LocationID = L.ID;
  
-- Gets all locations ID and Name
SELECT ID, Name FROM `Locations`;

-- Grabs specific HOUSE to update info for
SELECT ID, Name, Motto, Sigil, LocationID
  FROM `Houses` WHERE ID = [UserChoice];

-- Update House Info
UPDATE `Houses` SET Name = [UserInputs], Motto = [UserInputs], Sigil = [UserInput], LocationID = [UserInputs]
  WHERE ID = [UserChoice];

-- Insert New House
INSERT INTO `Houses` (Name,Motto,Sigil,LocationID)
    VALUES [User,User,User,UserInputs];
    
-- Delete House
DELETE FROM `Houses` WHERE ID = [UserChoice];



-- Locations Page --

-- Initial locations data selection for data table population
SELECT ID, Name, Continent, Slave FROM `Locations`
  WHERE Name != 'None';
  
-- Selects one location
SELECT ID, Name, Continent, Slave FROM `Locations`
  WHERE ID = [UserInput];
  
-- Update a location's info
UPDATE `Locations` SET Name = [UserInputs], Continent = [UserInputs], Slave = [UserInputs]
  WHERE ID = [UserChoice];
  
-- Add new location
INSERT INTO `Locations` (Name,Continent,Slave)
  Values [User,User,UserInput];

-- Delete a location --
DELETE FROM `Locations` WHERE ID = [UserChoice];
