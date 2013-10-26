$.fn.pureForm = (function (options) {

    var defaultVariables = {
        // Global Variables
        width: 100,
        height: 20,
        padding: 0,

        // File Input Variables
        maxTextWidth: 150,
        closeButton: true,
        text: 'Dosya Seçiniz'

    };

    var v = $.extend(defaultVariables, options);

    return this.each(function () {
        var $this = $(this);
        var objectType = $this.prop('tagName');
        var objectClassName = $this.attr('class');

        if (objectType == 'SELECT') {
            $this.wrap('<span class=' + objectClassName + '><span class="pureInput"></span></span>').attr('class', '');

            // Select Css
            $this.css({
                'width': v.width,
                'height': v.height,
                'opacity': '0',
                'z-index': '2',
                'position': 'absolute',
                'left': '0'
            });

            // Fake Select Css
            $this.parent().css({
                'width': $this.width() + 2 - v.padding * 2,
                'height': $this.height() + 2,
                'padding-left': v.padding,
                'padding-right': v.padding,
                'position': 'absolute',
                'line-height': $this.height() + 2 + 'px'
            }).prepend('<span class="selectedOption">' + $this.val() + '</span>').append('<span class="pureArrow"></span>');

            // Container Element Css
            $this.parents('.' + objectClassName).css({
                'position': 'relative',
                'display': 'inline-block',
                'overflow': 'hidden',
                'width': $this.width() + 2,
                'height': $this.height() + 2
            });

            // Disabled State
            if ($this.attr('disabled') == 'disabled') {
                $this.parent().addClass('disabled');
            }

            // Change Function
            $this.change(function () {
                $this.prev().text($('option:selected', this).text());
            });
        }

        else if (objectType == 'INPUT') {
            var inputType = $this.attr('type');

            if (inputType == 'checkbox') {
                $this.wrap('<span class="' + objectClassName + '"><span class="pureInput"></span></span>').attr('class', '');

                // Checkbox Css
                $this.css({
                    'width': v.width,
                    'height': v.height,
                    'margin': '0',
                    'padding': '0',
                    'opacity': '0'
                });

                // Fake Checkbox Css
                $this.parent().css({
                    'width': $this.width(),
                    'height': $this.height(),
                    'position': 'absolute'
                });

                // Container Element Css
                $this.parents('.' + objectClassName).css({
                    'width': $this.width(),
                    'height': $this.height(),
                    'position': 'relative',
                    'display': 'inline-block',
                    'overflow': 'hidden'
                });

                // Checkbox Control
                if ($this.is(':checked')) $this.parent().addClass('checked');
                else $this.parent().addClass('non-checked');

                // Disabled State
                if ($this.attr('disabled') == 'disabled') {
                    if ($this.is(':checked')) { $this.parent().removeClass().addClass('checked-disabled'); }
                    else { $this.parent().removeClass().addClass('non-checked-disabled'); }
                }

                // Checkbox Change Function
                $this.change(function () {
                    if ($(this).is(':checked')) { $this.parent().removeClass('non-checked').addClass('checked');; }
                    else { $this.parent().removeClass('checked').addClass('non-checked'); }
                });
            }

            if (inputType == 'radio') {

                $this.wrap('<span class="' + objectClassName + '"><span class="pureRadioInput"></span></span>').attr('class', '');

                // Radio Css
                $this.css({
                    'width': v.width,
                    'height': v.height,
                    'margin': '0',
                    'padding': '0',
                    'opacity': '0'
                });

                // Fake Radio Css
                $this.parent().css({
                    'width': $this.width(),
                    'height': $this.height(),
                    'position': 'absolute'
                });

                // Container Element Css
                $this.parents('.' + objectClassName).css({
                    'width': $this.width(),
                    'height': $this.height(),
                    'position': 'relative',
                    'display': 'inline-block',
                    'overflow': 'hidden'
                });

                // Radio Control
                if ($this.is(':checked')) { $this.parent().addClass('active').removeClass('deactive'); }
                else { $this.parent().addClass('deactive').removeClass('active'); }

                // Radio Change Function
                $this.change(function () {
                    $('input[name="' + $this.attr('name') + '"]').parent().removeClass('active').addClass('deactive');
                    if ($this.is(':checked')) { $this.parent().removeClass('deactive').addClass('active'); }
                });
            }

            if (inputType == 'file') {

                $this.wrap('<span class="' + objectClassName + '"><span class="pureFileInput"></span> <span class="pureFileText" title=""></span></span>').attr('class', '');

                // File Css
                $this.css({
                    'width': v.width,
                    'height': v.height,
                    'margin': '0',
                    'padding': '0',
                    'opacity': '0',
                    'z-index': '3',
                    'position': 'relative'
                });

                // Fake File Css
                $this.parent().css({
                    'width': $this.width(),
                    'height': $this.height(),
                    'float': 'left',
                    'overflow': 'hidden',
                    'position': 'relative'
                }).addClass('non-selected').prepend('<a class="RemoveFileBtn">x</a>');

                // Path Css
                $this.parent().next().css({
                    'width': v.maxTextWidth,
                    'height': 'auto',
                    'float': 'left',
                    'overflow': 'hidden',
                    'text-overflow': 'ellipsis',
                    'white-space': 'nowrap',
                    'z-index': '2',
                    'cursor': 'default'
                }).html(v.text);;

                // Container Element Css
                $this.parents('.' + objectClassName).css({
                    'width': 'auto',
                    'position': 'relative',
                    'display': 'inline-block'
                });

                // File Name Click -> Open File Up Box
                $this.parent().next().click(function () {
                    $this.click();
                });

                // Remove File Button Function
                $this.prev().on("click", function () {
                    $this.replaceWith($this = $this.clone(true));
                    $this.parent().removeClass('selected').addClass('non-selected');
                    $this.parent().next().html(v.text).attr('title', v.text);
                    $this.prev().hide();
                }).css({
                    'width': '12px',
                    'height': '12px',
                    'position': 'absolute',
                    'top': '0',
                    'right': '0',
                    'background': 'red',
                    'color': '#FFF',
                    'font': '12px/11px Tahoma',
                    'text-align': 'center',
                    'z-index': '4',
                    'cursor': 'pointer',
                    'display': 'none'
                });

                // Remove File Button True&False Control
                if (v.closeButton == false) {
                    $this.prev().remove();
                }

                // Change Function
                $this.change(function () {
                    $this.parent().next().html(v.text);
                    var fileName = $this.val().replace(/C:\\fakepath\\/i, '');
                    $this.parent().next().html(fileName).attr('title', fileName);
                    $this.parent().removeClass('non-selected').addClass('selected');
                    $this.prev().show();
                    if (fileName == '') {
                        $this.parent().removeClass('selected').addClass('non-selected');
                        $this.parent().next().html(v.text);
                        $this.prev().hide();
                    }
                });
            }
        }
    });

});
