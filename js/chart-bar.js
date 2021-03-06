
function stackedBarHelper(prepped_data, categories, place_data){
    var config = {
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: categories,
            tickWidth: 0,
            labels: {
                formatter: function () {
                    return shortenName(this.value);
                },
                style: {
                    fontSize: '10px',
                    color: '#bdc3c7',
                    textOverflow: 'none'
                },
                x: -6
            },
            lineColor: '#eee'
        },
        yAxis: {
            min: 0,
            gridLineWidth: 0,
            endOnTick: false,
            title: {
                text: 'Entry-level job openings',
                style: {
                    color: '#bdc3c7'
                }
            },
            labels: {
                formatter: function () {
                   return numberWithCommas(this.value);
                },
                style: {
                    color: '#bdc3c7',
                    fontSize: '9px',
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(236, 240, 241, .85)',
            style: {
                color: '#3B4B5C',
            },
            useHTML: true,
            headerFormat: '<table><tr><th colspan="2">{point.x}</th></tr>',
            pointFormat:  '<tr><td>{series.name}:</td><td style="text-align:right;">{point.y:,.0f}</td></tr>',
            footerFormat: '</table>',
            shared: true,
            positioner: function (boxWidth, boxHeight, point) {
                var xpos = this.chart.plotWidth-60
                var ypos = Math.max(120, point.plotY)+30 // distance from top
                var ypos = Math.min(this.chart.plotHeight-165, ypos) // distance from bottom
                return { x: xpos, y: ypos };
            },
            shadow: false,
            borderColor: '#3B4B5C'
        },
        series: prepped_data
    };

    var mobile_extras = {
        chart: {
            type: 'bar',
            backgroundColor: 'transparent'
        },
        plotOptions: {
            bar: {
                stacking: 'normal',
            },
            series: {
                pointWidth: 25,
                borderColor: '#3B4B5C',
                cursor: 'pointer',
                pointPadding: 0,
                groupPadding: .1,
                states: {
                    select: {
                        borderColor: '#3B4B5C',
                        color: "#FBAB18"
                    },
                    hover: {
                        enabled: false
                    }
                },
                point: {
                    events: {
                        click: function () {
                            selectOccupation(categories[this.x], place_data);
                        },
                    }
                }
            },
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            x: 0,
            verticalAlign: 'bottom',
            y: -60,
            floating: true,
            backgroundColor: '#4e5d6c',
            borderWidth: 0,
            shadow: false,
            itemStyle: {
                color: '#ecf0f1',
                fontWeight: 400
            },
            itemHoverStyle: {
                color: '#fff'
            },
            itemHiddenStyle: {
                color: '#1d2a38'
            },
            title: {
                text: 'Click to hide or show',
                style: {
                    fontSize: '9px',
                    color: '#bdc3c7',
                    fontWeight: 400,
                }
            }
        }
    }
    var mobile_config = $.extend(mobile_extras, config);

    var deskop_extras = {
        chart: {
            type: 'bar',
            backgroundColor: 'transparent',
            zoomType: 'y',
        },
        plotOptions: {
            bar: {
                stacking: 'normal',
            },
            series: {
                pointPadding: 0.1,
                groupPadding: 0,
                pointWidth: 25,
                borderColor: '#3B4B5C',
                cursor: 'pointer',
                states: {
                    select: {
                        borderColor: '#3B4B5C',
                        color: "#FBAB18"
                    },
                },
                point: {
                    events: {
                        click: function () {
                            selectOccupation(categories[this.x], place_data);
                        },
                        mouseOver: function () {
                            triggerHoverScatter(categories[this.x]);
                            highlightOccGroupIcon(categories[this.x]);
                        },
                        mouseOut: function () {
                            removeHoverScatter();
                            removeHighlightOccGroupIcon();
                        },
                    }
                }
            }
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            x: 0,
            verticalAlign: 'bottom',
            y: -60,
            floating: true,
            backgroundColor: '#4e5d6c',
            borderWidth: 0,
            shadow: false,
            itemStyle: {
                color: '#ecf0f1',
                fontWeight: 400
            },
            itemHoverStyle: {
                color: '#fff'
            },
            itemHiddenStyle: {
                color: '#1d2a38'
            },
            title: {
                text: 'Click to hide or show',
                style: {
                    fontSize: '9px',
                    color: '#bdc3c7',
                    fontWeight: 400,
                }
            }
        }
    }
    var desktop_config = $.extend(deskop_extras, config);

    $('#bar-demand').highcharts(desktop_config);
    $('#bar-demand-mobile').highcharts(mobile_config);
};

