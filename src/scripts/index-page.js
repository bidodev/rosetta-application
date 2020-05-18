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
titleTop.classList.add("about");

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

footerWrap.innerHTML = "<p>DESIGN © 2020 NADIA MARIDUENA</p>";

//
//
//
//****NEW */
// ----------------------------------------------------
//
//
//                           *
//
// ----------------------------------------------------
//                         BOTTOM
// ----------------------------------------------------
//

const bottomSection = document.querySelector("#bottomSection");
const formWrapper = document.createElement("div");
formWrapper.classList.add("formWrapper");
const forma = document.querySelector("#form");

//
const bottomTitle = document.createElement("h1");

bottomTitle.innerText = "LOG IN ";
bottomTitle.style.margin = "10px";
bottomTitle.style.padding = " 40px 0 10px 0";
bottomTitle.style.fontSize = "1rem";

// append
bottomSection.appendChild(bottomTitle);
bottomSection.appendChild(formWrapper);
formWrapper.appendChild(forma);

//****NEW */

// ========================================== Arbic layout =================================================

const arabicLang = document.querySelector(".arabicLang");
const englishLang = document.querySelector(".englishLang");
const teamMember1 = document.getElementById("teamMember1");
const teamMember2 = document.getElementById("teamMember2");
const teamMember3 = document.getElementById("teamMember3");
const memberName1 = document.getElementById("memberName1");
const memberName2 = document.getElementById("memberName2");
const memberName3 = document.getElementById("memberName3");
const ban1 = document.querySelector("#banner h1");
const ban2 = document.querySelector("#banner h2");
const cred = document.querySelector(".credits h3");
const cred2 = document.querySelector(".credits h4");
const tryItBtn = document.querySelector("#header li:nth-child(1)");
const creditBtn = document.querySelector("#header li:nth-child(2)");
const about = document.querySelector(".about");
tryItBtn.classList.add("headerarabic");
creditBtn.classList.add("headerarabic");

const changeToArabic = () => {
  cred2.style.opacity = 0;
  cred.innerHTML = "فريق العمل ";
  ban2.innerHTML = "القراءة الحرّة تصلح ما أفسدتهُ المدرسة";
  titleTop.innerHTML = "لمحة عن الفريق";
  tryItBtn.innerHTML = "ابدأ البحث";
  tryItBtn.style.fontSize = "larger";
  creditBtn.innerHTML = "فريق العمل ";
  creditBtn.style.fontSize = "larger";
  introTop.innerHTML =
    "<p> حتى يومنا هذا ، نسعى إلى طرق جديدة ومنعشة للتعامل مع النشر نظرًا لمجموعة عناويننا الكبيرة ، فنحن نسعى إلى إثراء حياة قرائنا بالإضافة إلى الانخراط باستمرار في المشهد الإبداعي المحيط. </ p>" +
    "<p> منذ البداية ، كنا نركز على الجمالية ، ولا سيما التصميم المرئي ، وعلى مدى العقدين الماضيين ، اتسع نطاق كل من المحتوى وخبرتنا. </ p>" +
    "<p> من خلال ملاحظة العديد من الثقافات والأشخاص والفنون وغيرهم من المخبرين الحميمين والملهمين ، نقوم بأرشفة واستباق الحركات الحيوية في العمارة والثقافة البصرية والتصميم والأزياء والهروب والطعام والمشروبات والسفر والفن المعاصر. </p> " +
    "<p> .بعد أن انضمت روزيتا إلى الرتب الأدبية في عام 2019 ، نطمح إلى ضمان وجود مكان للقراء من جميع الأعمار في العالم </p>";
  introTop.style.textAlign = "right";
  memberName1.innerHTML = "زكريا";
  memberName1.style.textAlign = "right";
  teamMember1.style.textAlign = "right";
  teamMember1.style.fontSize = "16px";
  teamMember1.innerHTML = `<p id = "teamMember1">
  كنت مسؤولاً عن تصميم وتطوير تطبيق البحث
  | <span
    > المهام المتضمنة: البحث ، تطوير الحلول ، أداء
    الصفحة ديناميكيًا ، إصلاح الأعطال في التطبيق </ span
  >`;
  memberName2.innerHTML = "بيدو";
  memberName2.style.textAlign = "right";
  teamMember2.style.textAlign = "right";
  teamMember2.style.fontSize = "16px";
  teamMember2.innerHTML = `<p id = "teamMember2">
  كنت مديراً للمشروع ومسؤول أيضًا عن تطوير التطبيق
    | <span
    > المهام المتضمنة: إدارة الفريق ، تفويض المهام ،
دمج مكالمات الواجهة الأمامية والخلفية / واجهة برمجة التطبيقات
  </span>
</p>`;
  memberName3.innerHTML = "ميليسا";
  memberName3.style.textAlign = "right";
  teamMember3.style.textAlign = "right";
  teamMember3.style.fontSize = "16px";
  teamMember3.innerHTML = `<p id = "teamMember3">
كنت مسؤولة عن تصميم مخطط الموقع و
التوثيق | <span
  > المهام المتضمنة: رسم الأنماط  | تصميم و
  اضافة رسومات الى الموقع باستخدام عدة أدوات مختلفة </ span
>
</p>`;
  tryItBtn.onclick = () => {
    location.href = "search.html";
  };
  englishLang.onclick = () => {
    location.href = "index.html";
  };
  creditBtn.onclick = () => {
    middleSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
};
