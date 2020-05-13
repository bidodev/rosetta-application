// ----------------------------------------------------
//                          BG
// ----------------------------------------------------
//
//
//
//  Background changer
function bgChanger() {
  if (this.scrollY > this.innerHeight / 1) {
    // this. correspond to the window, if the window is less than the innerHeight, divide par half of the screen.
    //
    document.body.classList.add("bg-active");
  } else {
    document.body.classList.remove("bg-active");
  }
}

window.addEventListener("scroll", bgChanger);
//
//

// ----------------------------------------------------
//
//
//                           *
//

//                         BANNER
// ----------------------------------------------------
//

const banner = document.querySelector("#banner");
banner.innerHTML = "<h1>ROSETTA</h1>  <h2>Stay Inspired</h2>";

//--new Div
const imgBgBanner = document.createElement("div");
imgBgBanner.classList.add("imgBgBanner");
banner.appendChild(imgBgBanner);
// ----------------------------------------------------
//
//
//                           *
//
// ----------------------------------------------------
//                          TOP
// ----------------------------------------------------
//
const topSection = document.querySelector("#topSection");
//
const introTop = document.createElement("div");
introTop.classList.add("introTop");
// text Title
const titleTop = document.createElement("h1");
titleTop.innerHTML = "ABOUT";
// text description
introTop.innerHTML =
  "<p>To this day Rosetta actively seeks new and refreshing ways to approach publishing Due to our substantial range of titles, we pursue the enrichment of our reader's lives as well as to continually engage with the surrounding creative landscape.</p>" +
  "<p> Since our creation we have been focusing on the aesthetic, particularly that of graphic design and, over the last two decades, the scope of both our content and our expertise has widened. </p>" +
  "<p>By observing a multitude of cultures, people, arts, and other intimate, inspirational informants, we archive and anticipate vital movements in architecture, visual culture, design & fashion, escapism, food & beverages, travel, and contemporary art.</p>" +
  "<p>  After Little Rosetta joined the literary ranks in 2019, we aspire to ensure that there was a place for reader's of all ages withing the world of Gestalten.  </p>";
//
//
// text See More
const seeMoreBtn = document.createElement("span");
seeMoreBtn.classList.add("seeMoreBtn");
seeMoreBtn.innerHTML = "See More";
introTop.appendChild(seeMoreBtn);

//
//

topSection.appendChild(introTop);
introTop.appendChild(titleTop);
// BG image Books
const topSectionImg = document.createElement("div");
topSectionImg.classList.add("topSectionImg");
topSection.appendChild(topSectionImg);
//
// seeMoreBtn link
// careful to where you position the function below
document.querySelector(".seeMoreBtn").onclick = () => {
  location.href = "search.html";
};
//
// -------------------------
//CREDITS Section
// -------------------------
const credits = document.createElement("div");
credits.classList.add("credits");
topSection.appendChild(credits);

// text about us
credits.innerHTML = "<h3>CREDITS</h3>  <h4>The Team</h4>";

// ----------------------------------------------------
//
//
//                           *
//
// ----------------------------------------------------
//                         MIDDLE
// ----------------------------------------------------
//
const middleSection = document.querySelector("#middleSection");

// ----------------------------------------------------
//
//
//                           *
//
// ----------------------------------------------------
//                         FOOTER
// ----------------------------------------------------
//
const footer = document.querySelector("#footer");
const footerWrap = document.createElement("div");
footerWrap.classList.add("footerWrapper");

footer.appendChild(footerWrap);

footerWrap.innerHTML = "<p>© 2020 NADIA MARIDUENA</p>";
