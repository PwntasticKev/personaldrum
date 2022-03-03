-- CREATE TABLE drumtabs (id SERIAL PRIMARY KEY, userid integer, songname varchar(30) NOT NULL, songimg varchar(300), album varchar(60), createdts timestamp)
-- insert into drumtabs(userid, songname, songimg, album) VALUES (1, 'Adams Song', 'https://www.google.com/search?q=all+the+small+things+album&source=lnms&tbm=isch&sa=X&ved=0ahUKEwikw7S-8tXaAhUWwWMKHdxdBpIQ_AUICygC&biw=1439&bih=736#imgrc=GM8akrTnIsmVcM:', 'enema of the state')
-- select * from drumtabs;

-- select * from imglinks;
-- select * from totaltabs;
-- select * from users
-- alter table drumtabs
-- add songdesc varchar(130)

-- DELETE FROM imglinks
-- where id = 6

-- create table imglinks(id SERIAL PRIMARY KEY, user_id varchar(60), imgurl varchar(350))


postgres://dwwmypmyotcylr:fdbce44ecb67fd787676cba041ebe1344eece439cb024d990aeec2fd16f93145@ec2-174-129-41-64.compute-1.amazonaws.com:5432/dame3ip6m00k09?ssl=true