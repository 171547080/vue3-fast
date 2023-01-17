<template>
  <div class="content-map">
    <div class="tool-bar">
      <div>
        <span class="item-label">数据源</span>
        <a-select class="item-input" style="width: 160px" @change="loadRoadData" v-model:value="info.datasourceId">
          <a-select-option v-for="(d, key) in datasourceList" :value="d.id" :key="key">{{
              d.name
          }}</a-select-option>
        </a-select>
        路况:
        <a-switch v-model:checked="trafficOn" @change="handelSwitchTraffic" checked-children="开"
          un-checked-children="关" />
      </div>
    </div>
    <a-spin size="large" :spinning="info.loading">
      <div id="map" class="map" ref="mapRef" :style="{
        width: mapInstance.width,
        height: mapInstance.height,
      }"></div>
    </a-spin>
    <transition name="fade">
      <popupMarkerInfo :data="markerInfoData" v-show="markInfo.show" :style="markInfoStyle" class="marker-info"
        ref="markInfoRef" />
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed } from "vue";
import forecastApi from "@api/forecast/forecastApi";
import popupMarkerInfo from "./popup/popupMarkerInfo.vue";
import { message } from 'ant-design-vue'
interface DatasourceItem {
  id: string
  name: string
}
const datasourceList = ref<Array<DatasourceItem>>([])

const info = reactive({
  id: '',
  datasourceId: '',
  loading: false
})

const loadSourceSelectData = () => {
  info.loading = true
  forecastApi.sourceList({}).then((res) => {
    info.loading = false
    datasourceList.value = res.data.list
    if (res.data.list && res.data.list.length) {
      info.datasourceId = res.data.list[0].id || ''
      loadRoadData()
    }
  }).catch((error) => {
    info.loading = false
    message.error(error)
  })
}

const loadRoadData = () => {
  info.loading = true
  forecastApi.list({ datasourceId: info.datasourceId }).then((res) => {
    info.loading = false

    // 清空并重置标记点
    map.clearOverlays();
    addPoint(map, res.data.list)
  }).catch((error) => {
    info.loading = false
    message.error(error)
  })
}

/**
 * 地图位置信息实例
 */
const mapRef = ref<HTMLElement>();
const mapInstance = {
  width: "100%",
  height: "780px",
  locationName: "东莞市",
  longitude: 116.46,
  latitude: 39.92
};

/**
 * 标记点详细信息浮窗
 */
const markInfoRef = ref();
const markInfo = reactive({
  top: 0,
  left: 0,
  show: false
});
const markInfoStyle = computed(() => {
  return {
    top: markInfo.top - 0 + "px",
    left: markInfo.left + 40 + "px"
  };
});

let map: any = null;

const BMap = (window as any).BMapGL || (window as any).BMap;
const markerInfoData = reactive({
  datasourceId: '',
  datasourceName: '',
  roadName: '',
  cnRoadName: '',
  latitude: '',
  longitude: ''
});
// 挂载后生成地图
onMounted(() => {
  loadSourceSelectData()

  map = new BMap.Map("map");

  // 有定位信息时，优先使用定位信息，次使用经纬度
  const location = mapInstance.locationName
    ? mapInstance.locationName
    : new BMap.Point(mapInstance.longitude, mapInstance.latitude);

  map.centerAndZoom(location, 13);

  map.enableScrollWheelZoom(true);

  handelSwitchTraffic();

  // 拖拽地图自动隐藏标记信息浮动窗
  map.addEventListener("dragstart", function () {
    hideMarkInfo();
  });

  map.addEventListener("resize", function () {
    hideMarkInfo();
  });

  map.addEventListener("zoomstart", function () {
    hideMarkInfo();
  });

  // 验证标点与经纬度是否相符
  // map.addEventListener("click", function (e: any) {
  //   const item = new BMap.Marker(
  //     new BMap.Point(e.latlng.lng, e.latlng.lat),
  //     { icon: myIcon }
  //   );
  //   map.addOverlay(item);
  // });
});

onUnmounted(() => {
  map.destroy();
});

/**
 * 处理路况信息显示开启/关闭
 */
const trafficOn = ref(false);
const handelSwitchTraffic = () => {
  if (map && trafficOn.value) {
    map.setTrafficOn();
  } else {
    map.setTrafficOff();
  }
};

let markers = new Array<any>();
// 通过 BMap.Size 和  ImageSize的配置，调整经纬度的偏移量
const myIcon = new BMap.Icon("/img/icon/camera.png", new BMap.Size(40, 40));
const myIconActive = new BMap.Icon("/img/icon/camera-active.png", new BMap.Size(40, 40));

myIcon.setImageSize(new BMap.Size(40, 40)); //设置图标大小
myIconActive.setImageSize(new BMap.Size(40, 40)); //设置图标大小
/**
 * 添加标记点
 * @param instance - map
 */
const addPoint = (instance, list) => {
  /**
   * 添加右击菜单
   */
  var menu = new BMap.ContextMenu();
  var txtMenuItem = [
    {
      text: "放大 +",
      callback: function () {
        instance.zoomIn();
      }
    },
    {
      text: "缩小 -",
      callback: function () {
        instance.zoomOut();
      }
    }
  ];
  for (var i = 0; i < txtMenuItem.length; i++) {
    menu.addItem(
      new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100)
    );
  }
  instance.addContextMenu(menu);

  // 创建点标记map
  markers = []
  if (list && list.length) {
    list.forEach((item) => {
      if (item && item.latitude && item.longitude) {
        const marker = new BMap.Marker(new BMap.Point(item.latitude, item.longitude), { icon: myIcon });
        // 保存源数据
        marker.data = item
        marker.instance = marker
        markers.push(marker)
      }
    })
  }

  // 标记所有点
  markers.forEach((item) => {
    item.ative = false;

    // 添加点击事件
    item.addEventListener("click", function (e) {
      handleClickMarker(e, item);
    });
    // 在地图上添加点标记
    instance.addOverlay(item);
  });

  const handleClickMarker = (e, marker) => {
    console.error(e.domEvent.target)
    console.error(e.domEvent.target.offsetLeft)
    showMarkInfo(marker);

    // 设置markInfo框体位置
    markInfo.left = e.domEvent.target.offsetLeft;
    markInfo.top = e.domEvent.target.offsetTop;
  };

  const updateMarkerdata = (data) => {
    markerInfoData.datasourceId = data.datasourceId;
    markerInfoData.datasourceName = data.datasourceName;
    markerInfoData.roadName = data.roadName;
    markerInfoData.cnRoadName = data.cnRoadName;
    markerInfoData.latitude = data.latitude;
    markerInfoData.longitude = data.longitude;
  }
  /**
   * 展示标记信息
   */
  const showMarkInfo = (current) => {
    updateMarkerdata(current.data)

    // 遍历有所，反选其他点
    if (!current.active) {
      markers.forEach((item) => {
        if (item.active) {
          item.active = false;
          item.setIcon(myIcon);
        }
      });
    }
    current.active = !current.active;

    // if (current.active) {
    //   current.instance.setIcon(myIconActive);
    // } else {
    //   current.instance.setIcon(myIcon);
    // }
    markInfo.show = current.active;
  };
};

const hideMarkInfo = () => {
  markers.forEach((item) => {
    item.active = false;
    item.setIcon(myIcon);
  });
  markInfo.show = false;
};
</script>

<style lang="less" scoped>
:deep(.BMap_cpyCtrl) {
  display: none;
}

:deep(.anchorBL) {
  display: none;
}

:deep(.BMap_Marker) {
  background-size: cover;
}

.item-label {
  margin-right: 10px;
}

.item-input {
  text-align: left;
  ;
  margin-right: 10px;
}

.tool-bar {
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 999;
  text-align: right;
  font-weight: bold;
}

.content-map {
  position: relative;
}

.marker-info {
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}

:deep(.ant-switch-checked) {
  background: #4fd27d;
}
</style>
