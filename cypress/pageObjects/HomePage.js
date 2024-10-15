'use strict'

class homePage{

    elements = {
        signUpLoginBtn: ()=> cy.get("[href='/login']"),
        logoutButton: ()=> cy.get("[href='/logout']")

    }

    clickOnSignupLogin(){
        this.elements.signUpLoginBtn().click();
    }

    getLogoutButton(){
        return this.elements.logoutButton()
    }
    
    
}

export default homePage;