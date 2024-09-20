import { IsEmail, IsNumber, IsString, Max, Min, min } from "class-validator";

export class ProjectInviteDto{ 
    @IsString()
    project_id : string

    @IsNumber()
    @Max(5)
    @Min(2)
    role_id : number

    @IsEmail()
    email : string
}