(function($){
    $(document).ready(function(){

        // Staff image load
        $('input#staff-photo').change(function(e){
            let file_url  = URL.createObjectURL(e.target.files[0]);
            $('img#staff-photo-load').attr('src', file_url);
        });

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
        /**/
        $(document).on('click', function() {

        });
        /**/





    });
})(jQuery)