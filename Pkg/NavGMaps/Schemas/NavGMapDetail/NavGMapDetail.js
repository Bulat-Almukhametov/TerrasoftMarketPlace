define("NavGMapDetail", ["jQuery", "css!NavGMarkerCss"], function () {

    function createMarkerSvg(text, markerColor, textColor, moving) {
        textColor = textColor || "blue";
        var opacity = moving ? 100 : 0;
        markerColor = markerColor || "#4a90d6";

        return "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22149%22%20height%3D%22"
            + 50
            + "%22%3E%0A%0A%20%3Ctitle%2F%3E%0A%20%3Cg%3E%0A%20%20%3Ctitle%2F%3E%0A%20%20%3Crect%20opacity%3D%220%22%20id%3D%22imagebot_7%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20x%3D%220.16365%22%20y%3D%220.11313%22%20fill%3D%22%23FFFFFF%22%2F%3E%0A%20%3C%2Fg%3E%0A%20%3Cg%20class%3D%22currentLayer%22%3E%0A%20%20%3Ctitle%20class%3D%22currentLayer%22%2F%3E%0A%20%20%3Cpath%20fill%3D%22"
            + encodeURIComponent(markerColor)
            + "%22%20stroke%3D%22%23222222%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%20fill-rule%3D%22nonzero%22%20id%3D%22imagebot_6%22%20d%3D%22M6.94356%2C26.76549C3.17465%2C25.38553%200.47321%2C21.00074%201.08714%2C17.25971C1.47426%2C14.90071%209.64161%2C0.57993%2010.35488%2C1.00947C10.58768%2C1.14967%2012.65932%2C4.48844%2014.95852%2C8.42897C18.64161%2C14.74129%2019.13889%2C15.91834%2019.13889%2C18.32371C19.13889%2C23.1993%2015.1344%2C27.19296%2010.32617%2C27.11259C8.92306%2C27.08913%207.40089%2C26.93294%206.94356%2C26.7655L6.94356%2C26.76549zM10.71959%2C24.31325C10.84435%2C23.68204%2010.55293%2C23.3742%209.83063%2C23.3742C8.18444%2C23.3742%205.9009%2C21.3426%205.39072%2C19.42415C4.8465%2C17.37768%203.40353%2C17.13429%203.1904%2C19.05302C2.77976%2C22.74972%2010.0278%2C27.81352%2010.71959%2C24.31325L10.71959%2C24.31325z%22%20class%3D%22currentLayer%22%20transform%3D%22rotate(179.279%2010.2331%2014.17)%20matrix(1%200%200%201%200.163651%200.113131)%22%2F%3E%0A%20%20%3CforeignObject%20font-size%3D%2212%22%20id%3D%22imagebot_5%22%20x%3D%2223.99904%22%20y%3D%220.83276%22%20width%3D%22101.21589%22%20height%3D%22"
            + 50
            + "%22%20class%3D%22currentLayer%22%20transform%3D%22translate(0.000161411%200.000101956)%20matrix(1.22045%200%200%201.06256%20-4.7177%200.05047)%22%20style%3D%22%26%2310%3B%20%20%20%20color%3A%20"
            + encodeURIComponent(textColor)
            + "%3B%26%2310%3B%20%20%20%20font-weight%3A%20700%3B%26%2310%3B%22%3E"
            + encodeURIComponent(text)
            + "%3C%2FforeignObject%3E%0A%20%20%3Cpath%20transform%3D%22translate(-3.93216%20-0.98304)%20matrix(0.0312472%200%200%200.0312472%205.8984%2015.4011)%22%20class%3D%22currentLayer%22%20fill%3D%22%2378f45f%22%20stroke%3D%22%23000000%22%20stroke-width%3D%223%22%20stroke-dasharray%3D%22null%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22null%22%20stroke-opacity%3D%22null%22%20id%3D%22imagebot_4%22%20d%3D%22M%2094.2118238667631%20-106.49076810505309%20L%20299.97903519408203%20-250.31130796107107%20L%20299.97903519408203%20-178.40208961415576%20L%20382.48065628650716%20-178.40208961415576%20L%20382.48065628650716%20-293.39661650456037%20L%20547.0044216290205%20-293.39661650456037%20L%20547.0044216290205%20-351.06136224545435%20L%20444.1229456729645%20-351.06136224545435%20L%20649.8887426143178%20-494.88255033639314%20L%20855.6576284445617%20-351.06136224545435%20L%20752.7731936580947%20-351.06136224545435%20L%20752.7731936580947%20-293.39661650456037%20L%20917.297316661427%20-293.39661650456037%20L%20917.297316661427%20-178.40208961415576%20L%20999.798986525782%20-178.40208961415576%20L%20999.798986525782%20-250.31130796107107%20L%201205.5676772683069%20-106.49076810505309%20L%20999.798986525782%2037.33193253403411%20L%20999.798986525782%20-34.579417785509506%20L%20917.297316661427%20-34.579417785509506%20L%20917.297316661427%2080.4151379153361%20L%20752.7731936580947%2080.4151379153361%20L%20752.7731936580947%20138.0798404405686%20L%20855.6576284445617%20138.0798404405686%20L%20649.8887426143178%20281.902483458774%20L%20444.1229456729645%20138.0798404405686%20L%20547.0044216290205%20138.0798404405686%20L%20547.0044216290205%2080.4151379153361%20L%20382.48065628650716%2080.4151379153361%20L%20382.48065628650716%20-34.579417785509506%20L%20299.97903519408203%20-34.579417785509506%20L%20299.97903519408203%2037.33193253403411%20L%2094.2118238667631%20-106.49076810505309%20z%22%20opacity%3D%22"
            + opacity
            + "%22%2F%3E%0A%20%3C%2Fg%3E%0A%3C%2Fsvg%3E";
    }

    var linksCacheKey = 'NavGMapDetail_visited_links';

    function createMovingMenu(event) {
        var movingMenu = document.createElement("div");
        document.body.appendChild(movingMenu);

        menu.style.left = event.pageX + 10 + "px";
        menu.style.top = event.pageX + 10 + "px";
    }

    function getLinksStorage() {
        return JSON.parse(localStorage.getItem(linksCacheKey)) || {};
    }

    function saveLinksStorage(object) {
        localStorage.setItem(linksCacheKey, JSON.stringify(object));
    }

    function setLinkVisited(path) {
        var visitedLinks = getLinksStorage();

        if (!visitedLinks[path]) {
            visitedLinks[path] = true;
            saveLinksStorage(visitedLinks);
        }
    }

    function isLinkVisited(path) {
        var visitedLinks = getLinksStorage();

        return !!visitedLinks[path];
    }

    function createLink(entitySchemaName, typeId, displayValue, recordId) {
        var moduleStructure = Terrasoft.configuration.ModuleStructure[entitySchemaName];
        var entityStructure = Terrasoft.configuration.EntityStructure[entitySchemaName];
        var attribute = entityStructure.attribute;
        var pages = entityStructure.pages;
        var cardSchema = "";
        if (pages && pages.length > 1 && attribute) {
            Terrasoft.each(pages, function (page) {
                if (page.UId === typeId) {
                    cardSchema = page.cardSchema;
                }
            }, this);
        }
        if (Ext.isEmpty(cardSchema) && pages && pages.length > 0) {
            cardSchema = pages[0].cardSchema;
        }
        var URL = [moduleStructure.cardModule, cardSchema, "edit", recordId];
        var link = Terrasoft.workspaceBaseUrl + "/Nui/ViewModule.aspx#" + URL.join("/");
        return {
            caption: displayValue,
            target: "_self",
            title: displayValue,
            url: link
        };
    }


    return {
        diff: /**SCHEMA_DIFF*/ [
            {
                "operation": "remove",
                "name": "DataGrid"
            },
            {
                "operation": "remove",
                "name": "loadMore"
            },
            {
                "operation": "insert",
                "name": "Map",
                "parentName": "Detail",
                "propertyName": "items",
                "values": {
                    "itemType": Terrasoft.ViewItemType.CONTAINER,
                    "id": "googleMap",
                    "styles": {
                        "height": "350px"
                    },
                    "items": []
                }
            },
            {
                "operation": "insert",
                "name": "SearchAddress",
                "parentName": "Detail",
                "propertyName": "tools",
                "values": {
                    "bindTo": "SearchAddressColumn",
                    "controlConfig": {
                        "onEnterKeyPressed": function () {
                            this.model.onSearch.call(this.model);
                        },
                        onAfterRender: function () {
                            var parentMethod = this.superclass.onAfterRender;
                            parentMethod.call(this, arguments);

                            var input = document.getElementById(this.id + '-el');
                            var searchBox = new google.maps.places.SearchBox(input);
                            this.model.set("SearchBox", searchBox);
                            var context = this.model;
                            searchBox.addListener('places_changed', function() {
                                context.onSearch.call(context);
                            });
                            var map = this.model.get("Map");
                            searchBox.setBounds(map.getBounds());
                            map.addListener('bounds_changed', function() {
                                searchBox.setBounds(map.getBounds());
                            });

                        }
                    },
                    "visible": {"bindTo": "SearchAddressVisible"},
                    "caption": "Адрес"
                }
            },
            {
                "operation": "insert",
                "name": "Search",
                "parentName": "Detail",
                "propertyName": "tools",
                "values": {
                    "itemType": Terrasoft.ViewItemType.BUTTON,
                    "caption": "Найти",
                    "click": {"bindTo": "onSearch"},
                    "visible": {"bindTo": "SearchAddressVisible"}
                }
            },
            {
                "operation": "insert",
                "name": "SearchClose",
                "parentName": "Detail",
                "propertyName": "tools",
                "values": {
                    "itemType": Terrasoft.ViewItemType.BUTTON,
                    "caption": "",
                    "classes": {
                        "wrapperClass": ["nav-close-button"]
                    },
                    "click": {"bindTo": "closeSearchMenu"},
                    "visible": {"bindTo": "SearchAddressVisible"}
                }
            },
        ] /**SCHEMA_DIFF*/,
        methods: {
            init: function () {
                this.callParent(arguments);
                window[this.name] = this;
                this.set("RowCount", 0);

                var id = this.getMiniPageSandboxId("NavGMarkerMiniPage");
                this.sandbox.subscribe("ReloadDashboardItems", this.reloadGridData, this);
            },

            getGridDataColumns: function () {
                var config = this.callParent(arguments);
                config["NavObject.Name"] = {
                    path: "NavObject.Name"
                };

                return config;
            },

            gMapsGetLocation: function (address) {
                return new Promise(function (resolve, reject) {
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'address': address}, function (results, status) {
                        if (status == "OK") {
                            var location = results[0].geometry.location;

                            resolve(location);
                        }
                        else {
                            var caption = "Возникла ошибка при получении координат маркера: ";
                            var message = "неизвестная ошибка.";
                            switch (status) {
                                case "ZERO_RESULTS": {
                                    message = "геокодирование успешно выполнено, однако результаты не найдены. Это может произойти, если геокодировщику был передан несуществующий адрес";
                                    break;
                                }

                                case "OVER_QUERY_LIMIT": {
                                    message = "превышение квоты.";
                                    break;
                                }

                                case "REQUEST_DENIED": {
                                    message = "отклонение запроса.";
                                    break;
                                }

                                case "INVALID_REQUEST": {
                                    message = "INVALID_REQUEST. Как правило, ошибка возникает из-за отсутствия в запросе адреса.";
                                    break;
                                }

                                case "UNKNOWN_ERROR": {
                                    message = "запрос не удалось обработать из-за ошибки сервера. Если повторить попытку, запрос может оказаться успешным.";
                                    break;
                                }
                            }


                            Terrasoft.showInformation(caption + message);
                        }
                    });
                });
            },
            hideSearchMarker: function () {
                var markers = this.get("SearchMarker");
                if (markers) {
                    markers.forEach(oldMarker => oldMarker.setMap(null));
                }
            },

            onSearch: function () {
                this.hideSearchMarker();

                var searchBox = this.get("SearchBox");
                var map = this.get("Map");
                var places = searchBox.getPlaces();
                if (!places || places.length == 0) {
                    return;
                }
                var markers = [];
                places.forEach(function(place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    var searchMarker = new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    });
                    markers.push(searchMarker);
                });
                this.set("SearchMarker", markers);
                // Create a marker for each place.
                map.setCenter(places[0].geometry.location);

            },

            onRender: function () {
                this.callParent(arguments);
                this.renderMap();

            },

            addToolsButtonMenuItems: function (toolsButtonMenu) {
                var searchMenuItem = this.getButtonMenuItem({
                    Caption: "Найти на карте",
                    Click: {
                        "bindTo": "openSearchMenu"
                    }
                });
                toolsButtonMenu.addItem(searchMenuItem);

                var profile = this.get("Profile");
                var showAll = profile.data && profile.data.showAllMarkers;
                this.set("ShowAllMarkersCaption", showAll ? "Фильтровать маркеры для текущей страницы" : "Показать все маркеры");

                var setFiltersMenuItem = this.getButtonMenuItem({
                    Caption: {"bindTo": "ShowAllMarkersCaption"},
                    Click: {"bindTo": "showAllMarkers"}
                });
                toolsButtonMenu.addItem(setFiltersMenuItem);
            },

            showAllMarkers: function () {
                var columnsSettingsProfile = NavGMapDetail.get("Profile");

                columnsSettingsProfile.data = columnsSettingsProfile.data || {};
                columnsSettingsProfile.data.showAllMarkers = !columnsSettingsProfile.data.showAllMarkers;

                var propertyName = NavGMapDetail.getDataGridName();
                var columnsSettingsProfileKey = columnsSettingsProfile[propertyName].key;
                Terrasoft.utils.saveUserProfile(columnsSettingsProfileKey,
                    columnsSettingsProfile, false);

                NavGMapDetail.set("Profile", columnsSettingsProfile);
                this.set("ShowAllMarkersCaption", columnsSettingsProfile.data.showAllMarkers ? "Фильтровать маркеры для текущей страницы" : "Показать все маркеры");
                this.reloadGridData();
            },

            openSearchMenu: function () {
                this.set("SearchAddressVisible", true);
            },

            closeSearchMenu: function () {
                this.set("SearchAddressVisible", false);
                this.hideSearchMarker();
            },

            addRecord: function () {
                var detailInfo = this.getDetailInfo();
                var defaultValues = detailInfo.defaultValues;

                var map = this.get("Map");
                defaultValues.push({name: "defLongitude", value: map.center.lng().toString()});
                defaultValues.push({name: "defLatitude", value: map.center.lat().toString()});

                this.openMiniPage({
                    entitySchemaName: "NavGMarker",
                    showDelay: 0,
                    miniPageSchemaName: "NavGMarkerMiniPage",
                    moduleId: this.getMiniPageSandboxId("NavGMarkerMiniPage"),
                    valuePairs: defaultValues,
                    operation: Terrasoft.ConfigurationEnums.CardOperation.ADD
                });
            },

            onDataChanged: function () {
                this.callParent(arguments);
                var mapContainer = document.getElementById('googleMap');
                if (mapContainer) {
                    this.addMarkers();
                }
            },

            renderMap: function () {
                var scope = this;
                window.initMap = function () {
                    var map = new google.maps.Map(document.getElementById('googleMap'), {
                        center: {lat: 56, lng: 38},
                        zoom: 8
                    });

                    scope.set("Map", map);
                    scope.reloadGridData();
                };
                Terrasoft.SysSettings.querySysSettings(["NavGMapsKey"], function (sysSettings) {
                    if (window.google && window.google.maps) {
                        window.initMap();
                    }
                    else {
                        var keyVal = sysSettings.NavGMapsKey;
                        if (keyVal) {
                            $.ajax({
                                url: "https://maps.googleapis.com/maps/api/js?key=" + keyVal + "&callback=initMap&libraries=places",
                                dataType: "script"
                            });
                        }
                    }
                }, scope);

            },

            clearOverlays: function () {
                this.markersArray = this.markersArray || [];
                for (var i = 0; i < this.markersArray.length; i++) {
                    this.markersArray[i].setMap(null);
                }
                this.markersArray.length = 0;
            },

            getLocation: function (markerValues) {
                var context = this;
                return new Promise(function (resolve, reject) {

                    var lat = markerValues.get("NavLatitude");
                    var lng = markerValues.get("NavLongitude");
                    if (lat && lng)
                        resolve(new google.maps.LatLng(lat, lng));
                    else {
                        var country = markerValues.get("NavCountry");
                        var city = markerValues.get("NavCity");
                        var addressString = markerValues.get("NavAddress");

                        var address = "";
                        if (country) address += country.displayValue + " ";
                        if (city) address += city.displayValue + " ";
                        if (addressString) address += addressString;

                        context.gMapsGetLocation(address).then(function (location) {
                            resolve(location);
                        })
                    }
                });
            },

            addMarkers: function () {
                var markers = this.get("Collection");
                var map = this.get("Map");

                var bounds = new google.maps.LatLngBounds();

                var context = this;

                var toggleMenu = function (command, point, marker) {
                    var element = document.querySelector("#gMapDetailContextMenu");
                    if (element)
                        element.remove();

                    if (command == "show") {
                        var menu = document.createElement("div");
                        window.m = menu;

                        menu.innerHTML = `         
                                 <ul class="nav-menu-options">
                                    <li class="nav-menu-option nav-marker-move">Переместить</li>
                                    <li class="nav-menu-option nav-marker-edit">Редактировать</li>
                                    <li class="nav-menu-option nav-marker-edit">Удалить</li>
                                  </ul>                                  
`;
                        menu.id = "gMapDetailContextMenu";
                        document.body.appendChild(menu);
                        menu.style.left = point.left + 10 + "px";
                        menu.style.top = point.top + 10 + "px";
                        menu.classList.add("nav-menu");

                        var listItems = menu.children[0].children;

                        listItems[0].onclick = function () {
                            window.marker = marker;


                            marker.setDraggable(true);
                            marker.icon.url = createMarkerSvg(marker.displayText, marker.markerColor, marker.textColor, true);
                            marker.map_changed();
                            marker.addListener("dragend", function (event) {
                                marker.setDraggable(false);
                                marker.icon.url = createMarkerSvg(marker.displayText, marker.markerColor, marker.textColor, false);
                                marker.map_changed();


                                var updateQuery = Ext.create("Terrasoft.UpdateQuery", {
                                    rootSchemaName: "NavGMarker"
                                });
                                updateQuery.setParameterValue("NavLongitude", marker.position.lng().toString(), Terrasoft.DataValueType.TEXT);
                                updateQuery.setParameterValue("NavLatitude", marker.position.lat().toString(), Terrasoft.DataValueType.TEXT);

                                var filter1 = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Id", marker.entityId);
                                updateQuery.filters.addItem(filter1);

                                updateQuery.execute();
                            });


                        };

                        listItems[1].onclick = function () {
                            context.openMiniPage({
                                entitySchemaName: "NavGMarker",
                                showDelay: 0,
                                miniPageSchemaName: "NavGMarkerMiniPage",
                                moduleId: context.getMiniPageSandboxId("NavGMarkerMiniPage"),
                                operation: Terrasoft.ConfigurationEnums.CardOperation.EDIT,
                                recordId: marker.entityId
                            });
                        };

                        listItems[2].onclick = function () {
                            var deleteQuery = Ext.create("Terrasoft.DeleteQuery", {
                                rootSchemaName: "NavGMarker"
                            });
                            var filter1 = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Id", marker.entityId);
                            deleteQuery.filters.addItem(filter1);

                            deleteQuery.execute(); // раскомментируйте, чтобы выполнить запрос

                            context.reloadGridData();

                        };

                    }
                };

                setPosition = function (point, marker) {
                    toggleMenu("show", point, marker);
                };

                var menuVisible = false;
                window.addEventListener("click", function (e) {
                    if (menuVisible)
                        toggleMenu("hide");
                });

                this.clearOverlays();
                var self = this;
                var markerArray = [];
                markers.each(function (item) {

                    var title = item.get("Name");
                    var markerColor = item.get("NavMarkerColor");
                    var image = createMarkerSvg(title, markerColor);

                    self.getLocation(item).then(function (loc) {

                        var marker = new google.maps.Marker({
                            position: loc,
                            map: map,

                            icon: {
                                url: image,
                                anchor: new google.maps.Point(11, 32),
                            },
                        });
                        self.markersArray.push(marker);
                        marker.displayText = title;
                        marker.entityId = item.get("Id");
                        marker.entity = item;
                        marker.markerColor = markerColor;

                        var urlPromise = self.getMarkerLink(item);


                        (function (marker) {

                            urlPromise.then(function (url) {

                                if (url) {
                                    if (isLinkVisited(url)) {
                                        marker.icon.url = createMarkerSvg(title, markerColor, "coral");
                                        marker.textColor = "coral";
                                        marker.map_changed();
                                    }
                                }

                                if (url) {
                                    marker.addListener('click', function () {
                                        setLinkVisited(url);
                                        window.open(url);
                                        marker.icon.url = createMarkerSvg(title, markerColor, "coral");
                                        marker.textColor = "coral";
                                        marker.map_changed();
                                    });
                                }


                                marker.addListener("rightclick", function (cfg) {
                                    var attrs = Object.values(cfg);
                                    var e = attrs.find(function (prop) {
                                        return prop instanceof MouseEvent;
                                    });

                                    menuVisible = true;
                                    var origin = {
                                        left: e.pageX,
                                        top: e.pageY
                                    };
                                    setPosition(origin, marker);
                                    return false;
                                });

                                var miniPageCfg = self.getMiniPageConfig(item);
                                if (miniPageCfg) {
                                    marker.addListener('mouseover', function (cfg) {
                                        var attrs = Object.values(cfg);
                                        var event = attrs.find(function (prop) {
                                            return prop instanceof MouseEvent;
                                        });

                                        var element = event.srcElement.parentElement;
                                        if (!element.id) {
                                            element.id = "marker" + miniPageCfg.recordId;
                                        }
                                        miniPageCfg.targetId = element.id;
                                        self.openMiniPage(miniPageCfg);
                                    });
                                }

                            });
                        })(marker);

                        bounds.extend(loc);
                        map.fitBounds(bounds);
                        map.panToBounds(bounds);

                        if (markers.getCount() == 1) {
                            // если карта загрузилась быстро
                            setTimeout(function () {
                                map.setZoom(17);
                            }, 100);
                            // если карта загрузилась долго
                            setTimeout(function () {
                                map.setZoom(17);
                            }, 400);

                        }
                    });


                }, this);


            },

            onDestroy: function () {
                var element = document.querySelector("#gMapDetailContextMenu");
                if (element)
                    element.remove();

                this.callParent();
            },

            getMiniPageConfig: function (marker) {

                var entitySchemaName = marker.get("NavObject.Name");
                var recordId = marker.get("NavObjectValue");

                if (entitySchemaName && recordId) {
                    return {
                        entitySchemaName: entitySchemaName,
                        recordId: recordId
                    };
                }

                return "";
            },

            getMarkerLink: function (marker) {

                var self = this;
                return new Promise(function (resolve, reject) {

                    var objectName = marker.get("NavObject.Name");
                    if (objectName) {
                        Terrasoft.require([objectName], function () {
                            var column = Terrasoft[objectName];

                            var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
                                rootSchemaName: objectName
                            });
                            if (column.attribute) {
                                esq.addColumn(column.attribute, "typeColumn");
                            }
                            esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");

                            var val = marker.get("NavObjectValue");
                            if (val) {
                                esq.getEntity(val, function (response) {
                                    if (response.success) {
                                        var entity = response.entity;
                                        var typeId = entity.get("typeColumn");
                                        if (typeId) {
                                            typeId = typeId.value;
                                        }
                                        var displayValue = entity.get("displayValue");

                                        var linkOptions = createLink(objectName, typeId, displayValue, val);
                                        if (linkOptions) {
                                            var url = linkOptions.url;

                                            resolve(url);
                                        }
                                        else {
                                            resolve(null);
                                        }

                                    }

                                }, self);
                            }
                            else {
                                resolve(null);
                            }
                        }, this);
                    }
                    else {
                        resolve(null);
                    }
                });

            },


            getFilters: function () {
                //var masterValues = this.sandbox.publish("GetColumnsValues", ["NavIgnoreFilter"], [this.sandbox.id]);

                var profile = this.get("Profile");
                var ignoreFilters = profile.data && profile.data.showAllMarkers;

                var detailFilters = this.get("DetailFilters");
                var serializationDetailInfo = detailFilters.getDefSerializationInfo();
                serializationDetailInfo.serializeFilterManagerInfo = true;
                var deserializedDetailFilters = Terrasoft.deserialize(detailFilters.serialize(serializationDetailInfo));

                if (!ignoreFilters) {
                    var masterColumnFilters = this.get("Filter");

                    var serializationMasterColumnInfo = masterColumnFilters.getDefSerializationInfo();
                    serializationMasterColumnInfo.serializeFilterManagerInfo = true;
                    var deserializedMasterColumnFilters = Terrasoft.deserialize(masterColumnFilters
                        .serialize(serializationMasterColumnInfo));


                    if (this.get("IsRelationshipButtonPressed")) {
                        var mainFilterGroup = this.getRelationshipFilters();
                        mainFilterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
                        mainFilterGroup.add("masterRecordFilter", deserializedMasterColumnFilters);
                        deserializedDetailFilters.add("mainFilterGroup", mainFilterGroup);
                    } else {
                        deserializedDetailFilters.add("masterRecordFilter", deserializedMasterColumnFilters);
                    }
                }


                return deserializedDetailFilters;
            },

            initQueryColumns: function (esq) {
                this.addGridDataColumns(esq);
                this.addProfileColumns(esq);
                this.addTypeColumns(esq);
                this.addProcessEntryPointColumn(esq);
                this.addAllColumns(esq);

            },
            onSearchAddressVisibleChange: function () {
                var visible = this.get("SearchAddressVisible");
                if (visible) {

                }
            }
        },
        messages: {
            "ReloadDashboardItems": {
                mode: Terrasoft.MessageMode.BROADCAST,
                direction: Terrasoft.MessageDirectionType.SUBSCRIBE
            }
        }
        ,
        attributes: {
            "SearchAddressColumn": {
                dataValueType: Terrasoft.DataValueType.TEXT,
                type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
            },
            "SearchAddressVisible": {
                dataValueType: Terrasoft.DataValueType.BOOLEAN,
                type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                value: false,
                dependencies: [
                    {
                        columns: ["SearchAddressVisible"],
                        methodName: "onSearchAddressVisibleChange"
                    }
                ]
            },
            "ShowAllMarkersCaption": {
                dataValueType: Terrasoft.DataValueType.TEXT,
                type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
            },
        }
    };
})
;
