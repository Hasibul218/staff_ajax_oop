<?php
    include_once "../vendor/autoload.php";

    use Ura\Dhura\Controller\Staff;


    $staff = new Staff;
    $id = $_POST['edit_id'];

    /*data from database'staff'*/
    $data = $staff->showStaff($id);
    $singleStaff = $data->fetch_assoc();
    echo json_encode($singleStaff);

