import { OcurrenceService } from "@/services/OcurrenceService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useOcurrences = () => {
	const {
		data: ocurrences = [],
		isLoading: ocurrenceLoading,
		refetch: refetchOcurrences,
	} = useQuery({
		queryKey: ["ocurrences"],
		queryFn: OcurrenceService.fetchOcurrences,
		staleTime: 5 * 60 * 1000,
	});

	const { mutate: createOcurrence, isSuccess } = useMutation({
		mutationFn: OcurrenceService.createOcurrence,
		onSuccess: () => {
			refetchOcurrences();
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
