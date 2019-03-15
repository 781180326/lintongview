<?php
	header("Content-type: text/html; charset=utf-8");
	require_once './connectConfig.php';
	$mysqli = new mysqli(PATH, USERNAME, PASSWORD, DBSNAME);
	$mysqli->query("set names utf8");	
	
	if( isset($_GET['id']) ){
		$id = $_GET['id'];
		
		$query = "select * from scenic where scenic_id={$id}";
		$result = $mysqli->query($query) or die('error');
		if($result->num_rows){
			$data= $result->fetch_assoc();
			$string = '';
			foreach( $data as $key=>$value ){
				$string.="\"{$key}\":\"{$value}\",";
			}
			$string = substr($string, 0, -1);
			echo '{'.$string.'}';
		}else{
			echo 'none';
		}
		$result->free();
	}
	$mysqli->close();
	
?>