import { ref, onUnmounted } from 'vue'

interface DiscordUser {
  id: string
  username: string
  global_name?: string
  avatar?: string
  avatar_decoration_data?: { asset: string }
}

interface DiscordData {
  status: string
  user: DiscordUser
}

interface SpotifyData {
  song: string
  artist: string
  album: string | null
  albumArt: string | null
  trackId: string | null
  timestamps: { start: number; end?: number } | null
}

export function useLanyard(userId: string) {
  const discord = ref<DiscordData | null>(null)
  const spotify = ref<SpotifyData | null>(null)
  const isLoading = ref(true)

  let ws: WebSocket | null = null
  let heartbeat: ReturnType<typeof setInterval> | null = null
  let reconnectTimeout: ReturnType<typeof setTimeout> | null = null
  let reconnectAttempts = 0
  const maxReconnectAttempts = 5

  const STATUS_COLORS: Record<string, string> = {
    online: '#23a559',
    idle: '#f0b232',
    dnd: '#f23f43',
    offline: '#80848e',
  }

  const STATUS_LABELS: Record<string, string> = {
    online: 'Online',
    idle: 'Idle',
    dnd: 'Do Not Disturb',
    offline: 'Offline',
  }

  const statusColor = computed(() =>
    discord.value ? (STATUS_COLORS[discord.value.status] ?? '#80848e') : '#80848e'
  )

  const statusLabel = computed(() =>
    discord.value ? (STATUS_LABELS[discord.value.status] ?? 'Offline') : 'Offline'
  )

  const avatarUrl = computed(() => {
    const u = discord.value?.user
    if (!u?.avatar) return 'https://cdn.discordapp.com/embed/avatars/0.png'
    const ext = u.avatar.startsWith('a_') ? 'gif' : 'png'
    return `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${ext}?size=512`
  })

  const decorationUrl = computed(() => {
    const asset = discord.value?.user?.avatar_decoration_data?.asset
    if (!asset) return null
    return `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=512&passthrough=true`
  })

  const discordUsername = computed(() =>
    discord.value?.user?.global_name || discord.value?.user?.username || null
  )

  function connect() {
    try {
      ws = new WebSocket('wss://api.lanyard.rest/socket')

      ws.onopen = () => {
        reconnectAttempts = 0
      }

      ws.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data)

          if (data.op === 1) {
            if (heartbeat) clearInterval(heartbeat)
            heartbeat = setInterval(() => {
              if (ws?.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ op: 3 }))
              }
            }, data.d.heartbeat_interval)

            ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }))
          }

          if (data.op === 0 && (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE')) {
            const d = data.d
            discord.value = {
              status: d.discord_status,
              user: d.discord_user,
            }

            const sp = d.activities?.find(
              (a: any) => a.id === 'spotify:1' || a.type === 2
            )

            spotify.value = sp
              ? {
                  song: sp.details || 'Unknown Track',
                  artist: sp.state || 'Unknown Artist',
                  album: sp.assets?.large_text || null,
                  albumArt: sp.assets?.large_image
                    ? `https://i.scdn.co/image/${sp.assets.large_image.replace('spotify:', '')}`
                    : null,
                  trackId: sp.sync_id || null,
                  timestamps: sp.timestamps || null,
                }
              : null

            isLoading.value = false
          }
        } catch {
          // parse error
        }
      }

      ws.onerror = () => {
        isLoading.value = true
      }

      ws.onclose = () => {
        if (heartbeat) clearInterval(heartbeat)

        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000)
          reconnectTimeout = setTimeout(connect, delay)
        } else {
          isLoading.value = false
          discord.value = null
          spotify.value = null
        }
      }
    } catch {
      isLoading.value = false
      discord.value = null
      spotify.value = null
    }
  }

  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    if (heartbeat) clearInterval(heartbeat)
    if (reconnectTimeout) clearTimeout(reconnectTimeout)
    if (ws) ws.close()
  })

  return {
    discord,
    spotify,
    isLoading,
    statusColor,
    statusLabel,
    avatarUrl,
    decorationUrl,
    discordUsername,
  }
}
