<?php
    $ajaxParams = "Param";
    if(isset($_POST[$ajaxParams])) {
        $formData = $_POST[$ajaxParams];
        $filePath = "../database/user-profiles.json";
        if(!(filesize($filePath) == 0)){
            $storageDatabase = fopen($filePath,"r") or die ("Coudn't open file!");
            $prevData = fread($storageDatabase,filesize($filePath));
            fclose($storageDatabase);
            $updatedPrevData = substr($prevData,0,(strlen($prevData) - 2));
            $updatedFormData = substr($formData,1,strlen($formData));
            $storageDatabase = fopen($filePath,"w") or die ("Coudn't open file!");
            fwrite($storageDatabase,$updatedPrevData.",".$updatedFormData);
            fclose($storageDatabase);
        } else {
            $storageDatabase = fopen($filePath,"w") or die ("Coudn't open file!");
            fwrite($storageDatabase,$formData);
            fclose($storageDatabase);
        }
        echo "Account Created!";
    }
?>