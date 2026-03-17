# Mascaras o formatos de texto

Metodos sencillos para aplicar formato a campos de texto (inputs) en tiempo real, ligero en **HTML y JavaScript**

No requiere dependencias ni frameworks.  
Simplemente llamas la función que necesites o puedes implementar tus propias funciones de manera sencilla

## Características

- Fácil de aplicar
- Puedes crear tus propios metodos de manera simple
- Reutilizable

## Cómo utilizar 

En el evento oninput llamamos al metodo respectivo:

'<input type="text" class="form-control" placeholder="Número teléfono: 1111111111" oninput="Mascaras.telefono(event)"/>'

Mascaras existentes:

- Teléfono a 10 digitos 1111111111 
- Teléfono a 10 digitos separado por guión cada 2 digitos 11-11-11-11-11
- Teléfono a 10 digitos separado por guiones 111-111-1111
- Formato moneda, admite decimales y negativos 000,000.00
- Validación de CURP AAAA######HHMMSSXX
- Validación RFC personas físicas o morales AAAA######XXX o AAA######XXX
- Patrón personalizado, se puede configurar una expresión regular sencilla /[^0-9A-Za-z]+/

---

## Instalación

Clona el repositorio o descarga los archivos.

```bash
git clone https://github.com/urosales/mascaras






