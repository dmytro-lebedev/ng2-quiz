export class UserAnswer {
    id: number;

    constructor(
        public userId: number,
        public questionId: number,
        public questionAnswerId: number
    ) {
    }
}
