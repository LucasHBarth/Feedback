import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRquest{
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
       private feedbacksRepository: FeedbackRepository,
       private mailAdapter: MailAdapter,
    ){}

    async execute(request : SubmitFeedbackUseCaseRquest){
        const { type, comment, screenshot } = request;

        if(!type){
            throw new Error('Type is requerid');
        }

        if(!comment){
            throw new Error('comment is requerid');
        }

        if(screenshot && !screenshot.startsWith('data/image/png;base64')){
            throw new Error('Invalid screenshot format')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body:  [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                `<p>Tipo do Feedback: ${type}</p>`,
                `<p>Comentario: ${comment}</p>`,
                `<div>`,
            ].join('\n')
        })
    }
}