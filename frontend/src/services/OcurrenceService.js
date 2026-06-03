import { api } from "./api";

export class OcurrenceService {
	static async fetchCategories() {
		const response = await api.get("/categories");
		return response.data;
	}

	static async createOcurrence(ocurrenceData) {
		const response = await api.post("/ocurrences", ocurrenceData);
		return response.data;
	}
}
