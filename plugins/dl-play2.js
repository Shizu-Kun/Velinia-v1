import axios from 'axios'
import yts from 'yt-search'
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  if (!text) return m.reply(`${usedPrefix + command} Utopia`)
  try {
    let yt = await (await yts(text)).all
    let json = await axios.get('https://api.alyachan.dev/api/yta?url=' + yt[0].url + '&apikey=Ariel1')
    m.reply('Wait')
    let ca = `  ∘  Title : ` + json.data.title + `\n`
    ca += `  ∘  Duration : ` + json.data.duration + `\n`
    ca += `  ∘  Viewer : ` + json.data.views + `\n`
    ca += `  ∘  Size : ` + json.data.data.size
    conn.sendFile(m.chat, json.data.thumbnail, '', ca, m).then(async () => {
      await conn.sendMessage(m.chat, {
        document: { url: json.data.data.url },
        mimetype: 'audio/mp3',
        fileName: json.data.title + '.mp3'
      }, { quoted: m })
    })
  } catch (e) {
    console.log(e)
    return m.reply(e)
  }
}
handler.help = ['play']
handler.tags = ['downloader']
handler.command = ['play2', 'lagu2']
handler.limit = 1
export default handler