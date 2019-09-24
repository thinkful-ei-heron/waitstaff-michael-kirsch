'use strict';

const store = {
  //default tax rate, maybe?
  currentMeal: {
    price: 0, 
    tax: 0, 
    tipPercent: 0
  },
  mealCount: 0,
  totalTips: 0
};

function storeEarnings (tip) {
  store.mealCount++;
  store.totalTips += tip;
}

function calculateCharges () {
  const meal = store.currentMeal;
  const subtotal = meal.price * (1 + (meal.tax/100));
  const tip = subtotal * (meal.tipPercent/100);
  const total = subtotal + tip;
  displayCharges(subtotal, tip, total);
  storeEarnings(tip);
}

function displayCharges (subtotal, tip, total) {
  
  $('#subtotal').text(subtotal.toFixed(2));
  $('#tip').text(tip.toFixed(2));
  $('#total').text(total.toFixed(2));

}

function displayEarnings () {
  $('#tip-total').text(store.totalTips.toFixed(2));
  $('#meal-count').text(store.mealCount);
  if(store.mealCount !== 0){
    $('#tip-average').text((store.totalTips/store.mealCount).toFixed(2));
  } else {
    $('#tip-average').text('0.00');
  }
}

function handleSubmitButton () {
  $('#meal-form').submit( event =>{
    event.preventDefault();
    //base-price tax tip
    store.currentMeal.price = $('#base-price').val();
    store.currentMeal.tax = $('#tax').val();
    store.currentMeal.tipPercent = $('#tipIn').val();
    calculateCharges();
    displayEarnings();
  });
}

function handleResetButton () {
  $('#reset-page').on('click', event =>{
    event.preventDefault();
    for (let key in store.currentMeal) {
      store.currentMeal[key] = 0;
    }
    store.mealCount = 0;
    store.totalTips = 0;
    displayEarnings();
    displayCharges(0,0,0);
    $('#meal-form').trigger('reset');
  });
}


function init () {
  handleSubmitButton();
  handleResetButton();
  displayEarnings();
  displayCharges(0,0,0);
}

$(init);
