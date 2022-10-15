const clientName = document.querySelector("#name");
const clientSurname = document.querySelector("#surname");
const orders = document.querySelectorAll('input[type="checkbox"]');
const count =  document.querySelectorAll('input[type="number"]');
const btn = document.querySelector(".btn");

spanSum = document.querySelector(".sum"); 

const countOrders = { 
    "espresso": 0,
    "americano": 0,
    "latte": 0,
    "capuchino": 0,
    "chocolate_muffin": 0,
    "blueberry_muffin": 0,
    "apple_tart": 0,
    "cheese": 0
}

const checkPriceOrders = { 
    "espresso": 0,
    "americano": 0,
    "latte": 0,
    "capuchino": 0,
    "chocolate_muffin": 0,
    "blueberry_muffin": 0,
    "apple_tart": 0,
    "cheese": 0
}


// для инпутов
count.forEach(elem => {
    elem.previousElementSibling.setAttribute('disabled', true);
    elem.addEventListener('change', function(){
        if (elem.value <= 0) {                                          // если введено вручную количество товара <=  0
            if (elem.parentElement.parentElement.firstElementChild.checked) {   // и если чекбокс отмечен
                elem.value = 1;                                                 // ставим в инпут значение 1
            }
            elem.previousElementSibling.setAttribute('disabled', true);         // кнопка "минус" блокируется
            elem.nextElementSibling.removeAttribute('disabled');                // кнопка "плюс" активна
        } else if (elem.value > 99) {                                   // иначе если введено вручную количество товара >  99 и чекбокс НЕ отмечен
            elem.value = 99;                                                    // ставим в инпут значение 99
            elem.nextElementSibling.setAttribute('disabled', true);             // кнопка "плюс" блокируется
            elem.previousElementSibling.removeAttribute('disabled');            // кнопка "минус" активна
        } else {                                                        // иначе если введено вручную количество товара больше 0 и меньше 99, и чекбокс НЕ отмечен
            elem.nextElementSibling.removeAttribute('disabled');                // кнопка "плюс" активна
            elem.previousElementSibling.removeAttribute('disabled');            // кнопка "минус" активна
        }
        countOrders[elem.id] = elem.value;
        amount();
    });
});


// для чекбоксов
orders.forEach(elem => {
    elem.addEventListener('click', function(){
        if (elem.checked) {                             // если чекбокс отмечен
            if (countOrders[elem.dataset.goods] <= 0) {         // и если количество товара <=  0
                countOrders[elem.dataset.goods] = 1;            // ставим в инпут значение 1
                document.querySelector(`#${elem.dataset.goods}`).value = 1;
                document.querySelector(`#${elem.dataset.goods}`).nextElementSibling.removeAttribute('disabled'); // кнопка "плюс" разблокируется
            //  console.log(countOrders[elem.dataset.goods]);
            } else if (countOrders[elem.dataset.goods] > 99) {  // иначе если количество товара больше 99 
                countOrders[elem.dataset.goods] = 99;           // ставим в инпут значение 99
                document.querySelector(`#${elem.dataset.goods}`).value = 99;
            }
            checkPriceOrders[elem.dataset.goods] = elem.value;            
        } else {                                        // иначе если чекбокс НЕ отмечен
            countOrders[elem.dataset.goods] = 0;                // ставим в инпут значение 0
            document.querySelector(`#${elem.dataset.goods}`).value = 0;
            document.querySelector(`#${elem.dataset.goods}`).previousElementSibling.setAttribute('disabled', true); // кнопка "минус" блокируется
        }
        amount();
    });
});


// подсчёт "итого"
function amount() {
    let amountSum = 0;
    orders.forEach(elem => {
        if (elem.checked) {
            amountSum += countOrders[elem.dataset.goods] * checkPriceOrders[elem.dataset.goods];
        }        
    })
    spanSum.textContent = `${amountSum} р.`;
};


// для кнопки +
function plus(idname) {
    let quantity = document.getElementById(idname);
    let val = quantity.value;
    quantity.previousElementSibling.removeAttribute('disabled');
    if (val < 99) {                                             // если значение инпута < 99
            val++;                                                        // при клике на кнопку "плюс" добавляем к значению 1
            quantity.value = val;
        countOrders[quantity.id] = quantity.value;
        if (val == 99) {                                        // и если значение стало == 99
            quantity.nextElementSibling.setAttribute('disabled', true);   // кнопка "плюс" блокируется
        }
    };
    amount();
};


// для кнопки -
function minus(idname){
    let quantity = document.getElementById(idname);
    let val = quantity.value;
    quantity.nextElementSibling.removeAttribute('disabled');
    if (val >= 1) {                                                     // если значение инпута >= 1
            val--;                                                              // при клике на кнопку "минус" уменьшаем значение на 1
            quantity.value = val;
        countOrders[quantity.id] = quantity.value;
        if (val == 0) {                                                // и если значение стало == 0
            quantity.previousElementSibling.setAttribute('disabled', true);     // кнопка "минус" блокируется
        }
    };
    amount();
};


    btn.addEventListener('click', function() {
        alert(`\nГость: ${clientSurname.value} ${clientName.value}\n\nСумма заказа: ${spanSum.textContent}\n\nХорошего дня!`);
    });
