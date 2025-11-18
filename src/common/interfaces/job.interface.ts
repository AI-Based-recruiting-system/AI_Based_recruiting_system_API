export interface JobCreatePayload {
  title: string;
  description:string;
  location:string;
  type:string;
  skillsRequired:string
  experiencedLevel:number;
  companyName:string;
  salary:string;
  applicationDeadline:Date;
  resume:File|null;
}