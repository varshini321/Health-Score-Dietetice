$(function() {
    function e() {
        if (typeof cookie_not_handle_user_settings != "undefined" && cookie_not_handle_user_settings == true) {
            return
        }
        if ($.cookie("sidebar-collapsed") == "true") {
            $("#sidebar").addClass("sidebar-collapsed")
        	$('.navbar-brand span').hide();
        	$('.navbar-brand').css('width','42px');
        }
        else
        {
        	$('.navbar-brand span').show();
        	$('.navbar-brand').css('width','250px');
        }

        if ($.cookie("sidebar-fixed") == "true") {
            $("#sidebar").addClass("sidebar-fixed")
        }
        if ($.cookie("navbar-fixed") == "true") {
            $("#navbar").addClass("navbar-fixed")
        }
        var e = $.cookie("skin-color");
        var t = $.cookie("sidebar-color");
        var n = $.cookie("navbar-color");
        if (e !== undefined) {
            $("body").addClass("skin-" + e)
        }
        if (t !== undefined) {
            $("#main-container").addClass("sidebar-" + t)
        }
        if (n !== undefined) {
            $("#navbar").addClass("navbar-" + n)
        }
    }
    e();
    $("a[href^=#]").click(function(e) {
        e.preventDefault()
    });
    $(".nice-scroll, .slimScroll").slimScroll({
        touchScrollStep: 30
    });
    var t = $(".memento-nav .dropdown-toggle > .fa-bell + .badge");
    if ($(t).length > 0 && parseInt($(t).html()) > 0) {
        $(".memento-nav .dropdown-toggle > .fa-bell").addClass("anim-swing")
    }
   var t = $(".memento-nav .dropdown-toggle > .fa-envelope + .badge");
    if ($(t).length > 0 && parseInt($(t).html()) > 0) {
        $(".memento-nav .dropdown-toggle > .fa-envelope").addClass("anim-top-down")
    }
    $(".show-tooltip").tooltip({
        container: "body",
        delay: {
            show: 500
        }
    });
    $(".show-popover").popover();
    window.prettyPrint && prettyPrint();
    var n = function() {
        if ($("#sidebar.sidebar-fixed").size() == 0) {
            $("#sidebar .nav").css("height", "auto");
            return
        }
        if ($("#sidebar.sidebar-fixed.sidebar-collapsed").size() > 0) {
            $("#sidebar .nav").css("height", "auto");
            return
        }
        var e = $(window).height() - 90;
        $("#sidebar.sidebar-fixed .nav").slimScroll({
            height: e + "px",
            position: "left"
        })
    };
    n();
    $("#sidebar a.dropdown-toggle").click(function() {
        var e = $(this).next(".submenu");
        var t = $(this).children(".arrow");
        if (t.hasClass("fa-angle-right")) {
            t.addClass("anim-turn90")
        } else {
            t.addClass("anim-turn-90")
        }
        e.slideToggle(400, function() {
            if ($(this).is(":hidden")) {
                t.attr("class", "arrow fa fa-angle-right")
            } else {
                t.attr("class", "arrow fa fa-angle-down")
            }
            t.removeClass("anim-turn90").removeClass("anim-turn-90")
        })
    });
    $("#sidebar.sidebar-collapsed #sidebar-collapse > i").attr("class", "fa fa-angle-double-right");
    $("#sidebar-collapse").click(function() {
        $("#sidebar").toggleClass("sidebar-collapsed");
        if ($("#sidebar").hasClass("sidebar-collapsed")) {
        	$('.navbar-brand span').hide();
        	$('.navbar-brand').css('width','42px');
            $("#sidebar-collapse > i").attr("class", "fa fa-angle-double-right");
            $.cookie("sidebar-collapsed", "true");
            $("#sidebar ul.nav-list").parent(".slimScrollDiv").replaceWith($("#sidebar ul.nav-list"))
        } else {
        	$('.navbar-brand span').show();
        	$('.navbar-brand').css('width','250px');
            $("#sidebar-collapse > i").attr("class", "fa fa-angle-double-left");
            $.cookie("sidebar-collapsed", "false");
            n()
        }
    });
    $("#sidebar").on("show.bs.collapse", function() {
        if ($(this).hasClass("sidebar-collapsed")) {
            $(this).removeClass("sidebar-collapsed")
        }
    });
    $("#sidebar .search-form").click(function() {
        $('#sidebar .search-form input[type="text"]').focus()
    });
    $("#sidebar .nav > li.active > a > .arrow").removeClass("fa-angle-right").addClass("fa-angle-down");
    if ($("#nav-horizontal")) {
        var r = function() {
            var e = $(window).width();
            if (e > 979) {
                $("#nav-horizontal").removeClass("nav-xs");
                $("#nav-horizontal .arrow").removeClass("fa-angle-right").removeClass("fa-angle-down").addClass("fa-caret-down")
            } else {
                $("#nav-horizontal").addClass("nav-xs");
                $("#nav-horizontal .arrow").removeClass("fa-caret-down").addClass("fa-angle-right")
            }
        };
        $(window).resize(function() {
            r()
        });
        r()
    }
    $("#nav-horizontal a.dropdown-toggle").click(function() {
        var e = $(this).next(".dropdown-menu");
        var t = $(this).children(".arrow");
        if ($("#nav-horizontal.nav-xs").size() > 0) {
            if (t.hasClass("fa-angle-right")) {
                t.addClass("anim-turn90")
            } else {
                t.addClass("anim-turn-90")
            }
        }
        if ($("#nav-horizontal.nav-xs").size() == 0) {
            $("#nav-horizontal > li > .dropdown-menu").not(e).slideUp(400)
        }
        e.slideToggle(400, function() {
            if ($("#nav-horizontal.nav-xs").size() > 0) {
                if ($(this).is(":hidden")) {
                    t.attr("class", "arrow fa fa-angle-right")
                } else {
                    t.attr("class", "arrow fa fa-angle-down")
                }
                t.removeClass("anim-turn90").removeClass("anim-turn-90")
            }
        })
    });
    $("#theme-setting > a").click(function() {
        $(this).next().animate({
            width: "toggle"
        }, 500, function() {
            if ($(this).is(":hidden")) {
                $("#theme-setting > a > i").attr("class", "fa fa-gears fa-2x")
            } else {
                $("#theme-setting > a > i").attr("class", "fa fa-times fa-2x")
            }
        });
        $(this).next().css("display", "inline-block")
    });
    $("#theme-setting ul.colors a").click(function() {
        var e = $(this).parent().get(0);
        var t = $(e).parent().get(0);
        var n = $(t).data("target");
        var r = $(t).data("prefix");
        var i = $(this).attr("class");
        var s = new RegExp("\\b" + r + ".*\\b", "g");
        $(t).children("li").removeClass("active");
        $(e).addClass("active");
        if ($(n).attr("class") != undefined) {
            $(n).attr("class", $(n).attr("class").replace(s, "").trim())
        }
        $(n).addClass(r + i);
        if (n == "body") {
            var o = $(t).parent().get(0);
            var u = $(o).nextAll("li:lt(2)");
            $(u).find("li.active").removeClass("active");
            $(u).find("a." + i).parent().addClass("active");
            $("#navbar").attr("class", $("#navbar").attr("class").replace(/\bnavbar-.*\b/g, "").trim());
            $("#main-container").attr("class", $("#main-container").attr("class").replace(/\bsidebar-.*\b/g, "").trim())
        }
        $.cookie(r + "color", i)
    });
    var i = ["blue", "red", "green", "orange", "yellow", "pink", "magenta", "gray", "black"];
    $.each(i, function(e, t) {
        if ($("body").hasClass("skin-" + t)) {
            $("#theme-setting ul.colors > li").removeClass("active");
            $("#theme-setting ul.colors > li:has(a." + t + ")").addClass("active")
        }
    });
    $.each(i, function(e, t) {
        if ($("#navbar").hasClass("navbar-" + t)) {
            $('#theme-setting ul[data-prefix="navbar-"] > li').removeClass("active");
            $('#theme-setting ul[data-prefix="navbar-"] > li:has(a.' + t + ")").addClass("active")
        }
        if ($("#main-container").hasClass("sidebar-" + t)) {
            $('#theme-setting ul[data-prefix="sidebar-"] > li').removeClass("active");
            $('#theme-setting ul[data-prefix="sidebar-"] > li:has(a.' + t + ")").addClass("active")
        }
    });
    if ($("#sidebar").hasClass("sidebar-fixed")) {
        $('#theme-setting > ul > li > a[data-target="sidebar"] > i').attr("class", "fa fa-check-square-o green")
    }
    if ($("#navbar").hasClass("navbar-fixed")) {
        $('#theme-setting > ul > li > a[data-target="navbar"] > i').attr("class", "fa fa-check-square-o green")
    }
    $("#theme-setting > ul > li > a").click(function() {
        var e = $(this).data("target");
        var t = $(this).children("i");
        if (t.hasClass("fa-square-o")) {
            t.attr("class", "fa fa-check-square-o green");
            $("#" + e).addClass(e + "-fixed");
            $.cookie(e + "-fixed", "true")
        } else {
            t.attr("class", "fa fa-square-o");
            $("#" + e).removeClass(e + "-fixed");
            $.cookie(e + "-fixed", "false")
        }
        if (e == "sidebar") {
            if (t.hasClass("fa-square-o")) {
                $("#sidebar ul.nav-list").parent(".slimScrollDiv").replaceWith($("#sidebar ul.nav-list"))
            }
            n()
        }
    });
    $(".box .box-tool > a").click(function(e) {
        if ($(this).data("action") == undefined) {
            return
        }
        var t = $(this).data("action");
        var n = $(this);
        switch (t) {
            case "collapse":
                $(n).children("i").addClass("anim-turn180");
                $(this).parents(".box").children(".box-content").slideToggle(500, function() {
                    if ($(this).is(":hidden")) {
                        $(n).children("i").attr("class", "fa fa-chevron-down")
                    } else {
                        $(n).children("i").attr("class", "fa fa-chevron-up")
                    }
                });
                break;
            case "close":
                $(this).parents(".box").fadeOut(500, function() {
                    $(this).parent().remove()
                });
                break;
            case "config":
                $("#" + $(this).data("modal")).modal("show");
                break
        }
        e.preventDefault()
    });
    $(".mail-messages .msg-collapse > a").click(function(e) {
        $(this).children("i").addClass("anim-turn180");
        $(this).parents("li").find(".mail-msg-container").slideToggle(500, function() {
            var e = $(this).parents("li").find(".msg-collapse > a").children("i");
            if ($(this).is(":hidden")) {
                $(e).attr("class", "fa fa-chevron-down")
            } else {
                $(e).attr("class", "fa fa-chevron-up")
            }
        })
    });
    $(".mail-content i.fa-star").click(function() {
        $(this).toggleClass("starred")
    });
    $('.mail-toolbar > li:first-child > input[type="checkbox"]').change(function() {
        var e = false;
        if ($(this).is(":checked")) {
            e = true
        }
        $(this).parents(".mail-content").find('.mail-list .ml-left > input[type="checkbox"]').prop("checked", e);
        var t = $(this).parents(".mail-content").find(".mail-list > li");
        if (e) {
            $(t).addClass("checked")
        } else {
            $(t).removeClass("checked")
        }
    });
    $('.mail-list .ml-left > input[type="checkbox"]').change(function() {
        if ($(this).is(":checked")) {
            $(this).parents("li").addClass("checked")
        } else {
            $(this).parents("li").removeClass("checked")
        }
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $("#btn-scrollup").fadeIn()
        } else {
            $("#btn-scrollup").fadeOut()
        }
    });
    $("#btn-scrollup").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false
    });
    if ($(".tile-active").size() > 0) {
        var s = 1500;
        var o = 5e3;
        var u = function(e, t, n, r) {
            $(e).children(".tile").animate({
                top: "-=" + r + "px"
            }, s);
            setTimeout(function() {
                a(e, t, n, r)
            }, n + s)
        };
        var a = function(e, t, n, r) {
            $(e).children(".tile").animate({
                top: "+=" + r + "px"
            }, s);
            setTimeout(function() {
                u(e, t, n, r)
            }, t + s)
        };
        $(".tile-active").each(function(e, t) {
            var n, r, i, s, a;
            n = $(this).children(".tile").first();
            r = $(this).children(".tile").last();
            i = $(n).data("stop");
            s = $(r).data("stop");
            a = $(n).outerHeight();
            if (i == undefined) {
                i = o
            }
            if (s == undefined) {
                s = o
            }
            setTimeout(function() {
                u(t, i, s, a)
            }, i)
        })
    }
    $('.table > thead > tr > th:first-child > input[type="checkbox"]').change(function() {
        var e = false;
        if ($(this).is(":checked")) {
            e = true
        }
        $(this).parents("thead").next().find('tr > td:first-child > input[type="checkbox"]').prop("checked", e)
    });
    $('.table > tbody > tr > td:first-child > input[type="checkbox"]').change(function() {
        var e = false;
        if ($(this).is(":checked")) {
            e = true
        }
        if (!e) {
            $('.table > thead > tr > th:first-child > input[type="checkbox"]').prop("checked", false)
        }
    });
    if (jQuery().dataTable) {
        $("#table1").dataTable({
            aLengthMenu: [
                [10, 15, 25, 50, 100, -1],
                [10, 15, 25, 50, 100, "All"]
            ],
            iDisplayLength: 10,
            oLanguage: {
                sLengthMenu: "_MENU_ Records per page",
                sInfo: "_START_ - _END_ of _TOTAL_",
                sInfoEmpty: "0 - 0 of 0",
                oPaginate: {
                    sPrevious: "Prev",
                    sNext: "Next"
                }
            },
            aoColumnDefs: [{
                bSortable: false,
                aTargets: [0]
            }]
        })
    }
    if (jQuery().chosen) {
        $(".chosen").chosen({
            no_results_text: "Oops, nothing found!",
            width: "100%"
        });
        $(".chosen-with-diselect").chosen({
            allow_single_deselect: true,
            width: "100%"
        })
    }
    if (jQuery().pwstrength) {
        $('input[data-action="pwindicator"]').pwstrength()
    }
    if (jQuery().bootstrapDualListbox) {
        $('select[data-action="duallistbox"]').bootstrapDualListbox()
    }
    if (jQuery().colorpicker) {
        $(".colorpicker-default").colorpicker({
            format: "hex"
        });
        $(".colorpicker-rgba").colorpicker()
    }
    if (jQuery().timepicker) {
        $(".timepicker-default").timepicker();
        $(".timepicker-24").timepicker({
            minuteStep: 1,
            showSeconds: true,
            showMeridian: false
        })
    }
    if (jQuery().datepicker) {
        $(".date-picker").datepicker()
    }
    if (jQuery().daterangepicker) {
        $(".date-range").daterangepicker()
    }
    if (jQuery().wysihtml5) {
        $(".wysihtml5").wysihtml5()
    }
    if (jQuery().validate) {
        var f = function(e) {
            $(e).closest(".form-group").removeClass("has-success")
        };
        var l = $("#validation-form").validate({
            errorElement: "span",
            errorClass: "help-block",
            errorPlacement: function(e, t) {
                if (t.parent(".input-group").length) {
                    e.insertAfter(t.parent())
                } else {
                    e.insertAfter(t)
                }
            },
            focusInvalid: false,
            ignore: "",
            invalidHandler: function(e, t) {},
            highlight: function(e) {
                $(e).closest(".form-group").removeClass("has-success").addClass("has-error")
            },
            unhighlight: function(e) {
                $(e).closest(".form-group").removeClass("has-error");
                setTimeout(function() {
                    f(e)
                }, 3e3)
            },
            success: function(e) {
                e.closest(".form-group").removeClass("has-error").addClass("has-success")
            }
        })
    }
    if (jQuery().prettyPhoto) {
        $(".gallery a[rel^='prettyPhoto']").prettyPhoto({
            social_tools: "",
            hideflash: true
        })
    }
})