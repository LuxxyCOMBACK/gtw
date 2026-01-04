const LRU = new Map()
const groupLocks = new Map()
const groupCooldowns = new Map()

let isFetchingAll = false
let lastFetchAll = 0

const sleep = ms => new Promise(res => setTimeout(res, ms))

function cleanLRU(maxSize = 500) {
  if (LRU.size > maxSize) {
    const keys = Array.from(LRU.keys())
    for (let i = 0; i < Math.floor(maxSize / 10); i++) {
      LRU.delete(keys[i])
    }
  }
}

async function safeGroupMetadata(sock, jid, opts = {}) {
  const ttl = opts.ttl ?? 5 * 60_000
  const key = `meta:${jid}`

  const cached = LRU.get(key)
  if (cached && cached.expires > Date.now()) return cached.value

  try {
    const meta = await sock.groupMetadata(jid)
    LRU.set(key, { value: meta, expires: Date.now() + ttl })
    cleanLRU()
    return meta
  } catch (err) {
    const e = String(err).toLowerCase()
    if (e.includes("forbidden") || err?.data === 403) {
      console.warn(`[403] skip metadata ${jid}`)
      return null
    }
    throw err
  }
}

async function fetchAllGroupsSafe(sock) {
  if (isFetchingAll) {
    while (isFetchingAll) await sleep(500)
    return Object.fromEntries(
      [...LRU]
        .filter(([k]) => k.startsWith("meta:"))
        .map(([k, v]) => [k.replace("meta:", ""), v.value])
    )
  }

  const now = Date.now()
  if (now - lastFetchAll < 5 * 60 * 1000) {
    const cached = Object.fromEntries(
      [...LRU]
        .filter(([k]) => k.startsWith("meta:"))
        .map(([k, v]) => [k.replace("meta:", ""), v.value])
    )
    if (Object.keys(cached).length) return cached
  }

  isFetchingAll = true
  try {
    const data = await sock.groupFetchAllParticipating()
    for (const [jid, meta] of Object.entries(data)) {
      LRU.set(`meta:${jid}`, {
        value: meta,
        expires: Date.now() + 5 * 60 * 1000
      })
    }
    lastFetchAll = Date.now()
    return data
  } catch (e) {
    console.error("fetchAllGroupsSafe gagal:", e)
    return Object.fromEntries(
      [...LRU]
        .filter(([k]) => k.startsWith("meta:"))
        .map(([k, v]) => [k.replace("meta:", ""), v.value])
    )
  } finally {
    isFetchingAll = false
  }
}

async function pMapLimit(iterable, mapper, limit = 3) {
  const results = []
  const items = Array.from(iterable)
  let i = 0
  const pool = []

  async function next() {
    if (i >= items.length) return

    const index = i++
    const promise = Promise.resolve().then(() => mapper(items[index], index))
    results[index] = promise

    const poolItem = promise.then(() => {
      const idx = pool.indexOf(poolItem)
      if (idx >= 0) pool.splice(idx, 1)
    })

    pool.push(poolItem)
    if (pool.length >= limit) await Promise.race(pool)

    return next()
  }

  await next()
  return Promise.all(results)
}

module.exports = {
  safeGroupMetadata,
  fetchAllGroupsSafe,
  pMapLimit
}