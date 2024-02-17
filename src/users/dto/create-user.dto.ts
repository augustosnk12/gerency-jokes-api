import { UserStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, Length, MaxLength, Validate } from "class-validator";
import { IsUniquePhoneConstraint } from "src/prisma-client-exception/validate-phone";

export class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(80)
    name: string;

    @IsNotEmpty()
    @Length(11, 11)
    @Validate(IsUniquePhoneConstraint)
    phone: string;

    @IsNotEmpty()
    @IsEnum(UserStatus)
    status: UserStatus;
}
