
/**
 * Realiza una petición fetch con un tiempo de espera (timeout) limitado.
 * Útil para evitar que el build de Next.js se cuelgue si la API no responde.
 */
export async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 8000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error: any) {
        clearTimeout(id);
        if (error.name === 'AbortError') {
            console.warn(`Fetch timed out for URL: ${url}`);
        }
        throw error;
    }
}
