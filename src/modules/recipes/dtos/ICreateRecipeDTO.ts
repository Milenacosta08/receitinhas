export default interface ICreateRecipeDTO {
    name: string;
    time: string;
    steps: string;
    rating?: number;
    category_id: string;
    user_id: string;
    ingredients: {
        name: string;
    }[]
}