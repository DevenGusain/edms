///////////  For Marking the Entries  /////////////////////


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


    ////////////////load all officers////////////////
    $.ajax({
        url: '/Form/load_employee',
        async: true,
        type: 'GET',
        success: function (response) {
            var markup ="";
            for (var i = 0; i < response.length; i++) {
                //markup += "<div class='form-check'><input class='form-check-input' type='checkbox' id = '" + response[i].Value + "' name='" + response[i].Value + "'> <label class='form-check-label' for='" + response[i].Value + "'>" + reponse[i].Text + "</label> </div >"                                

                markup += "<input class='form-check-input' type='checkbox' id='chkbox_" + response[i].value + "'> <label class='form-check-label' for='chkbox_" + response[i].value + "'>" + response[i].text + "</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            }
            $('#check_box_group').html(markup);
        },
        error: function (xhr, type, exception) { alert("Error" + exception); }
    });





    /////////////////////////////////////////////////



});



    


    

   
    





