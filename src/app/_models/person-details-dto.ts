import { EmailDto, PhoneDto } from "./email-dto";

export interface PersonDetailsDto {
    id: number;
    organizationId: number;
    externalPersonId: number;
    firstName: string | null;
    lastName: string | null;
    dateOfBirth: string;
    gender: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    emails: EmailDto[];
    phones: PhoneDto[];
}