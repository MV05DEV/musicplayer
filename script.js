let csong = new Audio
async function getsongs() {
    let a = await fetch("/musicplayer/songs/")
    let b = await a.text()
    let div = document.createElement("div")
    div.innerHTML = b
    let c = div.getElementsByTagName("a")
    let s = []
    for (let index = 0; index < c.length; index++) {
        const element = c[index];
        if (element.href.endsWith("mp3")) {
            s.push(element.href)
        }
    }
    return s
}
const playmusic=(audio) => {
    csong.src="/songs/"+audio+".mp3"
    csong.play()
    document.querySelector(".fbar").style.display="none"
    document.querySelector(".playbar").style.display="block"
    plays.src="pause.svg"
    document.querySelector(".songinfo").innerHTML=audio
}
function formatTime(seconds) {
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    
    return `${formattedMinutes}:${formattedSeconds}`;
}    
async function main() {
    let songs = await getsongs()

    for (const song of songs) {
        let d = song.split("/songs/")[1]
        let e = d.split(".mp3")[0]
        let f = e.replaceAll("%20", " ")
        let ele = document.querySelector(".music")
        let htm = `<div class="name">
                            <div class="play1">

                                <img src="svgs_collection/svg17.svg" alt="" style="    width: 18px;
    height: 16px;
    padding: 4px;">
                            </div>
                        <img style="width: 140px;height: 122px;margin: inherit;" src="images/${f}.jpg" alt="">
                        <div class="tex">${f}</div>
                    </div>`
        ele.innerHTML = ele.innerHTML + htm;
    }
    let musics = document.querySelectorAll(".name")
    for (const music of musics) {
        music.addEventListener("click", () => {
            playmusic(music.querySelector(".tex").innerHTML.trim())
        }
        )
    }
    plays.addEventListener("click",()=>{
        if (csong.paused){
            csong.play()
            plays.src="pause.svg"
        }
        else{
            csong.pause()
            plays.src="play.svg"
        }
    })
    csong.addEventListener("timeupdate",() => {
        document.querySelector(".songtime").innerHTML=`${formatTime(csong.currentTime)}/${formatTime(csong.duration)}`
        document.querySelector(".circle").style.left=(csong.currentTime/csong.duration)*100+"%"
    }
    )
    document.querySelector(".seekbar").addEventListener("click",e=> {
        document.querySelector(".circle").style.left=(e.offsetX/e.target.getBoundingClientRect().width)*100+"%"
        csong.currentTime=csong.duration*(e.offsetX/e.target.getBoundingClientRect().width)
    }
    )
    document.querySelector(".hamburger").addEventListener("click",() => {
        document.querySelector(".left").style.left="0"
    }
    )
    document.querySelector(".cross").addEventListener("click",() => {
        document.querySelector(".left").style.left="-200%"
    }
    )
    prev.addEventListener("click",() => {
        let index=songs.indexOf(csong.src)
        if ((index-1)<0){
            csong.pause()
            playmusic(songs[songs.length-1].split("/songs/")[1].split(".mp3")[0].replaceAll("%20"," "))
        }
        else{

            csong.pause()
            playmusic(songs[(index-1)].split("/songs/")[1].split(".mp3")[0].replaceAll("%20"," "))
        }
    }
    )
    next.addEventListener("click",() => {
        let index=songs.indexOf(csong.src)
        if ((index+1)>=0){
            csong.pause()
            playmusic(songs[(index+1)%songs.length].split("/songs/")[1].split(".mp3")[0].replaceAll("%20"," "))   
        }
    }
    )
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e) => {
        if (parseInt(e.target.value)/100===0){
            vol.src="mute.svg"
        }
        else{
            vol.src="volume.svg"
        }
        csong.volume=parseInt(e.target.value)/100
    }
    )
    vol.addEventListener("click",(e) => {
     
     if (e.target.src.includes("mute.svg")){
        vol.src="volume.svg"
        document.querySelector(".range").getElementsByTagName("input")[0].value="50"
       
        csong.volume=0.5
      }
      else{
        vol.src="mute.svg"
        document.querySelector(".range").getElementsByTagName("input")[0].value="0"
        
        csong.volume=0

      }
    }
    )
}
main()
