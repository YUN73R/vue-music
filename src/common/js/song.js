import { getNewMusicUrl } from 'api/request'
export default class Song {
    constructor({id, mid, singer, songname, album, duration, image, url}) {
       this.id = id
       this.mid = mid
       this.singer = singer
       this.songname = songname
       this.album = album
       this.duration = duration
       this.image = image
       this.url = url
    }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filteSinger(musicData.singer),
        songname: musicData.songname,
        album: musicData.album,
        duration: musicData.duration,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: ''//getUrl(musicData.songmid)
    })
}

function filteSinger(singer) {
    let res = []
    if(!singer) return ''
    singer.forEach((i) => {
        res.push(i.name)
    })
    return res.join('/')
}

function getUrl(id) {
    let url = ''
    getNewMusicUrl(id).then(res => {
        if(res.code === 0) {
            url = res.req_0.data.sip[1] + res.req_0.data.midurlinfo[0].purl
        }
        console.log(url);
        return url
        
    })
}