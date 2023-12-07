// setting varaibles for calcualation
let a = '';
let b = '';
let op = '';

//selecting display & buttons
let display = document.querySelector('#display')
display.textContent = 0;

let keyboard = document.querySelector('.keyboard')
let butNumbers = keyboard.querySelectorAll('#numbers')
let butOperators = keyboard.querySelectorAll('#operators')

let sum = document.querySelector('#equals')
let ac = document.querySelector('#ac')
let del = document.querySelector('#del')
let dec = document.querySelector('#dec')
let changeSign = document.querySelector('#change')
let zero = document.querySelector('#zero')

//setting indicators for typing a or b (typingFirst) & check if it's a first calculation (sumDone)
let typingFirst = true;
let sumDone = false;

//setting number buttons except 0, limiting total number of characters to 9
butNumbers.forEach((item) => {
    item.addEventListener('click', (e) => {
        if (a.length < 9 && typingFirst && !sumDone || typingFirst && sumDone || b.length <9 && !typingFirst){
             if (sumDone && typingFirst) {
                a = e.target.textContent;
                display.textContent = a;
                sumDone = false;
                }
            else if (typingFirst) {
                a += e.target.textContent
                display.textContent = a;
            }
            else {
                b += e.target.textContent;
                display.textContent = b;
            }
        }
    })
})

//setting operators buttons, making them act like '=' if pressed after seconf number is present
butOperators.forEach((item) => {
    item.addEventListener('click', (e) => {
        if (!b && a == "") {
            a = '0'
            op = e.target.textContent;
            typingFirst = false
        }
        else if (!b) {
            op = e.target.textContent;
            typingFirst = false
        }
        else  {
            let sum1 = math[op] (a,b);
            res(sum1);
            a = sum1;
            b = '';
        }
    })
})
//setting calculations based on operator
    const math = {
        '+': (a,b) => ( +a + (+b)),
        '-': (a,b) => ( +a - (+b)),
        '*': (a,b) => ( +a * (+b)),
        '/': (a,b) => ( +a / (+b)),
                }
//setting '=' button, adding division by 0 case
sum.addEventListener('click', () => {
    if (a && op && b !== '0') {
        let sum1 = math[op] (a,b);
        res(sum1);       
        a = sum1;
        b = '';
        op = '';
        typingFirst = true;
        sumDone = true;
     }
    else if (a && b== '0') {
        display.textContent = "ERROR"
        typingFirst = true;
        a = '';
        b = ''
    }
    })

//setting logic how to show different numbers to fit display
let res = (sum1) => {
    sum1 = Math.round(sum1*10000000)/10000000;
    let sum2 = sum1.toString();
    let sum3 = sum2.slice(sum2.indexOf('.'));
    let sum4 = sum2.slice(0, sum2.indexOf('.'));

    if (sum4.length < 8 && sum3.length > 5) {
        display.textContent = sum1.toFixed(5)
    }
    if (sum4.length > 8 && sum3.length > 3) {
            display.textContent = sum1.toFixed(3)
    }
    else if (sum2.length > 14) {
            display.textContent = sum1.toExponential(6)}
    else  display.textContent = sum1;
}
//setting 'all clear', 'delete character', '.', 'change sign', '0' buttons
ac.addEventListener('click', () => {
    a = '';
    b = '';
    op = '';
    typingFirst = true;
    display.textContent = 0;
    sumDone = false;
})

del.addEventListener('click', () => {
    if (typingFirst && !sumDone) {
        a = a.slice(0, -1)
        display.textContent = a;
    }
    else if (!typingFirst && b) {
        b = b.slice(0, -1)
        display.textContent = b;
    }  
})

dec.addEventListener('click', (e) => {
    if (a == '' && !sumDone && typingFirst || a !== '' && sumDone && typingFirst) {
        a = '0.'
        sumDone = false;
        display.textContent = a;
    }
    else if (!typingFirst && b == '') {
        b = '0.'
        display.textContent = b;
    }
    else if (typingFirst && !sumDone && !a.includes('.') && a.length <9) {
        a += e.target.textContent;
        display.textContent = a;
    }
    else if (!typingFirst && !b.includes('.') && b.length <9) {
        b += e.target.textContent;
        display.textContent = b;
    }
})

changeSign.addEventListener('click', () => {
    if (typingFirst && !sumDone && a) {
        a = -a
        display.textContent = a;
    }
    else if (!typingFirst && b) {
        b = -b
        display.textContent = b;
    }})


zero.addEventListener('click', (e) => {
    if (a != '' && typingFirst && !sumDone && display.textContent != '0') {
        a += e.target.textContent
            display.textContent = a;
    }
    else if (a !== '' && typingFirst && sumDone) {
        display.textContent = '0';}

    else if (b == '' && !typingFirst) {
            display.textContent = '0';
    }
    else if (b !== '' && !typingFirst && display.textContent != '0') {
        b += e.target.textContent
            display.textContent = b;
}
    })