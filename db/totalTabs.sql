SELECT * FROM drumtabs
WHERE upper (songname) like ('%'||$1||'%')
-- WHERE songname ~* $1 -- tilda regex, * case insensitive