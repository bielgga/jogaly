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

// Web Worker otimizado para processamento assíncrono
// Reduz o JavaScript no thread principal

// Função para processar dados de jogos em background
export function createGameProcessor() {
  if (typeof window === 'undefined' || !window.Worker) {
    // Fallback para ambientes sem Worker
    return {
      processGames: (games: any[]) => Promise.resolve(games),
      terminate: () => {},
    }
  }

  // Criar worker inline para evitar arquivo separado
  const workerScript = `
    self.onmessage = function(e) {
      const { type, data } = e.data;
      
      switch (type) {
        case 'SORT_GAMES':
          const sorted = data.sort((a, b) => b.likes - a.likes);
          self.postMessage({ type: 'GAMES_SORTED', data: sorted });
          break;
          
        case 'FILTER_GAMES':
          const filtered = data.filter(game => 
            game.title.toLowerCase().includes(e.data.query.toLowerCase())
          );
          self.postMessage({ type: 'GAMES_FILTERED', data: filtered });
          break;
          
        default:
          self.postMessage({ type: 'ERROR', error: 'Unknown operation' });
      }
    };
  `;

  const blob = new Blob([workerScript], { type: 'application/javascript' })
  const worker = new Worker(URL.createObjectURL(blob))

  return {
    processGames: (games: any[]) => {
      return new Promise((resolve) => {
        worker.onmessage = (e) => {
          if (e.data.type === 'GAMES_SORTED') {
            resolve(e.data.data)
          }
        }
        worker.postMessage({ type: 'SORT_GAMES', data: games })
      })
    },
    
    filterGames: (games: any[], query: string) => {
      return new Promise((resolve) => {
        worker.onmessage = (e) => {
          if (e.data.type === 'GAMES_FILTERED') {
            resolve(e.data.data)
          }
        }
        worker.postMessage({ type: 'FILTER_GAMES', data: games, query })
      })
    },
    
    terminate: () => {
      worker.terminate()
      URL.revokeObjectURL(blob as any)
    },
  }
} 