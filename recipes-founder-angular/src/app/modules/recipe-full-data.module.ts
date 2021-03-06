import { IngredientModule } from "./ingredients.module";

export class RecipeFullDataModule{
    id:string;
    title: string;
    image: string;
    servings: number;
    readyInMinutes: number;
    healthScore:  number;
    glutenFree: boolean;
    ketogenic:  boolean;
    vegan:  boolean;
    vegetarian: boolean;
    summary:  string;
    isExternal:boolean;
    email:string;
    username: string;
    preparationDescription: string;
    imageSteps:string;
    extendedIngredients: IngredientModule[];
}
