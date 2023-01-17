const system = [
  {
    name: "AI",
    path: "/ai",
    redirect: { name: "TrafficJamVideo" },
    component: () => import('@views/ai/Ai.vue'),
    children: [
      {
        name: "TrafficJamVideo",
        path: "/ai/trafficJam/video",
        meta: {
          title: "高速公路拥堵识别-图像识别"
        },
        component: () => import('@views/ai/jam/video/TrafficJamVideo.vue')
      },
      {
        name: "TrafficJamVideoDetail",
        path: "/ai/trafficJam/video/:id",
        meta: {
          title: "高速公路拥堵识别-图像识别",
          showGoBack: true,
          goBackRouterName: 'TrafficJamVideo'
        },
        component: () => import('@views/ai/jam/video/detail/TrafficJamVideoDetail.vue')
      },
      {
        name: "TrafficJamMonitor",
        path: "/ai/trafficJam/monitor",
        meta: {
          title: "高速公路拥堵识别-监控信息"
        },
        component: () => import('@views/ai/jam/monitor/TrafficJamMonitor.vue')
      },
      {
        name: "TrafficJamAlarm",
        path: "/ai/trafficJam/alarm",
        meta: {
          title: "高速公路拥堵识别-告警信息"
        },
        component: () => import('@views/ai/jam/alarm/TrafficJamAlarm.vue')
      },
      {
        name: "TrafficJamForecast",
        path: "/ai/trafficJamForecast",
        meta: {
          title: "城市拥堵预测"
        },
        component: () => import('@views/ai/jamForecast/JamForecast.vue')
      },
      {
        name: "TrafficJamForecast",
        path: "/ai/forecast",
        meta: {
          title: "城市拥堵预测"
        },
        component: () => import('@views/ai/jamForecast/JamForecast.vue')
      },
      {
        name: "TrafficJamForecastMap",
        path: "/ai/forecast/map",
        meta: {
          title: "城市拥堵预测地图"
        },
        component: () => import('@views/ai/jamForecast/map/JamForecastMap.vue')
      },
      {
        name: "TrafficJamForecastLevelConfig",
        path: "/ai/forecast/config",
        meta: {
          title: "市拥堵预测-拥堵等级配置"
        },
        component: () => import('@views/ai/jamForecast/levelConfig/TrafficJamLevelConfig.vue')
      },
      {
        name: "TrafficJamForecastDetail",
        path: "/ai/forecast/:roadName/:datasourceId",
        meta: {
          title: "城市拥堵预测",
          showGoBack: true,
          goBackRouterName: 'TrafficJamForecast'
        },
        component: () => import('@views/ai/jamForecast/detail/JamForecastDetail.vue')
      },
      {
        name: "VehicleTypePages",
        path: "/ai/vehicleType",
        meta: {
          title: "精细化车型识别"
        },
        component: () => import('@views/ai/vehicleType/VehicleTypePages.vue')
      },
      {
        name: "VehicleTypeImageDetail",
        path: "/ai/vehicleType/image/:id",
        meta: {
          title: "精细化车型识别",
          showGoBack: true,
          goBackRouterName: 'VehicleTypePages'
        },
        component: () => import('@views/ai/vehicleType/VehicleTypeImages.vue')
      },
      {
        name: "VehicleTypeVideoDetail",
        path: "/ai/vehicleType/video/:id",
        meta: {
          title: "精细化车型识别",
          showGoBack: true,
          goBackRouterName: 'VehicleTypePages'
        },
        component: () => import('@views/ai/vehicleType/VehicleTypeVideo.vue')
      },
      {
        name: "LicensePlate",
        path: "/ai/licensePlate",
        meta: {
          title: "车牌定位与识别"
        },
        component: () => import('@views/ai/licensePlate/LicensePlate.vue')
      },
      {
        name: "LicensePlateDetail",
        path: "/ai/licensePlate/detai/:id",
        meta: {
          title: "车牌定位与识别",
          showGoBack: true,
          goBackRouterName: 'LicensePlate'
        },
        component: () => import('@views/ai/licensePlate/detail/LicensePlateDetail.vue')
      },

      {
        name: "HighwayDiseases",
        path: "/ai/highwayDiseases",
        meta: {
          title: "公路病害定位"
        },
        component: () => import('@views/ai/highwayDiseases/HighwayDiseases.vue')
      },
      {
        name: "HighwayDiseasesDetail",
        path: "/ai/highwayDiseases/detai/:id",
        meta: {
          title: "公路病害定位",
          showGoBack: true,
          goBackRouterName: 'HighwayDiseases'
        },
        component: () => import('@views/ai/highwayDiseases/detail/HighwayDiseasesDetail.vue')
      }

    ]

  }
]
export default system
