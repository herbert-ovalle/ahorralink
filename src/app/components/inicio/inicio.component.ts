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
    
    asociado : any         = {
        nombres          : '',
        apellidos        : '',
        telefono         : '',
        idDepartamento   : null,
        idMunicipio      : null,
        contactoWhatsApp : false,
        contactoLlamada  : false,
        visitaAgencia    : false,
        visitarAsociado  : false,
        fechaCita        : '',
        comentario       : '',
        idAgencia        : null,
        idProducto       : null
    };
    lstDepartamentos : any = [];
    lstMunicipios : any    = [];
    lstAgencias : any      = [];
    lstProductos : any     = [];
    
    mostrarListadoAgencia : boolean = false;
    mostrarFechaCita : boolean      = false;
    agenciaSeleccionada : any       = null;
    
    todayString : string;
    
    private agencias : any = [
        {
            idAgencia          : 1,
            nombreAgencia      : 'Agencia Central',
            direccion          : 'C-94, Zona 3 Xecam',
            horariosDeAtencion : {
                'lunesViernes' : '09:00 a 18:00',
                'sabados'      : '09:00 a 18:00',
                'domingos'     : '09:00 a 13:00'
            }
        },
        {
            idAgencia          : 2,
            nombreAgencia      : 'Pasac Primero',
            direccion          : 'B-234 Km 219 ruta al pacífico',
            horariosDeAtencion : {
                'lunesViernes' : '09:00 a 18:00',
                'sabados'      : '09:00 a 18:00',
                'domingos'     : '09:00 a 13:00'
            }
        },
        {
            idAgencia          : 3,
            nombreAgencia      : 'Zunil',
            direccion          : 'Canton Chuatiox zona 1',
            horariosDeAtencion : {
                'lunesViernes' : '09:00 a 18:00',
                'sabados'      : '08:30 a 12:30',
                'domingos'     : 'Cerrado'
            }
        },
        {
            idAgencia          : 4,
            nombreAgencia      : 'San Felipe',
            direccion          : '2a Av. 2-77 Zona 1',
            horariosDeAtencion : {
                'lunesViernes' : '08:30 a 17:30',
                'sabados'      : '08:30 a 12:30',
                'domingos'     : 'Cerrado'
            }
        },
        {
            idAgencia          : 5,
            nombreAgencia      : 'Utz Ulew Mall',
            direccion          : '19 Av. 2-40 zona 3, C.C. Utz Ulew Mall, local 3, Plaza Financiera',
            horariosDeAtencion : {
                'lunesViernes' : '10:00 a 19:00',
                'sabados'      : '10:00 a 16:00',
                'domingos'     : '10:00 a 16:00'
            }
        },
        {
            idAgencia          : 6,
            nombreAgencia      : 'Almolonga',
            direccion          : '3ra. Avenida 1-18 Zona 4',
            horariosDeAtencion : {
                'lunesViernes' : '08:30 a 17:30',
                'sabados'      : '08:30 a 12:30',
                'domingos'     : 'Cerrado'
            }
        },
        {
            idAgencia          : 7,
            nombreAgencia      : 'Maxi Despensa Quetzaltenango',
            direccion          : '7ma. Avenida 3-44 Zona 2',
            horariosDeAtencion : {
                'lunesViernes' : '08:00 a 20:00',
                'sabados'      : '08:00 a 20:00',
                'domingos'     : '08:00 a 20:00'
            }
        },
        {
            idAgencia          : 8,
            nombreAgencia      : 'Centro Cantel',
            direccion          : '3ra Calle 2-80 Zona 1',
            horariosDeAtencion : {
                'lunesViernes' : '08:00 a 18:00 Viernes Cerrado',
                'sabados'      : '02:00 a 18:00',
                'domingos'     : '09:00 a 13:00'
            }
        },
        {
            idAgencia          : 9,
            nombreAgencia      : 'San Francisco Zapotitlán',
            direccion          : '2da. Avenida Zona 2, Plaza del Sol',
            horariosDeAtencion : {
                'lunesViernes' : '08:30 a 17:30',
                'sabados'      : '08:30 a 12:30',
                'domingos'     : 'Cerrado'
            }
        },
        {
            idAgencia          : 10,
            nombreAgencia      : 'Retalhuleu',
            direccion          : '5a Avenida A, Centro Comercial Paseo Las Palmas',
            horariosDeAtencion : {
                'lunesViernes' : '08:30 a 17:30',
                'sabados'      : '08:30 a 12:30',
                'domingos'     : 'Cerrado'
            }
        },
        {
            idAgencia          : 11,
            nombreAgencia      : 'Retalhuleu',
            direccion          : '4ta. Av. Zona 4, San Sebastián',
            horariosDeAtencion : {
                'lunesViernes' : '08:30 a 17:30 (Cerrado de 1 a 2 PM)',
                'sabados'      : '08:30 a 13:00',
                'domingos'     : 'Cerrado'
            }
        }
    ];
    
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
        { inicio : 59900000, final : 59999999, operador : 'TIGO' },
        // Ciudad de Guatemala y alrededores
        { inicio : 22000000, final : 24999999, operador : 'RESIDENCIAL' },
        // Quetzaltenango
        { inicio : 77200000, final : 77299999, operador : 'RESIDENCIAL' },
        // Petén
        { inicio : 79200000, final : 79299999, operador : 'RESIDENCIAL' },
        // Escuintla
        { inicio : 78800000, final : 78899999, operador : 'RESIDENCIAL' },
        // Antigua Guatemala
        { inicio : 78320000, final : 78329999, operador : 'RESIDENCIAL' },
        // Huehuetenango
        { inicio : 77600000, final : 77699999, operador : 'RESIDENCIAL' },
        // Chiquimula
        { inicio : 79420000, final : 79429999, operador : 'RESIDENCIAL' },
        // Jalapa
        { inicio : 79250000, final : 79259999, operador : 'RESIDENCIAL' },
        // Cobán
        { inicio : 79520000, final : 79529999, operador : 'RESIDENCIAL' },
        // Mazatenango
        { inicio : 78750000, final : 78759999, operador : 'RESIDENCIAL' },
        // Zacapa
        { inicio : 79360000, final : 79369999, operador : 'RESIDENCIAL' },
        // Santa Rosa
        { inicio : 78840000, final : 78849999, operador : 'RESIDENCIAL' },
        // Jutiapa
        { inicio : 78440000, final : 78449999, operador : 'RESIDENCIAL' }
    ];
    
    constructor(
        private servicioService : ServicioService,
        private recaptchaService : ReCaptchaV3Service
    ) {
        const today = new Date();
        this.todayString = today.toISOString().split('T')[0];
    }
    
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
    
    resetearDatosFormulario() {
        this.asociado = {
            nombres          : '',
            apellidos        : '',
            telefono         : '',
            idDepartamento   : null,
            idMunicipio      : null,
            contactoWhatsApp : false,
            contactoLlamada  : false,
            visitaAgencia    : false,
            visitarAsociado  : false,
            fechaCita        : '',
            comentario       : '',
            idAgencia        : null
        };
        // Limpiar los radios, ya que en el cambio de esAsociado se quedan seleccionados
        $( 'input[name=list-radio]' ).prop( 'checked', false );
        $( 'input[name=list-radio-user]' ).prop( 'checked', false );
        
        //Ocultar los campos de fecha visita y agencia visita
        this.mostrarListadoAgencia = false;
        this.mostrarFechaCita      = false;
        this.agenciaSeleccionada   = false;
    }
    
    getAgencias() {
        this.servicioService.getData( 'ahorralink/getAgencias' ).subscribe( {
            next  : res => {
                this.lstAgencias = res;
            },
            error : err => {
                console.log( 'Error en getAgencias(): ', err );
            }
        } );
    }
    
    actualizarAgenciaSeleccionada( idAgencia : any ) {
        this.agenciaSeleccionada = this.agencias.find( ( agencia : {
            idAgencia : any;
        } ) => agencia.idAgencia === idAgencia );
    }
    
    getDepartamentos() {
        this.servicioService.getData( 'ahorralink/getDepartamentos' ).subscribe( {
            next  : res => {
                this.lstDepartamentos = res;
                this.getAgencias();
                this.getProductos();
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
        this.servicioService.postData( 'ahorralink/getMunicipios', data ).subscribe( {
            next  : res => {
                this.lstMunicipios        = res;
                // Resetear el valor seleccionado de la clasificación del crédito
                this.asociado.idMunicipio = null;
            },
            error : err => {
                console.log( 'Error en getMunicipios(): ', err );
            }
        } );
        
    }
    
    getProductos() {
        this.servicioService.getData( 'ahorralink/getProductos' ).subscribe( {
            next  : res => {
                this.lstProductos = res;
            },
            error : err => {
                console.log( 'Error en getDepartamentos(): ', err );
            }
        } );
    }
    
    controlEstadoRadios( metodo : string, event : Event ) {
        const input = event.target as HTMLInputElement | null;
        
        if ( input ) {
            // Resetear los radios
            this.asociado.contactoLlamada  = null;
            this.asociado.contactoWhatsApp = null;
            // Asignar true al método seleccionado
            if ( metodo == 'whatsapp' && input.checked ) {
                this.asociado.contactoWhatsApp = 3;
            } else if ( metodo == 'llamada' && input.checked ) {
                this.asociado.contactoLlamada = 1;
            }
        }
    }
    
    controlEstadoRadiosCita( metodo : string, event : Event ) {
        const input = event.target as HTMLInputElement | null;
        
        if ( input ) {
            // Resetear los radios
            this.asociado.visitaAgencia   = null;
            this.asociado.visitarAsociado = null;
            // Asignar true al método seleccionado
            if ( metodo == 'visitaAgencia' && input.checked ) {
                this.asociado.visitaAgencia = 16;
                this.mostrarListadoAgencia  = true;
                this.mostrarFechaCita       = false;
            } else if ( metodo == 'visitarAsociado' && input.checked ) {
                this.asociado.visitarAsociado = 4;
                this.mostrarFechaCita         = true;
                this.mostrarListadoAgencia    = false;
                this.asociado.idAgencia       = null;
                this.agenciaSeleccionada      = null;
            }
        }
    }
    
    guardarFormulario() {
        let mensajeError = '';
        
        /*-- Inicio de las validaciones*/
        if ( ( this.asociado.nombres || '' ).length || ( this.asociado.apellidos || '' ).length ) {
            const esValido = this.validarTelefono( this.asociado.telefono );
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
            } else if ( this.asociado.idDepartamento == null ) {
                mensajeError = 'Seleccione un departamento.';
            } else if ( this.asociado.idMunicipio == null ) {
                mensajeError = 'Seleccione un municipio.';
            } else if ( this.asociado.idProducto == null ) {
                mensajeError = 'Seleccione el producto en el que esta interesado.';
            } else if ( !this.asociado.contactoWhatsApp && !this.asociado.contactoLlamada ) {
                mensajeError = 'Seleccione la opción que le gustaría que le contactemos.';
            } else if ( !this.asociado.visitaAgencia && !this.asociado.visitarAsociado ) {
                mensajeError = 'Seleccione la opción que prefiere en su cita.';
            } else if ( this.asociado.visitaAgencia && this.asociado.idAgencia == null ) {
                mensajeError = 'Seleccione su agencia mas cercana.';
            } else if ( this.asociado.visitarAsociado && this.asociado.fechaCita == '' ) {
                mensajeError = 'Ingrese la fecha y hora de su cita.';
            }
        } else {
            mensajeError = 'Ingrése su nombre completo.';
        }
        
        if ( mensajeError == '' ) {
            // Invoca reCAPTCHA v3 antes de enviar los datos del formulario
            this.recaptchaService.execute( 'solicitudCredito' ).subscribe( ( token : string ) => {
                //console.debug( `Token [${ token }] generated` );
                
                let data : any = {
                    asociado       : this.asociado,
                    recaptchaToken : token
                };
                
                this.servicioService.postData( 'ahorralink/guardarFormulario', data ).subscribe( {
                    next  : res => {
                        console.log( 'res: ', res );
                        if ( res.respuesta == 'success' ) {
                            this.servicioService.toaster(
                                'success',
                                'Muy pronto recibira una llamada de uno de nuestros asesores. Ahora sera redireccionado a nuestro sitio web. Gracias.',
                                '',
                                '5000',
                                'https://micoopebienestar.com.gt/' );
                            this.resetearDatosFormulario();
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
