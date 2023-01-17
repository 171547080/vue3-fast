var pxAdapter = false;
// 解决一像素问题，安装真实的像素大小显示
var pxAdapterFn = function(){
  var devicePixelRatio = window.devicePixelRatio; // 几倍屏幕，逻辑像素比
  var dpr = devicePixelRatio || 1;
  var scale = 1 / dpr;
  var content = 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no'

  let meta = document.querySelector('meta[name=viewport]')
  if (!meta){
    meta = document.createElement('meta')
    meta.setAttribute('name', 'viewport')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

if (pxAdapter){
  pxAdapterFn()
  window.onorientationchange = pxAdapterFn //旋转屏幕重新校正
}

// 设计稿宽度,按照设计稿像素显示
var autoAdapter = true;
var WIDTH = 375 //不加px
var mobileAdapter = () => {
  var scale = screen.width/WIDTH
  var content = `width=${WIDTH}, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}`
  var meta = document.querySelector('meta[name=viewport]')
  if (!meta){
    meta = document.createElement('meta')
    meta.setAttribute('name', 'viewport')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

if (autoAdapter){
  mobileAdapter() //执行函数
  window.onorientationchange = mobileAdapter //旋转屏幕重新校正
}
