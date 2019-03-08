const sections = document.querySelectorAll("[data-scroll-to]");
const buttons = document.querySelectorAll("[data-scroll-go]");

let TARGET_Y = 0;
let indexInterval = null;
let STOP_CONST = -1;

function move(direction) {
    clearInterval(indexInterval);
    return setInterval(() => {
        let pageOffset = window.pageYOffset;

        pageOffset += direction * 20;

        if (direction > 0) {
            // console.log(pageOffset, TARGET_Y);

            if (pageOffset >= TARGET_Y) {
                clearInterval(indexInterval);
                pageOffset = TARGET_Y;
            }
        } else {
            if (pageOffset <= TARGET_Y) {
                clearInterval(indexInterval);
                pageOffset = TARGET_Y;
            }
        }

        if (pageOffset === STOP_CONST) {
            clearInterval(indexInterval);
        }
        STOP_CONST = pageOffset;

        // TARGET_Y += direction * 20;
        window.scrollTo(0, pageOffset);
        toScroll();
    }, Math.round(Math.random() * 10));
}

document.querySelector("header").addEventListener("click", ({ target }) => {
    if (target.hasAttribute("data-scroll-go")) {
        //target.tagName === "BUTTON"
        // console.log(target.getAttribute("data-scroll-go"));
        // window.scrollTo(0, 100);

        const index = +target.getAttribute("data-scroll-go");
        let direction = TARGET_Y;
        // if (index == sections.length) {
        //     console.log("123123");
        // }
        TARGET_Y = (index - 1) * 424;
        direction = direction < TARGET_Y ? +1 : -1;
        pageOffset = -1;
        indexInterval = move(direction);

        // window.scrollTo(0, (index - 1) * 424);
        toScroll();
    }
});

window.addEventListener("scroll", toScroll);
toScroll();

function toScroll() {
    for (let i = 0; i < sections.length; i++) {
        const { y } = sections[i].getBoundingClientRect();
        if (y <= 0) {
            const sectionNext = sections[i + 1];
            buttons[i].style.background = "green";

            if (sectionNext) {
                const { y } = sectionNext.getBoundingClientRect();
                if (y > 0) {
                    buttons[i + 1].style.background = "green";
                    for (let j = i + 2; j < sections.length; j++) {
                        buttons[j].style.background = "";
                    }

                    return;
                }
            }
        }
        // console.log(y, i);

    }
    buttons.forEach(e => {
        e.style.background = "";
    });

    let notOurSections = [];
    let allSections = document.querySelectorAll("section");
    allSections.forEach(e=>{
        if (!e.hasAttribute("data-scroll-to")){
            notOurSections.push(e);
       }
    });

    let { y } = notOurSections[notOurSections.length - 1].getBoundingClientRect();

    if (y<0) {
        buttons[0].style.background = "green";
    }
    // buttons[0].style.background = "green";

    // console.log(this.pageYOffset);
}

//--------------------------------------------------------------------------

//transitioned
// test.addEventListener("transitionend", ({ target }) => {
//     // console.log(target);
//     target.style.position = "absolute";
//     target.style.top = "200px";
//     target.style.left = "200px";
//     setTimeout(() => {
//         location.reload();
//     }, 1000);
// });