/**
 * @fileoverview Utilities for the batch add-task model.
 * Normalizes external inputs (deep links, drag-drop, file picker) into
 * BatchItem entries for the unified add-task dialog.
 */
import type { BatchItemKind, BatchItem } from '@shared/types'

let nextId = 0

/** Deterministic, incrementing ID for batch items. */
function genId(): string {
  return `batch-${++nextId}`
}

/** Detect the kind of a source path or URI. */
export function detectKind(source: string): BatchItemKind {
  const lower = source.toLowerCase()
  if (lower.endsWith('.torrent') || lower.includes('.torrent')) return 'torrent'
  if (
    lower.endsWith('.metalink') ||
    lower.endsWith('.meta4') ||
    lower.includes('.metalink') ||
    lower.includes('.meta4')
  )
    return 'metalink'
  return 'uri'
}

/** Extract a short display name from a source path or URI. */
function toDisplayName(source: string, kind: BatchItemKind): string {
  if (kind === 'uri') {
    // Truncate long URIs for display
    return source.length > 80 ? source.substring(0, 77) + '...' : source
  }
  // File path — extract basename
  const sep = Math.max(source.lastIndexOf('/'), source.lastIndexOf('\\'))
  return sep >= 0 ? source.substring(sep + 1) : source
}

/** Create a pending BatchItem from a raw input. Payload is set later for file-based items. */
export function createBatchItem(kind: BatchItemKind, source: string, payload = ''): BatchItem {
  return {
    id: genId(),
    kind,
    source,
    displayName: toDisplayName(source, kind),
    payload: payload || source, // URI items use source as payload
    status: 'pending',
  }
}

/** Reset the ID counter (useful for testing). */
export function resetBatchIdCounter(): void {
  nextId = 0
}
