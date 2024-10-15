'use strict'

class contactUsPage{

    elements = {
        nameInput: ()=> cy.get("#contact-us-form input[name='name']"),
        emailInput: ()=> cy.get("#contact-us-form input[name='email']"),
        subjectInput: () => cy.get("#contact-us-form input[name='subject']"),
        messageBox: () => cy.get("#contact-us-form textarea[name='message']"),
        submitButton: () => cy.get("#contact-us-form input[name='submit']")
    }

    submitContactUsForm(name, email, subject, message){

        this.elements.nameInput().clear().type(name);
        this.elements.emailInput().clear().type(email);
        this.elements.subjectInput().clear().type(subject);
        this.elements.messageBox().clear().type(message);

        // cy.get("input[type='file']").selectFile("run.bat")
        this.elements.submitButton().should('exist').click();
    }
    
    
}

export default contactUsPage;