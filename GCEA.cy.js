describe('Pokemon League Registration Website Tests', () => {
  const baseUrl = 'https://audiostack-qa-test.netlify.app/';
  const successMessage = '\n' +
      'Registration Successful\n' +
      'Welcome to the Pokemon League!';
  const nameErrorMessage = 'Name is required.';
  const starterErrorMessage = 'Starter Pokemon is required.';

  beforeEach(() => {
    // Visit the website before each test
    cy.visit(baseUrl);
  });

  it('Website loads and displays correctly', () => {
    // Verify the website URL is correct
    cy.url().should('eq', baseUrl);
    // Check for the mandatory fields explanation text
    cy.contains('Name and Starter Pokemon fields are mandatory').should('be.visible');
    // Verify website is secure (HTTPS)
    cy.location('protocol').should('eq', 'https:');
  });

  it('Name field is present and allows input', () => {
    // Verify Name field is displayed
    cy.get('input[name="name"]').should('be.visible');
    // Type into the Name field and verify the entered value
    cy.get('input[name="name"]').type('Dave').should('have.value', 'Dave');
  });

  it('Starter Pokemon drop-down menu is present and allows selection', () => {
    // Verify Starter Pokemon drop-down is displayed
    cy.get('select[name="starter_pokemon"]').should('be.visible');
    // Click on the drop-down and verify the options
    cy.get('select[name="starter_pokemon"]').select('bulbasaur').should('have.value', 'bulbasaur');
    cy.get('select[name="starter_pokemon"]').select('charmander').should('have.value', 'charmander');
    cy.get('select[name="starter_pokemon"]').select('squirtle').should('have.value', 'squirtle');
    cy.get('select[name="starter_pokemon"]').select('Pikachu').should('have.value', 'Pikachu');
  });

  it('Stats for each Starter Pokemon are displayed correctly', () => {
    const pokemonStats = {
      bulbasaur: 'Grass',
      charmander: 'Fire',
      squirtle: 'Water',
      Pikachu: 'Electric',
    };

    // Loop through each Pokemon to verify stats display
    Object.entries(pokemonStats).forEach(([pokemon, stats]) => {
      cy.get('select[name="starter_pokemon"]').select(pokemon);
      cy.contains(stats).should('be.visible');
    });
  });

  it('Submit button functionality and error/success messaging', () => {


    // Verify the Submit button is displayed
    cy.get('button[type="submit"]').should('be.visible');

    // Attempt to submit with empty form and verify error messages
    cy.get('button[type="submit"]').click();
    cy.contains(nameErrorMessage).should('be.visible');
    cy.contains(starterErrorMessage).should('be.visible');

    // Attempt to submit with only the Name field filled
    cy.get('input[name="name"]').type('Ash Ketchum');
    cy.get('button[type="submit"]').click();
    cy.contains(nameErrorMessage).should('be.visible');

    // Complete the form and submit
    cy.get('select[name="starter_pokemon"]').select('Charmander');
    cy.get('button[type="submit"]').click();

    // Verify the success message
    cy.contains(successMessage).should('be.visible');
  });
});
