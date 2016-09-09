$(function() {
  function inIframe () {
		try {
			return window.self !== window.top;
		} catch (e) {
			return true;
		}
	}
	if (inIframe()) {
		document.write("Load from https://fastpokemap.se<br/>Load from https://fastpokemap.se<br/>Load from https://fastpokemap.se<br/>Load from https://fastpokemap.se<br/>Load from https://fastpokemap.se<br/>Load from https://fastpokemap.se<br/>");
	}
});

var pokemonPNG = [];
var myPokeControl;
var trackingEnabled = false;
var shownMarker = [];
var cookiedelimchar = 'x';

var tempPoly = [[28.103070259094242,-26.00989258640274],[28.10804843902588,-25.99126237511028],[28.11538696289063,-25.972590628875288],[28.13834667205811,-25.965491501227756],[28.158988952636722,-25.975098370470747],[28.15727233886719,-26.002140000279837],[28.121953010559086,-26.02740151905132]];
var mkPoly = [];

for(var i = 0; i < tempPoly.length; i++) {
	mkPoly.push([tempPoly[i][1], tempPoly[i][0]]);
}

var PokemonIdList={"BULBASAUR":1,"IVYSAUR":2,"VENUSAUR":3,"CHARMANDER":4,"CHARMELEON":5,"CHARIZARD":6,"SQUIRTLE":7,"WARTORTLE":8,"BLASTOISE":9,"CATERPIE":10,"METAPOD":11,"BUTTERFREE":12,"WEEDLE":13,"KAKUNA":14,"BEEDRILL":15,"PIDGEY":16,"PIDGEOTTO":17,"PIDGEOT":18,"RATTATA":19,"RATICATE":20,"SPEAROW":21,"FEAROW":22,"EKANS":23,"ARBOK":24,"PIKACHU":25,"RAICHU":26,"SANDSHREW":27,"SANDSLASH":28,"NIDORAN_FEMALE":29,"NIDORINA":30,"NIDOQUEEN":31,"NIDORAN_MALE":32,"NIDORINO":33,"NIDOKING":34,"CLEFAIRY":35,"CLEFABLE":36,"VULPIX":37,"NINETALES":38,"JIGGLYPUFF":39,"WIGGLYTUFF":40,"ZUBAT":41,"GOLBAT":42,"ODDISH":43,"GLOOM":44,"VILEPLUME":45,"PARAS":46,"PARASECT":47,"VENONAT":48,"VENOMOTH":49,"DIGLETT":50,"DUGTRIO":51,"MEOWTH":52,"PERSIAN":53,"PSYDUCK":54,"GOLDUCK":55,"MANKEY":56,"PRIMEAPE":57,"GROWLITHE":58,"ARCANINE":59,"POLIWAG":60,"POLIWHIRL":61,"POLIWRATH":62,"ABRA":63,"KADABRA":64,"ALAKAZAM":65,"MACHOP":66,"MACHOKE":67,"MACHAMP":68,"BELLSPROUT":69,"WEEPINBELL":70,"VICTREEBEL":71,"TENTACOOL":72,"TENTACRUEL":73,"GEODUDE":74,"GRAVELER":75,"GOLEM":76,"PONYTA":77,"RAPIDASH":78,"SLOWPOKE":79,"SLOWBRO":80,"MAGNEMITE":81,"MAGNETON":82,"FARFETCHD":83,"DODUO":84,"DODRIO":85,"SEEL":86,"DEWGONG":87,"GRIMER":88,"MUK":89,"SHELLDER":90,"CLOYSTER":91,"GASTLY":92,"HAUNTER":93,"GENGAR":94,"ONIX":95,"DROWZEE":96,"HYPNO":97,"KRABBY":98,"KINGLER":99,"VOLTORB":100,"ELECTRODE":101,"EXEGGCUTE":102,"EXEGGUTOR":103,"CUBONE":104,"MAROWAK":105,"HITMONLEE":106,"HITMONCHAN":107,"LICKITUNG":108,"KOFFING":109,"WEEZING":110,"RHYHORN":111,"RHYDON":112,"CHANSEY":113,"TANGELA":114,"KANGASKHAN":115,"HORSEA":116,"SEADRA":117,"GOLDEEN":118,"SEAKING":119,"STARYU":120,"STARMIE":121,"MR_MIME":122,"SCYTHER":123,"JYNX":124,"ELECTABUZZ":125,"MAGMAR":126,"PINSIR":127,"TAUROS":128,"MAGIKARP":129,"GYARADOS":130,"LAPRAS":131,"DITTO":132,"EEVEE":133,"VAPOREON":134,"JOLTEON":135,"FLAREON":136,"PORYGON":137,"OMANYTE":138,"OMASTAR":139,"KABUTO":140,"KABUTOPS":141,"AERODACTYL":142,"SNORLAX":143,"ARTICUNO":144,"ZAPDOS":145,"MOLTRES":146,"DRATINI":147,"DRAGONAIR":148,"DRAGONITE":149,"MEWTWO":150,"MEW":151};

var pokemonNames={1:'Bulbasaur',2:'Ivysaur',3:'Venusaur',4:'Charmander',5:'Charmeleon',6:'Charizard',7:'Squirtle',8:'Wartortle',9:'Blastoise',10:'Caterpie',11:'Metapod',12:'Butterfree',13:'Weedle',14:'Kakuna',15:'Beedrill',16:'Pidgey',17:'Pidgeotto',18:'Pidgeot',19:'Rattata',20:'Raticate',21:'Spearow',22:'Fearow',23:'Ekans',24:'Arbok',25:'Pikachu',26:'Raichu',27:'Sandshrew',28:'Sandslash',29:'Nidoran F',30:'Nidorina',31:'Nidoqueen',32:'Nidoran M',33:'Nidorino',34:'Nidoking',35:'Clefairy',36:'Clefable',37:'Vulpix',38:'Ninetales',39:'Jigglypuff',40:'Wigglytuff',41:'Zubat',42:'Golbat',43:'Oddish',44:'Gloom',45:'Vileplume',46:'Paras',47:'Parasect',48:'Venonat',49:'Venomoth',50:'Diglett',51:'Dugtrio',52:'Meowth',53:'Persian',54:'Psyduck',55:'Golduck',56:'Mankey',57:'Primeape',58:'Growlithe',59:'Arcanine',60:'Poliwag',61:'Poliwhirl',62:'Poliwrath',63:'Abra',64:'Kadabra',65:'Alakazam',66:'Machop',67:'Machoke',68:'Machamp',69:'Bellsprout',70:'Weepinbell',71:'Victreebel',72:'Tentacool',73:'Tentacruel',74:'Geodude',75:'Graveler',76:'Golem',77:'Ponyta',78:'Rapidash',79:'Slowpoke',80:'Slowbro',81:'Magnemite',82:'Magneton',83:'Farfetch\'d',84:'Doduo',85:'Dodrio',86:'Seel',87:'Dewgong',88:'Grimer',89:'Muk',90:'Shellder',91:'Cloyster',92:'Gastly',93:'Haunter',94:'Gengar',95:'Onix',96:'Drowzee',97:'Hypno',98:'Krabby',99:'Kingler',100:'Voltorb',101:'Electrode',102:'Exeggcute',103:'Exeggutor',104:'Cubone',105:'Marowak',106:'Hitmonlee',107:'Hitmonchan',108:'Lickitung',109:'Koffing',110:'Weezing',111:'Rhyhorn',112:'Rhydon',113:'Chansey',114:'Tangela',115:'Kangaskhan',116:'Horsea',117:'Seadra',118:'Goldeen',119:'Seaking',120:'Staryu',121:'Starmie',122:'Mr. Mime',123:'Scyther',124:'Jynx',125:'Electabuzz',126:'Magmar',127:'Pinsir',128:'Tauros',129:'Magikarp',130:'Gyarados',131:'Lapras',132:'Ditto',133:'Eevee',134:'Vaporeon',135:'Jolteon',136:'Flareon',137:'Porygon',138:'Omanyte',139:'Omastar',140:'Kabuto',141:'Kabutops',142:'Aerodactyl',143:'Snorlax',144:'Articuno',145:'Zapdos',146:'Moltres',147:'Dratini',148:'Dragonair',149:'Dragonite',150:'Mewtwo',151:'Mew',};
var filterdict = {};
var isLoading = false;

var repeaterGogo = false;
var retryLimit = 10;
var repeater;
var nextScan;

L.HtmlIcon = L.Icon.extend({
    options: {},

    initialize: function(options) {
        L.Util.setOptions(this, options);
    },

    createIcon: function() {
        var div = document.createElement('div');
        if(this.options.hide) {
            div.innerHTML =
                '<div class="displaypokemon hidden" data-pokeid="' + this.options.pokemonid  + '">' +
                '<div class="pokeimg">' +
                '<img src="data:image/png;base64,' + pokemonPNG[this.options.pokemonid] + '" />' +
                '</div>' +
                '<div class="remainingtext" data-expire="' + this.options.expire + '"></div>' +
                '</div>';
        } else {
            div.innerHTML =
                '<div class="displaypokemon" data-pokeid="' + this.options.pokemonid  + '">' +
                '<div class="pokeimg">' +
                '<img src="data:image/png;base64,' + pokemonPNG[this.options.pokemonid] + '" />' +
                '</div>' +
                '<div class="remainingtext" data-expire="' + this.options.expire + '"></div>' +
                '</div>';
        }
/*         var displaypokemonDiv = $(div).find('.displaypokemon');
        displaypokemonDiv.tooltip({
            title: pokemonNames[this.options.pokemonid] + '<br>Despawns in ' +
                '<span class=\'remainingtext-tooltip\' data-expire=\'' + this.options.expire + '\'></span>',
            trigger: 'hover focus click',
            html: true
        });
        displaypokemonDiv.on('shown.bs.tooltip', function() {
            calculateRemainingTime(this.parentNode.querySelector('.remainingtext-tooltip'));
        }); */

        return div;
    },

    createShadow: function() {
        return null;
    }
});

var map;

function deleteDespawnedPokemon() {
    var j;
    for (j in shownMarker) {
        var active = shownMarker[j].active;
        var expire = shownMarker[j].expire;
        var now = Date.now();
        if (active == true && expire <= now) {
            map.removeLayer(shownMarker[j].marker);
            shownMarker[j].active = false;
        }
    }
}

function createPokeIcon(pokemonid, timestamp, filtered) {
    return new L.HtmlIcon({
        pokemonid: pokemonid,
        expire: timestamp,
        hide: filtered
    });
}


function loadCache(cp) { //Loads cache around object
    $.getJSON("https://cache.fastpokemap.se/?key=" + window.fingerprint + "&ts=" + window.salt + "&compute=undefined&lat=" + cp.lat + "&lng=" + cp.lng, function(data) {

        if (data.length >= 1) {

            var i = 0;
            var spawn = {};

            for (i in data) {
                var cachedSpawn = data[i];
                spawn.encounter_id = cachedSpawn.encounter_id;
                spawn.latitude = cachedSpawn.lnglat.coordinates[1];
                spawn.longitude = cachedSpawn.lnglat.coordinates[0];
                spawn.pokemon_id = cachedSpawn.pokemon_id;
                spawn.expiration_timestamp_ms = new Date(cachedSpawn.expireAt).getTime();
                cachedSpawn.expiration_timestamp_ms = new Date(cachedSpawn.expireAt).getTime();
                addPokemonToMap(spawn);

				checkForRare(cachedSpawn, true, false, spawn.latitude, spawn.longitude);
            }
        }
    });
}

var throttledLoadCache = _.throttle(loadCache, 5000);

function addPokemonToMap(spawn) {
    var j;
    var toAdd = true;
    for (j in shownMarker) {
        if (shownMarker[j].id == spawn.encounter_id) {
            toAdd = false;
            break
        }
    }
    if (toAdd) {
        var cp = new L.LatLng(spawn.latitude, spawn.longitude);
        var pokeid = PokemonIdList[spawn.pokemon_id];
        var filtered = false;
        if(parseInt(pokeid) in filterdict) {
            filtered = true;
        }
        var pokeMarker = new L.marker(cp, {
            icon: createPokeIcon(pokeid, spawn.expiration_timestamp_ms, filtered)
        });
        shownMarker.push({
            marker: pokeMarker,
            expire: spawn.expiration_timestamp_ms,
            id: spawn.encounter_id,
            active: true
        });
        map.addLayer(pokeMarker);
        pokeMarker.setLatLng(cp);
    }
}

var isScanning = false;

function getPokemon(lat, lng) {
	var retryCount = 0;

	var ajaxCall = {
        dataType: "json",
        url: "https://api.fastpokemap.se/?key=" + window.fingerprint + "&ts=" + window.salt + "&lat=" + lat + "&lng=" + lng,
        success: function (data) {
			if (data.error && data.error == "overload") {
                retryCount++;
                if (retryCount < retryLimit) {
                    $.ajax(ajaxCall);
                    return;
                } else {
                    $(".scan").prop("disabled", false);
                    var curstatus = 'failed';
                    isScanning = false;
                    var currfailure = (new Date).getTime();
                    $('.scan').data("failid", currfailure);
                    $('.scan').removeClass('active').addClass(curstatus); // Add statuscolor to scanbutton
                    setTimeout(function() {
                        if($('.scan').data("failid") == currfailure) { //make sure the status color of the last failure will always last 1.5s
                            $('.scan').removeClass(curstatus);
                            currfailure = null;
                        }
                    }, 1500); // Hide status color after 1,5 seconds
                }
			}

            $(".scan").prop("disabled", false);
            isScanning = false;

            /*Scanning button animation*/
            status = 'success';
            $('.scan').removeClass('active').addClass(status); // Add statuscolor to scanbutton
            setTimeout(function() {
                $('.scan').removeClass(status);
            }, 1500); // Hide status color after 1,5 seconds
            /*End animation section*/

            $(".nearby").html('<h3>NEARBY</h3>');

            if (data && data.result && data.result.length >= 1) {
                var i;
                var bufferRadar = '<h3>NEARBY</h3>';
                var foundNearbyPokemon = false;
                for (i in data.result) {
                    var spawn = data.result[i];
                    if (spawn.spawn_point_id != undefined) {
                        if (spawn.expiration_timestamp_ms <= 0)
                            spawn.expiration_timestamp_ms = Date.now() + 930000;
                        addPokemonToMap(spawn);
                    } else if (spawn.lure_info != undefined) {
                        spawn.encounter_id = spawn.lure_info.encounter_id;
                        spawn.pokemon_id = spawn.lure_info.active_pokemon_id;
                        spawn.expiration_timestamp_ms = spawn.lure_info.lure_expires_timestamp_ms;
                        addPokemonToMap(spawn);
                    } else {
                        foundNearbyPokemon = true;
                        bufferRadar += '<div data-zone="' + spawn.zone + '" class="pokemon"><img src="data:image/png;base64,' + pokemonPNG[PokemonIdList[spawn.pokemon_id]] + '" /></div>';
                    }
                }
                $(".nearby").html(bufferRadar);
            }
            if (foundNearbyPokemon) {
                $(".nearby").show();
            } else {
                $(".nearby").hide();
            }

        },
		error : function( xhr, status ) {
            retryCount++;
            if (retryCount < retryLimit) {
                $.ajax(ajaxCall);
                return;
            } else {
                $(".scan").prop("disabled", false);
                var curstatus = 'failed';
                isScanning = false;
                var currfailure = (new Date).getTime();
                $('.scan').data("failid", currfailure);
                $('.scan').removeClass('active').addClass(curstatus); // Add statuscolor to scanbutton
                setTimeout(function() {
                    if($('.scan').data("failid") == currfailure) { //make sure the status color of the last failure will always last 1.5s
                        $('.scan').removeClass(curstatus);
                        currfailure = null;
                    }
                }, 1500); // Hide status color after 1,5 seconds
            }

		},
        timeout: 30000
    };

	$.ajax(ajaxCall);
}

function getPokemon2(lat, lng) {
	var retryCount = 0;

	var ajaxCall = {
        dataType: "json",
        url: "https://api.fastpokemap.se/?key=" + window.fingerprint + "&ts=" + window.salt + "&lat=" + lat + "&lng=" + lng,
        success: function (data) {
			if (data.error && data.error == "overload") {
                retryCount++;
                if (retryCount < retryLimit) {
                    $.ajax(ajaxCall);
                    return;
                }
			}

			var foundNearbyPokemon = false;
            if (data && data.result && data.result.length >= 1) {
                var i;
                for (i in data.result) {
                    var spawn = data.result[i];

                    if (spawn.spawn_point_id != undefined) {
                        if (spawn.expiration_timestamp_ms <= 0)
                            spawn.expiration_timestamp_ms = Date.now() + 930000;
                        addPokemonToMap(spawn);
                    } else if (spawn.lure_info != undefined) {
                        spawn.encounter_id = spawn.lure_info.encounter_id;
                        spawn.pokemon_id = spawn.lure_info.active_pokemon_id;
                        spawn.expiration_timestamp_ms = spawn.lure_info.lure_expires_timestamp_ms;
                        addPokemonToMap(spawn);
                    } else {
                        foundNearbyPokemon = true;
					}

					checkForRare(spawn, false, foundNearbyPokemon, lat, lng);

                }
            }

        },
		error : function(xhr, status ) {
			retryCount++;
			if (retryCount < retryLimit) {
				$.ajax(ajaxCall);
				return;
			}

		},
        timeout: 30000
    };

	$.ajax(ajaxCall);
}

var nearbyForm;
function DrawS2(S2ID) {
	var S2 = window.S2.S2;
	var latlng = S2.idToLatLng("" + S2ID + "");
	var cell = S2.S2Cell.FromLatLng(latlng, 15);
	var corner = cell.getCornerLatLngs();
	var arrayLatLng = [];
	arrayLatLng.push(new L.LatLng(corner[0].lat, corner[0].lng));
	arrayLatLng.push(new L.LatLng(corner[1].lat, corner[1].lng));
	arrayLatLng.push(new L.LatLng(corner[2].lat, corner[2].lng));
	arrayLatLng.push(new L.LatLng(corner[3].lat, corner[3].lng));
    if (nearbyForm != undefined) {
		map.removeLayer(nearbyForm);
	}
    nearbyForm = new L.polygon(arrayLatLng);
	map.addLayer(nearbyForm);
}

function findCoordinate(addr) {
    $.getJSON("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?text=" + addr + "&f=json", function(data) {
        $("#locationBtn").prop("disabled", false);
        $("#locationBtn").html('<span class="glyphicon glyphicon-search" aria-hidden="true"></span>');
        if (data.locations && data.locations[0] && data.locations[0].feature && data.locations[0].feature && data.locations[0].feature.geometry) {
            $('.window').removeClass('show');
            $('.nearby, .left, .center, .right').removeClass('hidden');
            var lat = data.locations[0].feature.geometry.y;
            var lng = data.locations[0].feature.geometry.x;
            var resultLatLng = new L.LatLng(lat, lng);
            window.location.hash = (lat + "," + lng)
            map.setView(resultLatLng, 16);
            marker.setLatLng(resultLatLng);
            circle.setLatLng(resultLatLng);
            throttledLoadCache(resultLatLng);
        } else {
            alert("Couldn't find location... Be less specific");
        }
    });
}

function onLocationFound(event) {
    var cp = new L.LatLng(event.latlng.lat, event.latlng.lng);
    marker.setLatLng(cp);
    circle.setLatLng(cp);
    map.setView(cp);
    throttledLoadCache(cp);

    if(!isScanning) {
        if(!$('.scan').hasClass('active')) {
            $('.scan').removeClass('success').removeClass('failed').addClass('active'); // Start spinning
        }
        $(".scan").prop("disabled", true);
        isScanning = true;
        getPokemon(cp.lat, cp.lng);
        doAdditionalScans(cp);
    }
}

function initmap() {

	map = L.map('map').setView([centerLocation[0], centerLocation[1]], 15);
    //var osmUrl = 'https://jmakarkklfrvdvg.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
    var osmUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
    //var osmUrl = 'https://tiles.getwemap.com/osm_tiles/{z}/{x}/{y}.png'
    var osm = new L.TileLayer(osmUrl, {
        minZoom: 2,
        maxZoom: 18
    });

    map.addLayer(marker);
    //map.addLayer(osm);
    map.addLayer(circle);
    var gl = L.mapboxGL({
		accessToken: "fpm-map",
		style: 'fpm-style.json'
	});
	gl.addTo(map);

    var credits = L.control.attribution().addTo(map);
    //credits.addAttribution('&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors');
    credits.addAttribution('Powered by Esri, HERE, DeLorme, NGA, USGS');

    map.on("click", function(event) {
        var lat = event.latlng.lat;
        var lng = event.latlng.lng;
        var cp = new L.LatLng(lat, lng);
        try {
            window.location.hash = (lat + "," + lng);
            marker.setLatLng(cp);
            if(!isScanning) {
                $(".scan").prop("disabled", true);
                isScanning = true;
                if(!$('.scan').hasClass('active')) {
                    $('.scan').removeClass('success').removeClass('failed').addClass('active'); // Start spinning
                }
                circle.setLatLng(cp);
                getPokemon(cp.lat, cp.lng);
				doAdditionalScans(cp);
            }
        } catch (e) {
            //Pressing enter fires this on some browser...
        }
        throttledLoadCache(cp);
    });
    map.on("dblclick", function(event) {
        var cp = new L.LatLng(event.latlng.lat, event.latlng.lng);
        marker.setLatLng(cp);
        circle.setLatLng(cp);

    });
    map.locate({
        setView: true,
        maxZoom: 16
    });
    map.on('locationfound', onLocationFound);

    if (mkPoly && mkPoly.length > 0) {
    	polygon = L.polygon(mkPoly).addTo(map);
	}


}

function autoTrack() { //does this not do anything?
    if (trackingEnabled)
        map.locate({
            setView: true,
            maxZoom: 16
        });
}

function component(x, v) {
    return Math.floor(x / v);
}

function calculateRemainingTime(element) {
    var $element = $(element);
    var ts = ($element.data("expire") / 1000 | 0) - (Date.now() / 1000 | 0);
    var minutes = component(ts, 60) % 60,
        seconds = component(ts, 1) % 60;
    if (seconds < 10)
        seconds = '0' + seconds;
    $element.html(minutes + ":" + seconds);
}

function updateTime() {
    deleteDespawnedPokemon();
    $(".remainingtext, .remainingtext-tooltip").each(function() {
        calculateRemainingTime(this);
    });
}

function parseHash(hash) {
    var defaultLat = "-26.009699742208735";
    var defaultLng = "28.115172386169437";
    var match = /^#(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/.exec(hash);
    if (!match) {
        return [defaultLat, defaultLng];
    }
    return [match[1], match[3]];
}

var marker;
var circle;
var polygon;

/* iPhone (not homescreen) Ads fix */               /* <------- NEW!!! */
var iphoneheight = (window.navigator.userAgent.indexOf('iPhone') != -1 && window.navigator.standalone == false) ? "68px" : "0px";
$("#map").css('height', 'calc(100vh - ('+iphoneheight+' + 100px))');

/* Start iPhone Homescreen fix */
if (window.navigator.userAgent.indexOf('iPhone') != -1 && window.navigator.standalone == true) {
    $('body').addClass('homescreen'); // iPhone site added to homescreen as Webapp (because of the navigationbars are hidden then)
}
/* End iPhone Homescreen fix */

$(function() {
    $('.nearby').hide(); //Hide nearby box
    $('#menu').slicknav({ label: '' }); //Start Slicknav
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        $('.slicknav_menu').prepend('<div class="message">Get <strong><a href="https://goo.gl/CzM9bc">GoChat for iOS</a></strong> and chat with <br />nearby trainers while scanning!</div>');
    } else if (/(android)/i.test(navigator.userAgent)) {
        $('.slicknav_menu').prepend('<div class="message">Get <strong><a href="https://goo.gl/HhBwtt">GoChat for Android</a></strong> and chat <br />with nearby trainers while scanning!</div>');
    }

    embedHtml();

    /* Populate filter list */
    var reversedPokemonNames = _.invert(pokemonNames);
    var orderedPokemonNames = {}
    Object.keys(reversedPokemonNames).sort().forEach(function(key) {
      orderedPokemonNames[key] = reversedPokemonNames[key];
    });
    var filterhtml = "";
    for (var name in orderedPokemonNames) {
        var id = orderedPokemonNames[name];
        var filtertag = 'filter-' + id;
        filterhtml += '<div class="filteritem"><input type=checkbox name="' + id + '" id="' + filtertag + '" /><label for="' + filtertag + '">' + name + '</label></div>';
    }
    $(".inner-filter").html(filterhtml);

    /* Load filterdict */
    var filtercookie = Cookies.get('filter');
    if (filtercookie) {
        var filterlist = filtercookie.split(cookiedelimchar);
        filterdict = {};
        for (var i in filterlist){
            filterdict[filterlist[i]] = true;
        }
    }

    $.get("https://gist.githubusercontent.com/anonymous/50c284e815df6c81aa53497a305a29f2/raw", function(data) { //Init map
        var pokemons = data.split("\n");
        var i;
        for (i in pokemons) {
            var pokemondata = pokemons[i].split(":");
            if (pokemondata.length == 2) {
                pokemonPNG[pokemondata[0]] = pokemondata[1];
            };
        }

        //Get map starting coordinates
        var parsedLatLng = parseHash(window.location.hash);
        var startLatLng = new L.LatLng(parsedLatLng[0], parsedLatLng[1]);

        //Set up map
        marker = new L.marker(startLatLng, {
            draggable: true
        });
        circle = new L.circle(startLatLng, 60);
        marker.on("drag", function(e) {
            circle.setLatLng(e.latlng);
        });
        initmap();
        map.setView(startLatLng, 16);

        L.DomEvent.disableClickPropagation($('.scan')[0]);
        L.DomEvent.disableClickPropagation($('.search')[0]);
        L.DomEvent.disableClickPropagation($('.location')[0]);
        L.DomEvent.disableClickPropagation($('.info')[0]);
        L.DomEvent.disableClickPropagation($('.filter')[0]);
		L.DomEvent.disableClickPropagation($('.nearby')[0]);

        $('.searchbutton').on('click', function(e) {

            if ($("#location").val() != "") {
                findCoordinate($("#location").val());
                $("#locationBtn").prop("disabled", true);
                $("#locationBtn").html('...');
            }
        });

        throttledLoadCache(startLatLng);
        //_.delay(throttledLoadCache, 500, startLatLng); //delay a little to let map initiate

    });

    setInterval(updateTime, 1000);
    setInterval(autoTrack,  5000);

    /* Start Scan */
    $('.scan').on('click', function() {
        if(!$('.scan').hasClass('active')) {
            $('.scan').removeClass('success').removeClass('failed').addClass('active'); // Start spinning

            var cp = marker.getLatLng();

            if(!isScanning) {
                if(!$('.scan').hasClass('active')) {
                    $('.scan').removeClass('success').removeClass('failed').addClass('active'); // Start spinning
                }
                $(".scan").prop("disabled", true);
                isScanning = true;
                getPokemon(cp.lat, cp.lng);
				doAdditionalScans(cp);
            }
        }
    });
    /* End Scan */


	/* Show Nearby Zone */
	$(document.body).on('click', '.pokemon' ,function()
	{
        var zone = $(this).data("zone");
		if (zone != undefined) {
			DrawS2(zone);
		}
    });

	/* End Show Nearby Zone */

    /* Start location */
    $('.location').on('click', function() {
        if (!trackingEnabled) {
            if(!$('.location').hasClass('active')) { // If locationbutton has been activated
                $('.location').addClass('active');
                trackingEnabled = true;
                map.locate({
                    setView: true,
                    maxZoom: 16
                });
            }
        } else {
            trackingEnabled = false;
            $('.location').removeClass('active'); // locationbutton has been deactived
        }
    });
    /* End location */

    $('.infowindow').addClass('show');
    $('.nearby, .left, .center, .right, .leaflet-control-zoom').addClass('hidden'); /* <--- EDITED!! */

    /* Start Notifications */                       /** NEWW!!!!!! NEW!!!! NEW!!!! **/
    $('.notifications').on('click', function() {
        if(!$('.notifications').hasClass('active')) { // If locationbutton has been activated
            $('.notifications').addClass('active');
            setTimeout(function() {
                 alert('Notification!'); // Lolz thats a long time ago I kept a alertbox in code xD
            }, 500);
        }
        else {
            $('.notifications').removeClass('active'); // locationbutton has been deactived
        }
    });
    /* End location */

    /* Start Windows */
    $('.info').on('click', function() { // Open infowindow
        $('.infowindow').addClass('show');
        $('.left, .center, .right, .leaflet-control-zoom').addClass('hidden'); /* <--- EDITED!! */
        if(!$('.nearby').hasClass('hidden')) {
            $('.nearby').addClass('hidden');
        }
    });

    $('.search').on('click', function() { // Open searchwindow
        $('.searchwindow').addClass('show');
        $('.nearby, .left, .center, .right, .leaflet-control-zoom').addClass('hidden');/* <--- EDITED!! */
        $("#location").focus();
    });

    /* Start Filter */
    $('#openfilter').on('click', function() { // Open filterwindow          /** NEWW!!!!!! NEW!!!! NEW!!!! **/
        $('.filteritem input').each(function() {
            if(this.name in filterdict) {
                this.checked = true;
            }
        });
        $('.filterwindow').addClass('show');
        $('.nearby, .left, .center, .right, .leaflet-control-zoom').addClass('hidden');/* <--- EDITED!! */
    });

    $('#select-all').on('click', function() {
        $('.filteritem input').each(function() {
            this.checked = true;
        });
    });

    $('#deselect-all').on('click', function() {
        $('.filteritem input').each(function() {
            this.checked = false;
        });
    });

    $('#applyfilter').on('click', function() {
        var filterlist = []; //get filter from list
        $('.filteritem input').each(function() {
            if(this.checked) {
                filterlist.push(this.name);
            }
        });
        Cookies.set('filter', filterlist.join(cookiedelimchar), {expires: 3650, path: ''}); //update cookies
        filterdict = {}; //update internal data structure
        for (var i in filterlist){
            filterdict[filterlist[i]] = true;
        }

        //hide new pokemon and show unhidden ones
        $('.displaypokemon').each(function() {
            var curpokeid = $(this).data("pokeid");
            if(curpokeid in filterdict) {
                //hide
                $(this).addClass('hidden');
            } else {
                //display
                $(this).removeClass('hidden');
            }
        });
        $('.window').removeClass('show');
        $('.nearby, .left, .center, .right, .leaflet-control-zoom').removeClass('hidden');/* <--- EDITED!! */
    });
    /* End Filter */


    $('.close').on('click', function() { // Close all windows
        $('.window').removeClass('show');
        $('.nearby, .left, .center, .right, .leaflet-control-zoom').removeClass('hidden');/* <--- EDITED!! */
    });
    /* End Windows */

    /* Start Search */
    $('form.search').on('submit', function(e) { // Searchform has been submitted.
        e.preventDefault();
    });
    /* End Search */

    $("body").css({
        height: $(window).height()
    });

    /* if(mobileAndTabletcheck()) {
        var chance = Math.random();
        if(chance < 0.5) {
            $('.pcad').html('<div id="crt-486056"></div><script type="text/javascript">Criteo.DisplayAd({    "zoneid": 486056,    "containerid": "crt-486056"});</script>');
        } else {
            $('.pcad').html('<center><script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> <ins class="adsbygoogle adslot_1" style="display:block" data-ad-client="ca-pub-8269628550311055" data-ad-slot="1844494449" data-ad-format="auto"></ins> <script>(adsbygoogle = window.adsbygoogle || []).push({});</script></center>');
        }
    } else {
        $('.pcad').html('<center><script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> <ins class="adsbygoogle adslot_1" style="display:block" data-ad-client="ca-pub-8269628550311055" data-ad-slot="1844494449" data-ad-format="auto"></ins> <script>(adsbygoogle = window.adsbygoogle || []).push({});</script></center>');
    } */
});


var _audio = document.createElement('audio');
_audio.setAttribute("id", "audioBase");
_audio.src = 'http://www.moviesoundclips.net/movies1/300/profession.ogg';
var _audioRare = document.createElement('audio');
_audioRare.setAttribute("id", "audioRare");
_audioRare.src = 'http://www.moviesoundclips.net/tv1/tng/redalert.ogg';
var _audioNeed = document.createElement('audio');
_audioNeed.setAttribute("id", "audioNeeded");
_audioNeed.src = 'http://www.moviesoundclips.net/movies1/aliens/cards.ogg';

var storedEncounters = [];
var nearbyEncounters = [];

var centerLocation = [-26.009699742208735, 28.115172386169437];

var showAll = true;

function embedHtml() {

    var $input = $('<input id="scanner" type="button" value="something scan" />');

	$input.on('click',function(){
		if(repeaterGogo) {
			clearInterval(repeater);
			$("#scanner").val("Start scan");
			repeaterGogo = false;
		} else {
			repeater = window.setInterval(function(){
				gogoCounter();
			}, 800);
			$("#scanner").val("Stop scan");
			repeaterGogo = true;

		}
	});
    $(".desktop-header").append($input);

    var $inputSeen = $('<input id="showSeen" type="button" value="Show seen" />');

	$inputSeen.on('click',function() {
		$("#pokemonSeen").show();
	});
    $(".desktop-header").append($inputSeen);

	var $pokemonsSeen = $('<div id="pokemonSeen" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #fff; filter:alpha(opacity=70); -moz-opacity:0.7; -khtml-opacity: 0.7; opacity: 0.7; z-index: 10000; overflow-x: auto;"><div style="margin: 48px;"><input id="hideSeen" type="button" value="Hide" /><div id="pokemonSeenList" ></div></div></div>');
	$pokemonsSeen.appendTo(document.body);
	$("#pokemonSeen").hide();

	var $inputHideSeen = $("#hideSeen");

	$inputHideSeen.on('click',function() {
		$("#pokemonSeen").hide();
	});

}

function checkForRare(spawn, cached, nearby, lat, lng) {
	var needed = false;
	var rare = false;
	var superRare = false;
	var byDoor = false;

	if (spawn.pokemon_id) {
		switch(spawn.pokemon_id.toLowerCase()) {
			case "SNORLAX".toLowerCase():
			case "Lapras".toLowerCase():
			case "Blastoise".toLowerCase():
			case "Charizard".toLowerCase():
			case "VENUSAUR".toLowerCase():
			case "Gyarados".toLowerCase():
			case "Dragonite".toLowerCase():
			case "Gengar".toLowerCase():
			case "RAPIDASH".toLowerCase():
			case "EXEGGUTOR".toLowerCase():
			case "Ninetales".toLowerCase():
			case "POLIWRATH".toLowerCase():
			case "HITMONCHAN".toLowerCase():
			case "Hitmonlee".toLowerCase():
			case "MUK".toLowerCase():
			case "FARFETCHD".toLowerCase():
			case "Tauros".toLowerCase():
			case "KANGASKHAN".toLowerCase():
			case "Machamp".toLowerCase():
			case "NIDOQUEEN".toLowerCase():
			case "NIDOKING".toLowerCase():
			case "Golem".toLowerCase():
			case "VICTREEBEL".toLowerCase():
            //Common in Europe
			//case "MR_MIME".toLowerCase():
				superRare = true;
				break;
			case "WARTORTLE".toLowerCase():
			case "Charmeleon".toLowerCase():
			case "Ivysaur".toLowerCase():
			case "Dragonair".toLowerCase():
			case "Arcanine".toLowerCase():
			case "JOLTEON".toLowerCase():
			case "VAPOREON".toLowerCase():
			case "Flareon".toLowerCase():
			case "Slowbro".toLowerCase():
			case "VILEPLUME".toLowerCase():
			case "WEEZING".toLowerCase():
			case "Omastar".toLowerCase():
			case "Clefable".toLowerCase():
			case "KABUTOPS".toLowerCase():
			case "Pinsir".toLowerCase():
			case "RHYDON".toLowerCase():
			case "Magmar".toLowerCase():
			case "Scyther".toLowerCase():
			case "Aerodactyl".toLowerCase():
			case "Wigglytuff".toLowerCase():
			case "ELECTABUZZ".toLowerCase():
			case "Raichu".toLowerCase():
			case "Marowak".toLowerCase():
			case "TANGELA".toLowerCase():
			case "CHANSEY".toLowerCase():
			case "GRAVELER".toLowerCase():
			case "MACHOKE".toLowerCase():
			case "WEEPINBELL".toLowerCase():
			case "ELECTRODE".toLowerCase():
			case "MAGNETON".toLowerCase():
				rare = true;
				break;
			case "PIKACHU".toLowerCase():
			case "Omanyte".toLowerCase():
			case "KABUTO".toLowerCase():
			case "Squirtle".toLowerCase():
			case "CHARMANDER".toLowerCase():
			case "Bulbasaur".toLowerCase():
			case "EXEGGCUTE".toLowerCase():
			case "Vulpix".toLowerCase():
			case "MACHOP".toLowerCase():
			case "EEVEE".toLowerCase():
			case "DRATINI".toLowerCase():
			case "RHYHORN".toLowerCase():
			case "NIDORINA".toLowerCase():
			case "NIDORINO".toLowerCase():
			case "GEODUDE".toLowerCase():
			case "VOLTORB".toLowerCase():
			case "MAGNEMITE".toLowerCase():
			case "GRIMER".toLowerCase():
				needed = true;
				break;
			case "ABRA".toLowerCase():
			case "BELLSPROUT".toLowerCase():
			case "JIGGLYPUFF".toLowerCase():
				byDoor = true;
				break;
		}

		var encounterId = spawn.encounter_id.substring(0,14);

		if (nearby) {
			if (!nearbyEncounters) {
				nearbyEncounters = [];
			}

			if ((rare || superRare || needed || byDoor) && nearbyEncounters.indexOf(encounterId) == -1) {
				nearbyEncounters.push(encounterId);
				console.log("FOUND NEARBY "  + spawn.pokemon_id + " " + lat + ", " + lng + " At " +  new Date());
				nextScan = [lat, lng];
			}

		} else {
			if (!storedEncounters) {
				storedEncounters = [];
			}

            var timeLeft = spawn.expiration_timestamp_ms - new Date().getTime();

			if ((rare || superRare || needed || byDoor) && storedEncounters.indexOf(encounterId) == -1 && timeLeft > 0) {
				storedEncounters.push(encounterId);
				console.log("FOUND "  + spawn.pokemon_id + " " + lat + ", " + lng + " At " +  new Date() + " - " + encounterId);

				var link = "https://www.google.com/maps/dir/53+Butter+Row,MK12+5GB/" + lat + "," + lng + "/data=!4m2!4m1!3e2";

				var $pokemonsSeen = $("#pokemonSeenList");
				var $sighting = "<div style='font-weight: bold'>" + spawn.pokemon_id + " At " +  new Date().toLocaleTimeString() + "  -  <a href='" + link +"' target='_blank'>View</a></div>";

                var minutes = (timeLeft/1000/60) << 0;
                var seconds = Math.round((timeLeft/1000) % 60);
                var speakString = spawn.pokemon_id.toLowerCase() + " expires in " + minutes + " minutes and " + seconds + " seconds";

				if(rare) {
					// _audio.play();
				}

				if (superRare) {
					// _audioRare.play();
				}

				if (needed && distance(centerLocation[0], centerLocation[1], lat, lng) < 600) {
					// _audioNeed.play();
				}


                var soundOff = false;
                if (distance(centerLocation[0], centerLocation[1], lat, lng) < 200 && (rare || superRare || needed || byDoor)) {
                    speakString = "Crawl to " + speakString;
                    soundOff = true;
                } else if (distance(centerLocation[0], centerLocation[1], lat, lng) < 600 && (rare || superRare || needed)) {
                    speakString = "Walk to " + speakString;
                    soundOff = true;
                } else if (distance(centerLocation[0], centerLocation[1], lat, lng) < 1600 && (rare || superRare)) {
                    speakString = "Ride to " + speakString;
                    soundOff = true;
                } else if (distance(centerLocation[0], centerLocation[1], lat, lng) < 4500 && superRare) {
                    speakString = "Drive to " + speakString;
                    soundOff = true;
                } else {
                    $sighting = "<div>" + spawn.pokemon_id + " At " +  new Date().toLocaleTimeString() + "  -  <a href='" + link +"' target='_blank'>View</a></div>";
                }

				$pokemonsSeen.prepend($sighting);

                if (soundOff) {
                    var msg = new SpeechSynthesisUtterance();
                    var voices = window.speechSynthesis.getVoices();
                    msg.voice = voices[10]; // Note: some voices don't support altering params
                    msg.voiceURI = 'native';
                    msg.volume = 1; // 0 to 1
                    msg.rate = 0.8; // 0.1 to 10
                    msg.pitch = 0; //0 to 2
                    msg.text = speakString;
                    msg.lang = 'en-GB';

                    window.speechSynthesis.speak(msg);
                }
			}
		}
	}
}



function doAdditionalScans(cp) {
	var l1 = getNextLocation(cp.lat, cp.lng, 0);
	var l11 = getNextLocation(l1[0], l1[1], 0);
	var l12 = getNextLocation(l1[0], l1[1], 60);

	var l2 = getNextLocation(cp.lat, cp.lng, 60);
	var l21 = getNextLocation(l2[0], l2[1], 60);
	var l22 = getNextLocation(l2[0], l2[1], 120);

	var l3 = getNextLocation(cp.lat, cp.lng, 120);
	var l31 = getNextLocation(l3[0], l3[1], 120);
	var l32 = getNextLocation(l3[0], l3[1], 180);

	var l4 = getNextLocation(cp.lat, cp.lng, 180);
	var l41 = getNextLocation(l4[0], l4[1], 180);
	var l42 = getNextLocation(l4[0], l4[1], 240);

	var l5 = getNextLocation(cp.lat, cp.lng, 240);
	var l51 = getNextLocation(l5[0], l5[1], 240);
	var l52 = getNextLocation(l5[0], l5[1], 300);

	var l6 = getNextLocation(cp.lat, cp.lng, 300);
	var l61 = getNextLocation(l6[0], l6[1], 300);
	var l62 = getNextLocation(l6[0], l6[1], 0);

	getPokemon2(l1[0], l1[1]);
	getPokemon2(l11[0], l11[1]);
	getPokemon2(l12[0], l12[1]);

	getPokemon2(l2[0], l2[1]);
	getPokemon2(l21[0], l21[1]);
	getPokemon2(l22[0], l22[1]);

	getPokemon2(l3[0], l3[1]);
	getPokemon2(l31[0], l31[1]);
	getPokemon2(l32[0], l32[1]);

	getPokemon2(l4[0], l4[1]);
	getPokemon2(l41[0], l41[1]);
	getPokemon2(l42[0], l42[1]);

	getPokemon2(l5[0], l5[1]);
	getPokemon2(l51[0], l51[1]);
	getPokemon2(l52[0], l52[1]);

	getPokemon2(l6[0], l6[1]);
	getPokemon2(l61[0], l61[1]);
	getPokemon2(l62[0], l62[1]);
}

function gogoCounter() {
	if (!isScanning) {
		var latMin = map.getBounds()._southWest.lat;
		var latMax = map.getBounds()._northEast.lat;
		var lonMin = map.getBounds()._southWest.lng;
		var lonMax = map.getBounds()._northEast.lng;

		var latlngPoint;

		if (nextScan) {
			latlngPoint = new L.LatLng(nextScan[0], nextScan[1]);
		} else {
			latlngPoint = new L.LatLng(getRandomArbitrary(latMin, latMax), getRandomArbitrary(lonMin, lonMax));
		}

		var areaGoodToCheck = true;
		if (mkPoly && mkPoly.length > 0) {
		    areaGoodToCheck = isMarkerInsidePolygon(latlngPoint.lat, latlngPoint.lng);
		}

		if (areaGoodToCheck) {
			map.fireEvent('click', {
				latlng: latlngPoint,
				layerPoint: map.latLngToLayerPoint(latlngPoint),
				containerPoint: map.latLngToContainerPoint(latlngPoint)
			});
			nextScan = null;
		}
	}

}

function getRandomArbitrary(min, max) {
	var multiplier = 2500;

	min = min * multiplier;
	max = max * multiplier;
	var res = Math.random() * (max - min) + min;
	return res / multiplier;
}

function isMarkerInsidePolygon(x, y) {
    var polyPoints = polygon.getLatLngs()[0];

    var inside = false;
    for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
        var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
        var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};

function distance(lat1, lon1, lat2, lon2) {
	var R = 6371e3;
	var Phi1 = lat1.toRadians();
	var Phi2 = lat2.toRadians();
	var DeltaPhi = (lat2 - lat1).toRadians();
	var DeltaLambda = (lon2 - lon1).toRadians();

	var a = Math.sin(DeltaPhi / 2) * Math.sin(DeltaPhi / 2)
			+ Math.cos(Phi1) * Math.cos(Phi2) * Math.sin(DeltaLambda / 2)
			* Math.sin(DeltaLambda / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;

	return d;
}

function getNextLocation(startLat, startLong, bearing) {

	var distance = 90;
    var radius = 6371e3;

    var δ = Number(distance) / radius; // angular distance in radians
    var θ = Number(bearing).toRadians();

    var φ1 = startLat.toRadians();
    var λ1 = startLong.toRadians();

    var φ2 = Math.asin(Math.sin(φ1)*Math.cos(δ) + Math.cos(φ1)*Math.sin(δ)*Math.cos(θ));
    var x = Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2);
    var y = Math.sin(θ) * Math.sin(δ) * Math.cos(φ1);
    var λ2 = λ1 + Math.atan2(y, x);

    return [φ2.toDegrees(), (λ2.toDegrees()+540)%360-180];
}
/** Extend Number object with method to convert numeric degrees to radians */
if (Number.prototype.toRadians === undefined) {
    Number.prototype.toRadians = function() { return this * Math.PI / 180; };
}

/** Extend Number object with method to convert radians to numeric (signed) degrees */
if (Number.prototype.toDegrees === undefined) {
    Number.prototype.toDegrees = function() { return this * 180 / Math.PI; };
}


