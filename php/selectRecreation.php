<?php 
	header("Content-type: text/html; charset=utf-8");
	require_once "./connectConfig.php";
	$mysqli = new mysqli(PATH, USERNAME, PASSWORD, DBSNAME);
	$mysqli->query("set names utf8");	

	if( !empty($_GET["type"]) || !empty($_GET["page"]) ){
		$type = $_GET["type"];
		$page =  ($_GET["page"]-1)*20+1;

		if( $type == 0 ){
			$query = "select * from recreation order by recreation_score desc limit {$page},20";
			$queryAll = "select * from recreation";
		}else if(   $type == floor($type) && ($type >=1 || $type <= 9)	){
			$query = "select * from recreation where recreation_type = {$type} order by recreation_score desc limit {$page},20";
			$queryAll = "select * from recreation where recreation_type = {$type}";
		}
	}

	if(!empty($query)){
		$result = $mysqli->query($query) or die("error");
		if($result->num_rows){
			$dataArr = "";
			while( $data = $result->fetch_assoc() ){
				$str = "";
				foreach ($data as $key => $value) {
					$str .= "\"".$key."\":\"".$value."\",";
				}
				$str ="{".trim(substr($str,0,-1))."}";
				$dataArr .= $str.",";
			}
			$dataArr ="[".trim(substr($dataArr,0,-1))."]";

			$num = $mysqli->query($queryAll)->num_rows;

			echo "{\"data\":{$dataArr},\"length\":\"{$num}\"}";
		}
		
		$result->free();
	}else{
		echo "none";
	}
	$mysqli->close();

?>