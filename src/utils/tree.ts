/*
 * @Description: 树型结构数组工机具
 * @Author: laigt
 * @Date: 2023-02-2
*/

// 获取树节点的父级所有节点   parentKey=父级节点key
export function getParentNodeToArray(node, parentKey = 'parentNode') {
  let result = new Array<any>()
  if (node) {
    result.push(node)
  }
  if (node && node.parentNode) {
    result = result.concat(getParentNodeToArray(node.parentNode, parentKey))
  }
  return result
}

//  tree:树结构数组   key:查询键值   value:值
/**
 * 递归查询树中符合条件的节点
 * @param tree   树结构数组
 * @param key    查询键名
 * @param value  查询值
 * @param parent 父节点，可为空
 * @returns 自定义将父节点信息保存到item[parentNode]上
 */
export function recursiveFindItem(tree, key, value, parent = null) {
  let result = new Array<any>()

  tree.forEach((item) => {
    if (item && item[key] === value) {
      // 记录父级节点信息
      // item.parentNode = parent
      result.push({ ...item, parentNode: parent })
    }
    if (item.children && item.children.length) {
      const childrenItems = recursiveFindItem(item.children, key, value, item)
      result = result.concat(childrenItems)
    }
  })
  return result
}

export default { getParentNodeToArray, recursiveFindItem }
