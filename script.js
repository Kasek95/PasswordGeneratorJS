const btnClip = document.querySelector('#clipboard');
const btn = document.querySelector('#gen');
const resultPass = document.querySelector('#result');
const passLength = document.querySelector('#length');
const upperCaseLetter = document.querySelector('#upper');
const loweCaseLetter = document.querySelector('#lower');
const number = document.querySelector('#numbers');
const symbol = document.querySelector('#symbols');



const lowerLetters = () => {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const upperLetters = () => {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const randomNumber = () => {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};
const randomSymbol = () => {
	const symbols = `!@#$%^&*(){}[]=<>,.`;
	return symbols[Math.floor(Math.random() * symbols.length)];
};
const fun = {
	lower: lowerLetters,
	upper: upperLetters,
	number: randomNumber,
	symbol: randomSymbol,
};



const generatePassword = (upper, lower, number,symbol,length) => {
    let generatePass = '';

    let checkedCount = upper + lower +number + symbol;

    const typeArray = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0])
   
    if(checkedCount === 0) {
     return ''
    }

    for(let i =0; i < length; i += checkedCount){
     typeArray.forEach(type => {
         const funName = Object.keys(type)[0];
         generatePass += fun[funName]();
     })
    }

    const finalPassword = generatePass.slice(0, length);
    return finalPassword;
}


btn.addEventListener('click', () => {
    const pass = +passLength.value;
    const hasUpper = upperCaseLetter.checked;
    const hasLowerr = loweCaseLetter.checked;
    const hasNumber = number.checked;
    const hasSymbol = symbol.checked;

    resultPass.innerText = generatePassword(hasUpper,hasLowerr,hasNumber,hasSymbol, pass)
})

btnClip.addEventListener('click', ()=> {
    const textArea = document.createElement('textarea')
    const password = resultPass.innerText;

    if(!password) {
        return
    }

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove()
    alert(`Password copied!`)
})
