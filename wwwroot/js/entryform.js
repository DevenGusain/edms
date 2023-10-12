$(document).ready(function () {



    $.ajax({
        url: '/Form/ListCategory',
        datatype:'json',
        async: false,
        type: 'GET',
        cache: false,
        success: function (response) {
            var markup = "<option value='0'>--Select--</option>"
            for (var i = 0; i < response.length; i++) {
                markup += "<option value='" + response[i].value + "'>" + response[i].text + "</option>";
            }
            $("#lt_category").html(markup);
        },
        error: function (xhr, type, exception) {
            alert("Error" + exception);
        }
    })

    $('#btn_submit').click(function (e) {
        e.preventDefault();

        var Letter_Entry_Table = {   
            Id: $('#lt_no').val() + '-' + $('#lt_date').val(),
            letter_no: $('#lt_no').val(),
            dated: $('#lt_date').val(),            
            subject: $('#lt_subject').val(),
            letter_category: $("#lt_category option:selected").text(),
            letter_language: $("input[name='langGridRadios']:checked").val(),            
            letter_incoming_mode: $("[name='modeGridRadios']:checked").val(),
            letter_remarks: $('#lt_remarks').val()
        }
        var addition = { 'lt_entry': Letter_Entry_Table }

        $.ajax({
            url: '/Form/EntryForm',
            data: addition,
            type: 'POST',
            cache: false,
            success: function (response) {
                if (response) {
                    alert('Your letter has been entered !!!')
                    window.location.href = '/Form/EntryForm'
                }
                else
                alert('Error in Controller Action !!!')
            },

            error: function (xhr, type, exception) {
                alert("Error" + exception);
            }

        });
    })
       

});



///////////  For Editing the Entries  /////////////////////
$(document).ready(function () {
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


    $('#lt_no').change(function () {
        
        $('#gd_email').attr('checked', false); $('#gd_hardcopy').attr('checked', false)
        $('#gd_hindi').attr('checked', false); $('#gd_eng').attr('checked', false)


        var lt_no = $("#lt_no option:selected").text();

        $.ajax({
            url: '/Form/LoadDetails',
            method: 'GET',
            datatype: 'json',
            data: { 'letter_no': lt_no },
            success: function (response) {

                const d = new Date(response.dated);
                const formattedDate = ("0" + (d.getMonth() + 1)).slice(-2) + '/' + ("0" + d.getDate()).slice(-2) + '/' + d.getFullYear()
                $('#lt_date').val(formattedDate).Date;


                $('#lt_subject').val(response.subject);
                $('#lt_category').val(response.letter_category);

                if (response.letter_language == 'English') { $('#gd_eng').attr('checked', true); $('#gd_hindi').attr('checked', false); }
                else { $('#gd_hindi').attr('checked', true); $('#gd_eng').attr('checked', false); }


                if (response.letter_incoming_mode == 'Email') {
                    $('#gd_email').attr('checked', true); $('#gd_hardcopy').attr('checked', false);
                }
                else {
                    $('#gd_email').attr('checked', false); $('#gd_hardcopy').attr('checked', true);
                }

                $('#lt_remarks').val(response.letter_remarks)

                alert('the letter details have been loaded !!!')

            },
            error: function (xhr, type, exception) { alert("Error" + exception); }
        });
    })

    $('#lt_date').on("click", function() {        
        $('#lt_date').attr("type", "date");
    })


    $('#btn_reset').click(function () {
        window.location.href ='/Form/EditEntry'
    })



    $('#btn_update').click(function (e) {
        e.preventDefault();

        var Letter_Entry_Table = {
            Id: $('#lt_no').val(),
            letter_no: $('#lt_no option:selected').text(),
            dated: $('#lt_date').val(),
            subject: $('#lt_subject').val(),
            letter_category: $('#lt_category').val(),
            letter_language: $("input[name='langGridRadios']:checked").val(),
            letter_incoming_mode: $("[name='modeGridRadios']:checked").val(),
            letter_remarks: $('#lt_remarks').val()
        }
        var addition = { 'lt_ent_table': Letter_Entry_Table }

        $.ajax({
            url: '/Form/EditEntry',
            data: addition,
            type: 'POST',
            cache: false,
            success: function (response) {
                if (response) {
                    alert('Your letter has been updated !!!')
                    window.location.href = '/Form/EditEntry'
                }
                else
                    alert('Error in Controller Action !!!')
            },

            error: function (xhr, type, exception) {
                alert("Error" + exception);
            }

        });
    })


});





