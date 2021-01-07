<?php

    namespace Ura\Dhura\Support;

    use mysqli;


    /**
     * Class Database
     * @package Ura\Dhura\Support
     */
    abstract class Database {

        private $host = 'localhost';
        private $usr = 'root';
        private $pass = '';
        private $db = 'staff';
        private $connection;


        /**
         *
         * Database Connection
         * @return mysqli
         */
        private function connection(){
            return $this -> connection = new mysqli($this -> host, $this -> usr, $this -> pass, $this -> db);
        }

        /**
         * For insert data
         */
        protected function create($sql){
            $status = $this -> connection() -> query($sql);

            if ($status) {
                return true;
            }else {
                return false;
            }
        }


        /**
         * For data select
         */
        public function all($tbl, $order='DESC'){
            return $this -> connection() -> query("SELECT * FROM $tbl ORDER BY id $order");
        }


        /**
         * Single data view
         */
        public function find($tbl, $id){
            return $this -> connection() -> query("SELECT * FROM $tbl  WHERE id='$id'");
        }


        /**
         * For data update
         */
        public function update($sql){

            $status = $this ->connection() -> query($sql);
            if($status){
                return true;
            }else{
                return false;
            }
        }

        /**
         * For delete data
         */
        public function delete($tbl, $id){
            $status = $this ->connection() -> query("DELETE FROM $tbl WHERE id='$id'");

            if($status){
                return true;
            }else{
                return false;
            }
        }

        /**
         * @param $col
         * @param $tbl
         * @param $val
         * Value check
         */
        public function valueCheck($col, $tbl, $val){
            $query = "SELECT $col FROM $tbl WHERE $col='$val'";
            $status = $this ->connection() -> query($query);
            $num = $status -> num_rows;
            if ($num>0)
            {
                return false;
            }else{
                return true;
            }

        }

        /**
         * @param $sql
         * @return bool|\mysqli_result
         */
        public function customQuery($sql){
           return $this ->connection() -> query($sql);
        }


    }