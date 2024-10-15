'use strict'

class loginPage{

    elements = {
        loginEmailInput: ()=> cy.get("form[action='/login'] [type='email']"),
        loginPasswordInput: ()=> cy.get("form[action='/login'] [type='password']"),
        loginBtn : () => cy.get('form[action="/login"] [type="submit"]'),
    }

    enterLoginEmailAddress(email)
    {
        this.elements.loginEmailInput().clear();
        this.elements.loginEmailInput().type(email);
    }

    enterLoginPassword(password)
    {
        this.elements.loginPasswordInput().clear();
        this.elements.loginPasswordInput().type(password);
    }

    clickOnLogin(){
        this.elements.loginBtn().click();
    }
    
    
}

export default loginPage;