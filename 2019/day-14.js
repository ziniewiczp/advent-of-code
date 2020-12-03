class Reaction {
    constructor(ingredients, result) {
        this.ingredients = ingredients;
        this.result = result;
    }
}

class ReactionEntry {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

function parseInput() {
    input = `10 ORE => 10 A
    1 ORE => 1 B
    7 A, 1 B => 1 C
    7 A, 1 C => 1 D
    7 A, 1 D => 1 E
    7 A, 1 E => 1 FUEL`;

    const reactions = [];
    const rows = input.split("\n");
    rows.forEach(row => {
        let [ingredients, result] = row.split("=>");
        ingredients = ingredients.split(",");

        let formattedIngredients = [];
        ingredients.forEach(ingredient => {
            let [quantity, name] = ingredient.trimLeft().split(" ");
            formattedIngredients.push(new ReactionEntry(name, quantity));
        });

        let [quantity, name] = result.trimLeft().split(" ");
        reactions.push(new Reaction(formattedIngredients, new ReactionEntry(name, quantity)));
    });

    return reactions;
}

console.log(parseInput());