/**@typedef {import('csstype').Properties} CssStyle*/

/**
 * @param {CssStyle} style 
 * @returns {string}
 * */
function toCssString(style) {
  let keys = Object.keys(style)
  return keys.reduce((acc, cur) => {
    acc += `${convertCamelCaseToDashed(cur)}: ${style[cur]};`
  }, "");
}

/**
 * @param {string} property
 * @returns {string} 
 * */
function convertCamelCaseToDashed(property) {
  /**@type {string}*/
  let output;
  /**@type {string}*/
  const capitals = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ']
  for (let i = 0; i < property.length; i++) {
    if (capitals.includes(property[i]))
      output += '-' + property[i].toLowerCase()
    else
      output += property[i]
  }
  return output
}
