const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");

dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQRText);
sizes.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);

const defaultUrl = "https://youtube.com/";
let colorLight = "#fff",
    colorDark = "#000",
    text = defaultUrl,
    size = 300;

function handleDarkColor(event) {
    colorDark = event.target.value;
    generateQRCode();
}

function handleLightColor(event) {
    colorLight = event.target.value;
    generateQRCode();
}

function handleQRText(event) {
    const value = event.target.value;
    text = value;
    if (!value)
        text = defaultUrl;

    generateQRCode();
}

async function generateQRCode() {
    qrContainer.innerHTML = "";
    new QRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark
    });
    download.href = await resolveDataUrl();
}

async function handleShare() {
    console.log("Sharing");
    setTimeout(async () => {
        try {
            const base64url = await resolveDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png", {
                type: blob.type,
            });
            await navigator.share({
                files: [file],
                title: text,
            });
        }
        catch (err) {
            alert("Your browser doesn't support sharing.");
        }
    }, 100);
}

function handleSize(event) {
    size = event.target.value;
    // const defaultWidth = qrContainer.style.width;
    // const defalutHeight = qrContainer.style.height;

    // if (size > defaultWidth || size > defaultHeight) {
    //     size = defaultWidth;
    // }
    generateQRCode();
}

function resolveDataUrl() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img");
            if (img.currentSrc) {
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
}

generateQRCode();