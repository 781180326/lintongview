<?php 
	//分为通过星级查询和通过价格查询
	
	header("Content-type: text/html; charset=utf-8");
	require_once "./connectConfig.php";
	$mysqli = new mysqli(PATH, USERNAME, PASSWORD, DBSNAME);
	$mysqli->query("set names utf8");	

	if( !empty($_GET["star"]) || ( !empty($_GET["pricetop"]) && !empty($_GET["pricebottom"])) || !empty($_GET["score"]) || !empty($_GET["page"]) ){
		
		$page =  ($_GET["page"]-1)*20+1;
	
		if( !empty($_GET["star"]) ){
			$star = $_GET["star"];
			if( $star >=2 && $star <= 5 ){
				$query = "select * from host where host_star = {$star} limit {$page},20";
				$query2 = "select * from host where host_star = {$star}";
			}
			
		}else if( !empty($_GET["pricetop"]) && !empty($_GET["pricebottom"]) ){
			$pricetop = $_GET["pricetop"];
			$pricebottom = $_GET["pricebottom"];
			if( $pricetop < 9999999999999999999 && $pricebottom > 0 && $pricetop >= $pricebottom){
				$query = "select * from host where host_price >= {$pricebottom} and host_price <= {$pricetop} and host_price != 0 limit {$page},20";
				$query2 = "select * from host where host_price >= {$pricebottom} and host_price <= {$pricetop} and host_price != 0";
			}
		}else if( !empty($_GET["score"]) ){
			$score = $_GET["score"];
			if( $score <=5 && $score > 0 ){
				$query = "select * from host where host_score >= {$score} and host_score != 0 limit {$page},20";
				$query2 = "select * from host where host_score >= {$score} and host_score != 0";
			}
		}else{
			$query = "select * from host limit {$page},20";
			$query2 = "select * from host";
		}
		
	}

	if(!empty($query)){
		//$query用来获取符合条件的字段（含有limit）
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

			//$query2用来获取总的符合条件的所有数量（不经过limit）
			$resultLength = $mysqli->query($query2) or die("error");
			$num = $resultLength->num_rows;
			$json = "{\"data\":{$dataArr},\"length\":\"{$num}\"}";
			echo $json;
		}
		
		$result->free();
	}else{
		echo "none";
	}
	$mysqli->close();

?>