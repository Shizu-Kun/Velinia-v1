let handler = async (m, { conn }) => {
  let stats = Object.entries(db.data.stats).map(([key, val]) => {
    let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' & ') : plugins[key]?.help || key 
    if (/exec/.test(name)) return
    return { name, ...val }
  })
  stats = stats.sort((a, b) => b.total - a.total)
  let txt = stats.slice(0, 10).map(({ name, total, last }, idx) => {
    if (name.includes('-') && name.endsWith('.js')) name = name.split('-')[1].replace('.js', '')
    return `(${idx + 1})\nCommand : *${name}*\nHit : *${total}x*\nLast Used : *${getTime(last)}*`
  }).join`\n\n`
  await conn.relayMessage(m.chat, { 
    reactionMessage: { key: m.key, text: '📊' } // Emoji reaksi
  }, { 
    messageId: m.key.id 
  });
  await conn.sendMessage(m.chat, {
    text: `*Dashboard ${conn.user.name}* 📈\n\n${txt}`,
    contextInfo: {
      externalAdReply: {
        title: 'Riwayat Penggunaan Bot 🕰️',
        body: 'Lihat seberapa sering fitur bot digunakan!',
        thumbnailUrl: global.vynaajpg,
        sourceUrl: link.web,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
};

handler.help = ['dashboard' ,'riwayat'];
handler.tags = ['info','rpg'];
handler.command = /^(riwayat|dashboard)$/i;

export default handler;

export function parseMs(ms) {
  if (typeof ms !== 'number') throw 'Parameter must be filled with number'
  return {
    days: Math.trunc(ms / 86400000),
    hours: Math.trunc(ms / 3600000) % 24,
    minutes: Math.trunc(ms / 60000) % 60,
    seconds: Math.trunc(ms / 1000) % 60,
    milliseconds: Math.trunc(ms) % 1000,
    microseconds: Math.trunc(ms * 1000) % 1000,
    nanoseconds: Math.trunc(ms * 1e6) % 1000
  }
}

export function getTime(ms) {
  let now = parseMs(+new Date() - ms)
  if (now.days) return `${now.days} days ago`
  else if (now.hours) return `${now.hours} hours ago`
  else if (now.minutes) return `${now.minutes} minutes ago`
  else return `a few seconds ago`
}