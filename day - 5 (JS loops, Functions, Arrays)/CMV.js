
document.getElementById('goBtn').addEventListener('click', () => {
 const num1 = parseInt(document.getElementById('num1').value, 10);
 const num2 = parseInt(document.getElementById('num2').value, 10);
 const output = document.getElementById('output');
 output.innerHTML = '';

 for (let i = 1; i <= 24; i++) {
 const div = document.createElement('div');
 div.classList.add('item');

 if (i % num1 === 0 && i % num2 === 0) {
 div.textContent = `${i} (${num1} * ${i/num1})`;
 div.classList.add('m1');
 } else if (i % num1 === 0) {
 div.textContent = `${i} (${num1} * ${i/num1})`;
 div.classList.add('m2');
 } else if (i % num2 === 0) {
 div.textContent = `${i} (${num2} * ${i/num2})`;
 div.classList.add('m12');
 } else {
 div.textContent = i;
 div.classList.add('number');
 }

 output.appendChild(div);
 }

document.getElementById("msg1").textContent = `Multiples of ${num1} are in Green.`;
document.getElementById("msg2").textContent = `Multiples of ${num2} are in Yellow.`;
document.getElementById("msg3").textContent = `Multiples of Both ${num1} and ${num2} are in Pink.`;
});