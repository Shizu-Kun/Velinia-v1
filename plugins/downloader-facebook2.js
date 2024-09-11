import axios from 'axios'
let handler = async (m, {
   conn,
   usedPrefix,
   command,
   args
}) => {
   try {
      if (!args[0]) return m.reply(usedPrefix + command + ' ' + 'https://fb.watch/7B5KBCgdO3')
      if (!args[0].match(/(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/)) return m.reply('Link tidak valid!')
      m.reply('Wait...')

      let json = await axios.get('https://api.botcahx.eu.org/api/dowloader/fbdown2?url=' + args[0] + '&apikey=Ariel1')
      if (!json.status) return m.reply(String(json))

      let result = json.data.result.Normal_video || json.data.result.HD

      conn.sendFile(m.chat, result, '', '', m)
   } catch (e) {
      console.log(e)
      return m.reply(String(e))
   }
}
handler.help = ['fb2']
handler.tags = ['downloader']
handler.command = /^(fb2|facebook2)$/i
handler.limit = 1
export default handler