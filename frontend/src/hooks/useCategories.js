import { OcurrenceService } from "@/services/OcurrenceService";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
	return useQuery({
		queryKey: ["categories"],
		queryFn: OcurrenceService.fetchCategories,
		staleTime: 5 * 60 * 1000,
	});
};
