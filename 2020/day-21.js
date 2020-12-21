import { inputs } from "./inputs.js";

const getAllergens = (input) => {
    const allergens = new Map();

    input.replace(/\(|\)/g, "")
        .split("\n")
        .forEach(row => {
            let splitRow = row.split(" contains ");
    
            splitRow[1].split(", ").forEach(allergen => {
                let newIngredients = new Set(splitRow[0].split(" "));

                let ingredients = (allergens.has(allergen))
                    // intersection to get ingredients present in all products with given allergen
                    ? new Set([...allergens.get(allergen)].filter(x => newIngredients.has(x)))
                    : newIngredients

                allergens.set(allergen, ingredients);
            });
        });

    return allergens;
}

const removeFromOthers = (allergens, ingredientToRemove) => {
    allergens.forEach(ingredients => {
        if(ingredients.size > 1 && ingredients.has(ingredientToRemove)) {
            ingredients.delete(ingredientToRemove);
        }
    });
}

const parseAllergens = (allergens) => {
    const parsedAllergens = new Map();

    while(parsedAllergens.size !== allergens.size) {
        allergens.forEach((ingredients, allergen) => {
            if(ingredients.size === 1 && !parsedAllergens.has(allergen)) {
                parsedAllergens.set(allergen, ingredients);
                removeFromOthers(allergens, [...ingredients][0]);
            }
        });
    }

    return new Map([...parsedAllergens.entries()].sort());;
}

const allergens = getAllergens(inputs["day-21"]);
const parsedAllergens = parseAllergens(allergens);

let ingredientsWithAllergens = new Set();
parsedAllergens.forEach(allergen => {
    ingredientsWithAllergens.add([...allergen][0]);
});

let sum = 0;
inputs["day-21"].split("\n").forEach(row => {
    let ingredients = row.split(" (contains")[0];
    ingredients.split(" ").forEach(ingredient => {
        if(!ingredientsWithAllergens.has(ingredient)) {
            sum += 1;
        }
    }); 
});

console.log("Part 1: " + sum);

let result = "";
parsedAllergens.forEach(allergen => {
    result += [...allergen][0] + ",";
});

console.log("Part 2: " + result);