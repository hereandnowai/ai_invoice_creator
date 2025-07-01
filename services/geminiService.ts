
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Invoice, Customer, LineItem } from '../types'; // Assuming types are appropriately structured

// Ensure API_KEY is handled as per guidelines (pre-configured environment variable)
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.error("API_KEY for Gemini is not set. Please ensure the process.env.API_KEY environment variable is configured.");
  // Potentially throw an error or return a mock/error state if appropriate for your app's flow
}
const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Use non-null assertion if you have a check like above

export interface ParsedInvoiceData {
  customer?: Partial<Customer>;
  date?: string;
  dueDate?: string;
  items?: Array<Partial<Omit<LineItem, 'id' | 'total'>> & { description: string; quantity: number; unitPrice: number }>;
  notes?: string;
}

export const parseInvoiceDataFromText = async (transcript: string): Promise<ParsedInvoiceData | null> => {
  if (!API_KEY) {
    console.error("Gemini API key not configured. Cannot process voice input.");
    return null;
  }
  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysFromToday = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const model = 'gemini-2.5-flash-preview-04-17';
  const prompt = `You are an intelligent assistant that extracts invoice details from a user's spoken text.
Given the following transcript, extract the relevant information to create an invoice.

Transcript:
"${transcript}"

Extract the following information if available:
- Customer Name (string)
- Customer Email (string)
- Customer Address (string)
- Customer Phone (string, optional)
- Invoice Date (string, YYYY-MM-DD format. If not mentioned, use today's date: ${today})
- Due Date (string, YYYY-MM-DD format. If not mentioned, calculate 30 days from the invoice date, or if invoice date is also not mentioned, use ${thirtyDaysFromToday}.)
- Line Items: an array of objects, where each object has:
  - description (string, required)
  - quantity (number, defaults to 1 if not specified)
  - unitPrice (number, required)
- Notes (string, for any additional comments or terms)

If a piece of information is not present, omit its key or use a suitable default (like for dates or quantity).
For quantities and unit prices, ensure they are numeric. If a price is mentioned without specifying if it's unit price or total, assume it's unit price for a quantity of 1 unless quantity is also mentioned.
If the user says "add item" or "another item", it's a new line item.

Return the extracted data strictly as a JSON object matching this structure:
{
  "customer": {
    "name": "...",
    "email": "...",
    "address": "...",
    "phone": "..."
  },
  "date": "YYYY-MM-DD",
  "dueDate": "YYYY-MM-DD",
  "items": [
    { "description": "...", "quantity": 1, "unitPrice": 0.0 }
  ],
  "notes": "..."
}
Only return the JSON object, without any surrounding text or markdown.
If the transcript is too vague or doesn't seem to contain invoice data, return an empty JSON object {}.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    // Handle case where Gemini might return an empty string or non-JSON if it can't parse
    if (!jsonStr || jsonStr === "{}") { 
        console.warn("Gemini returned empty or placeholder JSON for transcript:", transcript);
        return {}; // Return empty object if no meaningful data extracted
    }

    const parsedData: ParsedInvoiceData = JSON.parse(jsonStr);
    return parsedData;

  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    if (error instanceof Error) {
        // More specific error handling if needed, e.g., based on error.message
        if (error.message.includes("API key not valid")) {
            // Handle API key specific error
        }
    }
    return null; // Indicate failure
  }
};
