export const CarTypeMap = {
  // "CAR": "汽车",
  "MPV": "多用途汽车",
  "BUS": "公共汽车",
  "TRUCK": "卡车",
  "BICYCLE": "自行车",
  "MOTORCYCLE": "摩托车",
  "SUV": "运动型多用途汽车",
  "VAN": "厢式货车",
  "SEDAN": "小轿车",
  "THREE_WHEELER": "三轮车",
  "DANGEROUS_CHEMICAL_VEHICLE": "危化品车辆",
  "TRAIN": "火车"
  // "UNKNOW": "未知",
}
interface CarTypeItem {
    key: string
    name: string
    cnName: string
}
const result = new Array<CarTypeItem>()
const resultIndexMap = {}
Object.keys(CarTypeMap).forEach((key, index) => {
  // 存储key对应的当前数组的下标
  resultIndexMap[key] = index
  result.push({
    key: key,
    name: key,
    cnName: CarTypeMap[key]
  })

})

export const CarTypeArray = result
export function getArrayIndexByKey(key: string) {
  return resultIndexMap[key]
}
