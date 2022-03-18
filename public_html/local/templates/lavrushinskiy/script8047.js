$(function () {
    $(document).on("click", ".flats__item-show-detail", function (e) {
        e.preventDefault();
        if($(this).hasClass("active")){
            $(this).removeClass("active");
            $(this).parents(".flats__item").find(".flats__item-detail").slideUp(300);
        }else{
            $(this).parents(".flats__items").find(".flats__item-show-detail").removeClass("active");
            $(this).addClass("active");
            $(".flats__item").find(".flats__item-detail:visible").stop(true, true).hide();
            $(this).parents(".flats__item").find(".flats__item-detail").slideDown(300);
        }
    });
    $(document).on("click", ".--js-sort-button", function () {
        let order = $(this).data('order');
        let sort = $(this).data('sort');

        Cookies.set('flat_order', order);
        Cookies.set('flat_sort', sort);

        let newUrl = $.query.set("order", order).set("sort", sort).toString();
        window.location.replace(newUrl);
    });

    $(document).on("click", "[data-favoriteID]", function () {
        var id = $(this).attr("data-favoriteID");
        var favcount = Number($(".header-phoneblock__favorites span").text());
        $.ajax({
            url: "/flats/ajax.php",
            type: "POST",
            data: { favoriteId: id },
        }).done(function (data) {
            if (data == "add") {
                $("[data-favoriteID='" + id + "']")
                    .children("svg")
                    .addClass("red-icon");
                $(".header-phoneblock__favorites span").text(favcount + 1);
            } else if (data == "del") {
                $("[data-favoriteID='" + id + "']")
                    .children("svg")
                    .removeClass("red-icon");
                $(".header-phoneblock__favorites span").text(favcount - 1);
            }
        });
        return false;
    });

    $(document).on("submit", "#bookFlatForm", function () {
        var form = $(this);
        form.find(".form-result").remove();

        $.ajax({
            url: "/ajax/form.php",
            type: "POST",
            data: form.serialize(),
        }).done(function (data) {
            if (data == "ok") {
                $(".formStyle .container p").html("");
                form.html("");
                form.append('<div class="form-result">Заявка принята!</div>');
            } else {
                form.append(
                    '<div class="form-result error">Ошибка заполнения формы: ' +
                    data +
                    "</div>"
                );
            }
        });
        return false;
    });

    $(".flats__header-item.--list.active").on("click", function () {
        if (!$(".flats__list-filter").is(":visible")) {
            $(".flats__list-block").slideToggle(300);
            $(".flats__list-filter").slideToggle(300);
        }
        if (window.screen.width < 768) {
            return false;
        }
    });
    $("[data-close_filter]").on("click", function () {
        if ($(".flats__list-filter").is(":visible")) {
            $(".flats__list-block").slideToggle(300);
            $(".flats__list-filter").slideToggle(300);
        }
        return false;
    });

    $("[data-open='bookFlat']").on("click", function () {
        let flat = $(this).parents(".flats__item");
        if (flat.length == 0) {
            flat = $(this).parents(".flat__sidebar-info");
        }
        let text = "";
        text = "Добрый день! Я хочу забронировать ";
        flat.find("[data-bookFlat]").each(function () {
            if ($(this).attr("data-bookFlat") == "name") {
                text += $(this).text().trim().replace("Квартира", "Квартиру");
            } /*else { //раскомментировать, если сообщению о квартире все же нужны парамтры
                if($(this).attr("data-bookFlat") == "link"){
                    text += window.location.origin + $(this).attr("href") + "\n";
                    return;
                }
                text += $(this).text().trim() + "\n";
            }*/
            if ($(this).attr("data-bookFlat") == "corpus") {
                text +=
                    " в корпусе «" +
                    $(this).text().trim().replace(" корпус", "") +
                    "» дома с видом на Кремль «Лаврушинский» \n";
            }
        });
        $("#bookFlatForm textarea").text(text);
        $.fancybox.open($("#bookFlat"));
        return false;
    });

    $("[data-open='bookAll']").on("click", function () {
        let flat = $(".flats__item-container");

        if (flat.length === 0) {
            flat = $(this).parents(".flat__sidebar-info");
        }
        let text = "";
        text = "Добрый день! Я хочу забронировать ";

        flat.find("[data-bookFlat]").each(function () {
            if ($(this).attr("data-bookFlat") == "name") {
                text += $(this).text().trim().replace("Квартира", "Квартиру");
            }
            if ($(this).attr("data-bookFlat") == "corpus") {
                text +=
                    " в корпусе «" +
                    $(this).text().trim().replace(" корпус", "") +
                    "» дома с видом на Кремль «Лаврушинский» \n";
            }
        });
        $("#bookFlatForm textarea").text(text);

        $.fancybox.open($("#bookFlat"));
        return false;
    });

    $("*[type=tel]").inputmask("+7 999 999 99 99");

    if(typeof tippy != 'undefined'){
        const mytip = tippy("#bookFlatForm .checkbox-hover-js", {
            content: document.getElementById("checkbox-hover__tooltip").innerHTML,
            allowHTML: !0,
            maxWidth: 700,
            zIndex: 9999999,
            arrow: true,
            interactive: true,
        });
    }


    $(".zakaz_call").on("click", function () {
        $.fancybox.open($("#leadFormWrap"));
        return false;
    });
    //
    // $(".download").on("click", function () {
    //     $.fancybox.open($("#leadFormWrapDownload"));
    //     return false;
    // });

    $(".plan").on("click", function () {
        $.fancybox.open($("#plan"));
        return false;
    });

    $(".js-anchor-link").on("click", function () {
        $(".header-mobile-nav .close.active").click();
    });



    function GetUrlVar() {
        var urlVar = window.location.search;
        var arrayVar = [];
        var valueAndKey = [];
        var resultArray = [];
        arrayVar = (urlVar.substr(1)).split('&');
        if(arrayVar[0]=="") return false;
        var i;
        for (i = 0; i < arrayVar.length; i ++) {
            valueAndKey = arrayVar[i].split('=');
            resultArray[valueAndKey[0]] = valueAndKey[1];
        }
        return resultArray;
    };


    var url_params = GetUrlVar();
    if(url_params.formresult && url_params.formresult=='addok'){
        $.fancybox.open($("#thanks"));
        //window.location.search = '';
        history.pushState(null, null, location.origin+location.pathname);
    }




    const form_callback = document.querySelector(".feedback-form form");

    if(form_callback){
        form_callback.addEventListener("submit", function (e) {
            const phone = document.getElementById("leadFormTel").value;
            const email = document.getElementById("leadFormMail").value;
            const name = document.getElementById("leadFormName").value;

            Comagic.addOfflineRequest(
                {
                    name: name,
                    email: email,
                    phone: phone,
                },
                function (o) {
                    console.log(o);
                }
            );

            console.log(phone, email, name);
        });

    }



    const form_bron = document.querySelector("#bookFlatForm");

    if(form_bron){
        form_bron.addEventListener("submit", function (e) {
            e.preventDefault();
            const phone = document.getElementById("bookFlatFormTel").value;
            const email = document.getElementById("bookFlatFormMail").value;
            const name = document.getElementById("bookFlatFormName").value;

            Comagic.addOfflineRequest(
                {
                    name: name,
                    email: email,
                    phone: phone,
                },
                function (o) {
                    console.log(o);
                }
            );

            console.log(phone, email, name);
        });

    }
});


$('.feedback-form form').bind('submit', function(e) {
    e.preventDefault();
    var error = false;
    var error_text = '';


    if($('.leadFormTel').val().replace(/\s/g, '') === ''){
        error = true;
        error_text += 'Не заполнен номер телефона<br>';
    }
    if($('.leadFormName').val().replace(/\s/g, '') === ''){
        error = true;
        error_text += 'Не заполнено имя<br>';
    }

    if(!$('.leadFormCheck:checked').length){
        error = true;
        error_text += 'Отметье галочкой согласие на обработку своих персональных данных<br>';
    }

    if(error){
        $('.errortext-out').show();
        $('.errortext-out .errortext').html(error_text);
        e.preventDefault();
        return false;
    }else{
        $('.errortext-out').hide();
    }
});



