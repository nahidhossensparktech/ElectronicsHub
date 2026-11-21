'use client'

import { useSyncExternalStore } from 'react'
import { type AppState, createSeed } from './seed'

const STORAGE_KEY = 'eh-store-v1'

let state: AppState = createSeed()
let hydrated = false
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage can be unavailable (private mode); the app keeps working in memory.
  }
}

/** Load saved state once on the client (called by StoreProvider after mount). */
export function hydrateStore() {
  if (hydrated) return
  hydrated = true
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AppState>
      if (parsed && typeof parsed === 'object') {
        state = {
          ...state,
          ...parsed,
          conversations: Array.isArray(parsed.conversations) && parsed.conversations.length > 0
            ? parsed.conversations.map((c) => ({
                ...c,
                shopSlug: c.shopSlug || 'tech-electronics',
                unread: typeof c.unread === 'number' ? c.unread : 0,
              }))
            : state.conversations,
          messages: parsed.messages && typeof parsed.messages === 'object'
            ? { ...state.messages, ...parsed.messages }
            : state.messages,
        }
      }
    }
  } catch {
    // Corrupt or unavailable storage: keep the seed.
  }
  emit()
}

export function getState(): AppState {
  return state
}

/** Apply an immutable update, persist it and notify subscribers. */
export function setState(update: (s: AppState) => Partial<AppState>) {
  state = { ...state, ...update(state) }
  persist()
  emit()
}

export function resetStore() {
  state = createSeed()
  persist()
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const serverState = createSeed()

/** Select a slice of app state; re-renders when that slice changes. */
export function useAppStore<T>(selector: (s: AppState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(serverState),
  )
}
