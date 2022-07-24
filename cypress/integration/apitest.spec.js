const helper = require("../support/helper")

describe('API Test Flow', () => {

  it('Add to card', function () {

    cy.visit('https://demoblaze.com')
    cy.intercept('https://api.demoblaze.com/entries').as("entry")
    cy.wait("@entry")
    cy.getCookie('user').then((cookie) => {
      let cookieValue = "user=" + (cookie.value).toString();
      cy.request({
        method: 'POST',
        url: "https://api.demoblaze.com/addtocart",
        body: {
          id: helper.guID(),
          cookie: cookieValue,
          prod_id: 1,
          flag: false
        }
      }).then((resp) => {
        expect(resp.status).to.eq(200)
      })
    })
    cy.get('#cartur').click()
    cy.intercept("https://api.demoblaze.com/view").as("view");
    cy.wait("@view")
    cy.get('#totalp').then(function (priceValue) {
      expect(priceValue.text()).to.be.equal("360");
      cy.log(priceValue.text())
    })
  })
})
