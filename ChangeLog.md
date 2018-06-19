### 11/21/2017 Chido:
-New queries_v2 sorted with "pages" relationship instead of just a wall of text.
-written_requirement document uploaded.
-Took out "director" on our ER/Schema lucid characters
FOR ALEX:
	-Double check with a fresh set of eyes the ER/Schema matches up with the write up in written_requirement.
	-Maybe add more "descriptive" explanation of our queries_v2 if you feel its too vague I can touch on this later.

Note to self:
	--appearances.js groupAppearances function could be better trimmed down
	--characters.js -> getLocations could be trimmed in sql

### 11/21/2017 Alex:
- Added error page
- Finished implementing search/filter functionality on appearances
- **Existing Issues**
	- Update `queries.sql` to reflect the queries we actually ended up using (use square brackets for user input)
	- Update schema diagram and ER diagram (if they don't reflect current website/database design)
	- Write outline (can pull some language from site homepage)
	- Write database outline (include links to Node and Express documentation)
	- Host website on OSU server
	- Turn in

### 11/20/2017 Alex:
- Sort seasons in dropdown menu on appearances page
- Add an episode from every season to test sorting
- Style website
- Allow season search in appearances to hold proper value in dropdown
- Add nav bar
- Shift appearance adding to bottom of page
- Add homepage
- **Existing issues:**
	- ~~Still missing proper search/filter functionality~~
	- ~~When adding episode Season should be dropdown menu of available seasons~~
	- ~~Need to create error page~~

### 11/19/2017 Chido:
- Finished Episodes + Appearances
- Appearances (M:N) relationship has functional delete and add
	- No reason for update since the table lists each distinct character-episode linkage
- Updated data.sql to have full season 7 to test filtering and drop down of specific season filtering.


### 11/15/2017 Chido:
- Completed Houses and Locations
- Add/Update/Delete are all functionality
- Updated schema.sql to deal with ON DELETE options
- not confirmed if working but added Episodes page/functions as well


### 11/14/2017 Alex:

- Completed and tested functionality for adding characters.
- PARTIALLY implemented functionality for updating and deleting characters.

### 11/13/2017 Alex:

- Linked database and app via FLIP. To get it running:
  - Create database tables and starting data by importing `schema.sql` and `data.sql` to phpMyAdmin
  - Move `app` directory to FLIP
  - Change `dbcon.js` details to reference your database
  - Run `npm install` to set up node_modules
  - Start process via `node main.js [port]`
- Added basic (and incomplete) add functionality for characters.

### 11/12/2017 Alex:

- Made formatting and filenames consistent.

### 11/10/2017 Chido:

- Re-added auto-increment. This has better user-website interaction than having user input overall episode count.
- Added some basic data manip queries.

### 11/10/2017 Alex:

- Added a few more entries to data
- Added NOT NULL to both Appearances attributes since it's a relational table and would lose meaning if either attribute were missing from an entry

### 11/9/2017 Chido:

- Birthplace inside Character table now references foreign key Location.ID
- Updated Schema/ER/Written to reflect
- Removed AUTO_INCREMENT from Episode primary key (ID). Mainly because we're only adding a few episodes in not all 50 + episodes. Can't have it auto incrementing since we wanted to base it off the sequential OVER ALL episode number count.
- Added some more data values to add to tables so we have something to work with. Episode choice wise first 2 were random. The last one was added because the first episode had all 6 characters we're prepopulating with appear in it.
