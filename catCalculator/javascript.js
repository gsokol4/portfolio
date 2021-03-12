'use strict'

/* ref to docs */
const numbers = document.querySelectorAll('[data-button-numbers^=append]')
const func = document.querySelectorAll('[data-func]')
const del = document.querySelector('[data-delete]')
const clear = document.querySelector('[data-clear]')
const equals = document.querySelector('[data-equals]')
const screen = document.querySelector('[data-screen]')
/* calculator class */
class Calculator {
  constructor (screen) {
    this.screen = screen
    this.clear()
    this.letter_Count = 0
  }

  clear () {
    this.screen.textContent = ''
    this.operation = undefined
    this.letter_Count = 0
  }

  delete () {
    const position = this.screen.textContent.slice(-1)
    console.log(position)
    if (this.screen.textContent.charAt(position) === '.') {
      this.letter_Count = 0
      console.log(this.letter_Count)
    }
    this.screen.textContent = this.screen.textContent.slice(0, -1)
  }

  appendNumber (number) {
    if (this.letter_Count > 0 && number.toString() === '.') { return };
    if (number.toString() === '.') { this.letter_Count = 1 };
    this.screen.textContent = this.screen.textContent.toString() +
            number.toString()
  }

  /* find a more eligant solution for non duplicates of operands */
  op (operand) {
    const text = this.screen.textContent
    if (text.toString() === '' && operand !== '-') { return }

    if (text.toString().charAt(text.length - 1) === '+' && operand !== '-') { return };

    if (text.toString().charAt(text.length - 1) === '-') { return };

    if (text.toString().charAt(text.length - 1) === '\xD7' && operand !== '-') { return };

    if (text.toString().charAt(text.length - 1) === '\xF7' && operand !== '-') { return };

    if (text.charAt(text.length - 1).toString() === '.') { return }

    this.letter_Count = 0
    this.solve()
    this.screen.textContent = this.screen.textContent.toString() +
            operand
  }

  solve () {
    switch (true) {
      case (this.screen.textContent.charAt(0) === '-'): {
        this.negativeNumberSwitch()
        break
      }
      case (this.screen.textContent.includes('+')):
      {
        this.add()
        break
      }
      case (this.screen.textContent.includes('-') && this.MulAndDivCheck() === false):
      {
        this.minus()
        break
      }
      case (this.screen.textContent.includes('\xD7')):
      {
        this.multiply()
        break
      }
      case (this.screen.textContent.includes('\xF7')):
      {
        this.division()
        break
      }

      default: { }
    }
  }

  negativeNumberSwitch () {
    switch (true) {
      case (this.screen.textContent.includes('+')):
      {
        this.add()
        break
      }

      case (this.screen.textContent.slice(1, -1).includes('-') &&
            this.MulAndDivCheck() === false):
      {
        this.addingNegativeNums()
        break
      }

      case (this.screen.textContent.includes('\xD7')):
      {
        this.multiply()
        break
      }

      case (this.screen.textContent.includes('\xF7')):
      {
        this.division()
        break
      }
      default :
    }
  }

  add () {
    const partsOfSum = this.screen.textContent.split('+')
    if (partsOfSum[1].toString() === '') { return };
    this.screen.textContent = (Number.parseFloat(partsOfSum[0]) +
            (Number.parseFloat(partsOfSum[1])))
  }

  addingNegativeNums () {
    const partsOfSum = this.screen.textContent.split('-')
    console.log(partsOfSum)
    if (partsOfSum[2].toString === '') { return }
    this.screen.textContent = '-' + (Number.parseFloat(partsOfSum[1]) +
            (Number.parseFloat(partsOfSum[2])))
  }

  minus () {
    const partsOfSub = this.screen.textContent.split('-')
    if (partsOfSub[1].toString === '') { return }
    this.screen.textContent = (Number.parseFloat(partsOfSub[0]) -
            (Number.parseFloat(partsOfSub[1])))
  }

  multiply () {
    console.log('multiply used')
    const partsOfMul = this.screen.textContent.split('\xD7')
    if (partsOfMul[1] === '') { return }
    if (partsOfMul[1] === '-') { return }
    console.log(partsOfMul)
    console.log(partsOfMul[0])
    console.log(partsOfMul[1])
    this.screen.textContent = (Number.parseFloat(partsOfMul[0]) *
            (Number.parseFloat(partsOfMul[1])))
  }

  division () {
    const partsOfDiv = this.screen.textContent.split('\xF7')
    if (partsOfDiv[1].toString() === '') { return };
    if (partsOfDiv[1].toString() === '0') {
      this.divideByZero()
    } else {
      this.screen.textContent = (Number.parseFloat(partsOfDiv[0]) /
            (Number.parseFloat(partsOfDiv[1])))
    }
  }

  divideByZero () {
    const divideByZeroImg = document.createElement('img')
    divideByZeroImg.src = 'https://i.chzbgr.com/full/8175066880/h18D266AA/u-dun-goofed'

    const button = document.createElement('button')
    button.textContent = 'Back to Calculator'
    button.setAttribute('onClick', 'location.reload()')

    const body = document.querySelector('body')
    body.innerHTML = ''
    body.style.display = 'flex'
    body.style.flexDirection = 'column'
    body.style.width = '35vmax'
    body.style.height = 'auto'
    body.style.margin = 'auto'
    body.appendChild(divideByZeroImg)
    body.appendChild(button)
  }

  MulAndDivCheck () {
    const arr = ['\xD7', '\xF7', '+']

    const result = arr.some((operand) => this.screen.textContent.includes(operand))
    console.log(result)
    return result
  }
}
/* test */

/* event listenters */
const calculator = new Calculator(screen)

clear.addEventListener('click', () => {
  calculator.clear()
})

del.addEventListener('click', () => {
  calculator.delete()
})

for (const num of numbers) {
  num.addEventListener('click', () => {
    calculator.appendNumber(num.textContent)
  })
}

for (const operand of func) {
  operand.addEventListener('click', () => {
    calculator.op(operand.textContent)
  })
}
equals.addEventListener('click', () => {
  calculator.solve()
})

const catImages = ['gifs/plusheen.gif', 'plusheenAdd.png', 'plusheenButt.png', 'plusheenCute.png',
  'plusheenDepressed.png', 'plusheenDrool.png', 'plusheenKiss.png', 'plusheenMagnifineGlass.png',
  'plusheenMeh.png', 'plusheenQuestion.png', 'plusheenScooter.png', 'plusheenSurprise.png',
  'plusheenwink.png']

const catQuotes = ['"In ancient times cats were worshipped as gods; they have not forgotten this." - Terry Pratchett',
  '"I had been told that the training procedure with cats was difficult. It is not. Mine had me trained in two days." - Bill Dana',
  '"Cats are inquisitive, but hate to admit it." - Mason Cooley',
  '"As anyone who has ever been around a cat for any length of time well knows, cats have enormous patience with the limitations of the humankind." - Cleveland Amory',
  '"I have studied many philosophers and many cats. The wisdom of cats is infinitely superior." - Hippolyte Taine',
  '"There are two means of refuge from the miseries of life: music and cats." - Albert Schweitzer',
  '"Owners of dogs will have noticed that, if you provide them with food and water and shelter and affection, they will think you are God. Whereas owners of cats are compelled to realize that,if you provide them with food and water and affection, they draw the conclusion that they are God." - Christopher Hitchens',
  '"A happy arrangement: many people prefer cats to other people, and many cats prefer people to other cats." - Mason Cooley',
  '"It is impossible for a lover of cats to banish these alert, gentle, and discriminating friends,  who give us just enough of their regard and complaisance to make us hunger for more." - Agnes Repplier',
  '"How we behave toward cats here below determines our status in heaven." - Robert A. Heinlein',
  '"I used to love dogs until I discovered cats." - Nafisa Joseph',
  '"Time with cats is never wasted." - Sigmund Frued',
  '"You cat to be kitten me right now" - Some dad somewhere probably',
  '"Cats are like music. It’s foolish to try to explain their worth to those who don’t appreciate them." - Unknown',
  '"People who hate cats will come back as mice in their next life" - Angry Cat Lady',
  '"With the qualities of cleanliness, affection, patience, dignity and courage that many cats have, how many of us, I ask you, would be capable of becoming cats?" - Fernand Mery'
]

/* cat quote generator (=♡ ᆺ ♡=)
*/

function getRandomCatQuote (arr) {
  const divToInsert = document.querySelector('[data-catQuoteBox]')
  const low = 0
  const high = arr.length - 1
  let numberGen = (Math.random() * (high - low + 1)) + low
  numberGen = Math.floor(numberGen)
  divToInsert.textContent = arr[numberGen]
}

const catQuote = document.querySelector('[data-catQuoteButton]')
catQuote.addEventListener('click', function () { getRandomCatQuote(catQuotes) })

/* iterating through all the photos */
const catImageSources = []
function iterateImage (folderSrc, arrOfImages, arr) {
  /* pass through images and make them = to document object */
  for (let i = 0; i < arrOfImages.length; i++) {
    arr.push(folderSrc + arrOfImages[i])
  }
}

iterateImage('pics/plusheen/', catImages, catImageSources)

function setArrOfValToImage () {
  const src = document.querySelectorAll('[data-button-numbers]')
  for (let i = 0; i < src.length; i++) {
    src[i].style.backgroundImage = 'url(' + catImageSources[i] + ')'
  }
}

setArrOfValToImage()
