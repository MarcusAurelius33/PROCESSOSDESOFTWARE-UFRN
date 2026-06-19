import { OcurrenceService } from "@/services/OcurrenceService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useOcurrences = (userEmail = "teste1@suricato.local") => {
	const queryClient = useQueryClient();

	const {
		data: ocurrences = [],
		isLoading: ocurrenceLoading,
		refetch: refetchOcurrences,
	} = useQuery({
		queryKey: ["ocurrences"],
		queryFn: OcurrenceService.fetchOcurrences,
		staleTime: 5 * 60 * 1000,
	});

	const { data: myConfirmations = [], isLoading: confirmationsLoading } = useQuery({
		queryKey: ["myConfirmations", userEmail],
		queryFn: () => OcurrenceService.fetchMyConfirmations(userEmail),
		staleTime: 5 * 60 * 1000,
	});

	const { mutate: createOcurrence, isSuccess } = useMutation({
		mutationFn: OcurrenceService.createOcurrence,
		onSuccess: () => {
			refetchOcurrences();
		},
	});

	const { mutate: confirmOcurrence, isPending: isConfirming } = useMutation({
		mutationFn: OcurrenceService.confirmOcurrence,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["ocurrences"] });
			queryClient.invalidateQueries({ queryKey: ["myConfirmations", userEmail] });
		},
	});

	return {
		ocurrences,
		myConfirmations, 
		ocurrenceLoading: ocurrenceLoading || confirmationsLoading,
		ocurrenceCreator: {
			createOcurrence,
			isSuccess,
		},
		ocurrenceConfirmer: {
			confirmOcurrence,
			isConfirming,
		},
	};
};