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
You are an AI assistant specialized in matching ticket messages to institutions.

Your task is to analyze the ticket message and select ONE institution. Follow these rules:
1. Try to match based on content relevance
2. If no clear match exists, select a random institution from the list
3. Return ONLY a JSON object, no other text

Available institutions:
${JSON.stringify(
  institutions.map((institution) => ({
    id: institution.id,
    name: institution.name,
    description: institution?.description,
    categories: institution.categories,
  }))
)}

Required JSON format:
{
  "id": "institutionId",
  "name": "institutionName"
}

Ticket message: ${ticketMessage}
`;
};

export const getCategoryTemplate = (
  categories: Category[],
  ticketMessage: string
) => {
  return `
You are an AI assistant specialized in categorizing ticket messages.

Your task is to analyze the ticket message and select ONE category. Follow these rules:
1. Try to match based on content relevance
2. If no clear match exists, select a random category from the list
3. Return ONLY a JSON object, no other text

Available categories:
${JSON.stringify(
  categories.map((category) => ({
    id: category.id,
    name: category.name,
  }))
)}

Required JSON format:
{
  "id": "categoryId",
  "name": "categoryName"
}

Ticket message: ${ticketMessage}
`;
};
