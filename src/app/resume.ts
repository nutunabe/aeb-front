export class Resume {
    constructor(
        public firstName: string,
        public secondName: string,
        public patronymic: string,
        public birthdate: string,
        public phoneNumber: string,
        public email: string,
        public eduGroup: string,
        public education: string[],
        public eduWorks: string,
        public goal: string,
        public expWork: string,
        public expPractice: string,
        public softSkills: string,
        public hardSkills: string,
        public langKnowledge: string,
        public imgUrl: string,
        public id?: number
    ) { }
}
