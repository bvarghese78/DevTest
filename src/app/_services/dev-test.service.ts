import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { first, Observable, shareReplay, take } from "rxjs";
import { PersonDto } from "../_models/person-dto";
import { ClaimsDto } from "../_models/claims-dto";
import { ClaimsResponseDto } from "../_models/claims-response";

@Injectable({
    providedIn: 'root'
})

export class DevTestService {
    private readonly cachedPeople$: Observable<Array<PersonDto>>;
    

    constructor(private http: HttpClient){ 
        this.cachedPeople$ = this.load().pipe(shareReplay(1));
    }

    get people$(): Observable<Array<PersonDto>> {
        return this.cachedPeople$;
    }

    private load(): Observable<Array<PersonDto>>{
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + localStorage.getItem('token')
            })
        };
        const requestUri = 'https://localhost:7016/api/DevTest/GetPeople';

        return this.http.get<Array<PersonDto>>(requestUri, httpOptions)
        .pipe(
            take(1)
        );
    }

    public getClaimsByPerson(personId: number, offset?: number, rows?: number): Observable<ClaimsResponseDto> {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + localStorage.getItem('token')
            })
        };

        const requestUri = `https://localhost:7016/api/DevTest/GetClaims/person/${personId}`;

        let requestUriWithQueryStrings: string = `${requestUri}?`;
        if(offset){
            requestUriWithQueryStrings += `offset=${offset}&`;
        }

        if(rows){
            requestUriWithQueryStrings += `rows=${rows}&`;
        }

        return this.http.get<ClaimsResponseDto>(requestUriWithQueryStrings, httpOptions)
        .pipe(
            take(1)
        );
    }

    public getClaimsByExtPerson(extPersonId: number): Observable<Array<PersonDto>> {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + localStorage.getItem('token')
            })
        };

        const requestUri = `https://localhost:7016/api/DevTest/GetClaims/ExtPerson/${extPersonId}`;

        return this.http.get<Array<PersonDto>>(requestUri, httpOptions)
        .pipe(
            take(1)
        );
    }

    public getPersonDetails(organizationId: number, extPersonId: string, email: string, firstName: string, lastName: string, phone: string): Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + localStorage.getItem('token')
            })
        };
        const requestUri = `https://localhost:7016/api/DevTest/GetPersonDetails/Organization/${organizationId}`;
        
        let requestUriWithQueryStrings: string = `${requestUri}?`;
        if(extPersonId){
            requestUriWithQueryStrings = `extPersonId=${extPersonId}&`;
        }
        if(email){
            requestUriWithQueryStrings += `email=${email}&`;
        }
        if(firstName){
            requestUriWithQueryStrings += `firstName=${firstName}&`;
        }
        if(lastName){
            requestUriWithQueryStrings += `lastName=${lastName}&`;
        }
        if(phone){
            requestUriWithQueryStrings += `phone=${phone}&`;
        }
        return this.http.get<any>(requestUriWithQueryStrings, httpOptions)
        .pipe(
            take(1)
        );
    }
}