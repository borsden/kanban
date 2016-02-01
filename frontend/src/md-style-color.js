// Директива для добавления возможности изменения цвета любых элементов
angular.module('Kanban')
    .directive('mdStyleColor', ['$mdTheming', '$mdColorPalette',
        function ($mdTheming, $mdColorPalette) {
            return {
                restrict: 'A',
                scope: {
                    mdStyleColor: '@',
                    mdStyleColorAttrs: '@',
                    mdStyleTheme: '@'
                },
                link: function (scope, element, attrs) {
                    var _theme;
                    if (scope.mdStyleTheme != undefined && $mdTheming.THEMES[scope.mdStyleTheme]) {
                        _theme = $mdTheming.THEMES[scope.mdStyleTheme]
                    }
                    else {
                        _theme = $mdTheming.THEMES['default']
                    }
                    var themeColors = _theme.colors;

                    var hueR = 'hue-1';    // 'hue-1'
                    var colorR = 'primary';  // 'warn'


                    var addCss = function (color) {
                        if (color != undefined && color.length > 2) {
                            var split = color.split('.');
                            hueR = split[1] || 'default';    // 'default'
                            colorR = split[0] || 'primary';  // 'warn'
                        }
                        // Absolute color: 'orange'
                        var colorA = themeColors[colorR] ?
                            themeColors[colorR].name : colorR;

                        // Absolute Hue: '500'
                        var hueA =
                            themeColors[colorR] ?
                            themeColors[colorR].hues[hueR] || hueR :
                                hueR;

                        var colorValue = $mdColorPalette[colorA][hueA] ?
                            $mdColorPalette[colorA][hueA].value :
                            $mdColorPalette[colorA]['500'].value;

                        if (scope.mdStyleColorAttrs != undefined) {

                            element.css(scope.mdStyleColorAttrs, 'rgb(' + colorValue.join(',') + ')');
                        }
                        else {
                            element.css('color', 'rgb(' + colorValue.join(',') + ')');
                        }
                    };
                    addCss();
                    attrs.$observe('mdStyleColor', function (value) {
                        addCss(value)
                    });
                }
            }

        }
    ])
;