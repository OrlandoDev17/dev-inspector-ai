import { QueryClient } from "@tanstack/react-query";

// Creamos la instancia global con configuraciones por defecto óptimas
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Evita que vuelva a hacer fetch al cambiar de pestaña si la data está fresca
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
