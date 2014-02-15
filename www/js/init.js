$(function(){
        console.log('init.js loaded.');
        console.log($('input[data-id=navbtn]').length);
        $('input[data-id=navbtn]').on("click", function () {
                console.log('navbtn clicked');
                $('#globalpanel').panel('toggle');
        });
});