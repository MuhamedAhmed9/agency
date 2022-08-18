/* auto wallpaper changer */
let landingPage = document.querySelector(".landing-page");

imgs = ["03.jpeg", "04.jpeg", "01.jpeg", "02.jpeg", "05.jpeg", "06.jpeg"];

let bg_auto = setInterval(changeBG, 10000);

function changeBG() {
  let rand_num = Math.floor(Math.random() * imgs.length);
  landingPage.style.backgroundImage = `url("imgs/${imgs[rand_num]}")`;
}

//---------------------------------------------------------------
/* settings box */
let settingsBox = document.querySelector(".settings-box");
let opener = document.querySelector(".settings-box span.gear");

/* setting box position */
opener.onclick = function () {
  settingsBox.classList.toggle("open");
  opener.querySelector("i").classList.toggle("fa-spin");
};
//-------------------------------------------
// nav links
const header_area = document.querySelector(".header-area");
const navlinks = document.querySelectorAll(".landing-page .links li a");

function check_scrolling() {
  navlinks.forEach(function (navlink) {
    if (
      navlink.hasAttribute("data-section") &&
      window.scrollY >=
        document.querySelector(navlink.getAttribute("data-section")).offsetTop -
          100
    ) {
      //remove active class from all links
      navlinks.forEach(function (alink) {
        alink.classList.remove("active");
      });
      //add active class to the selected link
      navlink.classList.add("active");
    }
  });
  if (window.scrollY >= window.innerHeight) {
    if (!header_area.classList.contains("fixed-header")) {
      header_area.classList.add("fixed-header");
    }
  } else {
    header_area.classList.remove("fixed-header");
  }
}
window.addEventListener("scroll", check_scrolling);

//-------------------
navlinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.hasAttribute("data-section")) {
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" }); //new way to scroll to specific section
      //remove active class from all links
      navlinks.forEach(function (alink) {
        alink.classList.remove("active");
      });
      //add active class to the selected link
      e.target.classList.add("active");
    }
  });
});
//-------------------------------------------
//menu toggler
const links = document.querySelector(".landing-page .header-area .links");
const menu_toggler = document.querySelector(
  ".landing-page .header-area .menu-toggler"
);

menu_toggler.onclick = (e) => {
  e.stopPropagation(); //to not allow the next function to happen on span inside menu toggler
  links.classList.toggle("open");
};

document.addEventListener("click", function (e) {
  if (
    e.target != links &&
    e.target != menu_toggler &&
    links.classList.contains("open")
  ) {
    links.classList.toggle("open");
  }
});

links.onclick = function (e) {
  e.stopPropagation(); //to not allow the previous function to happen inside links ul
};

//-------------------------------------------
/* nav bullets */
const navbullets = document.querySelectorAll(".navbullets .bullet");

navbullets.forEach(function (bullet) {
  bullet.addEventListener("click", function (e) {
    document
      .querySelector(e.target.dataset.section)
      .scrollIntoView({ behavior: "smooth" }); //new way to scroll to specific section
  });
});

//-------------------------------------------
/* colors box */

if (window.localStorage.getItem("mainColor")) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("mainColor")
  );

  document
    .querySelector(".settings-box .ulColors")
    .querySelector(`[data-color="${window.localStorage.getItem("mainColor")}"]`)
    .classList.add("active");
}

let liColors = document.querySelectorAll(".settings-box .ulColors li");

liColors.forEach(function (li) {
  li.style.backgroundColor = li.dataset.color;

  li.addEventListener("click", function (e) {
    //remove class active from all elements
    liColors.forEach(function (li) {
      li.classList.remove("active");
    });
    //another way
    /*
    e.target.parentElement.querySelectorAll(".active").forEach(function (li) {
      li.classList.remove("active");
    });
    */
    //add class active to clicked element
    e.target.classList.add("active");
    //set color to the root element
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    //storing color in local storage
    window.localStorage.setItem("mainColor", e.target.dataset.color);
  });
});
//--------------------------------------------------
//auto background

let backgroundToggler = document.querySelector(
  ".settings-box .random-background .randBtn .toggler"
);

if (window.localStorage.getItem("bg-status") == "0") {
  backgroundToggler.classList.toggle("on");
  backgroundToggler.parentElement.style.backgroundColor = "grey";
  backgroundToggler.parentElement.style.textAlign = "right";
  //change text from on to off
  let btnChilds = backgroundToggler.parentElement.childNodes;
  for (let i = 0; i < btnChilds.length; i++) {
    if (btnChilds[i].nodeType === 3) {
      btnChilds[i].nodeValue = "OFF";
    }
  }
  clearInterval(bg_auto);
}

backgroundToggler.addEventListener("click", function (e) {
  e.target.classList.toggle("on");
  if (e.target.classList.contains("on")) {
    //change button status
    e.target.parentElement.style.backgroundColor = "green";
    e.target.parentElement.style.textAlign = "left";
    //change text from off to on
    let btnChilds = e.target.parentElement.childNodes;
    for (let i = 0; i < btnChilds.length; i++) {
      if (btnChilds[i].nodeType === 3) {
        btnChilds[i].nodeValue = "ON";
      }
    }
    //make background auto change
    bg_auto = setInterval(changeBG, 10000);
    //add status to local storage
    window.localStorage.setItem("bg-status", "1");
  } else {
    //change button status
    e.target.parentElement.style.backgroundColor = "grey";
    e.target.parentElement.style.textAlign = "right";
    //change text from on to off
    let btnChilds = e.target.parentElement.childNodes;
    for (let i = 0; i < btnChilds.length; i++) {
      if (btnChilds[i].nodeType === 3) {
        btnChilds[i].nodeValue = "OFF";
      }
    }
    //disable background auto change
    clearInterval(bg_auto);
    //add status to local storage
    window.localStorage.setItem("bg-status", "0");
  }
});
//--------------------------------------------------------------
//disable and enable nav bullets

const navbulletsDiv = document.querySelector(".navbullets");
const bulletsToggler = document.querySelector(
  ".settings-box .show-navbullets .randBtn .toggler"
);

if (window.localStorage.getItem("bullets-status") == "0") {
  bulletsToggler.classList.toggle("on");
  bulletsToggler.parentElement.style.backgroundColor = "grey";
  bulletsToggler.parentElement.style.textAlign = "right";
  //change text from on to off
  let btnChilds = bulletsToggler.parentElement.childNodes;
  for (let i = 0; i < btnChilds.length; i++) {
    if (btnChilds[i].nodeType === 3) {
      btnChilds[i].nodeValue = "OFF";
    }
  }
  navbulletsDiv.style.display = "none";
}

bulletsToggler.addEventListener("click", function (e) {
  e.target.classList.toggle("on");
  if (e.target.classList.contains("on")) {
    //change button status
    e.target.parentElement.style.backgroundColor = "green";
    e.target.parentElement.style.textAlign = "left";
    //change text from off to on
    let btnChilds = e.target.parentElement.childNodes;
    for (let i = 0; i < btnChilds.length; i++) {
      if (btnChilds[i].nodeType === 3) {
        btnChilds[i].nodeValue = "ON";
      }
    }
    //enable bullets
    navbulletsDiv.style.display = "block";
    //add status to local storage
    window.localStorage.setItem("bullets-status", "1");
  } else {
    //change button status
    e.target.parentElement.style.backgroundColor = "grey";
    e.target.parentElement.style.textAlign = "right";
    //change text from on to off
    let btnChilds = e.target.parentElement.childNodes;
    for (let i = 0; i < btnChilds.length; i++) {
      if (btnChilds[i].nodeType === 3) {
        btnChilds[i].nodeValue = "OFF";
      }
    }
    //disable bullets
    navbulletsDiv.style.display = "none";
    //add status to local storage
    window.localStorage.setItem("bullets-status", "0");
  }
});
//--------------------------------------------------------------
//making reset to settings box
const reset = document.querySelector(".settings-box .reset button");

reset.onclick = function () {
  let popup = document.createElement("div");
  popup.className = "popup-container";
  popup.style.cssText =
    "width:100vw;height:100vh;position:fixed;z-index:2000;top:0;left:0;display:flex;align-items:center;justify-content:center;background-color:rgba(0,0,0,.5)";

  let popup_text = document.createElement("div");
  popup_text.style.cssText =
    "text-align: center ; background-color:#f5f3f4 ; padding : 30px 0 ; position:relative ; background-image:linear-gradient(45deg, #29524a, #e9bcb7);";
  popup.appendChild(popup_text);

  let heading = document.createElement("h2");
  heading.style.color =
    document.documentElement.style.getPropertyValue("--main-color");
  heading.appendChild(
    document.createTextNode("Are You Sure you Want to Reset EveryThing ?")
  );
  popup_text.appendChild(heading);

  let yesBtn = document.createElement("button");
  yesBtn.style.cssText =
    "width:100px;padding:10px 15px;margin:50px 50px 50px 0;cursor:pointer;font-weight:bold";
  yesBtn.appendChild(document.createTextNode("Yes"));
  popup_text.appendChild(yesBtn);

  let noBtn = document.createElement("button");
  noBtn.style.cssText =
    "width:100px;padding:10px 15px;cursor:pointer;font-weight:bold";
  noBtn.appendChild(document.createTextNode("No"));
  popup_text.appendChild(noBtn);

  yesBtn.addEventListener("click", () => {
    window.localStorage.clear();
    window.location.reload();
  });

  noBtn.addEventListener("click", function () {
    popup.remove();
  });

  let close = document.createElement("span");
  close.appendChild(document.createTextNode("X"));
  close.style.cssText =
    "position:absolute ; top: -15px ; right: -15px ; background: #f40000 ; color: #fff ; cursor:pointer ; border-radius:50% ; width:40px ; height:40px ; padding: 12px ; box-sizing:border-box";
  popup_text.appendChild(close);

  document.body.append(popup);

  close.onclick = function (e) {
    this.parentElement.parentElement.remove();
  };

  popup.onclick = function (e) {
    if (e.target.className == "popup-container") {
      this.remove();
    }
  };
};
//--------------------------------------------------------------
//changing progress in scrolling to the section

let progress = document.querySelectorAll(
  ".skills .skills-box .skill-progress span"
);

window.onscroll = function () {
  for (let i = 0; i < progress.length; i++) {
    if (
      window.scrollY >=
      progress[i].parentElement.offsetTop +
        progress[i].parentElement.offsetHeight -
        window.innerHeight
    ) {
      //element reached

      //offset top of span in the skill progress
      //because span is absolute to relative(skill progress)

      //skills offset top >> progress[i].offsetTop;
      //skills outer height >> progress[i].offsetheight;
      //window height >> window.innerHeight;  >> height of window depends on device screen (mobile, pc...)
      //window scrollTop >> window.scrollTop ,, window.pageYOffset

      progress[i].style.width = progress[i].parentElement.dataset.value;
    }
  }
};
//--------------------------------------------------------------
//create pop up for gallery images

let gallery_imgs = document.querySelectorAll(".gallery img");

gallery_imgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    let popup = document.createElement("div");
    popup.className = "popup-container";
    popup.style.cssText =
      "width:100vw;height:100vh;position:fixed;z-index:2000;top:0;left:0;display:flex;align-items:center;justify-content:center;background-color:rgba(0,0,0,.5)";

    let popup_text = document.createElement("div");
    popup_text.style.cssText =
      "text-align: center ; background-color:#f5f3f4 ; padding : 30px 0 ; position:relative";
    popup.appendChild(popup_text);

    let heading = document.createElement("h2");
    heading.style.color =
      document.documentElement.style.getPropertyValue("--main-color");
    if (img.hasAttribute("alt") && img.alt != "") {
      heading.appendChild(document.createTextNode(img.alt));
    } else {
      heading.appendChild(document.createTextNode("No Title"));
    }
    popup_text.appendChild(heading);

    let crtImg = document.createElement("img");
    crtImg.src = img.src;
    crtImg.style.width = "95%";
    popup_text.appendChild(crtImg);

    let close = document.createElement("span");
    close.appendChild(document.createTextNode("X"));
    close.style.cssText =
      "position:absolute ; top: -15px ; right: -15px ; background: #f40000 ; color: #fff ; cursor:pointer ; border-radius:50% ; width:40px ; height:40px ; padding: 12px ; box-sizing:border-box";
    popup_text.appendChild(close);

    document.body.append(popup);

    close.onclick = function (e) {
      this.parentElement.parentElement.remove();
    };

    popup.onclick = function (e) {
      if (e.target.className == "popup-container") {
        this.remove();
      }
    };
  });
});
