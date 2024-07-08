import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, finalize } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Injectable( {
    providedIn : 'root'
} )
export class ServicioService {
    private apiUrl = 'http://localhost/ahorralink/backend/public';
    //private apiUrl = 'https://inversiones.micoopebienestar.com.gt/backend/public';
    
    constructor(
        private http : HttpClient,
        public spinner : NgxSpinnerService,
        public toastr : ToastrService
    ) {}
    
    
    // Método para realizar una solicitud GET a la API
    public getData( endpoint : string ) : Observable<any> {
        const url = `${ this.apiUrl }/${ endpoint }`;
        this.spinner.show().then( r => {} );
        return this.http.get<any>( url ).pipe(
            finalize( () => {
                this.spinner.hide().then( r => {} );
            } )
        );
    }
    
    // Método para realizar una solicitud POST a la API
    public postData( endpoint : string, data : any ) : Observable<any> {
        const url     = `${ this.apiUrl }/${ endpoint }`;
        const headers = new HttpHeaders( { 'Content-Type' : 'application/json' } );
        this.spinner.show().then( r => {} );
        return this.http.post<any>( url, data, { headers } ).pipe(
            finalize( () => {
                this.spinner.hide().then( r => {} );
            } )
        );
    }
    
    // Método para realizar una solicitud PUT a la API
    public putData( endpoint : string, data : any ) : Observable<any> {
        const url     = `${ this.apiUrl }/${ endpoint }`;
        const headers = new HttpHeaders( { 'Content-Type' : 'application/json' } );
        this.spinner.show().then( r => {} );
        return this.http.put<any>( url, data, { headers } ).pipe(
            finalize( () => {
                this.spinner.hide().then( r => {} )
            } )
        );
    }
    
    // Método para realizar una solicitud DELETE a la API
    public deleteData( endpoint : string ) : Observable<any> {
        const url = `${ this.apiUrl }/${ endpoint }`;
        this.spinner.show().then( r => {} );
        return this.http.delete<any>( url ).pipe(
            finalize( () => {
                this.spinner.hide().then( r => {} );
            } )
        );
    }
    
    /**toaster */
    toaster(tipo: string, titulo: any, mensaje: any, time: string, url = '') {
        const tiempo = parseInt(time);
        const options: any = {
            timeOut: tiempo,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'decreasing',
            autoDismiss: true,
            tapToDismiss: true,
        };
        
        let toast;
        switch (tipo) {
            case 'success':
                toast = this.toastr.success(mensaje, titulo, options);
                break;
            case 'error':
            case 'danger':
                toast = this.toastr.error(mensaje, titulo, options);
                break;
            case 'info':
                toast = this.toastr.info(mensaje, titulo, options);
                break;
            case 'warning':
                toast = this.toastr.warning(mensaje, titulo, options);
                break;
            default:
                console.warn('Tipo de Toastr no reconocido:', tipo);
                return;
        }
        
        // Asumiendo que toast podría ser undefined si el tipo no es reconocido
        if (toast) {
            // Se suscribe a onHidden para manejar tanto el cierre automático como el cierre por el usuario
            toast.onHidden.subscribe(() => {
                if (url) {window.location.href = url;}
            });
            
            // Opcional: Si también deseas redirigir cuando el usuario hace clic en el toast
            toast.onTap.subscribe(() => {
                if (url) {window.location.href = url;}
            });
        }
    }
}
