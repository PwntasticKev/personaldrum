INSERT INTO imglinks(user_id, imgurl)
values ($1, $2)
returning imgurl;