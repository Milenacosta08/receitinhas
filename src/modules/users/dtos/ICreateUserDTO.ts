export default interface ICreateUserDTO {
    name: string;
    age: number;
    about_me?: string;
    email: string;
    password: string;
    is_admin?: boolean;
}