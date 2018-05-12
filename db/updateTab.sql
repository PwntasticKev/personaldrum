select * from drumtabs;
update drumtabs 
SET songname = '$1', album = '$2', artist = '$3'
WHERE id = $1;