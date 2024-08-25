document.getElementById('submitBtn').addEventListener('click', function() {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorMsg = document.getElementById('errorMsg');
    const dropdownSection = document.querySelector('.dropdown-section');

    // Validate JSON format
    try {
        const jsonData = JSON.parse(jsonInput);
        if (jsonData && jsonData.data) {
            errorMsg.textContent = '';
            dropdownSection.style.display = 'block';
            renderResponse(jsonData);
        } else {
            throw new Error('Invalid JSON structure');
        }
    } catch (e) {
        errorMsg.textContent = 'Invalid JSON input. Please enter a valid JSON.';
        dropdownSection.style.display = 'none';
    }
});

function renderResponse(jsonData) {
    const responseOptions = document.getElementById('responseOptions');
    const responseOutput = document.getElementById('responseOutput');
    responseOutput.innerHTML = '';  // Clear previous response

    responseOptions.addEventListener('change', function() {
        const selectedOptions = Array.from(responseOptions.selectedOptions).map(opt => opt.value);
        let outputHtml = '';

        selectedOptions.forEach(option => {
            if (option === 'alphabets' && jsonData.alphabets) {
                outputHtml += `<p><strong>Alphabets:</strong> ${jsonData.alphabets.join(', ')}</p>`;
            }
            if (option === 'numbers' && jsonData.numbers) {
                outputHtml += `<p><strong>Numbers:</strong> ${jsonData.numbers.join(', ')}</p>`;
            }
            if (option === 'highestLowercase' && jsonData.highest_lowercase_alphabet) {
                outputHtml += `<p><strong>Highest Lowercase Alphabet:</strong> ${jsonData.highest_lowercase_alphabet}</p>`;
            }
        });

        responseOutput.innerHTML = outputHtml || '<p>No options selected</p>';
    });
}
