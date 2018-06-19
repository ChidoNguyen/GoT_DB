# Outline

Our project idea is drawn for George R.R. Martin’s *A Song of Fire and Ice* novels and the TV show Game of Thrones. We decided to document some general relationships between various aspects of the show. The database represents the show’s episodes, characters, locations, houses, and appearances.

# Database Outline

## Episodes

The Episodes table contains the following attributes:
* ID (based off the overall episode number in the whole series, required)
* Season (the season the episode appears in, required)
* Episode (number of the season, required)
* Title (required)
* Air Date (required)

All episodes can have one or more character appearances, as represented by the Appearances table. 

## Characters

The Characters table contains the following attributes:
* ID (required)
* Name (required)
* House ID (references a house)
* Birthplace (references a location)
* Biography

Characters may or may not have a birth location (they may not know where they were born). Characters are part of only one house (based off of patrilineal culture in universe).

## Houses

The Houses table contains the following attributes: 
* ID (required)
* Name (required)
* Motto
* Sigil
* Location ID (references a location)

A house can exist in no location or one location. A house can have zero or more characters (perhaps the house has died out but is still mentioned in the show).

## Locations

The Locations table contains the following attributes:
* ID (required)
* Name
* Continent
* Slave (status as a slave or free state)

Locations can be associated with zero or more houses (Castle Black knows no house, while several houses may be vying for or sharing power in another location). Locations can be the birthplace of zero or more characters.

## Appearances

The Appearances table contains the following attributes:
* Episode ID (references Episodes, required)
* Character ID (references Characters, required)

All characters can appear in zero or more episodes (a character could be referenced by never appear). Obviously a character who does not appear in the show wouldn’t be reflected in this table. Appearances are tracked by Episode’s ID and Character’s ID.

