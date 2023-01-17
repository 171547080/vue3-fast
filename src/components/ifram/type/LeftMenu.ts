export interface MeunItemType {
    name: string
    title: string
    icon?: string
    routerName: string
    permission?: string
}

export interface MeunType {
    name: string
    title: string
    icon?: string
    routerName: string
    permission?: string
    children?: Array<MeunItemType>
    url: string
}

export const MeunTypeHelper = function (): Array<MeunType> {
  return [] as Array<MeunType>
}
