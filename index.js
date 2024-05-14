// Dam preload la videouri ca sa fie mai rapida schimbarea de culori

const colors = ['Negru', 'Gri', 'Violet', 'Galben'];

const preloadedVideos = {};

function preloadVideos() {
  colors.forEach(color => {
    const videoSources = [
      `assets/Videos/${color}/Ecran.mp4`,
      `assets/Videos/${color}/Spate.mp4`,
      `assets/Videos/${color}/Jos.mp4`,
      `assets/Videos/${color}/pixBagat.mp4`,
      `assets/Videos/${color}/pixScos.mp4`
    ];

    preloadedVideos[color] = {};

    videoSources.forEach(src => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", src, true);
      xhr.responseType = "arraybuffer";

      xhr.onload = function(oEvent) {
        var blob = new Blob([oEvent.target.response], {type: "video/mp4"});
        var url = URL.createObjectURL(blob);
        preloadedVideos[color][src] = url;
      };

      xhr.onprogress = function(oEvent) {
        if (oEvent.lengthComputable) {
          var percentComplete = oEvent.loaded / oEvent.total;
          console.log(percentComplete)
        }
      };

      xhr.send();
    });
  });
}

preloadVideos();



//versiunea codului pentru telefon, pentru documentatie si versiunea de pc, vedeti linia 342
if(window.screen.width < 768){

    const introducing = document.getElementById('Introducing')
    const video = document.getElementById('Ecran')
    const namee = document.getElementById("name")
    const spateText = document.getElementById("spateText")
    const dWrapper = document.getElementById("dWrapper")
    const spate = document.getElementById("Spate")
    const josText = document.getElementById("josText")
    const Black = document.getElementById('Negru')
    const Gray = document.getElementById('Gri')
    const Violet = document.getElementById('Violet')
    const Yellow = document.getElementById('Galben')
    const pixBagat = document.getElementById('pixBagat')
    const pixScos = document.getElementById('pixScos')
    let jos = document.getElementById("jos")
    const scrolll = document.getElementById("Scroll")
    const colorMenu = document.getElementById("changeColorWrap")
    const cameraButton = document.getElementById("cameraButton")
    const processorButton = document.getElementById("processorButton")
    const imgReveal = document.getElementById("imgReveal")
    var cameraButtonBool = false
    var processorButtonBool = false
    let scrollTimeout;
    var firstVideoDone = false
    var secondVideoDone = false
    var thirdVideoDone = false
    let selectedColor = "Negru"
    var pixAfar = false
    let lastX = 0 


    
    window.onscroll = function (e) {
        main(Math.round(window.scrollY)); 
    };
    document.body.style.zoom="50%"
    function setMaxHeight(){
        document.getElementById("spateDiv").style.maxHeight = "1850px"
        if(!cameraButtonBool){
            document.getElementById("extensieProcessor").removeEventListener("animationend",setMaxHeight, true)
            
        }
        if (!processorButtonBool){
            document.getElementById("extensieCamera").removeEventListener("animationend",setMaxHeight, true)
            
        }
    }
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
        } else {
        elmnt.ontouchstart = dragMouseDown;
        }
    
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
            pos4 = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
            document.ontouchend = closeDragElement;
            document.ontouchmove = elementDrag;
        }
        
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            var clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
            var clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
        
            pos1 = pos3 - clientX;
            pos2 = pos4 - clientY;
            pos3 = clientX;
            pos4 = clientY;
        
            if ((clientX / window.screen.width) * 100 <= 80.4297 && ((clientX / window.screen.width) * 100 >= 20.2344)){
            imgReveal.style.left = `${(clientX / window.screen.width) * 100}%`;
            if (lastX < clientX) {
                document.getElementById("dAfter").style.clipPath = `inset(0 ${100 - ((clientX / window.screen.width) * 100) -10}% 0 0)`;
            } else if (lastX > clientX) {
                document.getElementById("dAfter").style.clipPath = `inset(0 ${100 - ((clientX / window.screen.width) * 100) +10}% 0 0)`;
                console.log("da")
            }
            }
        
            lastX = clientX; 
        }
        
        function closeDragElement() {
            document.ontouchend = null;
            document.ontouchmove = null;
        }
        
    }
    dragElement(imgReveal)

    cameraButton.addEventListener("touchstart", () => {
        if (!cameraButtonBool && processorButtonBool || !cameraButtonBool && !processorButtonBool ){
            cameraButton.style.animation = "rotate 0.5s forwards"
            cameraButtonBool = !cameraButtonBool
            if (processorButtonBool){
                processorButton.style.animation = "rotateBack 0.5s forwards"
                processorButtonBool = !processorButtonBool
                document.getElementById("extensieProcessor").style.animation = "goupp 1s forwards"
            }
            document.getElementById("spateDiv").style.maxHeight = "100%"
            document.getElementById("extensieCamera").style.animation = "goDown 1s forwards"
            document.getElementById("extensieCamera").style.display = "flex"

            
        }
        else{
            cameraButton.style.animation = "rotateBack 0.5s forwards"
            cameraButtonBool = !cameraButtonBool
            document.getElementById("extensieCamera").style.animation = "goupp 1s forwards"
            document.getElementById("extensieCamera").addEventListener("animationend",setMaxHeight, true)
            
            
            
        }
    })
    processorButton.addEventListener("touchstart", () => {
        if (!processorButtonBool && cameraButtonBool || !processorButtonBool && !cameraButtonBool ){
            processorButton.style.animation = "rotate 0.5s forwards"
            processorButtonBool = !processorButtonBool
            if (cameraButtonBool){
                cameraButton.style.animation = "rotateBack 0.5s forwards"
                cameraButtonBool = !cameraButtonBool
                document.getElementById("extensieCamera").style.animation = "goupp 1s forwards"
                
            }
            document.getElementById("spateDiv").style.maxHeight = "100%"
            document.getElementById("extensieProcessor").style.animation = "goDown 1s forwards"
            document.getElementById("extensieProcessor").style.display = "flex"
            
        }
        else{
            processorButton.style.animation = "rotateBack 0.5s forwards"
            processorButtonBool = !processorButtonBool
            document.getElementById("extensieProcessor").style.animation = "goupp 1s forwards"
            document.getElementById("extensieProcessor").addEventListener("animationend",setMaxHeight, true)
            

        }
    })
    Yellow.addEventListener('touchstart', ()=> {changeColor("Galben"); })
    Violet.addEventListener('touchstart',()=> {changeColor("Violet")})
    Gray.addEventListener('touchstart', ()=>{changeColor("Gri")})
    Black.addEventListener('touchstart',() => {changeColor("Negru")})
    function setBlock(n){
        n.style.opacity = '0'
        n.style.display = 'block'
    }
    function changeColor(color){
        console.log(color, selectedColor)
        if (color === "Negru" && selectedColor !== color){
            document.getElementById(selectedColor).classList.remove('selected')
            Black.classList.add("selected")
            selectedColor = color
        }
        if (color === "Gri" && selectedColor !== color){
            document.getElementById(selectedColor).classList.remove('selected')
            Gray.classList.add("selected")
            selectedColor = color
        }
        if (color === "Violet" && selectedColor !== color){
            document.getElementById(selectedColor).classList.remove('selected')
            Violet.classList.add("selected")
            selectedColor = color
        }
        if (color === "Galben" && selectedColor !== color){
            document.getElementById(selectedColor).classList.remove('selected')
            Yellow.classList.add("selected")
            selectedColor = color
        }
        changeVideo()
        
    }
    function changeVideo() {
        video.setAttribute("src", preloadedVideos[selectedColor][`assets/Videos/${selectedColor}/Ecran.mp4`]);
        video.load()
        video.play()
        spate.setAttribute("src", preloadedVideos[selectedColor][`assets/Videos/${selectedColor}/Spate.mp4`]);
        spate.load()
        spate.play()
        jos.setAttribute("src", preloadedVideos[selectedColor][`assets/Videos/${selectedColor}/Jos.mp4`]);
        jos.load()
        jos.play()
        pixBagat.setAttribute("src", preloadedVideos[selectedColor][`assets/Videos/${selectedColor}/pixBagat.mp4`]);
        pixBagat.load()
        document.getElementById("pozaextextensieCamera").src =`assets/Videos/${selectedColor}/Camera.jpg`
        pixScos.setAttribute("src", preloadedVideos[selectedColor][`assets/Videos/${selectedColor}/pixScos.mp4`]);
        pixScos.load()
    }
    function main(y) {
        scrollTimeout = setTimeout(() => { scrolll.style.display = 'block'; scrolll.style.animation = 'easein 1s forwards'; }, 5000);
        if (thirdVideoDone){
            if (dWrapper.getBoundingClientRect().top <= 650 && dWrapper.getBoundingClientRect().top > 1) {
                setTimeout(() => {
                    dWrapper.style.animation = 'easein 1s forwards'
                    document.getElementById("ItsaMeBeny").style.opacity = "30%"
                }, 200)
            
            }
        }
        if (!thirdVideoDone) {
            if (jos.getBoundingClientRect().top <= 650 && jos.getBoundingClientRect().top > 1) {
                dWrapper.style.opacity = '0'
                dWrapper.style.display = 'grid'
                console.log(spate.getBoundingClientRect().top)
                scrolll.innerText = ''
                console.log(spate.getBoundingClientRect().top)
                setTimeout(() => {
                    jos.style.animation = 'easein 1s forwards'
                    josText.style.animation = 'easein 1s forwards'
                    setTimeout(() =>{
                        jos.play();
                        thirdVideoDone = true
                        jos.addEventListener("ended", () => {
                            jos.addEventListener("touchstart", () => {
                                jos.style.display = "none"

                                if (!pixAfar){

                                    pixAfar = true
                                    jos.style.display = "none"

                                    pixBagat.style.display = "none"
                                    pixScos.style.display = "block"
                                    pixScos.play()
                                    pixScos.addEventListener("touchstart", () => {
                                        pixScos.style.display = "none"
                                        pixBagat.style.display = "block"
                                        pixBagat.play()
                                        pixBagat.addEventListener("ended", () => {
                                            pixBagat.style.display = "none"
                                            jos.style.display = "block"
                                        })
                                        pixAfar = false
                                    })
                                }
                            })
                        })

                        
                    })
                }, 200)
            }
        }
        if (!secondVideoDone) {
            if (Math.abs(y - spate.getBoundingClientRect().y) <= 200  ) {
                
                setBlock(jos)
                setBlock(josText)
                setTimeout(() => {
                    spate.style.animation = 'easein 1s forwards'
                    spateText.style.animation = 'easein 1s forwards'
                    setTimeout(() => {
                        spate.play();
                        secondVideoDone = true
                    }, 150)
            }, 200)
        
        }
        if (!firstVideoDone){
            colorMenu.style.transform = 'translateX(-200px)';
        
        
            setTimeout(() => {
                
                colorMenu.style.transition = 'transform 1s';
                colorMenu.style.transform = 'translateX(0px)';
                
                
                setTimeout(() => {
                    colorMenu.style.transition = 'transform 3s';
                    colorMenu.style.transform = 'translateX(-80px)';
                }, 1000);
            }, 1000);
        
        
            colorMenu.addEventListener('touchstart', () => {
                colorMenu.style.transition = 'transform 1s';
                colorMenu.style.transform = 'translateX(0px)';
            });
        
            colorMenu.addEventListener('touchend', () => {
                setTimeout(() => {
                    colorMenu.style.transition = 'transform 1s';
                    colorMenu.style.transform = 'translateX(-80px)';
                    
                }, 3000);
            });
            
            setTimeout(() => {
                
                video.style.display = 'block'
                video.style.animation = 'easein 1s forwards'
                namee.style.display = 'block'
                namee.style.animation = 'easein 1s forwards'
                setBlock(spate)
                spateText.style.opacity = "0"
                spateText.style.display = 'flex'


                setTimeout(() => {
                    video.play();
                    firstVideoDone = true
                    
                }, 300)
            }, 1200)
            document.getElementById('VideoIntro').style.animation = 'easeout 1s forwards'
            introducing.style.animation = "goup 2s cubic-bezier(0.0, 0.0, 0.0, 1) forwards";
        }
        
    }
        


        

    }
    introducing.addEventListener('animationend', () => {
        scrollTimeout = setTimeout(main(), 5000);

        document.addEventListener("scroll", (e) => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            scrolll.style.display = 'none';
            scrollTimeout = setTimeout(() => { scrolll.style.display = 'block'; scrolll.style.animation = 'easein 1s forwards'; }, 5000);
            main();
        });
    });
 }
 else{
 
     // Constante pentru a le accesa mai usor (doar pe cele care le folosesti mai mult)
     const introducing = document.getElementById('Introducing')
     const video = document.getElementById('Ecran')
     const namee = document.getElementById("name")
     const spateText = document.getElementById("spateText")
     const dWrapper = document.getElementById("dWrapper")
     const spate = document.getElementById("Spate")
     const josText = document.getElementById("josText")
     const Black = document.getElementById('Negru')
     const Gray = document.getElementById('Gri')
     const Violet = document.getElementById('Violet')
     const Yellow = document.getElementById('Galben')
     const pixBagat = document.getElementById('pixBagat')
     const pixScos = document.getElementById('pixScos')
     let jos = document.getElementById("jos")
     const scrolll = document.getElementById("Scroll")
     const colorMenu = document.getElementById("changeColorWrap")
     const cameraButton = document.getElementById("cameraButton")
     const processorButton = document.getElementById("processorButton")
     const imgReveal = document.getElementById("imgReveal")
     //Bool uri
var cameraButtonBool = false
var processorButtonBool = false
let scrollTimeout;
var firstVideoDone = false
var secondVideoDone = false
var thirdVideoDone = false
let selectedColor = "Negru"
var pixAfar = false
let lastX = 0 
// cand se da scroll ruleaza functia principala pentru a arata videoclipurile
window.onscroll = function (e) {
    main(Math.round(window.scrollY)); 
};
document.body.style.zoom="50%"
//Rezolva un mic bug
function setMaxHeight(){
    document.getElementById("spateDiv").style.maxHeight = "1850px"
    if(!cameraButtonBool){
        document.getElementById("extensieProcessor").removeEventListener("animationend",setMaxHeight, true)
        
    }
    if (!processorButtonBool){
        document.getElementById("extensieCamera").removeEventListener("animationend",setMaxHeight, true)
        
    }
}
//functie pentru ultima parte cu Display ul merge cu orice dar ar trebuii folosita strict pentru butonul de reveal
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        if ((e.clientX / window.screen.width) * 100 <= 65.4297 && ((e.clientX / window.screen.width) * 100 >= 35.2344)){
            imgReveal.style.left = `${(e.clientX / window.screen.width) * 100}%`;
            if (lastX < e.clientX) {
                document.getElementById("dAfter").style.clipPath = `inset(0 ${100 - ((e.clientX / window.screen.width) * 100) -10}% 0 0)`;
                
            } else if (lastX > e.clientX) {
                document.getElementById("dAfter").style.clipPath = `inset(0 ${100 - ((e.clientX / window.screen.width) * 100) +10}% 0 0)`;
                console.log("da")
                
            }

        }
        
        lastX = e.clientX; 
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
}
dragElement(imgReveal)
//logica pentru animatiile de la al 2-lea video, doar o descriere sa fie deschisa deodata si animatii smooth
cameraButton.addEventListener("click", () => {
    if (!cameraButtonBool && processorButtonBool || !cameraButtonBool && !processorButtonBool ){
        cameraButton.style.animation = "rotate 0.5s forwards"
        cameraButtonBool = !cameraButtonBool
        if (processorButtonBool){
            processorButton.style.animation = "rotateBack 0.5s forwards"
            processorButtonBool = !processorButtonBool
            document.getElementById("extensieProcessor").style.animation = "goupp 1s forwards"
        }
        document.getElementById("spateDiv").style.maxHeight = "100%"
        document.getElementById("extensieCamera").style.animation = "goDown 1s forwards"
        document.getElementById("extensieCamera").style.display = "flex"
        
        
    }
    else{
        cameraButton.style.animation = "rotateBack 0.5s forwards"
        cameraButtonBool = !cameraButtonBool
        document.getElementById("extensieCamera").style.animation = "goupp 1s forwards"
        document.getElementById("extensieCamera").addEventListener("animationend",setMaxHeight, true)
        
        
        
    }
})
processorButton.addEventListener("click", () => {
    if (!processorButtonBool && cameraButtonBool || !processorButtonBool && !cameraButtonBool ){
        processorButton.style.animation = "rotate 0.5s forwards"
        processorButtonBool = !processorButtonBool
        if (cameraButtonBool){
            cameraButton.style.animation = "rotateBack 0.5s forwards"
            cameraButtonBool = !cameraButtonBool
            document.getElementById("extensieCamera").style.animation = "goupp 1s forwards"
            
        }
        document.getElementById("spateDiv").style.maxHeight = "100%"
        document.getElementById("extensieProcessor").style.animation = "goDown 1s forwards"
        document.getElementById("extensieProcessor").style.display = "flex"
        
    }
    else{
        processorButton.style.animation = "rotateBack 0.5s forwards"
        processorButtonBool = !processorButtonBool
        document.getElementById("extensieProcessor").style.animation = "goupp 1s forwards"
        document.getElementById("extensieProcessor").addEventListener("animationend",setMaxHeight, true)
        
        
    }
})
//Pentru a putea schimba culorile adaugam event listener
Yellow.addEventListener('click', ()=> {changeColor("Galben"); })
Violet.addEventListener('click',()=> {changeColor("Violet")})
Gray.addEventListener('click', ()=>{changeColor("Gri")})
Black.addEventListener('click',() => {changeColor("Negru")})
function setBlock(n){
    n.style.opacity = '0'
    n.style.display = 'block'
}
//logica pentru culori 
function changeColor(color){
    console.log(color, selectedColor)
    if (color === "Negru" && selectedColor !== color){
        document.getElementById(selectedColor).classList.remove('selected')
        Black.classList.add("selected")
        selectedColor = color
    }
    if (color === "Gri" && selectedColor !== color){
        document.getElementById(selectedColor).classList.remove('selected')
        Gray.classList.add("selected")
        selectedColor = color
    }
    if (color === "Violet" && selectedColor !== color){
        document.getElementById(selectedColor).classList.remove('selected')
        Violet.classList.add("selected")
        selectedColor = color
    }
    if (color === "Galben" && selectedColor !== color){
        document.getElementById(selectedColor).classList.remove('selected')
        Yellow.classList.add("selected")
        selectedColor = color
    }
    changeVideo()
    
}
//ca sa nu ne repetam si sa fie codul frumos, facem functie pentru asta
function changeVideo() {
    video.setAttribute("src", preloadedVideos[selectedColor][`assets/Videos/${selectedColor}/Ecran.mp4`]);
    video.load()
    video.play()
    spate.setAttribute("src", preloadedVideos[selectedColor][`assets/Videos/${selectedColor}/Spate.mp4`]);
    spate.load()
    spate.play()
    jos.setAttribute("src", preloadedVideos[selectedColor][`assets/Videos/${selectedColor}/Jos.mp4`]);
    jos.load()
    jos.play()
    pixBagat.setAttribute("src", preloadedVideos[selectedColor][`assets/Videos/${selectedColor}/pixBagat.mp4`]);
    pixBagat.load()
    document.getElementById("pozaextextensieCamera").src =`assets/Videos/${selectedColor}/Camera.jpg`
    pixScos.setAttribute("src", preloadedVideos[selectedColor][`assets/Videos/${selectedColor}/pixScos.mp4`]);
    pixScos.load()
}
function main(y) {
    //Timeout pentru textul de scroll, daca persoana este inactiva pentru 5 secunde, apare sa dea scroll in jos
    scrollTimeout = setTimeout(() => { scrolll.style.display = 'block'; scrolll.style.animation = 'easein 1s forwards'; }, 5000);
    //logica pentru cand al 3 lea video este gata
    if (thirdVideoDone){
        //ca sa ne dam seama cand utilizatorul a ajuns la aceasta parte, pentru a arata videoul 
        if (dWrapper.getBoundingClientRect().top <= 650 && dWrapper.getBoundingClientRect().top > 1) {
            setTimeout(() => {
                dWrapper.style.animation = 'easein 1s forwards'
                //setam butonul de reveal la mijlocul pozei indiferent de marimea ecranului
                imgReveal.style.top = `${(document.getElementById("dBefore").getBoundingClientRect().top - document.body.getBoundingClientRect().top) + document.getElementById("dBefore").offsetHeight / 2}px`
                document.getElementById("ItsaMeBeny").style.opacity = "30%"
            }, 200)
        
        }
    }
    if (!thirdVideoDone) {
        if (jos.getBoundingClientRect().top <= 650 && jos.getBoundingClientRect().top > 1) {
            //le setap pe grid ca sa fie una sub alta
            dWrapper.style.opacity = '0'
            dWrapper.style.display = 'grid'
            scrolll.innerText = ''
            setTimeout(() => {
                jos.style.animation = 'easein 1s forwards'
                josText.style.animation = 'easein 1s forwards'
                setTimeout(() =>{
                    jos.play();
                    thirdVideoDone = true
                    jos.addEventListener("ended", () => {
                        jos.addEventListener("click", () => {
                            jos.style.display = "none"
                            //logica pentru pixul de la telefon daca este afara sau nu
                            if (!pixAfar){
                                
                                pixAfar = true
                                jos.style.display = "none"
                                
                                pixBagat.style.display = "none"
                                pixScos.style.display = "block"
                                pixScos.play()
                                pixScos.addEventListener("click", () => {
                                    pixScos.style.display = "none"
                                    pixBagat.style.display = "block"
                                    pixBagat.play()
                                    pixBagat.addEventListener("ended", () => {
                                        pixBagat.style.display = "none"
                                        jos.style.display = "block"
                                    })
                                    pixAfar = false
                                })
                            }
                        })
                    })

                    
                })
            }, 200)
        }
    }
    if (!secondVideoDone) {
        if (Math.abs(y - spate.getBoundingClientRect().y) <= 200  ) {
            
            setBlock(jos)
            setBlock(josText)
            setTimeout(() => {
                spate.style.animation = 'easein 1s forwards'
                spateText.style.animation = 'easein 1s forwards'
                setTimeout(() => {
                    spate.play();
                    secondVideoDone = true
                }, 150)
            }, 200)
            
    }
    if (!firstVideoDone){
        colorMenu.style.transform = 'translateX(-200px)';
    
        
        setTimeout(() => {
            
            colorMenu.style.transition = 'transform 1s';
            colorMenu.style.transform = 'translateX(0px)';
            
            
            setTimeout(() => {
                colorMenu.style.transition = 'transform 3s';
                colorMenu.style.transform = 'translateX(-100px)';
            }, 1000);
        }, 1000);
    
        //pentru meniul de culori, cand mouseul este acolo, sa apara
        colorMenu.addEventListener('mouseover', () => {
            colorMenu.style.transition = 'transform 1s';
            colorMenu.style.transform = 'translateX(0px)';
        });
        
        colorMenu.addEventListener('mouseout', () => {
            colorMenu.style.transition = 'transform 1s';
            colorMenu.style.transform = 'translateX(-100px)';
        });
        
        setTimeout(() => {
            
            video.style.display = 'block'
            video.style.animation = 'easein 1s forwards'
            namee.style.display = 'block'
            namee.style.animation = 'easein 1s forwards'
            setBlock(spate)
            spateText.style.opacity = "0"
            spateText.style.display = 'flex'
            
            
            setTimeout(() => {
                video.play();
                firstVideoDone = true
                
            }, 300)
        }, 1200)
        document.getElementById('VideoIntro').style.animation = 'easeout 1s forwards'
        introducing.style.animation = "goup 2s cubic-bezier(0.0, 0.0, 0.0, 1) forwards";
    }
    
}
    


    

}
introducing.addEventListener('animationend', () => {
    scrollTimeout = setTimeout(main(), 5000);
    
    document.addEventListener("wheel", (e) => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrolll.style.display = 'none';
        //pentru textul de scroll
        scrollTimeout = setTimeout(() => { scrolll.style.display = 'block'; scrolll.style.animation = 'easein 1s forwards'; }, 5000);
        main();
    });
});
}
