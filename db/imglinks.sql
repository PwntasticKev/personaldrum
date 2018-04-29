INSERT INTO imglinks(user_id, imgurl)
values ($1, $2);
select * from imglinks 
where imgurl = $2