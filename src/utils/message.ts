import { useEffect, useState } from 'react';

declare global {
  interface Window {
    postWebviewMessage: (message: string) => void;
    webkit?: any;
  }
}

export function postMessage(message: string) {
  window.webkit?.messageHandlers.HandlerName.postMessage(message);
}

window.postWebviewMessage = (message: string) => {
  window.dispatchEvent(new CustomEvent<string>('webviewPost', { detail: message }));
};

export function useWebviewMessage() {
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    window.addEventListener('webviewPost', event => {
      setLastMessage((event as any).detail);
    });

    return () => {
      window.removeEventListener('post', event => {
        setLastMessage((event as any).detail);
      });
    };
  }, [setLastMessage]);

  return { lastMessage };
}
