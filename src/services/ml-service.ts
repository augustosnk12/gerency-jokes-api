import axios from "axios";
import { env } from "../env";

interface MLPredictionResponse {
  category: string;
}

interface MLNeighborsResponse {
  predicted_category: string;
  neighbors: Array<{
    text: string;
    category: string;
    similarity: number;
  }>;
}

export class MLService {
  private baseUrl: string;

  constructor(baseUrl: string = env.ML_ENDPOINT) {
    this.baseUrl = baseUrl;
  }

  async predictJokeCategory(text: string): Promise<string> {
    try {
      const response = await axios.post<MLPredictionResponse>(
        `${this.baseUrl}/predict`,
        { joke: text }
      );
      return response.data.category;
    } catch (error) {
      console.error("Error predicting joke category:", error);
      throw new Error("Failed to predict joke category");
    }
  }

  async predictWithNeighbors(text: string, k: number = 3) {
    try {
      const response = await axios.post<MLNeighborsResponse>(
        `${this.baseUrl}/predict_with_neighbors`,
        { joke: text, k }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting prediction with neighbors:", error);
      throw new Error("Failed to get prediction with neighbors");
    }
  }
}

export const mlService = new MLService();
