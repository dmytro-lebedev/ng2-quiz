export class User {
    id: number;
    score?: number;

    constructor(
        public email: string,
        public password: string
    ) {
    }
}
