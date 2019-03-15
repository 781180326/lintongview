window.onload = function(){
    var map = new BMap.Map("container", {minZoom:4 } ), opts = null;

    var navigationControl = new BMap.NavigationControl( { type: BMAP_NAVIGATION_CONTROL_SMALL  } );             // 平移缩放控件
    var overviewMapControl = new BMap.OverviewMapControl( { isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT } );  //缩略图控件
    var scaleControl = new BMap.ScaleControl();             // 比例尺控件
    var mapTypeControl = new BMap.MapTypeControl();         // 地图类型控件
    var copyrightControl = new BMap.CopyrightControl();     // 版权控件
    var geolocationControl = new BMap.GeolocationControl( { offset: new BMap.Size(50,50) , auchor: BMAP_ANCHOR_BOTTOM_LEFT  } ); //定位控件

    map.addControl( navigationControl );
    map.addControl( overviewMapControl );
    map.addControl( scaleControl );
    map.addControl( mapTypeControl );
    map.disable3DBuilding();
    map.setCurrentCity("西安");
    map.addControl( copyrightControl );
    map.addControl( geolocationControl );

    map.centerAndZoom( '临潼区', 15 );
    map.enableScrollWheelZoom(true);


    //全景控件
    map.addTileLayer( new BMap.PanoramaCoverageLayer() );   // 覆盖区域图层测试
    var stCtrl = new BMap.PanoramaControl();                //构造全景控件
    stCtrl.setOffset(new BMap.Size(20, 50));
    map.addControl(stCtrl);//添加全景控件

    //绘制工具条
    function DrawOverlay(){
        DrawOverlay.overlays = [];
        this.styleOptions = {
            strokeColor:"green",    //边线颜色。
            fillColor:"green",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,        //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,     //边线透明度，取值范围0 - 1。
            fillOpacity: 0.6,       //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid'    //边线的样式，solid或dashed。
        };
        this.DrawingManagerJson = {
            isOpen: false,                        //是否开启绘制模式
            enableDrawingTool: true,              //是否显示工具栏
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT,      //位置
                offset: new BMap.Size(200, 5),      //偏离值
            },
            circleOptions: this.styleOptions,            //圆的样式
            polylineOptions: this.styleOptions,          //线的样式
            polygonOptions: this.styleOptions,           //多边形的样式
            rectangleOptions: this.styleOptions          //矩形的样式
        };
        this.drawingManager = new BMapLib.DrawingManager(map, this.DrawingManagerJson );
    }
    DrawOverlay.prototype.overlaycomplete = function(e){
        DrawOverlay.overlays.push(e.overlay);
    };
    DrawOverlay.prototype.clearOverlay = function(e){
        var ev = e;
        var markerMenu=new BMap.ContextMenu();
        var menuItem = new  BMap.MenuItem('清除绘制',function(){
            map.removeOverlay(ev.overlay);
        });
        var menuItemAll = new  BMap.MenuItem('清除所有绘制',function(){
            DrawOverlay.overlays.forEach( function( overlay ){  map.removeOverlay(overlay); } );
        });
        markerMenu.addItem( menuItem );
        markerMenu.addItem( menuItemAll );
        ev.overlay.addContextMenu(markerMenu);
    };
    DrawOverlay.prototype.init = function(){
        this.drawingManager.addEventListener('overlaycomplete', this.overlaycomplete);
        this.drawingManager.addEventListener('overlaycomplete', this.clearOverlay);
    }
    
    var drawOverlay = new DrawOverlay();
    drawOverlay.init();

    //关键字查询
    var local = new BMap.LocalSearch(map, { renderOptions:{map: map, panel: "resultPanel"} }); 
    var js = document.getElementById('jd');
    var zs = document.getElementById('zs');
    var cy = document.getElementById('cy');
    var yy = document.getElementById('yy');
    var gw = document.getElementById('gw');
    var result = document.getElementById('resultPanel');
    var setResultDisblock = function(e){
        var e = window.event || e;  
        result.style.display = 'block';
        e.stopPropagation();
        e.cancelBubble = true;
        return false;
    }
    js.onclick = function(e){
        local.search(["临潼景点","临潼景区"]);
        setResultDisblock.call(this,e);
    }
    zs.onclick = function(e){ 
        local.search(["临潼宾馆","临潼住宿", "临潼酒店","临潼"]); 
        setResultDisblock.call(this,e);
    }
    cy.onclick = function(e){ 
        local.search(["临潼餐饮","临潼小吃","临潼","临潼饮食","临潼餐馆","临潼饭店","临潼饭庄"]); 
        setResultDisblock.call(this,e);
    }
    yy.onclick = function(e){ 
        local.search(["临潼医院","临潼诊所"]); 
        setResultDisblock.call(this,e);
    }
    gw.onclick = function(e){ 
        local.search(["临潼购物","临潼超市","临潼商城","临潼便利店","临潼商场","临潼奥特莱斯","临潼"]); 
        setResultDisblock.call(this,e);
    }
    document.onclick = function(){ 
        result.style.display = 'none';
    };

    //样式选择
    function changeMapStyle(style){
        map.setMapStyle({style:style});
    }
    var styleList = document.getElementById('stylelist');
    styleList.onchange = function(){
        changeMapStyle(this.value);
    }


    //关键字提示
    var myValue;
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" : "suggestId"
        ,"location" : map
    });

    ac.addEventListener("onhighlight", function(e) {   });//鼠标放在下拉列表上的事件 
       
    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        setPlace();
    });

    function setPlace(){
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun(){
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 18);
            map.addOverlay(new BMap.Marker(pp));    //添加标注
        }
        var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(myValue);
    }

    //路况提示
    var ctrl = new BMapLib.TrafficControl({
        showPanel: false        //是否显示路况提示面板
    });      
    map.addControl(ctrl);
    ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);  
    ctrl.setOffset( new BMap.Size(180,20) );

    //驾车路线
    var drivingWay = document.getElementById('driving_way');
    var drivingSelect = drivingWay.getElementsByTagName('select')[0];
    var drivingBtn = document.getElementById('driving_btn');
    //三种驾车策略：最少时间，最短距离，避开高速
    var routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME,BMAP_DRIVING_POLICY_LEAST_DISTANCE,BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];
    var routeAutoStart = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" : "start"
        ,"location" : map
    });
    var routeAutoEnd = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" : "end"
        ,"location" : map
    });
    drivingBtn.onclick = function(){
        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
        var routeFun = drivingSelect.value;
        var driving, output;

        var search = function(start,end,route,searchComplete){ 
            driving = new BMap.DrivingRoute(map, {
                    renderOptions:{map: map, autoViewport: true},
                    policy: route,  
                    onSearchComplete: searchComplete,
                    onPolylinesSet: function(){ 
                        alert(output); 
                    }
                } );

            driving.search(start,end);
        }

        var searchComplete = function(results){
            if (driving.getStatus() != BMAP_STATUS_SUCCESS){
                return ;
            }
            var plan = results.getPlan(0);
            output = '总路程为：' + plan.getDistance(true);
        }

        map.clearOverlays(); 
        search(start,end,routePolicy[routeFun],searchComplete); 
    };

    // function showInfo(e){
    //     alert(e.point.lng + ", " + e.point.lat);
    // }
    // map.addEventListener("click", showInfo);

}
