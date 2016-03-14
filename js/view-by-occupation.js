// data
var occupation_data;
var regions_data;
var occ_map;

// do stuff when the page loads
(function(){

    initialize();
    
})()



function initialize(){

    $.when($.getJSON('data/merged_regions_simplified.geojson'), $.get('data/occupation_data.csv')).then(function(geojson, csv){

        regions_data = geojson
        occupation_data = _.map(
            $.csv.toObjects(csv[0]),
            function(row) {
                return {
                    geography_name: row.geography_name,
                    geography_type: row.geography_type,
                    job_family: cleanOccupation(row.job_family),
                    occupation: cleanOccupation(row.occupation),
                    demand_sum: parseInt(row.demand_entry_he)+parseInt(row.demand_entry_fe)+parseInt(row.demand_entry_sl),
                    demand_ticker: row.demand_ticker,
                    demand_entry_he: parseInt(row.demand_entry_he),
                    demand_entry_fe: parseInt(row.demand_entry_fe),
                    demand_entry_sl: parseInt(row.demand_entry_sl),
                    reg_salary: parseInt(row.reg_salary),
                    he_opportunity_score: parseInt(row.he_opportunity_score),
                    fe_opportunity_score: parseInt(row.fe_opportunity_score),
                    lq: row.lq,
                    lq_label: row.lq_label
                };
            }
        );

        //merge location and job data
        var current_occupation;
        var occupation_list = [];
        $.each(occupation_mapping, function(key, value) {occupation_list.push(String(key))});

        $.each(occupation_list, function(k_index, occ) {
            current_occupation = _.where(occupation_data, {occupation: occ});
            $.each(current_occupation, function(j_index, job){
                
                // populate regions 
                $.each(regions_data[0]['features'], function(r_index, region){
                    if (region.properties['JOB_REGION'] == job['geography_name']) {
                        addDataToLocation(region, occ, job);
                    }
                });

                // populate LEPs 
                $.each(lep_locations['features'], function(l_index, lep){
                    if (lep.properties['lep'] == job['geography_name']) {
                        addDataToLocation(lep, occ, job);
                    }
                });
            });
        });

        // if($.address.parameter("location_type") && $.address.parameter("location")){
        //     updateLocation(decodeURIComponent($.address.parameter("location_type")), decodeURIComponent($.address.parameter("location")))
        // }
        // else{
        //     updateLocation('Country', 'UK Total')
        // }

        // TO DO: populate select menu w/ regions & leps

        var $control_pane = $('#control-pane');
        $control_pane.on('click', '.option-occ', function() {
            updateLocation($(this).attr('data'));
            return false;
        });


        MapsLib.initialize();

    });
}

// helper function for stuffing data into GeoJSON object
function addDataToLocation(location, occ, job){
    if (typeof location.properties['jobs_data'] === 'undefined')
        location.properties['jobs_data'] = {};
    location.properties['jobs_data'][occ] = {};
    location.properties['jobs_data'][occ]['lq'] = job['lq'];
    location.properties['jobs_data'][occ]['lq_label'] = job['lq_label'];
    location.properties['jobs_data'][occ]['demand_sum'] = job['demand_sum'];
    location.properties['jobs_data'][occ]['demand_ticker'] = job['demand_ticker'];
    location.properties['jobs_data'][occ]['reg_salary'] = job['reg_salary'];
    location.properties['jobs_data'][occ]['fe_opportunity_score'] = job['fe_opportunity_score'];
    location.properties['jobs_data'][occ]['he_opportunity_score'] = job['he_opportunity_score'];
    location.properties['jobs_data'][occ]['fe_opportunity_level'] = job['fe_opportunity_level'];
    location.properties['jobs_data'][occ]['he_opportunity_level'] = job['he_opportunity_level'];
}

function updateOccupation(occupation_name){

    var place_data = _.where(occupation_data, {occupation: occupation_name})


    // TO DO: update control pane

    // if(geo_display_name == "The United Kingdom"){
    //     $("#current-location-name").html('<span id="default-location">'+geo_display_name+'</span>')
    // }
    // else if(geo_display_name.length>32){
    //     $("#current-location-name").html('<small>'+geo_display_name+'</small>')
    // }
    // else{
    //     $("#current-location-name").html(geo_display_name)
    // }



    // TO DO: update breadcrumbs
    // var $breadcrumbs = $('#breadcrumbs');

    // $breadcrumbs.html("<span id='helper-location'><i class='fa fa-fw fa-hand-o-left'></i> Change location to explore occupations elsewhere</span>")
    // var breadcrumb_links = makeBreadcrumbLinks(geo_name)
    // if(breadcrumb_links.length){
    //     $breadcrumbs.html("")
    //     $.each(breadcrumb_links, function(index, value){
    //         $breadcrumbs.append(value+' &raquo; ')
    //     });
    // }



    // TO DO: populate chart
}



function cleanOccupation(text) {
    // replace 'and' w/ '&'
    return text.replace(/\b[a|A]nd\b/, '&');
}