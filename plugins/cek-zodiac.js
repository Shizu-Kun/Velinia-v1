/* JANGAN HAPUS INI 
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (6282389924037)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/
let handler = async (m, { text }) => {
  let starPoints = parseInt(text)
  if (isNaN(starPoints)) throw 'Format salah, gunakan angka untuk poin bintang'
  
  let maxDiamond = 1700 - (starPoints * 17)
  maxDiamond = Math.max(17, maxDiamond) // Memastikan bahwa maxDiamond tidak kurang dari 17
  
  m.reply(`
Poin bintang: ${starPoints}
Membutuhkan maksimal ${maxDiamond} Diamond untuk mendapatkan skin Zodiac.
`)
}

handler.help = ['czo <jumlah_poin_bintang>']
handler.tags = ['store']
handler.command = /^(czo)$/i
handler.exp = 5

export default handler