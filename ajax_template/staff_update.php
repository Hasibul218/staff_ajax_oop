<?php
    include_once "../vendor/autoload.php";

    use Ura\Dhura\Controller\Staff;


    $staff = new Staff;
    $id = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $cell = $_POST['cell'];
    $old_photo = $_POST['old-photo'];
    /*New Photo update*/
    $file_name = $_FILES['n-photo']['name'];
    $file_temp_name = $_FILES['n-photo']['tmp_name'];
    $unique_name = md5(time().rand()).$file_name;

    if (!empty($file_name)){
        $photo_name = $unique_name;
        move_uploaded_file($file_temp_name, '../photos/staff/'.$unique_name);

    }else{
        $photo_name = $old_photo;
    }

    $data = $staff->updateStaff($name, $email, $cell,$photo_name, $id);
    if($data){
        echo '<p class="alert alert-success"> Staff updated successful !<button class="close" data-dismiss="alert">&times;</button></p>';
    }



