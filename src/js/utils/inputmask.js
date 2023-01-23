import inputmask from "inputmask/dist/inputmask.es6.js";

inputmask({
    mask: "(999) 999-9999",
    greedy: false,
    clearIncomplete: true,
    showMaskOnHover: true,
}).mask('.form-phone');