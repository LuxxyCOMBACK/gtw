const keyedPkg = require("@adiwajshing/keyed-db")
const KeyedDB = keyedPkg.default || keyedPkg

function makeOrderedDictionary(keyFn, compareFn) {
  const map = new Map()
  const list = []
  return {
    keyFn,
    compareFn,
    upsert(item, mode = "append") {
      const key = keyFn(item)
      const existingIdx = list.findIndex(i => keyFn(i) === key)
      if (existingIdx !== -1) {
        list[existingIdx] = item
        map.set(key, item)
        return { type: "update", key }
      }
      if (mode === "prepend") list.unshift(item)
      else list.push(item)
      map.set(key, item)
      return { type: "insert", key }
    },
    get(key) {
      return map.get(key)
    },
    deleteByKey(key) {
      if (!map.has(key)) return false
      map.delete(key)
      const idx = list.findIndex(i => keyFn(i) === key)
      if (idx !== -1) list.splice(idx, 1)
      return true
    },
    toArray() {
      return list.slice()
    },

    upsertMany(items, mode = "append") {
      const out = []
      for (const it of items) out.push(this.upsert(it, mode))
      return out
    }
  }
}

class ObjectRepository {
  constructor() {
    this.entityMap = new Map()
  }
  addOrReplace(entity) {
    this.entityMap.set(entity.id, entity)
    return entity
  }
  findById(id) {
    return this.entityMap.get(id)
  }
  findAll() {
    return Array.from(this.entityMap.values())
  }
  deleteById(id) {
    return this.entityMap.delete(id)
  }
  count() {
    return this.entityMap.size
  }
  toJSON() {
    return this.findAll()
  }
}

const waChatKey = (pin) => ({
  key: (c) =>
    (pin ? (c.pinned ? "1" : "0") : "") +
    (c.conversationTimestamp
      ? c.conversationTimestamp.toString(16).padStart(8, "0")
      : "") +
    c.id,
  compare: (k1, k2) => k2.localeCompare(k1),
})

const waMessageID = {
  key: (m) =>
    m.key
      ? (m.key.id || m.id)
      : (m.id || JSON.stringify(m)),
  compare: (k1, k2) => k2.localeCompare(k1),
}

const waLabelAssociationKey = {
  key: (la) => la.id,
  compare: (k1, k2) => k2.localeCompare(k1),
}

function makeInMemoryStore(config = {}) {
  const socket = config.socket
  const chatKey = config.chatKey || waChatKey(true)
  const labelAssociationKey =
    config.labelAssociationKey || waLabelAssociationKey

  const logger = config.logger || {
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {}
  }
  
  const chats = new KeyedDB(chatKey, c => c.id)
  const labelAssociations = new KeyedDB(
    labelAssociationKey,
    labelAssociationKey.key
  )

  const messages = {}
  const contacts = {}
  const groupMetadata = {}
  const presences = {}
  const state = { connection: "close" }
  const labels = new ObjectRepository()
  const assertMessageList = (phonenumber) => {
    if (!messages[phonenumber]) {
      messages[phonenumber] = makeOrderedDictionary(
        waMessageID.key,
        waMessageID.compare
      )
    }
    return messages[phonenumber]
  }

  const contactsUpsert = (newContacts = []) => {
    const oldContacts = new Set(Object.keys(contacts))
    for (const contact of newContacts) {
      oldContacts.delete(contact.id)
      contacts[contact.id] = Object.assign(
        contacts[contact.id] || {},
        contact
      )
    }
    return oldContacts
  }

  const store = {
    chats,
    messages,
    contacts,
    groupMetadata,
    presences,
    state,
    labels,
    labelAssociations,
    bind() {},
    toJSON() {
      return {
        chats: chats.toJSON ? chats.toJSON() : [],
        contacts: { ...contacts },
        messages: Object.fromEntries(
          Object.entries(messages).map(([phonenumber, dict]) => [
            phonenumber,
            dict.toArray ? dict.toArray() : []
          ])
        ),
        groupMetadata: { ...groupMetadata },
        presences: { ...presences },
        state: { ...state },
        labels: labels.toJSON ? labels.toJSON() : []
      }
    }
  }

  if (socket?.ev && typeof socket.ev.on === "function") {
    store.bind(socket.ev)
  } else if (config.ev && typeof config.ev.on === "function") {
    store.bind(config.ev)
  }
  return store
}

module.exports = makeInMemoryStore