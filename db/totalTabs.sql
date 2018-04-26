SELECT * FROM drumtabs
WHERE upper (songname) like ('%'||$1||'%')