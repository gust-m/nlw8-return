import { CloseButton } from '../CloseButton';

import bugImgUrl from '../../assets/bug.svg';
import ideaImgUrl from '../../assets/idea.svg';
import thoughtImgUrl from '../../assets/thought.svg';
import { useState } from 'react';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentSteps } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImgUrl,
      alt: 'Imagem de um inseto',
    },
  },
  IDEIA: {
    title: 'Ideia',
    image: {
      source: ideaImgUrl,
      alt: 'Imagem de uma lâmpada',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImgUrl,
      alt: 'Imagem de um balão de pensamento',
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export const WidgetForm: React.FC = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleRestartFeedback = () => {
    setFeedbackSent(false);
    setFeedbackType(null);
  };

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep handleChangeFeedbackType={setFeedbackType} />
          ) : (
            <FeedbackContentSteps
              feedbackType={feedbackType}
              onFeedbackRestartRequested={() => setFeedbackType(null)}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer>
        Feito com 🤍 pela{' '}
        <a
          className="underline underline-offset-2"
          href="https://rocketseat.com.br"
          target="_blank"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
};
