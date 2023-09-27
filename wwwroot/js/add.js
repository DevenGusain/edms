﻿$(document).ready(function () {
    $.ajax({
        url: '/Add/ListCategory',
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

    $('#submit').click(function (e) {
        e.preventDefault()

        var LetterCategory = {
            category: $('#lt_cat').val(),  
            orderNo: $('#ord_num').val()
        }

        var addition = { 'lt_category': LetterCategory }

        $.ajax({
            url: '/Add/SubmitCategory',           
            data: addition,            
            type: 'POST',
            cache: false,
            success: function (response) {
                if (response) {
                    alert('The category has been added !!!')
                    window.location.href ='/Add/AddLetterCategory'
                }
                else {
                    alert('Nothing to display');
                }
            },
            error: function (xhr, type, exception) {
                alert("Error" + exception);
            }
        })

    })


});


