<?php
    include_once "../vendor/autoload.php";

    use Ura\Dhura\Controller\Staff;


    $staff = new Staff;
    $id = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $cell = $_POST['cell'];
    $old_photo = $_POST['old-photo'];


    $data = $staff->updateStaff($name, $email, $cell,$old_photo, $id);
    if($data){
        echo '<p class="alert alert-success"> Staff updated successful !<button class="close" data-dismiss="alert">&times;</button></p>';
    }



