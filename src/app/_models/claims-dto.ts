import { ClaimsCodeDto } from "./claims-code-dto";

export interface ClaimsDto {
    claimId: number;
    serviceNumber: number;
    serviceName: string;
    serviceAddress: string;
    serviceCity: string;
    serviceZip: string;
    claimNumber: number;
    paidDate: string;
    serviceStartDate: string | null;
    serviceEndDate: string | null;
    serviceType: string;
    chargedAmount: number;
    paidAmount: number;
    codes: ClaimsCodeDto[];
}

