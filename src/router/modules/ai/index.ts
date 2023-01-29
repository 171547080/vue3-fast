const system = [
  {
    name: "AI",
    path: "/ai",
    redirect: { name: "VehicleTypePages" },
    component: () => import('@views/ai/Ai.vue'),
    children: [
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
      }
    ]
  }
]
export default system
