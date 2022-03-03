INSERT INTO users
(username, img, authid)
VALUES
( $1, $2, $3 )
RETURNING *;