import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
    selectedFeedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep(props: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false);

    const feedbackTypeInfo = feedbackTypes[props.selectedFeedbackType];

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();

        setIsSendingFeedback(true);

        await api.post("/feedback", {
            type: props.selectedFeedbackType,
            comment,
            screenshot
        });

        setIsSendingFeedback(false);
        props.onFeedbackSent();
    }

    return (
        <>
            <header>
                <button
                    type="button"
                    onClick={props.onFeedbackRestartRequested}
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>

                <span className="text-xl leading-6 flex items-center gap-2">
                    <img className="w6- h-6" src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} />
                    {feedbackTypeInfo.title}
                </span>

                <CloseButton />
            </header>

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea
                    className="min-w-[302px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 boder-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                    placeholder="Conte com detalhes o que est?? acontecendo..."
                    onChange={event => setComment(event.target.value)}
                />


                <footer className="flex gap-2 mt-2 w-full pb-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />

                    <button
                        disabled={comment === '' || isSendingFeedback ? true : false}
                        type="submit"
                        className="p-2 bg-brand-500 rounded-[4px] border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
                    </button>
                </footer>

            </form>
        </>
    );
}