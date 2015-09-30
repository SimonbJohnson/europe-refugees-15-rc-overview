function generateDashboard(data,geom){
    var map = new lg.map('#map').geojson(geom).joinAttr('CNTRY_NAME').zoom(3).center([50,20]);
    var grid = new lg.grid('#grid')
        .data(data)
        .width($('#grid').width())
        .height(1500)
        .nameAttr('Country')
        .joinAttr('JoinAttr')
        .hWhiteSpace(10)
        .vWhiteSpace(10)
        .valuesList(['GDP (millions $ 2014)','Population','Refugee Population 2014','Refugee Population 2014 (%)','National Staff','Volunteers',' RC Income (Swiss Franks)'])
        .margins({top: 200, right: 50, bottom: 20, left: 140});

    lg.init();

    $("#map").width($("#map").width()); 
}

function hxlProxyToJSON(input,headers){
    var output = [];
    var keys=[]
    input.forEach(function(e,i){
        if(headers==true && i==0){
            keys = e;
        } else if(headers==true && i>1) {
            var row = {};
            e.forEach(function(e2,i2){
                row[keys[i2]] = e2;
            });
            output.push(row);
        } else if(headers!=true){
            var row = {};
            e.forEach(function(e2,i2){
                row[keys[i2]] = e2;
            });
            output.push(row);

        }
    });
    return output;
}

function stickydiv(){
    console.log('cehc')
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top){
        $('#map-container').addClass('sticky');
    }
    else{
        $('#map-container').removeClass('sticky');
    }
};

$(window).scroll(function(){
    stickydiv();
});

//load data

var dataCall = $.ajax({ 
    type: 'GET', 
    url: 'http://proxy.hxlstandard.org/data.json?filter_count=7&url=https%3A//docs.google.com/spreadsheets/d/1m3XUjtbLWKEUpUKu4ic16ruDeNj7yuZG2_1Y8U-tvs0/pub%3Fgid%3D0%26single%3Dtrue%26output%3Dcsv&format=html&filter01=&filter02=&filter03=&filter04=&filter05=&filter06=&filter07=&force=1', 
    dataType: 'json',
});

//load geometry

var geomCall = $.ajax({ 
    type: 'GET', 
    url: 'data/geom.geojson', 
    dataType: 'json',
});

//when both ready construct dashboard

$.when(dataCall, geomCall).then(function(dataArgs, geomArgs){
    geom = geomArgs[0];
    var data = hxlProxyToJSON(dataArgs[0],true);
    generateDashboard(data,geom);
});
