(function($){
    $(document).ready(function(){

        // Staff image load
        $('input#staff-photo').change(function(e){
            let file_url  = URL.createObjectURL(e.target.files[0]);
            $('img#staff-photo-load').attr('src', file_url);
            $('img#img-loader').hide();
            $('a#remove-photo').show();
        });
        /*Remove Photos*/
        $(document).on('click','a#remove-photo', function(e){
            e.preventDefault();
            $('img#staff-photo-load').attr('src', '');
            $('img#img-loader').show();
            $('a#remove-photo').hide();
        });
        /**/
        // Staff form validation
        $(document).on('submit','form#staff-form', function(event){
            event.preventDefault();

            let name = $('form#staff-form input[name="name"]').val();
            let email = $('form#staff-form input[name="email"]').val();
            let cell = $('form#staff-form input[name="cell"]').val();

            if (name == '' || email == '' || cell == ''){
                $('.modal-msg').html('<p class="alert alert-danger"> All fields are required  !<button class="close" data-dismiss="alert">&times;</button></p>');
            }else {

                $.ajax({
                    url : 'ajax_template/staff_add.php',
                    method : "POST",
                    data : new FormData(this),
                    contentType : false,
                    processData:  false,
                    success : function(data){
                        $('.modal-msg').html(data);
                        $('form#staff-form')[0].reset();
                        $('img#staff-photo-load').attr('src', '');
                        $('img#img-loader').show();
                        $('a#remove-photo').hide();
                        allStaff();
                    }
                });

            }

        });

        // All staff load
        allStaff();
        function allStaff(){
            $.ajax({
                url : 'ajax_template/staff_all.php',
                success : function(data){
                    $('tbody#staff_all').html(data);
                }
            });
        }
        /*staff single data view*/
        $(document).on('click', '#staff-view-id', function(e){
            e.preventDefault();
            let id = $(this).attr('view-id');

            $.ajax({
                url : 'ajax_template/staff-view.php',
                method : 'POST',
                data: {user_id : id},
                success : function(data){
                    let singleStaff = JSON.parse(data)
                    $('.staff-single-data img').attr('src', 'photos/staff/' + singleStaff.photo);
                    $('h2').html(singleStaff.name);
                    $('h3').html(singleStaff.cell);
                    $('td#name').html(singleStaff.name);
                    $('td#email').html(singleStaff.email);
                    $('td#cell').html(singleStaff.cell);
                },
            });
            $('#staff-view').modal('show');
        });
        /*staff delete*/
        $(document).on('click', 'a#delete-id', function(event) {
            event.preventDefault();
            let conn = confirm('Are you sure ?');

            if (conn == false)
            {
                return false;
            }else{
                let id = $(this).attr('staff-delete');
                $.ajax({
                    url : 'ajax_template/staff-delete.php',
                    method: 'POST',
                    data: {uid : id},
                    success : function(data){
                        $('.delete-msg').html(data);
                        allStaff();
                    }
                });
            }
        });
        /*staff update*/
        $(document).on('click', 'a#staff-update-id', function(e){
            e.preventDefault();
            let id = $(this).attr('update-id');
            $.ajax({
                url : 'ajax_template/staff_update.php',
                method: 'POST',
                data: {edit_id : id},
                success: function(data){
                    let staff = JSON.parse(data);
                    $('#staff-update-form input[name="name"]').val(staff.name);
                    $('#staff-update-form input[name="email"]').val(staff.email);
                    $('#staff-update-form input[name="cell"]').val(staff.cell);
                    $('#staff-update-form img#staff-photo-load').attr('src', 'photos/staff/' + staff.photo);
                }
            });
            $('#staff-update').modal('show');
        });
        /**/





    });
})(jQuery)