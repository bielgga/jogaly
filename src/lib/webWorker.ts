// Utilitário para Web Workers - reduzir operações da thread principal
export function createWebWorker(fn: Function): Worker {
  const blob = new Blob([`
    self.onmessage = function(e) {
      const result = (${fn.toString()})(e.data);
      self.postMessage(result);
    }
  `], { type: 'application/javascript' });

  return new Worker(URL.createObjectURL(blob));
}

// Worker para ordenação de jogos
export function sortGamesWorker(games: any[]) {
  return games.sort((a, b) => b.likes - a.likes);
}

// Worker para formatação de likes
export function formatLikesWorker(likes: number) {
  if (likes >= 1000000) {
    return `${(likes / 1000000).toFixed(1)}M`;
  } else if (likes >= 1000) {
    return `${(likes / 1000).toFixed(1)}k`;
  }
  return likes.toString();
}

// Hook para usar Web Workers
export function useWebWorker<T, R>(
  workerFn: (data: T) => R,
  dependencies: any[] = []
) {
  if (typeof window === 'undefined') {
    // Server-side: executar diretamente
    return (data: T): Promise<R> => Promise.resolve(workerFn(data));
  }

  // Client-side: usar Web Worker
  const worker = createWebWorker(workerFn);
  
  return (data: T): Promise<R> => {
    return new Promise((resolve, reject) => {
      worker.onmessage = (e) => resolve(e.data);
      worker.onerror = reject;
      worker.postMessage(data);
    });
  };
} 