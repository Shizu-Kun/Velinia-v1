import axios from 'axios'
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  args
}) => {
  try {
    if (!args[0]) return m.reply(`Contoh : ${usedPrefix + command} https://youtube.com/watch?v=UsJ7g988dSo`)
    if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) return m.reply('URL Tidak valid')
    m.reply('Wait')
    const json = await axios.get('https://api.alyachan.dev/api/ytv?url=' + args[0] + '&apikey=Ariel1')
    let ca = `  ∘  *Title* : ` + json.data.title + `\n`
    ca += `  ∘  *Duration* : ` + json.data.duration + `\n`
    ca += `  ∘  *Viewer* : ` + json.data.views + `\n`
    ca += `  ∘  *Size* : ` + json.data.data.size + `\n\n`
    conn.sendMessage(m.chat, {
      video: { url: json.data.data.url },
      caption: ca,
      fileName: json.data.title + '.mp4',
      mimetype: 'video/mp4'
    }, { quoted: m })
  } catch (e) {
    console.log(e)
    return m.reply(e)
  }
}
handler.help = ['ytmp4']
handler.tags = ['downloader']
handler.command = ['ytv', 'ytmp42']
handler.limit = 1
export default handler