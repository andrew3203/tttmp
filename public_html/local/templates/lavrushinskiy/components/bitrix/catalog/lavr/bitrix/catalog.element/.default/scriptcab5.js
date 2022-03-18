$(document).ready(function () {

    $(document).on("click","[data-show_mortgage]",function(e){
        let flat__scheme = $(".flat__scheme").width();

        if(!$(this).hasClass("active")){
            $(this).addClass("active");
            if($("#mortgage_calculator").length ==  0){
                $.ajax({
                    url: "/local/templates/lavrushinskiy/mortgage/mortgage.php",
                    type: "POST"
                }).done(function(data) {
                    if($("html").width()<992){
                        $(".flat__sidebar-lower-action").before(data);
                    }else{
                        $(".flat__scheme").after(data);
                    }
                    $("#mortgage_calculator").slideDown(300);
                    $(".flat__sidebar-lower-action").slideUp(300);

                    setTimeout(function(){
                        $(".credit-calculate.credit-button").click();
                    },30);
                });
            }else{
                $("#mortgage_calculator").slideDown(300);
                $(".flat__sidebar-lower-action").slideUp(300);
            }
            if($("html").width()>992) {
                $(this).css({"transform": "translateX(-46%)"});
            }
        }else{
            $("#mortgage_calculator").slideUp(300);
            $(".flat__sidebar-lower-action").slideDown(300);

            if($("html").width()>992){
                $(this).removeClass("active").css({"transform": "none"});
            }
        }
        return false;
    });
    $(document).on("click","[data-close_mortgage]",function(e){
        e.preventDefault();
        $("#mortgage_calculator").slideUp(300);
        $(".flat__sidebar-lower-action").slideDown(300);
        $("[data-show_mortgage]").removeClass("active").css({"transform": "none"});
    });
    $(document).on("click","[data-show_request_email_form]",function(e){
        e.preventDefault();
        $.fancybox.open( $('#requestEmail'));
    });

    if (getUrlParameter('show_mortgage') === 'Y'){
        $('.js-show-mortgage').click();
    }
});

let getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};



$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        //loop:true,
        margin:10,
        autoHeight:true,
        nav:true,
        dots:true,
        responsive:{
            0:{
                items:1
            }
        }
    });

    $(".flat__plans-sizes").hide();
    $("[data-action='furniture']").on("click",function(e) {
        e.preventDefault();
        $(this).addClass("active");
        $("[data-action='no-furniture']").removeClass("active");
        $(".flat__plans-furniture").show();
        $(".flat__plans-sizes").hide();
    });
    $("[data-action='no-furniture']").on("click",function(e) {
        e.preventDefault();
        $(this).addClass("active");
        $("[data-action='furniture']").removeClass("active");
        $(".flat__plans-furniture").hide();
        $(".flat__plans-sizes").show();
    });

});