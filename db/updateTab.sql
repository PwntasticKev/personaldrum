update drumtabs 
SET songname = $2, album = $3, artist = $4
WHERE id = $1;
select * from drumtabs;