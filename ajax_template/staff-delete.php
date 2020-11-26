<?php
    include_once "../vendor/autoload.php";

    use Ura\Dhura\Controller\Staff;


    $staff = new Staff;
    $id = $_POST['uid'];

    $data = $staff->deleteStaff($id);

    if ($data){
        echo '<p class="alert alert-success"> Staff deleted successful !<button class="close" data-dismiss="alert">&times;</button></p>';
    }



