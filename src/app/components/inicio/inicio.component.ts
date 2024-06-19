import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicio.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component( {
    selector    : 'app-inicio',
    templateUrl : './inicio.component.html',
    styleUrl    : './inicio.component.css',
    animations  : [
        trigger( 'slideUpDown', [
            transition( ':enter', [
                style( { maxHeight : '0px', opacity : '0' } ),
                animate( '30ms ease-in', style( { maxHeight : '500px', opacity : '1' } ) )
            ] ),
            transition( ':leave', [
                animate( '30ms ease-out', style( { maxHeight : '0px', opacity : '0' } ) )
            ] )
        ] )
    ]
} )
export class InicioComponent implements OnInit {
    
    dtOptions : DataTables.Settings = {};
    
    esAsociado : boolean    = false;
    seValidoDpi : boolean   = false;
    asociado : any          = {
        dpi               : '',
        nombres           : '',
        apellidos         : '',
        confirmarTelefono : '',
        cambieTelefono    : '',
        telefono          : '',
        idDepartamento    : '-1',
        idMunicipio       : '-1',
        idMonto           : '-1',
        idMotivoPrestamo  : '-1',
        idIngresos        : '-1',
        contactoWhatsApp  : false,
        contactoLlamada   : false
    };
    socioEncontrado : any   = {
        nombres         : '',
        apellidos       : '',
        idSocio         : '',
        dpi             : '',
        celular         : '',
        socio           : '',
        id_departamento : '',
        dep             : '',
        id_municipio    : '',
        muni            : ''
    };
    lstDepartamentos : any  = [];
    lstMunicipios : any     = [];
    lstMontos : any         = [];
    lstDestinoCredito : any = [];
    lstRubros : any         = [];
    
    private rangosCelular = [
        { inicio : 30000000, final : 32289999, operador : 'TIGO' },
        { inicio : 30000000, final : 32289999, operador : 'TIGO' },
        { inicio : 32290000, final : 32299999, operador : 'CLARO' },
        { inicio : 32300000, final : 33099999, operador : 'TIGO' },
        { inicio : 33600000, final : 33999999, operador : 'ND' },
        { inicio : 34000000, final : 34499999, operador : 'MOVISTAR' },
        { inicio : 40000000, final : 40999999, operador : 'TIGO' },
        { inicio : 41000000, final : 42999999, operador : 'CLARO' },
        { inicio : 43000000, final : 44759999, operador : 'MOVISTAR' },
        { inicio : 44760000, final : 46999999, operador : 'TIGO' },
        { inicio : 47000000, final : 47729999, operador : 'CLARO' },
        { inicio : 47730000, final : 48199999, operador : 'TIGO' },
        { inicio : 48200000, final : 48219999, operador : 'UNITEL' },
        { inicio : 48220000, final : 50099999, operador : 'TIGO' },
        { inicio : 50100000, final : 50199999, operador : 'CLARO' },
        { inicio : 50200000, final : 50299999, operador : 'MOVISTAR' },
        { inicio : 50300000, final : 50699999, operador : 'TIGO' },
        { inicio : 50700000, final : 51099999, operador : 'MOVISTAR' },
        { inicio : 51100000, final : 51399999, operador : 'CLARO' },
        { inicio : 51400000, final : 51499999, operador : 'MOVISTAR' },
        { inicio : 51500000, final : 51999999, operador : 'TIGO' },
        { inicio : 52000000, final : 52099999, operador : 'TIGO' },
        { inicio : 52100000, final : 52999999, operador : 'MOVISTAR' },
        { inicio : 53000000, final : 53099999, operador : 'TIGO' },
        { inicio : 53100000, final : 53119999, operador : 'CLARO' },
        { inicio : 53120000, final : 53139999, operador : 'MOVISTAR' },
        { inicio : 53140000, final : 53899999, operador : 'TIGO' },
        { inicio : 53900000, final : 54099999, operador : 'MOVISTAR' },
        { inicio : 54100000, final : 54999999, operador : 'CLARO' },
        { inicio : 55000000, final : 55099999, operador : 'MOVISTAR' },
        { inicio : 55100000, final : 55179999, operador : 'CLARO' },
        { inicio : 55180000, final : 55199999, operador : 'MOVISTAR' },
        { inicio : 55210000, final : 55299999, operador : 'TIGO' },
        { inicio : 55310000, final : 55399999, operador : 'CLARO' },
        { inicio : 55400000, final : 55429999, operador : 'MOVISTAR' },
        { inicio : 55430000, final : 55449999, operador : 'CLARO' },
        { inicio : 55450000, final : 55499999, operador : 'MOVISTAR' },
        { inicio : 55500000, final : 55539999, operador : 'TIGO' },
        { inicio : 55540000, final : 55799999, operador : 'CLARO' },
        { inicio : 55800000, final : 55819999, operador : 'TIGO' },
        { inicio : 55820000, final : 55999999, operador : 'CLARO' },
        { inicio : 56000000, final : 56089999, operador : 'MOVISTAR' },
        { inicio : 56100000, final : 56399999, operador : 'CLARO' },
        { inicio : 56400000, final : 56899999, operador : 'MOVISTAR' },
        { inicio : 56900000, final : 56999999, operador : 'CLARO' },
        { inicio : 57000000, final : 57099999, operador : 'TIGO' },
        { inicio : 57100000, final : 57189999, operador : 'CLARO' },
        { inicio : 57190000, final : 57899999, operador : 'TIGO' },
        { inicio : 57900000, final : 57999999, operador : 'MOVISTAR' },
        { inicio : 58000000, final : 58099999, operador : 'TIGO' },
        { inicio : 58100000, final : 58189999, operador : 'CLARO' },
        { inicio : 58190000, final : 58199999, operador : 'TIGO' },
        { inicio : 58200000, final : 58799999, operador : 'CLARO' },
        { inicio : 58800000, final : 59099999, operador : 'TIGO' },
        { inicio : 59100000, final : 59149999, operador : 'CLARO' },
        { inicio : 59150000, final : 59179999, operador : 'MOVISTAR' },
        { inicio : 59180000, final : 59199999, operador : 'TIGO' },
        { inicio : 59200000, final : 59899999, operador : 'CLARO' },
        { inicio : 59900000, final : 59999999, operador : 'TIGO' }
    ];
    
    constructor(
        private servicioService : ServicioService,
        private recaptchaService : ReCaptchaV3Service
    ) {}
    
    ngOnInit() {
        this.dtOptions = {
            pagingType : 'full_numbers',
            pageLength : 10,
            processing : true,
            language   : {
                url : './assets/libs/dataTables-es-ES.json'
            }
        };
        this.getDepartamentos();
    }
    
    toggleEsAsociado() {
        this.esAsociado = !this.esAsociado;
        this.resetearDatosFormulario();
    }
    
    resetearDatosFormulario() {
        this.asociado        = {
            dpi               : '',
            nombres           : '',
            apellidos         : '',
            confirmarTelefono : '',
            cambieTelefono    : '',
            telefono          : '',
            idDepartamento    : '-1',
            idMunicipio       : '-1',
            idMonto           : '-1',
            idMotivoPrestamo  : '-1',
            idIngresos        : '-1',
            contactoWhatsApp  : false,
            contactoLlamada   : false
        };
        this.socioEncontrado = {
            nombres         : '',
            apellidos       : '',
            idSocio         : '',
            dpi             : '',
            celular         : '',
            socio           : '',
            id_departamento : '',
            dep             : '',
            id_municipio    : '',
            muni            : ''
        };
        // Limpiar los radios ya que en el cambio de esAsociado se quedan seleccionados
        $( 'input[name=list-radio]' ).prop( 'checked', false );
        // Cambiar validacion del dpi
        this.seValidoDpi = false;
    }
    
    getDepartamentos() {
        this.servicioService.getData( 'formulario/getDepartamentos' ).subscribe( {
            next  : res => {
                this.lstDepartamentos = res;
                this.getMontos();
                this.getDestinoCredito();
                this.getRubros();
            },
            error : err => {
                console.log( 'Error en getDepartamentos(): ', err );
            }
        } );
    }
    
    getMunicipios( idDepartamento : number ) {
        let data = {
            'idDepartamento' : idDepartamento
        };
        this.servicioService.postData( 'formulario/getMunicipios', data ).subscribe( {
            next  : res => {
                this.lstMunicipios = res;
            },
            error : err => {
                console.log( 'Error en getMunicipios(): ', err );
            }
        } );
        
    }
    
    getMontos() {
        this.servicioService.getData( 'formulario/getMontos' ).subscribe( {
            next  : res => {
                this.lstMontos = res;
            },
            error : err => {
                console.log( 'Error en getMontos(): ', err );
            }
        } );
    }
    
    getDestinoCredito() {
        this.servicioService.getData( 'formulario/getDestinoCredito' ).subscribe( {
            next  : res => {
                this.lstDestinoCredito = res;
            },
            error : err => {
                console.log( 'Error en getMontos(): ', err );
            }
        } );
    }
    
    getRubros() {
        this.servicioService.getData( 'formulario/getRubros' ).subscribe( {
            next  : res => {
                this.lstRubros = res;
            },
            error : err => {
                console.log( 'Error en getMontos(): ', err );
            }
        } );
    }
    
    obtenerInformacionPorDpi( dpi : any ) {
        let mensajeError = '';
        if ( ( dpi || '' ).length ) {
            if ( dpi.length < 13 ) {
                mensajeError = 'Complete correctamente el número de dpi.';
            }
        } else {
            mensajeError = 'El campo del dpi esta vacío, verifique.';
        }
        
        if ( mensajeError == '' ) {
            let data = {
                'dpi' : dpi
            };
            this.servicioService.postData( 'formulario/getUserData', data ).subscribe( {
                next  : res => {
                    if ( Array.isArray( res ) && res.length ) {
                        const datosUsuario                   = res[ 0 ];
                        this.asociado.confirmarTelefono      = this.transformarTelefono( datosUsuario.celular );
                        // Asignar los datos del socio encontrado mediante el dpi
                        this.socioEncontrado.nombres         = datosUsuario.nombres;
                        this.socioEncontrado.apellidos       = datosUsuario.apellidos;
                        this.socioEncontrado.idSocio         = datosUsuario.id_socio;
                        this.socioEncontrado.dpi             = datosUsuario.dpi;
                        this.socioEncontrado.celular         = datosUsuario.celular;
                        this.socioEncontrado.socio           = datosUsuario.socio;
                        this.socioEncontrado.id_departamento = datosUsuario.id_departamento;
                        this.socioEncontrado.dep             = datosUsuario.dep;
                        this.socioEncontrado.id_municipio    = datosUsuario.id_municipio;
                        this.socioEncontrado.muni            = datosUsuario.muni;
                        
                        this.servicioService.toaster( 'success', 'Se verificaron sus datos, porfavor continue.', '', '5000' );
                        this.seValidoDpi = true;
                    } else {
                        this.servicioService.toaster( 'warning', 'No se encotró información, verifique.', '', '5000' );
                        this.seValidoDpi = false;
                        this.resetearDatosFormulario();
                    }
                },
                error : err => {
                    console.log( 'Error en getDepartamentos(): ', err );
                }
            } );
        } else {
            this.servicioService.toaster( 'warning', mensajeError, '', '5000' );
        }
    }
    
    transformarTelefono( telefono : string ) {
        let telefonoStr : string   = telefono.toString();
        let ultimosCuatro : string = telefonoStr.slice( -4 );
        let inicio : number        = telefonoStr.length - 4;
        let reemplazo : string     = '*'.repeat( inicio );
        return ( reemplazo + ultimosCuatro );
    }
    
    controlEstadoRadios( metodo : string, event : Event ) {
        const input = event.target as HTMLInputElement | null;
        
        if ( input ) {
            // Resetear los radios
            this.asociado.contactoLlamada  = null;
            this.asociado.contactoWhatsApp = null;
            // Asignar true al método seleccionado
            if ( metodo == 'whatsapp' && input.checked ) {
                this.asociado.contactoWhatsApp = 2;
            } else if ( metodo == 'llamada' && input.checked ) {
                this.asociado.contactoLlamada = 1;
                
            }
        }
    }
    
    guardarFormulario() {
        let guardado = this.obtenerConExpiracion( 'guardado' );
        
        // Si guardado no es null y no está en rango, elimina el valor actual de localStorage
        if ( guardado && !guardado.enRango ) {
            localStorage.removeItem( 'guardado' ); // Elimina el elemento expirado
            guardado = null; // Reinicia la variable guardado
        }
        
        if ( guardado && guardado.enRango ) {
            this.servicioService.toaster( 'warning', 'Ya ha registrado sus datos anteriormente.', '', '5000' );
            this.resetearDatosFormulario();
        } else {
            let mensajeError = '';
            /*-- Inicio de las validaciones*/
            /*-- Validar los datos si el usuario selecciona que es asociado*/
            if ( this.esAsociado ) {
                if ( this.seValidoDpi ) {
                    const esValidoCambioTel = this.validarTelefono(this.asociado.cambieTelefono);
                    if ( ( this.asociado.dpi || '' ).length ) {
                        if ( this.asociado.dpi.length < 13 ) {
                            mensajeError = 'El dpi debe contener 13 caracteres, verifique.';
                        } else if ( this.asociado.cambieTelefono.length && !esValidoCambioTel) {
                            mensajeError = 'El teléfono ingresado no es valido.';
                        } else if ( this.asociado.idMonto == '-1' ) {
                            mensajeError = 'Seleccione el monto que necesita para su crédito.';
                        } else if ( this.asociado.idMotivoPrestamo == '-1' ) {
                            mensajeError = 'Seleccione en que tiene pensado utilizar su crédito.';
                        } else if ( this.asociado.idIngresos == '-1' ) {
                            mensajeError = 'Seleccione de donde obtiene sus ingresos.';
                        } else if ( !this.asociado.contactoWhatsApp && !this.asociado.contactoLlamada ) {
                            mensajeError = 'Seleccione la opción que le gustaría que le contactemos.';
                        }
                    } else {
                        mensajeError = 'Ingrése su número de dpi para poder continuar.';
                    }
                } else {
                    mensajeError = 'Porfavor valide su dpi antes de continuar.';
                }
            } else {
                if ( ( this.asociado.nombres || '' ).length || ( this.asociado.apellidos || '' ).length ) {
                    const esValido = this.validarTelefono(this.asociado.telefono);
                    if ( this.asociado.nombres.length < 6 ) {
                        mensajeError = 'Su nombre debe contener al menos 6 caracteres.';
                    } else if ( this.asociado.apellidos.length < 6 ) {
                        mensajeError = 'Su apellido debe contener al menos 6 caracteres.';
                    } else if ( !( this.asociado.telefono || '' ).length ) {
                        mensajeError = 'Ingrése su número de teléfono.';
                    } else if ( this.asociado.telefono.length < 8 ) {
                        mensajeError = 'El número de teléfono debe contener 8 caracteres.';
                    } else if ( !esValido ) {
                        mensajeError = 'El número de teléfono no es valido.';
                    } else if ( this.asociado.idDepartamento == '-1' ) {
                        mensajeError = 'Seleccione un departamento.';
                    } else if ( this.asociado.idMunicipio == '-1' ) {
                        mensajeError = 'Seleccione un municipio.';
                    } else if ( this.asociado.idMonto == '-1' ) {
                        mensajeError = 'Seleccione el monto que necesita para su crédito.';
                    } else if ( this.asociado.idMotivoPrestamo == '-1' ) {
                        mensajeError = 'Seleccione en que tiene pensado utilizar su crédito.';
                    } else if ( this.asociado.idIngresos == '-1' ) {
                        mensajeError = 'Seleccione de donde obtiene sus ingresos.';
                    } else if ( !this.asociado.contactoWhatsApp && !this.asociado.contactoLlamada ) {
                        mensajeError = 'Seleccione la opción que le gustaría que le contactemos.';
                    }
                } else {
                    mensajeError = 'Ingrése su nombre completo.';
                }
            }
            
            if ( mensajeError == '' ) {
                // Invoca reCAPTCHA v3 antes de enviar los datos del formulario
                this.recaptchaService.execute( 'solicitudCredito' ).subscribe( ( token : string ) => {
                    console.debug( `Token [${ token }] generated` );
                    
                    let data : any = {
                        esAsociado      : this.esAsociado,
                        seValidoDpi     : this.seValidoDpi,
                        asociado        : this.asociado,
                        socioEncontrado : this.socioEncontrado,
                        recaptchaToken  : token
                    };
                    
                    this.servicioService.postData( 'formulario/guardarFormulario', data ).subscribe( {
                        next  : res => {
                            if ( res.respuesta == 'success' ) {
                                this.servicioService.toaster(
                                    'success',
                                    'Su solicitud ha sido enviada, muy pronto recibira una llamada de uno de nuestros asesores. Ahora sera redireccionado a nuestro sitio web. Gracias.',
                                    '',
                                    '8000',
                                    'https://micoopebienestar.com.gt/' );
                                this.resetearDatosFormulario();
                                this.guardarConExpiracion( 'token', token, 3 );
                            } else {
                                this.servicioService.toaster( res.respuesta, res.mensaje, '', '5000' );
                            }
                        },
                        error : err => {
                            console.log( 'Error en guardarFormulario: ', err );
                        }
                    } );
                } );
            } else {
                this.servicioService.toaster( 'warning', mensajeError, '', '5000' );
            }
        }
    }
    
    // Función para guardar datos en localStorage con una expiración
    guardarConExpiracion( clave : any, valor : any, dias : any ) {
        const ahora      = new Date();
        // `dias` es convertido a milisegundos
        const expiracion = new Date( ahora.getTime() + dias * 24 * 60 * 60 * 1000 ).getTime();
        
        const item = {
            valor      : valor,
            expiracion : expiracion
        };
        
        localStorage.setItem( clave, JSON.stringify( item ) );
    }
    
    // Función para obtener datos de localStorage, considerando la expiración
    obtenerConExpiracion( clave : any ) {
        const itemStr = localStorage.getItem( clave );
        if ( !itemStr ) {
            return null;
        }
        
        const item  = JSON.parse( itemStr );
        const ahora = new Date();
        
        // Devuelve el valor junto con un booleano indicando si aún está en el rango de validez
        return {
            valor   : item.valor,
            enRango : ahora.getTime() <= item.expiracion // Verdadero si aún no ha expirado
        };
    }
    
    validarTelefono( numero : string ) : boolean {
        const valorNumerico = parseInt( numero, 10 );
        
        for ( const rango of this.rangosCelular ) {
            if ( valorNumerico >= rango.inicio && valorNumerico <= rango.final ) {
                return true; // El número es válido y está dentro de algún rango
            }
        }
        
        return false; // El número no pertenece a ningún rango válido
    }
    
}
