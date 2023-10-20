///////////  For Marking the Entries  /////////////////////


$(document).ready(function () {
    $('#upload_file').prop('disabled', true);
    $('#btn_upload').prop('disabled', true);

    $.ajax({
        url: '/Form/LetterNo',
        datatype: 'json',
        async: false,
        type: 'GET',
        cache: false,
        success: function (response) {
            var markup = "<option value='0'>--Select--</option>"
            for (var i = 0; i < response.length; i++) {
                markup += "<option value='" + response[i].value + "'>" + response[i].text + "</option>";
            }
            $("#lt_no").html(markup);
        },

        error: function (xhr, type, exception) {
            alert("Error" + exception);
        }
    })


    ////////////////load all officers on checkbox group////////////////

    $.ajax({
        url: '/Form/load_employee',
        async: true,
        type: 'GET',
        success: function (response) {
            var markup = "";
            for (var i = 0; i < response.length; i++) {
                //markup += "<div class='form-check'><input class='form-check-input' type='checkbox' id = '" + response[i].Value + "' name='" + response[i].Value + "'> <label class='form-check-label' for='" + response[i].Value + "'>" + reponse[i].Text + "</label> </div >"                                

                markup += "<input class='form-check-input' name='check_box_group' type='checkbox' id='chkbox_" + response[i].value + "'  value='" + response[i].text +"'> <label class='form-check-label' for='chkbox_" + response[i].value + "'>" + response[i].text + "</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            }
            $('#check_box_group').html(markup);
        },
        error: function (xhr, type, exception) { alert("Error" + exception); }
    });
    /////////////////////////////////////////////////


    $('#lt_no').change(function () {
        if ($('#lt_no option:selected').text() === '--Select--') {
            $('#upload_file').prop('disabled', true);
            $('#btn_upload').prop('disabled', true);
        }

        else {
            $('#upload_file').prop('disabled', false);            
            var let_no = $('#lt_no option:selected').text();


            $('#gd_email').attr('checked', false); $('#gd_hardcopy').attr('checked', false)
            $('#gd_hindi').attr('checked', false); $('#gd_eng').attr('checked', false)

            $.ajax({
                url: '/Form/LoadDetails',
                data: { 'letter_no': let_no },
                type: 'GET',
                success: function (response) {
                    const d = new Date(response.dated);
                    const formattedDate = ("0" + d.getDate()).slice(-2) + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + d.getFullYear()
                    $('#txt_date').val(formattedDate).Date;

                    $('#txt_subject').val(response.subject);
                    if (response.letter_language == 'English') { $('#gd_eng').attr('checked', true); $('#gd_hindi').attr('checked', false); }
                    else { $('#gd_hindi').attr('checked', true); $('#gd_eng').attr('checked', false); }


                    if (response.letter_incoming_mode == 'Email') {
                        $('#gd_email').attr('checked', true); $('#gd_hardcopy').attr('checked', false);
                    }
                    else {
                        $('#gd_email').attr('checked', false); $('#gd_hardcopy').attr('checked', true);
                    }

                    $('#txt_remarks').val(response.letter_remarks)
                    $('#txt_category').val(response.letter_category)
                },
                error: function (xhr, type, exception) { alert("Error" + exception); }
            })
        }
    })


    $('#upload_file').change(function (e) {
        e.preventDefault();
        
        var myFile = $('#upload_file').val();
        
            var file_type = myFile.split('.').pop();

            var file_size = e.target.files[0].size;

            if (file_type === 'pdf' || file_type === 'pdf') {
                if (file_size > 524288) {
                    alert('Please select the file less than 512KB !!!');
                    $('#upload_file').val('');
                }
                else {
                    $('#btn_upload').prop('disabled', false);
                }
            }
            else {
                $('#upload_file').val('');
                alert('Please select only pdf file');
            }       
       
      
    })

    $('#btn_upload').click(function (e) {
        try {
            var myFile = document.getElementById("upload_file").files[0];
            if (myFile.size != 0) {
                var form = new FormData();
                form.append('cfile', myFile);

                $.ajax({
                    url: '/Form/Upload_pdf',
                    method: 'POST',
                    data: form,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        alert('File has been uploaded successfully !!!')
                        $('#btn_upload').prop('disabled', 'disabled');
                    },
                    error: function (xhr, type, exception) {
                        alert("Error - " + "type:" + type + exception);
                        $('#btn_upload').prop('disabled', true);
                    }
                })
            }
            else {
                alert('Please select the pdf file to be uploaded !!!');
            }
        }
        catch (e) {
            alert('Error - ' + e)
        }
    })

    $('#btn_update').on('click', function (e) {
        var array = []

        $("input:checkbox[name=check_box_group]:checked").each(function () {
            array.push($(this).val());
        })

        if (array.length == 0) {
            alert('Please mark atleast one employee to be saved...');
        }
        else {

            $('#hidden_text').text(array);

            var marked_to_ = $('#hidden_text').text();

            e.preventDefault();

            if ($('#lt_no option:selected').text() === '--Select--') {

            }

            else {
                try {
                    var formatted_date = $('#txt_date').val();
                    const d = new Date(formatted_date);
                    const formattedDate = ("0" + (d.getMonth() + 1)).slice(-2) + '/' + ("0" + d.getDate()).slice(-2) + '/' + d.getFullYear()

                    var letterMarked = {
                        letter_id: $('#lt_no option:selected').val(),
                        dated: formattedDate,
                        subject: $('#txt_subject').val(),
                        letter_category: $('#txt_category').val(),
                        letter_language: $("input[name='langGridRadios']:checked").val(),
                        letter_incoming_mode: $("[name='modeGridRadios']:checked").val(),
                        letter_remarks: $('#txt_remarks').val(),
                        marked_to: marked_to_
                    }

                    var data = { 'lt_mark_query': letterMarked }

                    $.ajax({
                        url: '/Form/MarkForm',
                        data: data,
                        method: 'POST',
                        cache: false,
                        success: function (response) {
                            if (response) {
                                alert('The entry has been saved !!!');
                                window.location.href = '/Form/MarkForm'
                            }
                        },
                        error: function (xhr, type, exception) {
                            alert('Error - ' + exception)
                        }
                    })
                }
                catch (e) {
                    alert('Exception : - ' + e);
                }
            }
        }
    });



});















