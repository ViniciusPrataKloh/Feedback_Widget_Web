import { useState } from "react";

import { CloseButton } from "./CloseButton";

import bugImageUrl from "../assets/bug.svg";
import ideaImageUrl from "../assets/idea.svg";
import thoughtImageUrl from "../assets/thought.svg";

const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lâmpada'
        }
    },
    OTHER: {
        title: 'Outros',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de uma nuvem'
        }
    }
};

// Object.entries(feedbackTypes) => 

/**
 * [
 *  ['BUG', {...}],
 *  ['IDEA', {...}],
 *  ['OTHER', {...}]
 * ]
 */

type FeedbackTypes = keyof typeof feedbackTypes;

export function WidgetForm() {

    const [selectedFeedBackType, setSelectedFeedBackType] = useState<FeedbackTypes | null>(null);

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg
            w-[calc(100vw-2rem)]
            md:w-auto
            ">

            <header className="text-xl leading-6">
                <span>Deixe seu Feedback</span>

                <CloseButton />
            </header>

            {!selectedFeedBackType
                ? (<div className="flex py-8 gap-2 w-full">
                    {Object.entries(feedbackTypes).map(([key, value]) => {
                        return (
                            <button
                                key={key}
                                className="bg-zinc-800 rounded-lg py-5 w-24 flex flex-1 flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
                                onClick={() => setSelectedFeedBackType(key as FeedbackTypes)}
                                type="button"
                            >
                                <span>{value.title}</span>
                                <img src={value.image.source} alt={value.image.alt} />
                            </button>
                        );
                    })}
                </div>)
                : null
            }

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="#https://rocketseat.com.br">Rocketseat</a>
            </footer>
        </div>
    );
}