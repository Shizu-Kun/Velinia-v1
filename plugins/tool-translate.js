import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, args }) => {
    let err = `
Contoh:
${usedPrefix + command} <lang> <pesan kamu>
${usedPrefix + command} id Halo Apa Kabar

Daftar bahasa yang didukung: https://cloud.google.com/translate/docs/languages
`.trim();
    
    if (!args[0]) throw err;
    
    try {
        let txt = (args.length > 1 ? args.slice(1).join(' ') : '') || '';
        let msg = m.quoted ? m.quoted.text : txt;
        
        let lang = args[0];
        let apiKey = 'GataDios'; // Your API key
        let url = `https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${apiKey}&text=${encodeURIComponent(msg)}`;
        
        let response = await fetch(url);
        let result = await response.json();
        
        if (result.error) {
            throw result.error;
        }
        
        await m.reply(result.result.translated);
    } catch (e) {
        throw err;
    }
};

handler.help = ['translate'];
handler.tags = ['tools'];
handler.command = /^(tr|translate)$/i;
handler.limit = true;

export default handler;
