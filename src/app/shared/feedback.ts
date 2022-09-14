export class Feedback {
    firstname!: string;
    lastname!: string;
    telnum!: number;
    email!: string;
    agree!: boolean;
    contactType?: string;
    message?: string;
};

export type ContactType = 'None' | 'Tel' | 'Email';