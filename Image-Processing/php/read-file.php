<?php
    $storageDatabase = $_POST["Params"];
    if(file_get_contents($storageDatabase) == "") {
        echo "empty-file";
    } else {
        $userProfiles = fopen($storageDatabase,"r") or die("Database error!");
        $userProfileContent = fread($userProfiles,filesize($storageDatabase));
        fclose($userProfiles);
        echo $userProfileContent;
    }
?>