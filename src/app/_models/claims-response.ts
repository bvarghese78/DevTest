import { ClaimsDto } from "./claims-dto";

export interface ClaimsResponseDto {
    firstName: string;
    middleName: string;
    lastName: string;
    personId: number;
    totalClaimCount: number;
    claims: ClaimsDto[];
}