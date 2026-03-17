class Mascaras{

    static moneda(e){
    
        let value = e.target.value;

        // 1. Eliminar todo excepto números, punto y signo de menos
        value = value.replace(/[^0-9.-]/g, '');

        // 2. Sólo aceptamos un signo de menos y sólo al inicio
        let parts = value.split('-');
        if (parts.length > 1 && parts[0] === '')
            value = '-' + parts.slice(1).join('');
        else
            value = value.replace(/[-]+/g,'');

        // 3. Evitar más de un punto decimal
        parts = value.split('.');
        if (parts.length > 2) 
            value = parts[0] + '.' + parts.slice(1).join('');
        
        // 4. Separar enteros y decimales
        let [integer, decimal] = value.split('.');

        // 5. Eliminar ceros iniciales solo si hay más de un dígito
        if (integer) 
            integer = integer.replace(/^0+(?=\d)/, '');
        

        // 6. Agregar comas a la parte entera si no está vacía
        if (integer) 
            integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        

        // 7. Limitar a 2 decimales
        if (decimal !== undefined) {
            decimal = decimal.substring(0, 2);
            // si integer vacío y empieza con decimal, poner 0 antes del punto
            if (!integer) integer = '0';
            value = `${integer}.${decimal}`;
        } 
        else 
            value = integer || '';
        

        e.target.value = value;
    }

    static telefono(e){
        let value = e.target.value;
        value = value.replace(/\D/g, '').slice(0, 10);
        e.target.value = value;
    }

    static telefono2(e){
        let value = e.target.value;
        value = value.replace(/\D/g, '').slice(0, 10);
        value = value.match(/.{1,2}/g)?.join('-') || '';
        e.target.value = value;
    }

    static telefono3(e){
        let value = e.target.value;

        // sólo números, máximo 10
        value = value.replace(/\D/g, '').slice(0, 10);

        // aplicar formato 3-3-4
        let part1 = value.slice(0,3);
        let part2 = value.slice(3,6);
        let part3 = value.slice(6,10);

        if (value.length > 6) 
            value = `${part1}-${part2}-${part3}`;
        else if (value.length > 3) 
            value = `${part1}-${part2}`;
        else 
            value = part1;

        e.target.value = value;
    }

    static curp(e){
        let value = e.target.value.toUpperCase();

        let clean = '';

        const consonantes = 'BCDFGHJKLMNPQRSTVWXYZ';

        const estados = [
            'AS','BC','BS','CC','CL','CM','CS','CH','DF','DG','GT','GR',
            'HG','JC','MC','MN','MS','NT','NL','OC','PL','QT','QR','SP',
            'SL','SR','TC','TS','TL','VZ','YN','ZS'
        ];

        // const mensaje = document.getElementById('curp-valid-msg');
        // let feedback = [];

        // Si el primer carácter no es letra, limpiar todo
        if(!/^[A-Z]/.test(value[0])){
            e.target.value = '';
            return;
        }

        for(let i = 0; i < value.length && i < 18; i++){
            const c = value[i];
            switch(i){
                // 1-4: letras iniciales
                case 0: case 1: case 2: case 3:
                    if(/[A-Z]/.test(c)) 
                        clean += c;
                    break;
                // 5-10: fecha AAMMDD
                case 4: case 5: case 6: case 7: case 8: case 9:
                    if(/[0-9]/.test(c)) 
                        clean += c;
                    break;
                // 11: sexo
                case 10:
                    if(/[HM]/.test(c)) 
                        clean += c;
                    break;
                // 12-13: estado
                case 11:
                    if(/[A-Z]/.test(c)) 
                        clean += c;
                    break;
                case 12:
                    if(/[A-Z]/.test(c) && estados.includes(clean.slice(11,12)+c)) 
                        clean += c;
                    break;
                // 14-16: consonantes internas
                case 13: case 14: case 15:
                    if(consonantes.includes(c)) 
                        clean += c;
                    break;
                // 17: homoclave letra o número
                case 16:
                    if(/[A-Z0-9]/.test(c)) 
                        clean += c;
                    break;
                // 18: dígito verificador número
                case 17:
                    if(/[0-9]/.test(c)) 
                        clean += c;
                    break;
            }
        }

        e.target.value = clean;

    }

    static rfc(e){

        let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,''); // solo letras y números
       
        let clean = '';
       
        // Detectar tipo RFC
        const isFisica = (value.length === 13 || /^[A-Z]{4}/.test(value));
        const maxLength = isFisica ? 13 : 12;

        // Si el primer carácter no es letra, limpiar todo
        if(!/^[A-Z]/.test(value[0])){
            e.target.value = '';
            return;
        }

        let pos = 0;
        for(let i=0;i<value.length && pos<maxLength;i++){
            const c = value[i];
            let valid = false;

            if(isFisica){
                if(pos < 4){ // letras iniciales
                    if(/[A-Z]/.test(c))
                        clean+=c;
                    pos++;
                } else if(pos >=4 && pos <10){ // fecha
                    if(/[0-9]/.test(c))
                        clean+=c ;
                    pos++;
                } else { // homoclave
                    if(/[A-Z0-9]/.test(c))
                        clean+=c;
                    pos++;
                }
            } 
            else { // persona moral
                if(pos < 3){ // letras iniciales
                    if(/[A-Z]/.test(c))
                        clean+=c;
                    pos++;
                } 
                else if(pos >=3 && pos <9){ // fecha
                    if(/[0-9]/.test(c))
                        clean+=c;
                    pos++;
                } 
                else { // homoclave
                    if(/[A-Z0-9]/.test(c))
                        clean+=c;
                    pos++;
                }
            }
        }

        e.target.value = clean;
    }

    static personalizada(e,patron){
        let value = e.target.value;
        const re = new RegExp(patron,'g');
        e.target.value = value.replace(re, '');

    }

}