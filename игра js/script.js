let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let score = 0; /*Считает клики */
let $time = document.querySelector('#time')
let isGameStarted = false
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $gameTime = document.querySelector('#game-time')

$start.addEventListener('click',startGame) /* Задаем при клике начало игрв*/
$game.addEventListener('click', hendleBoxClick)/*Задаем прослушку события и вызов функции при клике */
$gameTime.addEventListener('input',  setGameTimes) /*прослушка события на гейм тайм */


/* Функция начало игры.  скрываем кнопку, задаем бегкраунд и после всего этого 
 вызываем другую функцию которая запускает рандом квадраы */
function startGame () {     
    score = 0   /* обнуляем значение счета(для возобнавления игры)*/  
    setGameTimes() /*вызываем эт функцию что б игра снова пошла с нашего времени*/
    $gameTime.setAttribute('disabled',true)/*блокируем импут что бы во время игры нельзя было увеличить время игры*/                 
    isGameStarted = true         
    $start.classList.add('hide')
    $game.style.backgroundColor='#fff'
    /*запускаем интервал игры*/
    let interval = setInterval(function() {
    let time = parseFloat($time.textContent)
        if(time <= 0) {
            clearInterval(interval) /*Останавливаем интервал */
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }

    }, 100)
    renderBox ()
}
/* постановка значения времмени для запуска игра снова с выбраного времни*/

function setGameTimes() {
    let time = +$gameTime.value /*знаком + приводим к числу значение вресмени */
    $time.textContent= time.toFixed(1)
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')   
}

/* Функция устанавливающая счет игры */
function setGameScore (){
    $result.textContent = score.toString()
}

/*функция остановки игры */
function endGame () {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    $start.classList.remove('hide')
    $game.innerHTML=''
    $game.style.backgroundColor = '#ccc'
    $timeHeader.classList.add('hide')
    $resultHeader.classList.remove('hide')
}
/* Функция которая генирирует случайный цвет квадрата */
function setBackgroundColor() {
    var r = Math.floor(Math.random() * 255)
    var g = Math.floor(Math.random() * 255)
    var b = Math.floor(Math.random() * 255)
    return color = ('(' + r + ',' + g + ',' + b +')')
}
/*Функция создания квадратов. создем див. в нем генирируем квадрат
с определенным стилем и позицией добавляем курсор добавляем функцию
которая нам кладет  определенный html в данный див*/ 
function renderBox () {    
    $game.innerHTML='' /*удаляем стили что бы не было генерации на одном и том же месте и дубляжа*/                         
let box = document.createElement('div')
let boxsize = getrandom(30,100)
let gameSize = $game.getBoundingClientRect()/* узнаем размер поля с помощ этого*/
let maxTop = gameSize.height - boxsize
let maxLeft = gameSize.width- boxsize
   box.style.height=box.style.width= boxsize + 'px'
   box.style.position= 'absolute'
   box.style.backgroundColor = 'rgb' + setBackgroundColor()
   box.style.top = getrandom(0,maxTop) + 'px'
   box.style.left = getrandom(0,maxLeft) + 'px'
   box.style.cursor= 'Pointer'
   box.setAttribute('data-box','true')
   $game.insertAdjacentElement('afterbegin',box) 
}
/*Ловим событие клика по квадрату обращаемся к гейм вешаем событиее на весь блок гейм */

function hendleBoxClick (event) {
    if(!isGameStarted) { /* Если игра запущена то выполняем логику по клику и счету  */
        return
    }
    if (event.target.dataset.box) /*Если присутствует ключ бох значит мы сделали клик по квадрату*/{
        score++
        renderBox ()
    }
}

/*Создаем функцию для динамического размера квадрата */
function getrandom(min,max) {
    return Math.floor(Math.random () * (max - min) + min) 
    /*создаем рандом размеры и округдляем  */
}

/* рефакторинг создаем функции которые прячут и создают элементы 

function show ($el) {
    $el.classList.remove('hide')

}

function hide ($el) {
    $el.classList.add('hide')
}

В наших функция пишем так show($timeHeader) ; hide ($timeHeader) итд
*/

