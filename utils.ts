export const perf = (f: () => void, t?: string) => {
  const before = new Date()
  f()
  const after = new Date()

  const d = after.getTime() - before.getTime()

  console.log(`perf = ${t ?? ''} | ${d}ms`)
}
