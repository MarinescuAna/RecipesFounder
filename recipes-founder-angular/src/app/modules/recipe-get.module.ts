

export class RecipeGetModule{
    id:string;
    title: string;
    image: string;
    username: string;
    preparationDescription: string;
    servings: number;
    readyInMinutes: number;
    healthScore:  number;
    glutenFree: boolean;
    ketogenic:  boolean;
    vegan:  boolean;
    vegetarian: boolean;
    summary:  string;
    //isExternal:boolean;
    imageSteps:string;
    extendedIngredients: string[];
}