export const produceNamespace = filename => {
  return filename.replace(/\.[j|t]s(x?)/, '')
}
