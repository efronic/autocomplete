import { z, infer } from 'zod';

const recipeSchema = z.object({
  id: z.number(),
  name: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  prepTimeMinutes: z.number(),
  cookTimeMinutes: z.number(),
  servings: z.number(),
  difficulty: z.string(),
  cuisine: z.string(),
  caloriesPerServing: z.number(),
  tags: z.array(z.string()),
  userId: z.number(),
  image: z.string().url(),
  rating: z.number(),
  reviewCount: z.number(),
  mealType: z.array(z.string()),
});

const responseSchema = z.object({
  recipes: z.array(recipeSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

// Example usage

type Recipe = z.infer<typeof recipeSchema>;
type ResponseData = z.infer<typeof responseSchema>;


const validateResponse = (data: unknown) => {
  return responseSchema.parse(data);
};

export { validateResponse, Recipe, ResponseData };
