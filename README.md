MENSAJE PARA ENCARGADO DE CORRECCIÓN: {
    Hola Lauti (o Mati), la verdad estuve realizando cambios y arreglos en la parte de frontend, que era lo que hice mas apurado en la anterior entrega, simplemente por confiarme y pensar que era la parte mas facil, que si lo era pero es donde mas problemas me encontre, en la anterior entrega ni siquiera se veia nada de mi pagina porque en el despiste y apuro, no configure la variable de entorno del la URL del front en el back, luego de eso estuve haciendo ajustes en local hasta que anduvo y decidi subirlo, y no anduvo, y empezo la desesperación, pague la mensualidad del chatGPT/VSC, no se bien a quien pertenece, pero pedi su ayuda y arreglo un par de cosas, pero me rompio mucha logica del login, el register y el token, lo que me llevo mucho tiempo arreglar porque era arreglar algo y que se rompa algo mas, increible.
        perdon, por el mensaje largo, solo queria dar un poco de contexto, ya que la aplicacion no funciona al 100%, pero por el momento es lo que pude hacer, de igual manera, entendere la nota que se me tenga que dar, es cierto que estuve inactivo en las clases virtuales, pero en el medio me cambiaron el horario de laburo de 16 a 00, un garron. en el caso de que se lea completo, muchas gracias por tomarte el tiempo :)
        PD: la parte de mensajes del grupo no anda, la verdad, se me hizo imposible.
    ----------------------------------------------------------------------------

    Yo otra vez, primero que nada Lauti, muchas gracias por la tercera oportunidad jaja, siendote sincero, la frustracion ya era mucha y no le encontraba la vuelta, pero despues de ver tu devolución y tu mensaje de aliento me di cuenta que tenias razón, ya habia llegado hasta aca. Te agradezco por eso tambien, despues de eso me tranquilice, me puse a ver las cosas en frio y empece con todo, en dia y medio pude solucionar todos los errores que tenia que eran cosas muy tontas. mucha suerte y excelentisimo tutor, un abrazo.

    PD: hay un error que al, por ejemplo, loguearte y despues cerrar la pestaña, el token queda en el localStorage por lo que cuando quieras entrar otra vez, va a dar error, por lo que mi solucion fue añadir un boton de logout, el cual esta el la ruta principal (/), es un icono: IQ, en la esquina superior izquierda.
}

TECNOLOGIAS USADAS: {
    Node.js, 
    Express.js, 
    MongoDB,
    Mongoose,
    JWT: tokens de verificacion,
    Bcrypt: encriptacion de contraseñas,
    Nodemailer: framework para enviar mails,
    CORS,
}

INSTALACION: {
    1- Instalar dependencias: npm install
    2- Configurar variables de entorno (.env) {
        JWT_SECRET_KEY=
        GMAIL_NAME=
        GMAIL_PASSWORD_KEY= 
        FRONTEND_URL=
    }
    3- Iniciar: npm run dev
}

