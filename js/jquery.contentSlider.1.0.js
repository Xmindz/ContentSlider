/*  jQuery Image/Content slider by Deepu 
    v 1.0
    My first ever jQuery plugin. This is a simple content slider with the feature to add/remove sliding items dynamically.
    I tried to be abide by the rules as directed by jQuery.com
    Date created: 10:29 AM 13/07/2011
*/
(function ($) {

    var settings = {
        next: '#btnNext',
        prev: '#btnPrev',
        slider: 'ul',
        item: 'li',
        easing: 'easeOutQuad',
        itemsperPage: 8,
        slideAmount: 3,
        index: 0,
        itemWidth: 0,
        itemCount: 0,
        totalWidth: 0,
        pageWidth: 0
    };

    var methods = {
        nextClicked: function () {

            var target = $(this).data('target');
            settings = target.data('settings'); // Wuhooooooo!!

            
            var newLeft = 0;
            var slideAmt = settings.slideAmount;
            var index = settings.index;
            var itemWidth = settings.itemWidth;
            var itemCount = settings.itemCount;
            var totalWidth = settings.totalWidth;
            var pageWidth = settings.pageWidth;

            if (itemCount > (index + settings.itemsperPage)) {
                slideAmt = ((index + slideAmt + settings.itemsperPage) > itemCount) ? (itemCount - index - settings.itemsperPage) : slideAmt;
                methods.slideBy.apply(target, [slideAmt]);
            }

        },
        prevClicked: function () {

            var target = $(this).data('target');
            settings = target.data('settings');

            
            var newLeft = 0;
            var slideAmt = settings.slideAmount;

            var index = settings.index;
            var itemWidth = settings.itemWidth;
            var itemCount = settings.itemCount;
            var totalWidth = settings.totalWidth;
            var pageWidth = settings.pageWidth;

            if (index > 0) {

                slideAmt = ((index - slideAmt) < 0) ? index : slideAmt;
                methods.slideBy.apply(target, [-slideAmt]);
            }
        },
        init: function (options) {
            return $(this).each(function () {
                $.extend(settings, options);

                $(settings.slider, $(this)).queue("fx");
                //this.prevClicked = ;

                $(settings.next).data('target', $(this));
                $(settings.prev).data('target', $(this));

                $(settings.next).click(methods.nextClicked);
                $(settings.prev).click(methods.prevClicked);
                $(this).data('settings', settings);

                methods.refresh.apply(this, arguments);
            });
        },
        refresh: function () {

            settings = $(this).data('settings');

            var index = settings.index;
            var itemWidth = settings.itemWidth;
            var itemCount = settings.itemCount;
            var totalWidth = settings.totalWidth;
            var pageWidth = settings.pageWidth;

            itemWidth = $(settings.item, $(this)).width();
            itemCount = $(settings.item, $(this)).length;
            totalWidth = itemCount * itemWidth;
            pageWidth = itemWidth * settings.itemsperPage;

            $(settings.slider, $(this)).width(totalWidth);
            $(this).width(pageWidth);

            settings.itemWidth = itemWidth;
            settings.itemCount = itemCount;
            settings.totalWidth = totalWidth;
            settings.pageWidth = pageWidth;


            // Forward
            if (itemCount <= (index + settings.itemsperPage)) {
                $(settings.next).addClass('disabled');
                $(settings.next).removeAttr('href');
            }
            else {
                $(settings.next).removeClass('disabled');
                $(settings.next).attr('href', 'javascript:void(0);');

            }

            // Backward
            if (index <= 0) {
                $(settings.prev).addClass('disabled');
                $(settings.prev).removeAttr('href');
            } else {
                $(settings.prev).attr('href', 'javascript:void(0);');
                $(settings.prev).removeClass('disabled');
            }

            return $(this);
        },
        moveNext: function () {

        },
        slideBy: function (delta) {

            settings = $(this).data('settings');
            var target = $(this);
            var newLeft = 0;
            var slideAmt = settings.slideAmount;

            var index = settings.index;
            var itemWidth = settings.itemWidth;
            var itemCount = settings.itemCount;
            var totalWidth = settings.totalWidth;
            var pageWidth = settings.pageWidth;

            if (delta < 0) {
                delta = ((index + delta) < 0) ? index : delta;

            }
            else {
                delta = ((index + delta + settings.itemsperPage) > itemCount) ? (itemCount - index - settings.itemsperPage) : delta;
            }
            index += delta;

            settings.index = index;

            newLeft = -(itemWidth * index);
            $(this).data('settings', settings);

            $(settings.slider, target).animate({ 'left': newLeft }, 800, settings.easing, function () {

                methods.refresh.apply(target, arguments);
            });

        }
    };

    $.fn.contentSlider = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if ((typeof (method === 'object')) || !method) {
            return methods.init.apply(this, arguments);
        }
        return this;
    };
})(jQuery);
