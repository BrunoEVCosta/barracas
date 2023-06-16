async function extractMetadataFromLogin(req){
    let ipv4=req.headers['x-real-ip']
    let ipv6 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if(ipv6=="::1"){
        if(ipv4==undefined)
            ipv4="127.0.0.1"
    }
    if (ipv6.substr(0, 7) == "::ffff:") {
        if(ipv4==undefined)
            ipv4 = ipv6.substr(7)
    }
    let valid=1
    let location=await getCityAndCountry(ipv4)
    let platform=req.headers['user-agent']
    return {ip:ipv4,ipv4,ipv6,valid,location,platform,country:location.country,city:location.city,isp:location.isp}
}


function getCityAndCountry(ipv4){
    /*
    returns {country,city}
     */
    if(ipv4=="127.0.0.1" || ipv4=="localhost" || ipv4==undefined)
        return new Promise((res,rej)=>res({country:null,city:"null"}))
    return new Promise((resolve,rej)=>{
        const http = require('http')
        const options = {
            hostname: 'ip-api.com',
            port: 80,
            path: `/json/${ipv4}`,
            method: 'GET'
        }
        const request = http.request(options, res => {
            res.on('data', d => {
                let locationInfo = JSON.parse(d.toString('utf8'))
                //saveInfo = JSON.stringify({[ip]: info}) + "\n"
                //fs.appendFileSync("ipList.json", saveInfo, 'utf8')
                resolve(locationInfo)
            })
        })
        request.on('error', error => {
            console.error(error)
        })
        request.end()
    })
}

module.exports = {
    extractMetadataFromLogin
}