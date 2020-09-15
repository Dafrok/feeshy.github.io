function getResolution() {
    document.getElementById("pixelW").value = Math.round(window.screen.width * window.devicePixelRatio)
    document.getElementById("pixelH").value = Math.round(window.screen.height * window.devicePixelRatio)
}
window.onload = getResolution()

function calc() {

    var pixelW, pixelH, inch
    
    pixelW = document.getElementById("pixelW").value
    pixelH = document.getElementById("pixelH").value
    inch = document.getElementById("inch").value

    if (inch != 0) {
        
        var ppi, mmW, mmH, mmShorter, scaleFacLgr, scaleFacMore
        ppi = Math.sqrt(Math.pow(pixelW, 2) + Math.pow(pixelH, 2)) / inch
        mmW = pixelW / ppi * 25.4
        mmH = pixelH / ppi * 25.4
        if (parseFloat(mmW) <= parseFloat(mmH)) {
            mmShorter = mmW
        }   else {
            mmShorter = mmH
        }
        
        document.getElementById("cmW").innerHTML = "（" + Math.round(mmW) / 10 + " 厘米）"
        document.getElementById("cmH").innerHTML = "（" + Math.round(mmH) / 10  + " 厘米）"
        document.getElementById("cmD").innerHTML = "（" + Math.round(inch * 25.4) / 10 + " 厘米）"
        document.getElementById("cssRes").innerHTML = window.screen.width + "×" + window.screen.height

        switch (true) {
        case mmShorter >= 40 && mmShorter < 90:         //Mobile Phone
            var phoneFactors = [/*240p*/0.75, /*320p*/1.0, /*480p*/1.5, /*576p,640p,720p*/2.0, /*720p,SurfaceDuo*/2.5, /*1080p*/2.625, /*1080p*/2.75, /*1080p,palm*/3.0, /*1440p*/3.5, /*1440p*/3.66, /*1440p*/4.0, /*2160p*/5.25, /*2160p*/5.5, /*2160p*/6.0]
            scaleFacLgr = roundToArray(ppi / 144, phoneFactors) * 100
            scaleFacMore = roundToArray(ppi / 160, phoneFactors) * 100
            break
        case mmShorter >= 90 && mmShorter < 135:        //8" Tab
            scaleFacLgr = Math.round(ppi / 132 * 4) * 25
            scaleFacMore = Math.round(ppi / 150 * 4) * 25
            break
        case mmShorter >= 135 && mmShorter < 155:       //10" Tab
            scaleFacLgr = Math.round(ppi / 128 * 4) * 25
            scaleFacMore = Math.round(ppi / 144 * 4) * 25
            break
        case mmShorter >= 155 && mmShorter < 240:       //Laptop
            scaleFacLgr = Math.round(ppi / 120 * 4) * 25
            scaleFacMore = Math.round(ppi / 135 * 4) * 25
            break
        case mmShorter >= 240 && mmShorter < 450:       //Desktop Monitors
            scaleFacLgr = Math.round(ppi / 96 * 4) * 25
            scaleFacMore = Math.round(ppi / 120 * 4) * 25
            break
        default:
            scaleFacMore = scaleFacLgr = 0
        }

        if (scaleFacMore != 0) {
            document.getElementById("res").innerHTML = pixelW + "×" + pixelH
            document.getElementById("ppi").innerHTML = Math.round(ppi)
            if (scaleFacLgr < 100) {
                scaleFacLgr = 100
            }
            if (scaleFacMore < 100) {
                scaleFacMore = 100
            }
            document.getElementById("scaleFacLgr").innerHTML = scaleFacLgr + "%"
            document.getElementById("scaleFacMore").innerHTML = scaleFacMore + "%"
            document.getElementById("resLgr").innerHTML = Math.round(pixelW / scaleFacLgr * 100) + "x" + Math.round(pixelH / scaleFacLgr * 100)
            document.getElementById("resMore").innerHTML = Math.round(pixelW / scaleFacMore * 100) + "x" + Math.round(pixelH / scaleFacMore * 100)
            if ( pixelW == Math.round(window.screen.width * window.devicePixelRatio) && pixelH == Math.round(window.screen.height * window.devicePixelRatio) ) {
                document.getElementById("thisDevice").style.cssText = "visibility:inherit;"
            }   else {
                document.getElementById("thisDevice").style.cssText = "visibility:hidden;"
            }
            
            document.getElementById("unknown").innerHTML = ""
            document.getElementById("unknown").style.cssText = "visibility:hidden;"
            document.getElementById("recommend").style.cssText = "visibility:visible;"
            document.getElementById("blank").hidden = false
            
        }   else {
            
            document.getElementById("recommend").style.cssText = "visibility:hidden;"
            document.getElementById("blank").hidden = true
            document.getElementById("unknown").innerHTML = Math.round(ppi)
            document.getElementById("unknown").style.cssText = "visibility:visible;"
            
        }


    }   else {
        
        document.getElementById("recommend").style.cssText = "visibility:hidden;"
        document.getElementById("blank").hidden = true
        document.getElementById("unknown").innerHTML = "请输入对角长度！"
        document.getElementById("unknown").style.cssText = "visibility:visible;"
    }
}

//  Thx to Gav & ncepuzs for the following function
//  https://www.gavsblog.com/blog/find-closest-number-in-array-javascript
//  https://meta.appinn.net/t/javascript/19118/3

function roundToArray(needle, haystack) {
    return haystack.reduce((a, b) => {
        let aDiff = Math.abs(a - needle);
        let bDiff = Math.abs(b - needle);

        if (aDiff == bDiff) {
            return a > b ? a : b;
        } else {
            return bDiff < aDiff ? b : a;
        }
    });
}