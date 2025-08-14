const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");


fetch("https://api.exchangerate-api.com/v4/latest/USD")
    .then(res => res.json())
    .then(data => {
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
            fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
            toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        });
        fromCurrency.value = "USD";
        toCurrency.value = "BRL";
    });


convertBtn.addEventListener("click", () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const value = amount.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[to];
            const converted = (value * rate).toFixed(2);
            result.innerText = `${value} ${from} = ${converted} ${to}`;
        });
});
