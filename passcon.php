<?php
	
	if(strpos(gethostname(),'local')>0)
	{
		$conn = mysql_connect('localhost', 'root', 'root') or die(mysqli_error());
		mysql_select_db('tennisUmpire',$conn) or die("could not select database");
	}
	else
	{
	
		$conn = mysql_connect('localhost', 'appsfort_eamonn', '*hK_F(tfb]uF') or die('could not connect');
		mysql_select_db('appsfort_db',$conn) or die("could not select database");
	}
 	return $conn;
?>