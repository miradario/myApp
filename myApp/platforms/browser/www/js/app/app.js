var app = {

    default_page: "main",

    initialize: function(){
        this.bindEvents();
    },
    
    bindEvents: function(){
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function(){
         StatusBar.overlaysWebView(false);
    },

    showPage: function(p){
        var next_page = $("#"+p);
        var prev_page = $(".current-page");

        if (next_page.length == 0) {
            return false;
        }
        prev_page.removeClass("current-page");
        next_page.addClass("current-page");
        pages[p]();
    }
};

$(document).on("pageinit", "#info-page", function () {


    //set up string for adding <li/>
    var li = "";
    //container for $li to be added
    $.each(meditations, function (i, meditation) {
        //add the <li> to "li" variable
        //note the use of += in the variable
        //meaning I'm adding to the existing data. not replacing it.
        //store index value in array as id of the <a> tag
        li += '<li><a href="#" data-transition="slide" id="' + i + '" class="info-go"><img src="img/medit.jpeg"><h2>'+meditation.name+'</h2><p>'+meditation.desc+'</p></a></li>';
    });
    //append list to ul
    $("#prof-list").append(li).promise().done(function () {
        //wait for append to finish - thats why you use a promise()
        //done() will run after append is done
        //add the click event for the redirection to happen to #details-page
        $(this).on("click", ".info-go", function (e) {
            e.preventDefault();
            //store the information in the next page's data
            $("#details-page").data("info", meditations[this.id]);
            //change the page # to second page. 
            //Now the URL in the address bar will read index.html#details-page
            //where #details-page is the "id" of the second page
            //we're gonna redirect to that now using changePage() method
            $.mobile.changePage("#details-page",{transition:"slide"});
        });

        //refresh list to enhance its styling.
        $(this).listview("refresh");
    });
});

$(document).on("pagebeforeshow", "#details-page", function () {
    //get from data - you put this here when the "a" wa clicked in the previous page
    var info = $(this).data("info");
    //string to put HTML in
    // var info_view = "";
    // //use for..in to iterate through object
    // for (var key in info) {
    //     //Im using grid layout here.
    //     //use any kind of layout you want.
    //     //key is the key of the property in the object 
    //     //if obj = {name: 'k'}
    //     //key = name, value = k
    //     info_view += '<div class="ui-grid-a"><div class="ui-block-a"><div class="ui-bar field" style="font-weight : bold; text-align: left;">' + key + '</div></div><div class="ui-block-b"><div class="ui-bar value" style="width : 75%">' + info[key] + '</div></div></div>';
    // }
    //add this to html
    $(this).find("[data-role=img-medit]").attr('src',info['image']);
    $(this).find("[data-role=title-medit]").html(info['name']);
    $(this).find("[data-role=desc-medit]").html(info['desc']);
    $(this).find("[data-role=dur-medit]").html(info['duration']);
});

var meditations = [{
    "id": 0,
        "name": "Sonido Primordial",
        "desc": "Técnica de meditación basada en mantras, enraizada en la tradición védica de la India",
        "duration": "20 min",
        "image": "img/medit.jpeg",
        "link": "Handshake"
}, {
    "id": 1,
        "name": "Vipassana",
        "desc": "Se conoce a menudo como meditación del “insight” y permite ver las cosas como realmente son",
        "duration": "1hr 30 min",
        "image": "img/medit.jpeg",
        "link": "Handshake"
}, {
     "id": 2,
        "name": "Trascendental",
        "desc": "Su origen se remonta a la antigua India y cada persona se le da un mantra personal empleado por cualidades vibracionales para ayudar a calmar la mente",
        "duration": "50 min",
        "image": "img/medit.jpeg",
        "link": "Handshake"
}];