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

	static async fetchOcurrences() {
		const response = await api.get("/ocurrences");
		return response.data;
	}

	static async confirmOcurrence({ id, userEmail }) {
		const response = await api.post(`/ocurrences/${id}/confirmations`, null, {
			headers: {
				"X-Mock-User-Email": userEmail,
			},
		});
		return response.data;
	}

	static async fetchMyConfirmations(userEmail) {
	const response = await api.get("/ocurrences/my-confirmations", {
		headers: {
			"X-Mock-User-Email": userEmail,
		},
	});
	return response.data; 
}
}