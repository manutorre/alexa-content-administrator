const IMAGE_PATHS = {
  "JBL Tune": require("../assets/jbl.png"),
  "Sony Zx": require("../assets/sony.png"),
  "Jabra Evolve": require("../assets/jabra.png"),
};

export const productsCollection = [
  {
    img: IMAGE_PATHS["JBL Tune"],
    title: "JBL Tune wireless",
    subtitle: 40,
    category: "headphones",
  },
  {
    img: IMAGE_PATHS["Sony Zx"],
    title: "Sony Zx wired",
    subtitle: 50,
    category: "headphones",
  },
  {
    img: IMAGE_PATHS["Jabra Evolve"],
    title: "Jabra Evolve wireless",
    subtitle: 30,
    category: "headphones",
  },
];

export const reviewsCollection = [
  {
    titulo: "Surrealista",
    puntaje: 1,
    fecha: "13 de diciembre de 2022",
    "Lo mejor": "La ubicación maravillosa , la habitación limpia y comoda",
    "Lo peor":
      "Pues que no es un lugar seguro , una persona del hotel robó unos iPods de mi hijo , sabíamos que era alguien del hotel, pedimos hablar con dirección , no existe, no hay nadie al mando , el personal de recepción Yolanda ,Alba ,muy amables pero sin saber cómo actuar , perdimos una tarde del viaje en presentar la denuncia en comisaría..Gracias a la localización del móvil, pudimos ver que los iPods volvieron al hotel al día siguiente y la gobernará los localizo,. Tres días después nadie se puesto en contacto con nosotros , y nos dicen que enviemos un mensajero a recogerlos pagado por nosotros. Conclusión robanen el hotel ,pierdes tiempo en un corte viaje de puente y nadie del hotel pide una disculpa. Surrealista",
    "Respuesta de la propiedad":
      "Hola Maria! Muchas gracias por tu opinión. Todos los comentarios que recibimos son muy valiosos para nosotros, ya que nos ayudan mucho a mejorar y así poder dar un mejor servicio a nuestros huéspedes. Lamentamos mucho oír que no pudimos cumplir tus expectativas, pero tendremos en cuenta tu opinión para asegurarnos que no se vuelva a repetir. Esperamos poder volver a verte en el futuro y que puedas disfrutar de la Experiencia Generator. Un saludo, Generator Madrid",
  },
  {
    titulo:
      "DESINFORMACIÓN A LA HORA DE RESERVAR- ARTICULOS DE ASEO Y TOALLAS DE PAGO",
    fecha: "25 de mayo de 2023",
    puntaje: 4,
    "Lo mejor": "Sin comentarios",
    "Lo peor":
      "Al llegar al lugar, tras un largo día de viaje y trabajo, nos encontramos sin toallas ni artículos de aseo personal, para las personas que nos hospedábamos. Lo comunicamos a recepción y nos dicen que si lo queremos tenemos que pagar por ello. En ningún momento el hotel informa a los clientes o posibles clientes, en este caso a través de la reserva realizada por Booking, que los artículos de aseo tienen un coste adicional de 1€ por articulo, y que el alquiler de las toallas conlleva un coste de 5€/unidad, cuando en la página de Booking se puede ver que en las habitaciones privadas incluyen baños privados con artículos de aseo gratuitos, toallas y secador de pelo. Nos sentimos engañados, por ello pusimos una reclamación en dicho hotel. Nos hospedamos mucho por la zona por trabajo y no volveremos a repetir.",
    "Respuesta de la propiedad":
      "Hola! Muchas gracias por tomarte el tiempo de compartir tu experiencia. Estamos muy decepcionados de leer que no hemos cumplido con tus expectativas en esta ocasión, y tendremos en cuenta tu comentario para poder mejorar. De todas formas, esperamos verte en un futuro para poder mostrarte lo genial que Generator Madrid puede ser! Un saludo",
  },
];
