<？php


?>






create table host(
	host_id int primary key auto_increment,
	host_name varchar(100) not null,
	host_price varchar(100),
	host_address varchar(300),
	host_score float,
	host_type_id int,
	host_pos varchar(100),
	host_tuniuLink varchar(200),
	foreign key(host_type_id) references host_type(host_type_id)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;

create table host_type(
	host_type_id int primary key auto_increment,
	host_type_name varchar(50)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;


create table play(
	play_id int primary key auto_increment,
	play_name varchar(100) not null,
	play_price varchar(100),
	play_address varchar(300),
	play_score float,
	play_type_id int,
	play_pos varchar(100),
	play_baiduLink varchar(200),
	foreign key(play_type_id) references play_type(play_type_id)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;

create table play_type(
	play_type_id int primary key auto_increment,
	play_type_name varchar(50)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;
休闲娱乐：KTV 棋牌 桌球 游泳 网咖 饮品店 体育馆 图书馆
购物：人人乐 奥特莱斯
旅游攻略：参考网址http://www.mafengwo.cn/gonglve/ziyouxing/1199.html

住宿详情直接连接到途牛的详情页，不用再开一个新的页面展示


create table user(
	user_id int primary key auto_increment,
	user_name varchar(100) not null,
	user_password varchar(100) not null
)ENGINE=MyISAM DEFAULT CHARSET=utf8;

create table message(
	message_id int primary key auto_increment,
	user_id int not null,
	message_time time not null,
	message_text text not null,
	foreign key(user_id) references user(user_id)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;




create table recreation(
	recreation_id 		int primary key auto_increment,
	recreation_name 	varchar(100) not null,
	recreation_addr 	varchar(200),
	recreation_score 	float,
	recreation_pos 		varchar(100),
	recreation_imageUrl varchar(400),
	recreation_redu 	int,
	recreation_type 	int,
	recreation_Link 	varchar(400)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;
