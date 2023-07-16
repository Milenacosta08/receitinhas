export default interface ICreateUserDTO {
    name: string;
    age: number;
    about_me?: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}