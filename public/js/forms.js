const codeForm = document.getElementById('code-form')
const inputCode = document.getElementById('code-input')
const codeContainer = document.querySelector('.code-container')
const registrationContainer = document.querySelector('.registration-container')
const errorMessage = document.querySelector('.error')

codeForm.addEventListener('submit', function (e) {
    e.preventDefault()
    errorMessage.innerText = ""
    if (inputCode.value === "iamamusician") {
        codeContainer.style.display = 'none'
        registrationContainer.style.display = 'block'
    } else {
        errorMessage.innerText = "Sorry, that is not the correct code!"
    }
})