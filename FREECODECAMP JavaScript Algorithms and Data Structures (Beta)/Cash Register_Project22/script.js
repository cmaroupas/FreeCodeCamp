// Global variables
let price = 0;
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

document.getElementById('purchase-btn').addEventListener('click', function() {  
    price = parseFloat(document.getElementById('price').value);
    const cash = parseFloat(document.getElementById('cash').value);
    const changeDueElem = document.getElementById('change-due');

    if (isNaN(price) || isNaN(cash)) {
        alert("Please enter valid numbers for price and cash.");
        return;
    }

    if (cash < price) {
        alert("Insufficient funds. Please provide more cash.");
        return;
    }

    if (cash === price) {
        changeDueElem.textContent = "Exact amount provided. No change due.";
        return;
    }

    const result = calculateChange(price, cash, cid);
    changeDueElem.textContent = result;
});

function calculateChange(price, cash, cid) {
    const coinValues = [
        ["ONE HUNDRED", 100],
        ["TWENTY", 20],
        ["TEN", 10],
        ["FIVE", 5],
        ["ONE", 1],
        ["QUARTER", 0.25],
        ["DIME", 0.1],
        ["NICKEL", 0.05],
        ["PENNY", 0.01]
    ];

    let changeDue = parseFloat((cash - price).toFixed(2));
    let changeArray = [];

    const totalCid = parseFloat(cid.reduce((acc, [_, amount]) => acc + amount, 0).toFixed(2));

    if (totalCid < changeDue) {
        return "Status: INSUFFICIENT_FUNDS";
    }

    if (totalCid === changeDue) {
        return "Status: CLOSED " + cid.map(([name, amount]) => `${name}: $${amount.toFixed(2)}`).join(" ");
    }

    for (let [coinName, coinValue] of coinValues) {
        let coinAmount = cid.find(([name]) => name === coinName)[1];
        let coinCount = Math.floor(coinAmount / coinValue);
        let amount = 0;

        while (changeDue >= coinValue && coinCount > 0) {
            amount += coinValue;
            changeDue -= coinValue;
            coinAmount -= coinValue;
            coinCount--;
            changeDue = parseFloat(changeDue.toFixed(2)); // Fix floating point precision issues
        }

        if (amount > 0) {
            changeArray.push([coinName, amount]);
        }
    }

    if (changeDue > 0) {
        return "Status: INSUFFICIENT_FUNDS";
    }

    let changeString = "Status: OPEN " + changeArray.map(([name, amount]) => `${name}: $${amount.toFixed(2)}`).join(" ");
    return changeString.trim();
}
