/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import contactUsPage from "../pageObjects/ContactUsPage.js"


describe('Automated tests of AU Excersise applications', ()=>{
    
    let testData;
    const cp = new contactUsPage();
    const hp = 

    before(()=>{
        cy.fixture(Cypress.test_data).then((data)=>{
            testData = data;
        })
    })
    beforeEach('launch application before each test', ()=>{
        cy.visit("/")
    })
    
    
    it('Test: Login User with valid email and password', ()=>{
        
        cy.selectNavigationMenuOption("Signup / Login");
        cy.login();

        // After login validation
        cy.xpath("//i[contains(@class, 'fa-user')]/..").then(($el) => {
            const divText = $el.text().trim();
            const expectedDivText = "Logged in as "+Cypress.env("username")
            expect(divText).to.deep.equal(expectedDivText)
        });
    })

    it('Test: Contact Us Form successful submission', ()=>{
        
        cy.selectNavigationMenuOption('Contact us')

        cy.get("div.contact-form h2.text-center").should("have.text", "Get In Touch")

        const contactUs = testData.contactUsFormData;
        cp.submitContactUsForm(contactUs.name, contactUs.email, contactUs.subject, contactUs.message);

        // cy.get("div.status.alert.alert-success").should(['exist', 'have.text', 'Success! Your details have been submitted successfully.'])
        cy.get("div.status.alert.alert-success").should('be.visible').and('have.text', 'Success! Your details have been submitted successfully.')

    });

    it('Test: Verify Subscription in home page', ()=>{

        const subscribeEmail = testData.subscriptionData;

        cy.get("form.searchform input[type='email']")
            .scrollIntoView({log:true}).should('exist').and('be.visible')
            .type(subscribeEmail.email)

        cy.get("form.searchform button").click();
        cy.get("div.alert-success").should('be.visible')

        
    });
});