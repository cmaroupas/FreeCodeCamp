document.getElementById('check-btn').addEventListener('click', function() {
    const inputText = document.getElementById('text-input').value.trim();
    const resultElement = document.getElementById('result');

    
    if (!inputText) {
        alert("Please input a value");
        resultElement.textContent = ''; 
        return;
    }

    
    function isPalindrome(str) {
        
        const filteredText = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        return filteredText === filteredText.split('').reverse().join('');
    }

   
    const isPalindromeResult = isPalindrome(inputText);

  
    const resultText = isPalindromeResult 
        ? `${inputText} is a palindrome`
        : `${inputText} is not a palindrome`;

  
    resultElement.textContent = resultText;
});
