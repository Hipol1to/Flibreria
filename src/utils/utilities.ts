export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms))

export const uid = (prefix='id') => `${prefix}_${Math.random().toString(36).slice(2, 9)}`

export const paginate = <T,>(items: T[], page: number, perPage: number) => {
  const total = items.length
  const start = (page - 1) * perPage
  const end = start + perPage
  return { items: items.slice(start, end), total, page, perPage, pages: Math.max(1, Math.ceil(total / perPage)) }
}
