const refreshBtn = document.querySelector(".refresh-btn");
const container = document.querySelector(".container");
const maxPaletteBoxes = 20;

const generatePalette = () => {
  container.innerHTML = ""; // clearing the container

  for (let i = 0; i < maxPaletteBoxes; i++) {
    //    generating a random hex color code
    let randomHex = Math.floor(Math.random() * 0xfffff).toString(16);
    randomHex = `#${randomHex.padStart(6, "0")}`;

    // creating a new 'li' element and inserting it to the container
    const color = document.createElement("li");
    color.classList.add("color");
    color.innerHTML = ` <div class="rect-box" style = "background: ${randomHex}"></div>
    <span class="hex-value">${randomHex}</span>`;

    // adding click event to current li element to copy the color
    color.addEventListener("click", () => copyColor(color, randomHex));
    container.appendChild(color);
  }
};

generatePalette();

/* 
const copyColor = async (ele, hexVal) => {
  try {
    // copying the hex value, updating the next to copied
    // and changing text back to original hex value after 1 second
    await navigator.clipboard.writeText(hexVal);
    const colorElement = ele.querySelector(".hex-value");
    colorElement.innerText = "copied";
    setInterval(() => (colorElement.innerText = hexVal), 1000);
  } catch (error) {
    console.log(error.message);
  }
};
 */

const unsecuredCopyToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  document.body.removeChild(textArea);
};
/**
 * Copies the text passed as param to the system clipboard
 * Check if using HTTPS and navigator.clipboard is available
 * Then uses standard clipboard API, otherwise uses fallback
 */
const copyColor = (ele, hexVal) => {
  if (window.isSecureContext && navigator.clipboard) {
    navigator.clipboard.writeText(hexVal);
  } else {
    unsecuredCopyToClipboard(hexVal);
  }
  const colorElement = ele.querySelector(".hex-value");
  colorElement.innerText = "copied";
  setInterval(() => (colorElement.innerText = hexVal), 1000);
};

refreshBtn.addEventListener("click", generatePalette);
