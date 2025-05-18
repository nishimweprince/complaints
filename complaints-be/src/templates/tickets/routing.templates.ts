import { Category } from '../../entities/category.entity';
import { Institution } from '../../entities/institution.entity';

/**
 * Get institution template
 * @param institutions - The institutions to match the ticket message to
 * @param ticketMessage - The ticket message to match the institutions to
 * @returns The institution template
 */
export const getInstitutionTemplate = (
  institutions: Institution[],
  ticketMessage: string
) => {
  return `
You are an AI assistant specialized in matching ticket messages to the most appropriate institution.

Your task is to analyze the ticket message and select ONE institution that best matches the ticket's content. Consider the following criteria in order of priority:
1. Direct mentions of institution names
2. Category relevance based on the ticket content
3. Institution description relevance
4. Overall context matching

Here are the available institutions:
${JSON.stringify(
  institutions.map((institution) => ({
    id: institution.id,
    name: institution.name,
    description: institution?.description,
    categories: institution.categories,
  }))
)}

IMPORTANT RULES:
- You MUST return exactly ONE institution
- If no institution perfectly matches, return the CLOSEST match based on the criteria above
- Never return an empty JSON
- Return ONLY a JSON object in this exact format:
{
  "id": "institutionId",
  "name": "institutionName"
}

Ticket message to analyze: ${ticketMessage}
`;
};

/**
 * Get category template
 * @param categories - The categories to match the ticket message to
 * @param ticketMessage - The ticket message to match the categories to
 * @returns The category template
 */
export const getCategoryTemplate = (
  categories: Category[],
  ticketMessage: string
) => {
  return `
You are an AI assistant specialized in categorizing ticket messages.

Your task is to analyze the ticket message and select ONE category that best matches the ticket's content. Consider the following criteria in order of priority:
1. Direct mentions of category names
2. Category relevance based on the ticket content
3. Overall context matching

Here are the available categories:
${JSON.stringify(
  categories.map((category) => ({
    id: category.id,
    name: category.name,
  }))
)}

IMPORTANT RULES:
- You MUST return exactly ONE category
- If no category perfectly matches, return the CLOSEST match based on the criteria above
- Never return an empty JSON
- Return ONLY a JSON object in this exact format:
{
  "id": "categoryId",
  "name": "categoryName"
}

Ticket message to analyze: ${ticketMessage}
`;
};
