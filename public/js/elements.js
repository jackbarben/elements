const sectionOne = document.querySelector('.section-1')
const sectionTwo = document.querySelector('.section-2')
const sectionThree = document.querySelector('.section-3')
const sectionFour = document.querySelector('.section-4')

const classesButton = document.getElementById('classes-button')
const exercisesButton = document.getElementById('exercises-button')
const improvisationsButton = document.getElementById('improvisations-button')

classesButton.addEventListener('click', function () {
    sectionOne.classList.value = 'display-none'
    sectionTwo.classList.toggle('display-none')
})

exercisesButton.addEventListener('click', function () {
    sectionOne.classList.value = 'display-none'
    sectionThree.classList.toggle('display-none')
})

improvisationsButton.addEventListener('click', function () {
    sectionOne.classList.value = 'display-none'
    sectionFour.classList.toggle('display-none')
})