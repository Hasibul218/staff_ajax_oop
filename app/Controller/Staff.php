<?php

    namespace Ura\Dhura\Controller;

    use Ura\Dhura\Support\Database;


    /**
     * Class Student
     * @package Ura\Dhura\Controller
     */

    class Staff extends Database {

        /**
         * Staff add to Database
         * @param $name
         * @param $email
         * @param $cell
         */
        public function createStaff($name, $email, $cell, $unique_name){
            $sql = "INSERT INTO staff (name, email, cell, photo) VALUES ('$name','$email','$cell', '$unique_name')";
            $data = $this ->create($sql);

            if ($data) {
                return true;
            }else {
                return false;
            }
        }


        /**
         * All staff
         * @return bool|\mysqli_result
         */
        public function allStaff(){
            return $this ->all('staff');
        }
        /**
         * show single staff
         */
        public function showStaff($id)
        {
            return $this->find('staff',$id);
        }
        /**
         * delete staff
         */
        public function deleteStaff($id)
        {
            return $this->delete('staff', $id);
        }

        public function updateStaff($name, $email, $cell,$old_photo, $id)
        {
            $sql = "UPDATE staff SET name ='$name', email='$email', cell='$cell',photo='$old_photo' WHERE id='$id'";
            return $this->update($sql);

        }
        
    }
