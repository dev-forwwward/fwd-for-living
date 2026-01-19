export function testScript() {

    console.log("This message is coming from an uncommited .js file that is running in localhost");
    // console.log("This is a test script - I'm living in a GitHub repo!");

    let root = document.querySelector('body');
    const newText = document.createElement('h2');
    newText.textContent = "THIS IS A TEST ENV";    
    root.appendChild(newText);

    console.log("running testScript()");
}

// https://cdn.jsdelivr.net/gh/beatriz-araujo-fwrd/fwd-for-living@latest/test.js