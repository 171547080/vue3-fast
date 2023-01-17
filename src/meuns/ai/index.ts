export default [
  {
    name: 'AiTrafficJam',
    title: '高速公路拥堵识别',
    icon: 'block-outlined',
    routerName: 'TrafficJam',
    permission: '',
    children: [
      {
        name: 'AiTrafficJamVideo',
        title: '图像识别',
        icon: 'pie-chart-outlined',
        routerName: 'TrafficJamVideo',
        permission: ''
      },
      {
        name: 'AiTrafficJamMonitor',
        title: '监控设备',
        icon: 'pie-chart-outlined',
        routerName: 'TrafficJamMonitor',
        permission: ''
      },
      {
        name: 'AiTrafficJamAlarm',
        title: '告警信息',
        icon: 'pie-chart-outlined',
        routerName: 'TrafficJamAlarm',
        permission: ''
      }
    ]
  },
  {
    name: 'AiTrafficJamForecast',
    title: '城市拥堵预测',
    icon: 'dot-chart-outlined',
    routerName: '',
    permission: '',
    children: [
      {
        name: 'AiVehicleTypePages',
        title: '拥堵预测',
        icon: '',
        routerName: 'TrafficJamForecast',
        permission: ''
      },
      {
        name: 'AiTrafficJamForecastMap',
        title: '拥堵预测地图',
        icon: '',
        routerName: 'TrafficJamForecastMap',
        permission: ''
      }, {
        name: 'AiTrafficJamForecastLevelConfig',
        title: '拥堵等级配置',
        icon: 'pie-chart-outlined',
        routerName: 'TrafficJamForecastLevelConfig',
        permission: ''
      }
    ]

  },
  {
    name: 'AiVehicleType',
    title: '精细化车型识别',
    icon: 'chrome-outlined',
    routerName: 'VehicleTypePages',
    permission: ''
  },
  {
    name: 'AiLicensePlate',
    title: '车牌定位与识别',
    icon: 'aim-outlined',
    routerName: 'LicensePlate',
    permission: ''
  },
  {
    name: 'AiHighwayDiseases',
    title: '公路病害定位',
    icon: 'split-cells-outlined',
    routerName: 'HighwayDiseases',
    permission: ''
  }
]

