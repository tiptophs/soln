/**
 * 这是一个项目常用配置项
 */

// 创建分类工具类型选项
const _LINK_TOOL_TYPE = {
  'media' : '媒体资源',
  'picture' : '图片资源',
  'text' : '文本资源',
  'web' : '网站资源',
}

// 创建分类工具内容模式选项
const _LINK_TOOL_MODE = {
  'single' : '单一模式',
  'group' : '组合模式'
}

/**
 *对象key和value对换
 */
function changeObject(data) {
  let nData = {}
  for (let k in data) {
    let value = data[k]; 
    nData[value] = k;
  }
  return nData;
}

/**
 * 通过获取的名称获取当前key数组
 */
function getKeysFromLink(value, type) {
  let nValue = [];
  const nData = type === 'mode'? changeObject(_LINK_TOOL_MODE) : changeObject(_LINK_TOOL_TYPE)
  // 循环数据
  value.forEach(element => {
    nValue.push(nData[element])
  });
  return nValue;
}

/**
 * 通过key获取完整对象
 */
function getCompoleteConfig(value, type) {
  let nValue = {};
  const nData = type === 'mode'? _LINK_TOOL_MODE : _LINK_TOOL_TYPE
  value.forEach(element => {
    nValue[element] = nData[element]
  })
  return nValue;
}

export {
  _LINK_TOOL_TYPE,
  _LINK_TOOL_MODE,
  getKeysFromLink,
  getCompoleteConfig
}

