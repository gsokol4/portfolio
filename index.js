'use strict'

class handleMenuClass {
    constructor(){
    this.state = {displayNav: false}
    this.links = document.getElementsByClassName('container link nav')
    }

    handleMobleMenuClick(){
        this.state.displayNav = !this.state.displayNav
        
        if (this.state.displayNav === true){
            for (let i = 0; i < this.links.length; i++){
                this.links[i].style.display = 'none'
            }
        }else{
            for (let i = 0; i < this.links.length; i++){
                this.links[i].style.display = 'initial'
            }
        }
    
    }
}
let handleMenu = new handleMenuClass
