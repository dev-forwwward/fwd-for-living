export function footerDate() {
    // Set dynamic date in Footer Components
    let spanInstances = document.querySelectorAll(".current-year");

    if (spanInstances) {
        spanInstances.forEach((span) => {
            span.innerHTML = new Date().getFullYear();
        });
    }


    let creditTextInstances = document.querySelectorAll(".footer15_credit-text");

    if (creditTextInstances) {
        creditTextInstances.forEach((el) => {
            if (el.textContent.includes("Forwwward")) {
                let link = el.closest("a");
                if (link) {
                    link.href = "https://www.forwwward.studio/";
                    link.rel = "noopener";
                }
            }
        });
    }

    console.log("running footerDate()");





}