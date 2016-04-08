
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
                    fontSize: '9px',
                    color: '#bdc3c7'
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
                var xpos = this.chart.plotWidth-160
                var ypos = Math.max(120, point.plotY)+40 // keep tooltip below legend
                var ypos = Math.min(this.chart.plotHeight-80, ypos) // keep tooltip above bottom of chart
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
                stacking: 'normal'
            },
            series: {
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
                            hideHelperOcc();
                            selectOccupation(categories[this.x], place_data);
                        }
                    }
                }
            }
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            x: -10,
            verticalAlign: 'top',
            y: 150,
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
                stacking: 'normal'
            },
            series: {
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
                        color: '#e2be7c'
                    }
                },
                point: {
                    events: {
                        click: function () {
                            hideHelperOcc();
                            selectOccupation(categories[this.x], place_data);
                        },
                        mouseOver: function () {
                            triggerHoverScatter(categories[this.x]);
                        },
                        mouseOut: function () {
                            removeHoverScatter();
                        }
                    }
                }

            }
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            x: -20,
            verticalAlign: 'top',
            y: 50,
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

