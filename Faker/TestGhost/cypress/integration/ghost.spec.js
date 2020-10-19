var Faker = require('../../../faker.js/lib');
var faker = new Faker({ locales: require('../../../faker.js/lib/locales') });
var firstName = faker.name.firstName(),lastName = faker.name.lastName();
var dob = faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)"));
dob = dob.getFullYear() + "-" + (dob.getMonth()+1) + "-" + dob.getDate();  // First month is "1"

function createPage (title, contenido){
  cy.get('main[role="main"]').find('section[class="view-actions"]').find('a[href="#/editor/page/"]').click()
  cy.get('main[role="main"]').find('textarea[placeholder="Page Title"]').click().type(title)
  cy.get('main[role="main"]').find('div[data-placeholder="Begin writing your page..."]').click()
  cy.visit('http://localhost:2368/ghost/#/pages', {timeout:50000})
  cy.wait(2000)
  cy.get('main[role="main"]').contains(title).click({force:true})
  cy.get('main[role="main"]').find('div[data-placeholder="Begin writing your page..."]').click().type(contenido)
  cy.contains('Publish').click()
  cy.get('footer[class="gh-publishmenu-footer"]').find('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click()
  cy.wait(2000)
}


function generateName () {
  /* $('#inputName').attr("value", faker.name.findName(firstName, lastName));
  $('#inputGender').attr("value", faker.name.gender());
  $('#inputDob').attr("value", dob);
  $('#inputStreetAddress').attr("value", faker.address.streetAddress());
  $('#inputCityStateZip').attr("value", faker.address.city() + ", " + faker.address.stateAbbr() + " " + faker.address.zipCode());
  $('#inputCountry').attr("value", faker.locales[faker.locale].address.default_country || "");
  $('#inputPhone').attr("value", faker.phone.phoneNumber());
  $('#inputUsername').attr("value", faker.internet.userName(firstName, lastName));
  $('#imageAvatar').attr("src", faker.internet.avatar());
  $('#identification').attr("value", faker.internet.email(firstName, lastName));
  console.log('email:  '+faker.internet.email(firstName, lastName));
  console.log('password:  '+faker.internet.password());
  document.getElementsByName("identification").innerHTML=faker.internet.email(firstName, lastName);
  document.getElementsByName("password").innerHTML=faker.internet.password();
  //$('#password').attr("value", faker.internet.password());*/
};
  
  describe('Login fallido y login correcto', function(){

      it('Login fallido y login correcto', () => {
          cy.visit('http://localhost:2368/ghost/#/signin')
          cy.get('form[id="login"]').find('input[name="identification"]').click().type(faker.internet.email(firstName, lastName))
          cy.get('form[id="login"]').find('input[name="password"]').click().type(faker.internet.password())
          cy.get('form[id="login"]').find('button[class="login gh-btn gh-btn-blue gh-btn-block gh-btn-icon ember-view"]').click()
        
        })
  })

  describe('Creación de una página', function(){
    it('Creación de una página', () => {
      cy.visit('http://localhost:2368/ghost/#/signin')
      cy.get('form[id="login"]').find('input[name="identification"]').click().type("hanaancr1@gmail.com")
      cy.get('form[id="login"]').find('input[name="password"]').click().type("hanaancr2020")
      cy.get('form[id="login"]').find('button[class="login gh-btn gh-btn-blue gh-btn-block gh-btn-icon ember-view"]').click()
      cy.wait(2000)
      cy.get('a[href="#/pages/"]').click()
      var title = faker.lorem.words();
      var paragraph = faker.lorem.paragraph() +
                      '\nTeléfono: '+faker.phone.phoneNumber()+
                      '\nProducto: '+faker.commerce.productName()+
                      '\nDescripción: '+faker.commerce.productDescription();    
      createPage(title, paragraph)
      cy.get('a[href="#/pages/"]').click()
      cy.contains(title)
    })
  })


 describe('Creación de un post', function(){
    it('Creación de un post', () => {
        var titlePost = faker.lorem.words();
        var card = + '\nAdresss:  '+faker.address.secondaryAddress() + 
                     '\nPaís: '+faker.address.countryCode() +
                     '\nCuenta: '+faker.finance.account()+
                     '\nBitCoin: '+faker.finance.bitcoinAddress() +
                     '\nTarjeta de crédito: '+faker.finance.creditCardNumber() +
                     '\nVehículo: '+ faker.vehicle.vehicle();
        var paragraphPost = faker.lorem.paragraph() + '&nbsp;'+ card;    
        console.log('card: '+card);

        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.get('form[id="login"]').find('input[name="identification"]').click().type("hanaancr1@gmail.com")
        cy.get('form[id="login"]').find('input[name="password"]').click().type("hanaancr2020")
        cy.get('form[id="login"]').find('button[class="login gh-btn gh-btn-blue gh-btn-block gh-btn-icon ember-view"]').click()
        cy.get('li[class="gh-nav-list-new relative"]').find('a[title="New post"]').click()
        cy.get('textarea[placeholder="Post Title"]').click().type(titlePost)
        cy.get('main[role="main"]').find('div[data-placeholder="Begin writing your post..."]').click()
        cy.visit('http://localhost:2368/ghost/#/posts?type=draft', {timeout : 50000 } )
        //cy.wait(2000)
        cy.get('main[role="main"]').contains(titlePost).click({force:true})        
        cy.get('main[role="main"]').find('div[data-placeholder="Begin writing your post..."]').click().type(paragraphPost)
        cy.contains('Publish').click()
        cy.get('footer[class="gh-publishmenu-footer"]').find('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click()
        cy.wait(2000)
        cy.visit('http://localhost:2368/ghost/#/posts', {timeout : 50000 } )
      })
    })

  
      