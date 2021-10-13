this.pacienteForm = this.fb.group({
    pac_nombres: new FormControl('', [Validators.required, Validators.pattern(this.valueNombre)]),
    pac_primer_apellido: new FormControl('', [Validators.required, Validators.pattern(this.valueNombre)]),
    pac_segundo_apellido: new FormControl('', [Validators.required, Validators.pattern(this.valueNombre)]),
    pac_curp: new FormControl('', [Validators.required, Validators.pattern(this.valueCURP)]),
    pac_f_nacimiento: new FormControl('', [Validators.required]),

    pac_email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]),
    pac_telefono: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    pac_celular: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    pac_estado_civil: new FormControl('', [Validators.required]),
    pac_escolaridad: new FormControl('', [Validators.required]),
    pac_sexo: new FormControl('', [Validators.required]),

    pac_pais: new FormControl('México', [Validators.required]),
    pac_estado: new FormControl('', [Validators.required]),
    pac_municipio: new FormControl('', [Validators.required]),

    pac_localidad: new FormControl('', [Validators.required]),
    pac_dir_cp: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}'), Validators.minLength(5)]),
    pac_dir_colonia: new FormControl('', [Validators.required]),
    pac_dir_calle: new FormControl('', [Validators.required]),
    pac_dir_comentarios: new FormControl('', [Validators.required]),
  })
