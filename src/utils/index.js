export const produceNamespace = filename => {
  return filename.replace(/\.[j|t]s(x?)/, '')
}

export const isSSR = fn => {
  if (typeof window !== 'undefined') {
    fn(window)
  }
}

export const decode = str => {
  return decodeURIComponent(str)
    .replace(/[^\dA-Za-z\u3007\u4E00-\u9FCB\uE815-\uE864]/g, '')
    .split('')
    .reverse()
    .join('')
}

export const encode = str => {
  return str
    .toString()
    .replace(/[^\dA-Za-z\u3007\u4E00-\u9FCB\uE815-\uE864]/g, '')
    .split('')
    .reverse()
    .join('')
}
