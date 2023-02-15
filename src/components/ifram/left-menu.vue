<template>
  <div>
    <a-button v-show="false" class="open-btn" @click="toggleCollapsed">
      <menu-unfold-outlined v-if="collapsed" />
      <menu-fold-outlined v-else />
    </a-button>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      class="menu"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      :style="{width:menusWidth}"
    >
      <template v-for="d in newMenus">
        <template v-if="d.children && d.children.length">
          <a-sub-menu :key="d.name">
            <template #icon>
              <component :is="d.icon" class="icon" />
            </template>
            <template #title>{{ d.title }}</template>
            <a-menu-item
              v-for="subItem in d.children"
              :key="subItem.name"
              @click="hangleMenuItemClick(subItem)"
            >
              {{ subItem.title }}
            </a-menu-item>
          </a-sub-menu>
        </template>
        <a-menu-item v-else :key="d.name" @click="hangleMenuItemClick(d)">
          <template #icon>
            <component :is="d.icon" class="icon" />
          </template>
          <span>{{ d.title }}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, ref, computed } from 'vue'
import { recursiveFindItem, getParentNodeToArray } from '../../utils/tree'
// 暂时按照meuns中配置的图标按需引入
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  BlockOutlined,
  DotChartOutlined,
  ChromeOutlined,
  SplitCellsOutlined,
  AimOutlined,
  UserOutlined,
  FlagOutlined,
  AuditOutlined
} from '@ant-design/icons-vue'
import router from '@/router'

import { MeunItemType, MeunType } from './type/LeftMenu'
interface MenusState {
  collapsed: boolean;
  selectedKeys: Array<string>;
  openKeys: Array<string>;
  preOpenKeys: Array<string>;
}

/**
 * 获取包含当前url的router对象的name数组
 * @param router router对象
 * @param url url
 */

// const getRouterName = (router, includeUrl: string) => {
//   const result: Array<string> = []
//   if (router && router.getRoutes) {
//     router.getRoutes().forEach((r) => {
//       if (r.path.indexOf(includeUrl)) {
//         result.push(r.name)
//       }
//     })
//   }

//   return result
// }

const handleRouterChange = (
  state: MenusState,
  menus: Array<MeunType>,
  router
) => {
  // 获取当前路由名称
  const currentRouterName = router.currentRoute.value.name

  // 根据路由名称获取当前激活的菜单项 - 按照路由名称查询
  const handleMeuns = recursiveFindItem(menus, 'routerName', currentRouterName)

  if (!handleMeuns || !handleMeuns.length) {
    return
  }
  const currentMeun = handleMeuns[0]

  // 菜单树中，展开所有父节点
  const openKeys = getParentNodeToArray(
    currentMeun.parentNode,
    'parentNode'
  ).map((item) => item.name)

  // 修改对应state中的状态
  state.selectedKeys = [currentMeun.name]
  state.openKeys = openKeys
}

export default defineComponent({
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    BlockOutlined,
    DotChartOutlined,
    ChromeOutlined,
    SplitCellsOutlined,
    AimOutlined,
    UserOutlined,
    FlagOutlined,
    AuditOutlined
  },
  props: {
    // menus 为 Array<MeunType> 格式
    menus: {
      type: Array,
      default: () => {
        return []
      }
    },
    width: {
      type: Number,
      default: 200
    }
  },
  setup(props) {
    const newMenus = ref(props.menus as Array<MeunType>)
    const menusWidth = computed(() => { return props.width + 'px' })
    const state = reactive({
      collapsed: false,
      selectedKeys: [''],
      openKeys: [''],
      preOpenKeys: ['']
    })

    handleRouterChange(state, newMenus.value, router)

    // 监听路由变化，激活服务按钮
    watch(
      () => router.currentRoute.value.path,
      () => {
        handleRouterChange(state, newMenus.value, router)
      },
      { immediate: true }
    )

    // 监听展开栏内容，记录当前展开状态，缩放菜单栏时恢复原来状态
    watch(
      () => state.openKeys,
      (_val, oldVal) => {
        state.preOpenKeys = oldVal
      }
    )

    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed
      state.openKeys = state.collapsed ? [] : state.preOpenKeys
    }

    // 菜单路由跳转
    const hangleMenuItemClick = (meunItem: MeunItemType) => {
      if (meunItem.routerName) {
        router.push({ name: meunItem.routerName as string })
      }
    }
    return {
      newMenus,
      menusWidth,
      ...toRefs(state),
      toggleCollapsed,
      hangleMenuItemClick
    }
  }
})
</script>
<style lang="less" scoped>

.ant-menu {
  height: 100%;
  // font-weight: bold;
}

.open-btn {
  position: absolute;
  z-index: 999;
  top: -58px;
  left: 5px;
  border: 0;
  background: transparent;
  font-size: 30px;
  color: aliceblue;
  width: 55px;
  height: 55px;
  vertical-align: baseline;
  background: transparent;
}

.menu {
  // background: #32323a;
  padding-top: 5px;
  font-size: 16px;
}

.ant-menu {
  :deep(.ant-menu-submenu-title > .ant-menu-title-content) {
    padding-right: 10px;
  }

  :deep(.ant-menu-item > .ant-menu-title-content) {
    padding-right: 10px;
  }

  :deep(.ant-menu-dark .ant-menu-item){
    padding-top: 30px;
    padding-bottom: 30px;
    margin: 0;
    border: solid #35353d 1px;
  }
  :deep(.ant-menu-dark .ant-menu-item){
    color: #fff;
  }

  // 覆盖不了
  :deep(.ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected) {
    background: #386cbd;
  }
}

.icon {
  font-size: 20px;
}
</style>
