export const produceNamespace = filename => {
  return filename.replace(/\.[j|t]s(x?)/, '')
}

export const isSSR = fn => {
  if (typeof window !== 'undefined') {
    fn(window)
  }
}
