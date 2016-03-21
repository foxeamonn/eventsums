<?php
	require_once("passcon.php");
	$user=$_POST['user'];
	$op=$_POST['op'];
	$today = date("F j, Y, g:i a");
	
	$sql="select * from customers where fbid='$user'";
	$result=mysql_query($sql,$conn) or die('an error has occurred');
	$count=mysql_num_rows($result);
	$r='';
	if($count>0) $r=mysql_fetch_array($result);
	
	// has user previously activated?
	if($op=="signedUp"){
		if($count>0) echo "Y";
		if($count<1) echo "N";
		exit;
	}
		
	//tokens
	if($op=="tokens"){
		if($count==0){echo 0;exit;}
		echo $r['tokens'];
		exit;
	};

	// activate user.
	if($op=="activate"){
		if($count==0){
			$firstname=$_POST['firstname'];
			$surname=$_POST['surname'];
			$friends=$_POST['friends'];
			$tokens=5;
			$sql="INSERT INTO customers VALUES ('$user','Y','$tokens','$firstname','$surname','$today','$friends')";
			$result=mysql_query($sql,$conn) or die(mysql_error());
			echo "UP";
		}
		else{
			$sql="UPDATE customers set visited='$today' where fbid='$user'";
			$result=mysql_query($sql,$conn) or die(mysql_error());
			echo "IN";
		}
	}


	// purchase tokens;
	if($op=="changetokens"){
		$tokens=$_POST['notokens'];
		$tokens+=$r['tokens'];
		$sql="UPDATE customers set tokens='$tokens', visited='$today' where fbid='$user'";
		$result=mysql_query($sql,$conn) or die(mysql_error());
		echo $tokens;
		exit;
	}
		
	exit;
	
	
?>