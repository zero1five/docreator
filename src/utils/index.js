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
    .split('')
    .reverse()
    .join('')
}

export const encode = str => {
  console.log(str
    .toString()
    .split('')
    .reverse()
    .join(''))
  return str
    .toString()
    .split('')
    .reverse()
    .join('')
}
