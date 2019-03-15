<?php
	header("Content-type: text/html; charset=utf-8");
	require_once './connectConfig.php';
	$special= array('1'=>'历史文化','2'=>'休闲度假','3'=>'地质探索','4'=>'人文艺术','5'=>'红色文化','6'=>'自然风光');
	if(isset($_GET)){

		$mysqli = new mysqli(PATH, USERNAME, PASSWORD, DBSNAME) or die('error link');
		$mysqli->query("set names utf8");	
		$mysqli->query("truncate table special;");
		foreach ($special as $key=>$value) {
			echo $value;
			$query = "insert into special values('{$key}','{$value}')";
			echo $query;
			$result = $mysqli->query($query) or die('error 1');
		}
	}else{
		echo 'plase get';
	}
	
?>

<!--  truncate table scenic; -->
<!-- update scenic set scenic_special_id=1 where scenic_name='兵马俑' -->
<!-- create database LinTongView character set utf8;
create table scenic(
	scenic_id   		int         	primary key auto_increment not null,
	scenic_name 		varchar(100) 	not null,
	scenic_address 		varchar(200),
	scenic_price 		float,
	scenic_opentime 	time,
	scenic_closetime 	time,
	scenic_intro 		text,
	scenic_special_id 	int,
	scenic_imgnum 		int 			not null,
	foreign key(scenic_special_id) references special(special_id)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;

create table special(
	special_id 		int primary key auto_increment not null,
	special_type 	varchar(30)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;

special={
	0: '历史文化',
	1: '休闲度假',
	2: '地质探索',
	3: '人文艺术',
	4: '红色文化',
	5: '自然风光'
}

scenic=[
	{id:0, name:'兵马俑', address:'陕西省西安市临潼区。。。', price:'60', opentime:'08:00:00', closetime:'18:00:00', intro:'...................', specialId:0, imgNum:8}
]

for in
	mysqli_query



select ... -->