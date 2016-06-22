// fetching from local storage
/*var c = new Backbone.Collection();
c.localStorage = new Backbone.LocalStorage("credentials");
c.fetch();

// for sign up
$('.app').on('submit', '.signup-form', function() {
    var subscribe = $.mockjax({
        url: "subscribe",
        responseTime: 1000,
        responseText: "Subscribe"
    });

    $.ajax({
        url: "subscribe",
        success: function(response) {
            $(".signup-form .msg-subscribe").css('display', 'block');
        },
        error: function(response) {
            $(".signup-form .msg-subscribe").css('display', 'none');
        }
    }).done(function(response) {
        $.mockjax.clear(subscribe);
    });
    return false;
});
// for login in 
$('.app').on('submit', '.login-form', function() {
    var username, password, email,userId,passId;
    username = c.pluck('username');
    password = c.pluck('password');
    // for matching user entered email and password with the one stored in storage and passing them to ajax request
    for (var i = 0; i < username.length; i++) {
        if (($('input[name=Username]').val() == username[i]) && ($('input[name=password]').val() == password[i])) {
            userId = username[i];
            passId = password[i];
        }
    }
    var login = $.mockjax({
        url: "login",
        responseTime: 1000,
        responseText: "Credentials Matched",
        data: {
            userval: userId,
            passval: passId
        }
    });

    $.ajax({
        url: "login",
        data: {
            userval: $('input[name=Username]').val(),
            passval: $('input[name=password]').val()
        },
        success: function(response) {
            window.location.href = '/#/list';
            $(".error-msg").css('display', 'none');

        },
        error: function(xhr, ajaxOptions, thrownError) {
            $(".error-msg").css('display', 'block');
        }
    }).done(function(response) {
        $.mockjax.clear(login);
    });

    return false;
});
// for forget password
$('.app').on('submit', '.forget-container', function() {
    var username, password, email,emaildata;
    email = c.pluck('email');
    // for matching user entered email with the one stored in storage
    for (var i = 0; i < email.length; i++) {
        if (($('input[name=email]').val() == email[i])) {
            emaildata = email[i]
        }
    }
    var resetpass = $.mockjax({
        url: "reset",
        responseTime: 1000,
        responseText: "Password Reset",
        data: {
            id: emaildata
        }
    });
    $.ajax({
        url: "reset",
        data: {
            id: $('input[name=email]').val()
        },
        success: function(response) {
            $(".forget-container .msg-resetpass").css('display', 'block');
            $(".forget-container .msg-resetpass-error").css('display', 'none');
        },
        error: function() {
            $(".forget-container .msg-resetpass-error").css('display', 'block');
            $(".forget-container .msg-resetpass").css('display', 'none');
        }
    }).done(function(response) {
        $.mockjax.clear(resetpass);
    });
    return false;
});
// for post-ad 
$('.app').on('submit', '.postad-form', function() {
    var postad = $.mockjax({
        url: "postad",
        responseTime: 1000,
        responseText: "Ad Posted"
    });

    $.ajax({

        url: "postad",
        success: function(response) {
            $(".postad-form .msg-postad").css('display', 'block');
        },
        error: function(response) {
            $(".postad-form .msg-postad").css('display', 'none');
        }
    }).done(function(response) {
        $.mockjax.clear(postad);
    });
    return false;
});
//  for contact-us 
$('.app').on('submit', '.contactus-form', function() {
    var contactus = $.mockjax({
        url: "contactus",
        responseTime: 1000,
        responseText: "Message has been sent successfully"
    });

    $.ajax({

        url: "contactus",
        success: function(response) {
            $(".contactus-form .msg-contactus").css('display', 'block');
        },
        error: function(response) {
            $(".contactus-form .msg-contactus").css('display', 'none');
        }
    }).done(function(response) {
        $.mockjax.clear(contactus);
    });
    return false;
}); */


//for homepage slider
(function($) {
    $.fn.Carousel = function(options) {
        var defaults = {
            slideTransition: 5000, //duration of slide in autoplay
            slideSpeed: 300 //duration of slide on click option
        };

        var carousel = this;
        var options = $.extend({}, defaults, options);
        var pagersList = carousel.find('ul.pagersList li');
        var images = carousel.find('ul.images li.slide');
        var lastElem = pagersList.length - 1; //evaluating last element in pagerlist
        var container = carousel.find('ul.images');
        var imgWidth = 100 / images.length + "%"; //width of single image in percentage
        var carouselWidth = 100 * images.length + "%"; //width of all images in percentage
        var target;

        container.css('width', carouselWidth); //assigning width of all images to carousel container 
        container.find('li').css('width', imgWidth);

        pagersList.first().addClass('selected');

        function sliderResponse(target) {
            container.animate({ 'left': '-' + 100 * target + '%' }, options.slideSpeed);
            pagersList.removeClass('selected').eq(target).addClass('selected');
            if (pagersList.first().hasClass('selected')) {
                carousel.find('.prev').hide();
            } else {
                carousel.find('.prev').show();
            }
            if (pagersList.eq(pagersList.length - 1).hasClass('selected')) {
                carousel.find('.next').hide();
            } else {
                carousel.find('.next').show();
            }
        }

        pagersList.click(function() { //functionality for paging component
            if (!$(this).hasClass('selected')) {
                target = $(this).index();
                sliderResponse(target);
            }
        });

        var nextSlide = function() {
            target = carousel.find('ul.pagersList li.selected').index();
            if (target === lastElem ? target = 0 : target = target + 1) {
                sliderResponse(target);
            }
        }

        carousel.find('.next').click(function() {
            nextSlide();
        });

        var prevSlide = function() {
            target = carousel.find('ul.pagersList li.selected').index();
            if (target) {
                target = target - 1;
                sliderResponse(target);
            }
        }

        carousel.find('.prev').click(function() {
            prevSlide();
        });

        function sliderTiming() {
            target = $('ul.pagersList li.selected').index();
            target === lastElem ? target = 0 : target = target + 1;
            sliderResponse(target);
        }

        var timingRun = setInterval(function() { sliderTiming(); }, options.slideTransition);

        function resetTiming() {
            clearInterval(timingRun);
            timingRun = setInterval(function() { sliderTiming(); }, options.slideTransition);
        }

        carousel.mouseover(function() { //for stopping the auto play option
            if (!$(this).hasClass('stop')) {
                $(this).addClass('stop');
                clearInterval(timingRun);
            };
        });

        carousel.mouseout(function() { //for continuing the auto play option
            if ($(this).hasClass('stop')) {
                $(this).removeClass('stop');
                timingRun = setInterval(function() { sliderTiming(); }, options.slideTransition);
            };
        });
    }
    $("#carousel").Carousel();
})(jQuery);

/**
    @description It shows loading image at the center of the page covering rest of the page with a light gray background.
    @class Loader
    @requires JQuery
 */
var Loader = Loader || (function() {
    var callback, timer;

    function setDisplay(img, background) {
        var width = $('body').width();
        var height = $(window).height();
        var scrollHeight = document.body.scrollHeight;
        var backgroundHeight = typeof scrollHeight !== 'undefined' && scrollHeight > height ? scrollHeight : height;

        background.css({
            'opacity': 0.4,
            'background': '#000',
            'z-index': 99999,
            'position': 'fixed',
            'top': 0,
            'left': 0,
            'right': 0,
            'bottom': 0
        });
    }

    function show() {
        var background = $("<div />").attr("id", "loading_bg");
        var img = $("<div />").attr("id", "loading-fg").addClass("loading-fg");

        setDisplay(img, background);

        background.appendTo($("body")).show();
        img.appendTo($("body")).show();
    }

    $(document).ready(function() {
        
        $(window).bind('resize.loader', Loader.resize);

        window.onorientationchange = function() {
            Loader.resize();
        };
    });

    return /** @lends Loader */ {
        resize: function() {
            var img = $('#loading-fg'),
                background = $('#loading_bg');

            if (img.length && background.length) {
                setDisplay(img, background);
            }
        },
        spin: function(options) {
            if (!options) {
                options = {};
            }
            if (!options.timeout) {
                options.timeout = 25000; // default timeout is 25 sec.
            }

            this.showLoader(options);
        },
        /**
            @description It shows the loader
            @function 
            @param {object} options  timeout, callback can be passed as option in json format. timeout in millis. callback is the function which will executed after timeout.  
            @example  
                options: {timeout:2000, callback: callback function}
        */
        showLoader: function(options) {
            Loader.reset();
            show();
            Loader.setTimer(options);
        },
        /**
            @description It sets timer
            @function 
            @param {object} options  timeout, callback can be passed as option in json format. timeout in millis. callback is the function which will executed after timeout.  
            @example  
                options: {timeout:2000, callback: callback function}
        */
        setTimer: function(options) {
            if (options && options.timeout) {
                if (timer) {
                    window.clearTimeout(timer);
                }
                timer = window.setTimeout(Loader.hideLoader, options.timeout);

                var optCallback = options.callback;
                if (optCallback && (typeof optCallback == 'function')) {
                    callback = optCallback;
                }
            }
        },
        /**
            @description It resets the loader
            @function 
        */
        reset: function() {
            callback = null;
            this.resetTimer();

            Loader.hideLoader();
        },
        resetTimer: function() {
            if (timer) {
                window.clearTimeout(timer);
            }
            timer = null;
        },
        stop: function() {
            this.hideLoader();
        },
        /**
            @description It hides the loader
            @function 
        */
        hideLoader: function() {
            try {
                this.resetTimer();
            } catch (e) {}

            $("#loading_bg, #loading-fg").remove();
            if (callback) {
                callback();
                callback = null;
            }
        }
    };
})();
