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



    $('#lt_no').change(function () {

    });

});





