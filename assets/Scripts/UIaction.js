var wd, ht, layoutRow, layoutCol, layoutCase;
var drpWrap = document.getElementById("menu_drp_wrap");
var drpBtn = document.getElementById("menu_drp_btn");

function winSize() {
    wd = window.innerWidth ;
    ht = window.innerHeight ;
    if (wd <= 840) {
        layoutRow = 1 ;
    } else if (wd <= 1160) {
        layoutRow = 2 ;
    } else {
        layoutRow = 3 ;
    }
    if (ht <= 360) {
        layoutCol = 1 ;
    } else if (ht <= 445) {
        layoutCol = 2 ;
    } else {
        layoutCol = 3 ;
    }

    layoutCase = layoutRow * layoutCol ;
    if (layoutCase <= 3) {
        drpWrap.style.top = "-112px";
    } else {
        drpWrap.style.top = "-145px";
    }
}

// ---------------------dropdown menu
var droptop = 0 // 0:collapsed  1:expanded
function drpper() {
    if (droptop == 0) {
        drpWrap.style.top = "0px";
        drpBtn.innerHTML = "menu▴";
        droptop = 1
    }
    else {
        drpWrap.style.top = "-112px"
        drpBtn.innerHTML = "menu▾"
        droptop = 0
    }
}




