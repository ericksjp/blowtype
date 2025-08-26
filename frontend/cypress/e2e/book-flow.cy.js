describe("Fluxo de execução Blowtype", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("deve exibir a lista de livros e ser possível escolher um livro", () => {
    cy.get('[data-cy="book-list"]').should("be.visible");
    cy.get('[data-cy="book-item"]').should("have.length.gte", 1).first().click();

    cy.get('[data-cy="book-chapters"]').should("be.visible");
  });

  it("deve exibir a lista de capítulos do livro e ser possível escolher um capítulo", () => {
    cy.get('[data-cy="book-item"]').first().click();

    cy.get('[data-cy="book-chapters"]').should("be.visible");
    cy.get('[data-cy="chapter-item"]').should("have.length.gte", 1).first().click();

    cy.get('[data-cy="typing-box"]').should("be.visible");
  });

  it("deve ser possível treinar a digitação", () => {
    cy.get('[data-cy="book-item"]').first().click();
    cy.get('[data-cy="chapter-item"]').first().click();

    cy.get('[data-cy="typing-box"]').type("Texto de exemplo digitado usando Cypress");

    cy.get('[data-cy="progress"]')
      .invoke("text")
      .then((text) => parseFloat(text.replace("%", "").trim()))
      .should((progress) => {
        expect(progress).to.be.greaterThan(1);
      });
  });

  it("deve permitir voltar da tela de capítulos para a lista de livros", () => {
    cy.get('[data-cy="book-item"]').first().click();
    cy.get('[data-cy="book-chapters"]').should("be.visible");
    cy.get('[data-cy="back-to-books"]').click();
    cy.get('[data-cy="book-list"]').should("be.visible");
  });

  it("deve exibir o nome do autor ao selecionar um livro", () => {
  cy.get('[data-cy="book-item"]').first().click();
  cy.get('[data-cy="book-chapters"]').should("be.visible");
  cy.get('[data-cy="book-author"]').should("be.visible").and(($el) => {
    expect($el.text().length).to.be.greaterThan(0);
  });
});
});
