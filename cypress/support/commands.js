import homePage from "../pageObjects/HomePage";
import loginPage from "../pageObjects/LoginPage"
/// <reference types="Cypress" />
/// <reference types="cypress-xpath" />
require('@reportportal/agent-js-cypress/lib/commands/reportPortalCommands');
// ***********************************************


Cypress.test_data = "testData.json"

// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('login', () =>{

    const login = new loginPage();
    const home = new homePage();

    // Decode the base64 encoded credentials
    const email = Buffer.from(Cypress.env('encodedEmail'), 'base64').toString('ascii');
    const password = Buffer.from(Cypress.env('encodedPassword'), 'base64').toString('ascii');

    cy.xpath("//h2[text()='Login to your account']").should('exist').and('be.visible')
    login.enterLoginEmailAddress(email)
    login.enterLoginPassword(password)
    login.clickOnLogin();

    home.getLogoutButton().should('exist').and('be.visible')

});

Cypress.Commands.add('selectNavigationMenuOption', (option)=>{
    let found = false;

    cy.get("ul.navbar-nav li").each(($el, index)=>{

        // cy.log(`at position ${index} is ${$el.text()}`);
        if($el.text().toLowerCase().trim() == option.toLowerCase()){
            cy.wrap($el).click();
            found = true;
        }
    })//.then(()=>{
    //     if(!found) throw new Error(`Menu option ${option} not found`)
    // })

});