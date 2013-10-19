$.fn.pureForm = (function(options) {

    var defaultVariables = {
        dropDownWidth: 100,
        dropDownHeight: 20,
        dropDownPadding: 0,
        
        checkBoxWidth: 14,
        checkBoxHeight: 14,
        
        radioWidth: 14,
        radioHeight:14
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
                'width': v.dropDownWidth,
                'height': v.dropDownHeight,
                'opacity': '0',
                'z-index': '2',
                'position': 'absolute',
                'left':'0'
            });
            
            // Fake Select Css
            $this.parent().css({
                'width': $this.width() + 2 - v.dropDownPadding * 2,
                'height': $this.height() + 2,
                'padding-left': v.dropDownPadding,
                'padding-right': v.dropDownPadding,
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
                $this.wrap('<span class="' + objectClassName + '"><span class="pureInput"></span></span>').attr('class','');
                
                // Checkbox Css
                $this.css({
                    'width': v.checkBoxWidth,
                    'height': v.checkBoxHeight,
                    'margin':'0',
                    'padding': '0',
                    'opacity':'0'
                });
                
                // Fake Checkbox Css
                $this.parent().css({
                    'width': $this.width(),
                    'height': $this.height(),
                    'position':'absolute'
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
                    $this.parent().removeClass().addClass('disabled');
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
                    'width': v.radioWidth,
                    'height': v.radioHeight,
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
        }
    });

});
