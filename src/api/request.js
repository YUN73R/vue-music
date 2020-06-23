import jsonp from '../common/js/jsonp.js'
import {
    commonParams,
    options
} from './config.js'
import axios from 'axios'
export function getRecommend() { //slider数据
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    return jsonp(url, data, options)
}

export function getSongList() { //歌单数据
    //node代理
    const url = '/api/songList'
    const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    })
    return axios.get(url, {
        params: data
    }).then(res => {
        return Promise.resolve(res.data)
    })
}

export function getSingerData() { //歌手
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
    const data = Object.assign({}, commonParams, {
        notice: 0,
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })
    return jsonp(url, data, options)
}

export function getSonglistDetail(listId) { //歌单详情
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    const data = Object.assign({}, {
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        new_format: 1,
        disstid: listId,
        g_tk_new_20200303: 499647534,
        loginUin: 599526934,
        hostUin: 0,
        platform: 'yqq.json',
        needNewCode: 0
    })
    return jsonp(url, data, options)
}


export function getSingerDetail(singerid) { //歌手详情
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    const data = Object.assign({}, commonParams, {
        singermid: singerid,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        begin: 0,
        num: 80,
        songstatus: 1
    })
    return jsonp(url, data, options)
}

export function getNewMusicUrl(songmid) {
    const url = '/api/songDetail'
    const data = Object.assign({}, {
        '-': 'getplaysongvkey11420003120024114',
        g_tk: 5381,
        sign: 'zzans1macpqp4hncgf530a18e22b26565806e2f1b83b6059e2',
        loginUin: 599526934,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        data: {
            "req_0": {
                "module": "vkey.GetVkeyServer",
                "method": "CgiGetVkey",
                "param": {
                    "guid": "199213542",
                    "songmid": [songmid],
                    "songtype": [0],
                    "uin": "599526934",
                    "loginflag": 1,
                    "platform": "20"
                }
            },
            "comm": {
                "uin": 599526934,
                "format": "json",
                "ct": 24,
                "cv": 0
            }
        }
    })
    return axios.get(url, {
        params: data
    }).then(res => {
        return Promise.resolve(res.data)
    })
}

export function getRankData() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        needNewCode: 1
    })
    return jsonp(url, data, options)
}

export function getRankDetail(rankid) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
    const data = Object.assign({}, commonParams, {
        uin: 599526934,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        topid: rankid
    })
    return jsonp(url, data, options)
}
