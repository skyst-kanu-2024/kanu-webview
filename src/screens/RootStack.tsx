import { postMessage, useWebviewMessage } from '@/utils/message';
import { useEffect } from 'react';

export function RootStack() {
  const { lastMessage } = useWebviewMessage();

  useEffect(() => {
    postMessage(`hello ${lastMessage}`);
  }, [lastMessage]);

  return (
    <div>
      <h1>hello world</h1>;<p>{lastMessage}</p>
    </div>
  );
}
