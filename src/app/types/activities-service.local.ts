import { Observable } from 'rxjs'

export interface ActivityService {
  get(id: number): Observable<any>
  sort(
    id: string,
    offset: number,
    sort: string,
    sortAsc: boolean
  ): Observable<any>
  set(value): Observable<any>
  update(value): Observable<any>
}
