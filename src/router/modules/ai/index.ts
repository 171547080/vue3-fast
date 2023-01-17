const system = [
  {
    name: "AI",
    path: "/ai",
    redirect: { name: "TrafficJamVideo" },
    component: () => import('@views/ai/Ai.vue'),
    children: []
  }
]
export default system
