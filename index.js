'use strict'

class handleMenuClass {
    constructor(){
    this.state = {displayNav: false}
    this.links = document.getElementsByClassName('container link nav')
    this.nav = document.getElementsByTagName('nav')
    }

    handleMobleMenuClick(){
        this.state.displayNav = !this.state.displayNav
        console.log(this.nav)
        if (this.state.displayNav === true){
            for (let i = 0; i < this.links.length; i++){
                this.links[i].style.display = 'none'
                this.nav[0].style.backgroundColor = 'transparent'
            }
        }else{
            for (let i = 0; i < this.links.length; i++){
                this.links[i].style.display = 'initial'
                this.nav[0].style.backgroundColor = '#2F4454'
            }
        }
    
    }
}
let handleMenu = new handleMenuClass
