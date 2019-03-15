<?php
	header("Content-type: text/html; charset=utf-8");
	require_once './connectConfig.php';
	$mysqli = new mysqli(PATH, USERNAME, PASSWORD, DBSNAME);
	$mysqli->query("set names utf8");	
	
	if( isset($_GET['special']) ){
		$special = $_GET['special'];
		
		$query = "select * from scenic where scenic_special_id={$special}";
		$result = $mysqli->query($query);
		if($result->num_rows){
			// $dataArr = array();
			$str = '';
			while( $data = $result->fetch_assoc() ){
				$str .= $data['scenic_id'].',';
			}
			$str =trim(substr($str,0,-1)) ;

			echo $str;
		}else{
			echo 'none';
		}
		$result->free();
	}
	$mysqli->close();
	
?>

