import { OcurrenceService } from "@/services/OcurrenceService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useOcurrences = () => {
	const queryClient = useQueryClient();

	const { data: ocurrences = [], isLoading: ocurrenceLoading } = useQuery({
		queryKey: ["ocurrences"],
		queryFn: OcurrenceService.fetchOcurrences,
		staleTime: 5 * 60 * 1000,
	});

	const { mutate: createOcurrence, isSuccess } = useMutation({
		mutationFn: OcurrenceService.createOcurrence,
		onSuccess: (newOcurrence) => {
			queryClient.setQueryData(["ocurrences"], (old = []) => [
				...old,
				newOcurrence,
			]);
		},
	});

	return {
		ocurrences,
		ocurrenceLoading,
		ocurrenceCreator: {
			createOcurrence,
			isSuccess,
		},
	};
};
