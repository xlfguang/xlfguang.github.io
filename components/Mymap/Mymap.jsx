import { useEffect, useRef } from "react";

function Mymap() {
  const mapRef = useRef(null);
  function setMap() {
    //初始化地图
    let center = new TMap.LatLng(30.80859, 104.078417)
    //定义map变量，调用 TMap.Map() 构造函数创建地图
    let map = new TMap.Map(document.getElementById('mapRef'), {
      disableDefaultUI: true,
      center: center,//设置地图中心点坐标
      zoom: 17,   //设置地图缩放级别
      baseMap: {  // 设置卫星地图
        type: 'satellite',
        features: ['base', 'building2d']
      },
   

    });


    let marker = new TMap.MultiMarker({
      map: map,
      enableDefaultStyle: false,
      styles: {
        // 点标记样式
        'myStyle': new TMap.MarkerStyle({
          width: 20, // 样式宽
          height: 30, // 样式高
          anchor: { x: 10, y: 30 }, // 描点位置
          src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png" // 样式图片
        }),
      },
      geometries: [
        // 点标记数据数组
        {
          // 标记位置(纬度，经度，高度)
          position: center,
          id: "1",   //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
          styleId: 'myStyle',  //指定样式id
          properties: {//自定义属性
            title: "我的公司"
          }
        },
      ],
    });

  }
  useEffect(() => {
    setMap();
  }, [])
  return (
    <div
      id="mapRef"
      className="Mymap"
      ref={mapRef}
    ></div>
  )
}
export default Mymap;