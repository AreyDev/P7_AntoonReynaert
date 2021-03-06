export default class CardSection{
    constructor(container) {
        this.container = container;
    }
    
    createCardBlock(recipes) {
        const cardBlock = document.createElement('div');
        cardBlock.classList.add('card-block');
        this.container.appendChild(cardBlock);
        recipes.forEach(recipe => this.createCard(recipe));
    }

    createCard(recipe) {
        const card = document.createElement('div');
        const cardFigure = document.createElement('figure');
        const cardImg = document.createElement('img');
        const cardCaption = document.createElement('figcaption');

        const recipeTitleTime = document.createElement('div');
        const recipeIngredientsDescription = document.createElement('div');
        const recipeTitle = document.createElement('div');
        const recipeTime = document.createElement('div');
        const recipeTimeClock = document.createElement('i');
        const recipeIngredients = document.createElement('div');
        const recipeDescription = document.createElement('div');

        card.classList.add('card');
        cardImg.classList.add('card-img');
        cardCaption.classList.add('card-caption');

        recipeTitleTime.classList.add('title-time');
        recipeIngredientsDescription.classList.add('ingredients-description');
        recipeTitle.classList.add('recipe-details', 'recipe-title');
        recipeTime.classList.add('recipe-details', 'recipe-time');
        recipeTimeClock.classList.add('far', 'fa-clock');
        recipeIngredients.classList.add('recipe-details', 'recipe-ingredients');
        recipeDescription.classList.add('recipe-details', 'recipe-description');

        recipeTitle.appendChild(document.createTextNode(recipe.name));
        const recipeTimeDetail = document.createTextNode(`${recipe.time} min`);
        recipeTime.append(recipeTimeClock, recipeTimeDetail);

        const ingredients = recipe.ingredients;
        let ingredientName;
        let quantity;
        let unit;
        ingredients.forEach(ingredient => {
            ingredientName = ingredient.ingredient;
            quantity = ingredient.quantity;
            unit = ingredient.unit;
            let unitWord;
            let content;

            if (unit === undefined) {
                unit = '';
            }

            if (quantity === undefined) {
                quantity = '';
                content = document.createTextNode(`${ingredientName}`);
            } else {
                const unitWords = unit.split(' ');
                unitWord = unitWords[0];
                content = document.createTextNode(`${ingredientName} : ${quantity} ${unitWord}`);
            }
            
            const whitespace = document.createElement('br');
            recipeIngredients.append(content, whitespace);
        });

        recipeDescription.appendChild(document.createTextNode(recipe.description));

        recipeTitleTime.append(recipeTitle, recipeTime);
        recipeIngredientsDescription.append(recipeIngredients, recipeDescription);
        
        cardCaption.append(recipeTitleTime, recipeIngredientsDescription);
        cardFigure.append(cardImg, cardCaption);
        card.append(cardFigure);

        const cardBlock = document.querySelector('.card-block');
        cardBlock.appendChild(card);

        return card;
    }

    removePreviousCardBlock() {
        while (this.container.childNodes.length > 1) {
            const truc = this.container.querySelector('.card-block');
            truc.remove();
        }
    }

    createNoResultMessage() {
        const noResultMessage = document.createElement('div');
        noResultMessage.classList.add('no-result-message');
        noResultMessage.appendChild(document.createTextNode('Aucune recette ne correspond ?? votre crit??re... Vous pouvez chercher "tartes aux pommes", "poissons", etc...'));
        this.container.appendChild(noResultMessage);
    }
}