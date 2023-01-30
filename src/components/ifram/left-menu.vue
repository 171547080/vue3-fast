<template>
  <div>
    <a-button class="open-btn" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
    <a-menu class="menu" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="dark"
      :inline-collapsed="collapsed">
      <template v-for="(d) in newMenus">
        <template v-if="d.children && d.children.length">
          <a-sub-menu :key="d.name">
            <template #icon>
              <component :is="d.icon" class="icon" />
            </template>
            <template #title>{{ d.title }}</template>
            <a-menu-item v-for="subItem in d.children" :key="subItem.name" @click="hangleMenuItemClick(subItem)">
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
import { defineComponent, reactive, toRefs, watch, ref } from 'vue';
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
} from '@ant-design/icons-vue';
import router from '@/router';

import { MeunItemType, MeunType } from './type/LeftMenu'
interface MenusState {
  collapsed: boolean,
  selectedKeys: Array<string>,
  openKeys: Array<string>,
  preOpenKeys: Array<string>,
}

/**
 * 获取包含当前url的router对象的name数组
 * @param router router对象
 * @param url url
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRouterName = (router, includeUrl:string) => {
  const result:Array<string> = []
  if (router && router.getRoutes){
    router.getRoutes().forEach(r => {
      if (r.path.indexOf(includeUrl)){
        result.push(r.name)
      }
    });
  }
  
  return result
}

const handleRouterChange = (state: MenusState, menus: Array<MeunType>, router) => {
  // 获取当前路由名称
  const currentRouterName = router.currentRoute.value.name

  /*
  // 从路由中获取服务条件的routerName
  const currentRouterUrl= router.currentRoute.value.url
  const routerNames = getRouterName(router, currentRouterUrl)

  const openKeysMap = {}

  // 遍历routerNames 以及 menusList 获取路由对应的菜单名称
  routerNames.forEach((routerName) => {
    const menusList = recursiveFindItem(menus, 'routerName', routerName)
    menusList.forEach((m) => {
      openKeysMap[m.name] = m.name
    })
  })
  console.error(openKeysMap)
*/
  const handleMeuns = recursiveFindItem(menus, 'routerName', currentRouterName)

  
  if (!handleMeuns || !handleMeuns.length) {
    return
  }
  const currentMeun = handleMeuns[0]
 
  
  // 菜单树中，展开所有父节点
  const openKeys = getParentNodeToArray(currentMeun.parentNode, 'parentNode').map(item => item.name)

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
      default: () => { [] }
    }
  },
  setup(props) {
    const newMenus = ref(props.menus as Array<MeunType>)

    const state = reactive({
      collapsed: false,
      selectedKeys: [''],
      openKeys: [''],
      preOpenKeys: ['']
    });

    handleRouterChange(state, newMenus.value, router)

    // 监听路由变化，激活服务按钮
    watch(
      () => router.currentRoute.value.path,
      () => {
        handleRouterChange(state, newMenus.value, router)
      }, { immediate: true })

    // 监听展开栏内容，记录当前展开状态，缩放菜单栏时恢复原来状态
    watch(
      () => state.openKeys,
      (_val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );

    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };

    // 菜单路由跳转
    const hangleMenuItemClick = (meunItem: MeunItemType) => {
      if (meunItem.routerName) {
        router.push({ name: meunItem.routerName as string })
      }
    }
    return {
      newMenus,
      ...toRefs(state),
      toggleCollapsed,
      hangleMenuItemClick
    };
  }
});
</script>
<style lang="less" scoped>
@ant-menu-item-width : 150px;
@ant-menu-sub-item-width : @ant-menu-item-width - 20px;
.ant-menu {
  height: 100%;
  font-weight: bold;
}

.open-btn {
  position: absolute;
  z-index: 999;
  top: -53px;
  left: 5px;
  border: 0;
  background: transparent;
  font-size: 30px;
  color: aliceblue;
  width: 55px;
  height: 55px;
  vertical-align: baseline;
  background: #001529;
}

.ant-menu {
  :deep(.ant-menu-submenu-title > .ant-menu-title-content) {
    padding-right: 10px;
    width: @ant-menu-sub-item-width;
  }
  :deep(.ant-menu-item > .ant-menu-title-content) {
    padding-right: 10px;
    width: @ant-menu-item-width;
  }
}

.icon {
  font-size: 20px;
}
</style>
