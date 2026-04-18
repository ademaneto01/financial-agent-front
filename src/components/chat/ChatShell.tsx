import { useState } from 'react';
import { ChatComposer } from './ChatComposer';
import { ChatHeader } from './ChatHeader';
import { ChatMessageList } from './ChatMessageList';

export function ChatShell() {
  const [composerSeed, setComposerSeed] = useState('');

  return (
    <div className="mx-auto flex h-full max-w-4xl flex-col">
      <ChatHeader />
      <main className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto">
          <ChatMessageList onPickSuggestion={(value) => setComposerSeed(`${value} `)} />
        </div>
        <div className="sticky bottom-0 border-t border-white/5 bg-gradient-to-t from-[#05070f] via-[#05070f]/95 to-transparent px-3 pb-4 pt-3 md:px-6">
          <ChatComposer initialValue={composerSeed} />
        </div>
      </main>
    </div>
  );
}
