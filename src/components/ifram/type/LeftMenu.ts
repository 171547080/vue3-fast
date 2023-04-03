export interface MeunItemType {
    name: string
    title: string
    icon?: string
    iconComp: Comment
    routerName: string
    routerPath?: string
    subNav?: Array<MeunItemType>
    permission?: string
}

export interface MeunType {
    name: string
    title: string
    icon?: string
    iconComp: Comment
    routerName: string
    routerPath?: string
    permission?: string
    children?: Array<MeunItemType>
    url: string
}

export const MeunTypeHelper = function (): Array<MeunType> {
  return [] as Array<MeunType>
}
