const CURSOS_CREATIVO = [
  {
    perfil: "creativo", titulo: "Fundamentos del Diseño Visual",
    descripcion: "Aprende los principios básicos del diseño: color, tipografía y composición.",
    icono: "◇", orden: 1,
    modulos: [
      {
        titulo: "Teoría del Color", orden: 1,
        descripcion: "Entiende cómo funcionan los colores y cómo combinarlos.",
        video_url: "https://www.youtube.com/embed/XqFR2lqBYPs",
        lectura: "El color es la herramienta más poderosa del diseño. Cada color transmite emociones diferentes.\n\n**Colores cálidos** (rojo, naranja, amarillo): Energía, pasión, alegría.\n**Colores fríos** (azul, verde, morado): Calma, confianza, profesionalismo.\n\n**El Círculo Cromático:**\nOrganiza los colores y te ayuda a combinarlos:\n- **Complementarios**: Colores opuestos (rojo-verde). Generan contraste fuerte.\n- **Análogos**: Colores vecinos (azul-morado). Generan armonía.\n- **Triádicos**: Tres colores equidistantes. Generan equilibrio vibrante.\n\n**Tip**: Las marcas más exitosas usan máximo 2-3 colores.",
        quiz: [
          { pregunta: "¿Qué transmiten los colores cálidos?", opciones: ["Calma y confianza", "Energía y pasión", "Tristeza", "Aburrimiento"], correcta: 1 },
          { pregunta: "¿Qué son colores complementarios?", opciones: ["Colores vecinos", "Colores opuestos en el círculo cromático", "Colores iguales", "Colores oscuros"], correcta: 1 },
          { pregunta: "¿Cuántos colores usan generalmente las marcas exitosas?", opciones: ["10 o más", "2-3 colores", "Solo 1", "Todos los del arcoíris"], correcta: 1 }
        ]
      },
      {
        titulo: "Tipografía Básica", orden: 2,
        descripcion: "Aprende a elegir y combinar fuentes tipográficas.",
        video_url: "https://www.youtube.com/embed/XqFR2lqBYPs",
        lectura: "La tipografía es el arte de elegir y organizar las letras. Una buena tipografía hace que tu diseño se vea profesional.\n\n**Familias tipográficas:**\n- **Serif** (con patitas): Times New Roman.\n- **Sans-serif** (sin patitas): Arial, Helvetica.\n- **Script** (cursiva): Parisienne.\n- **Display** (decorativa): Para títulos llamativos.\n\n**Reglas de oro:**\n1. Máximo 2 fuentes por diseño.\n2. Una fuente para títulos + una para texto.\n3. Asegúrate de que sea LEGIBLE.",
        quiz: [
          { pregunta: "¿Qué es una fuente serif?", opciones: ["Sin adornos", "Con pequeñas líneas en los extremos de las letras", "Solo mayúsculas", "Fuentes de colores"], correcta: 1 },
          { pregunta: "¿Cuántas fuentes máximo debe tener un diseño?", opciones: ["5 o más", "2", "10", "Solo 1 siempre"], correcta: 1 },
          { pregunta: "¿Qué transmite una fuente sans-serif?", opciones: ["Tradición", "Modernidad y limpieza", "Desorden", "Antigüedad"], correcta: 1 }
        ]
      },
      {
        titulo: "Composición y Layout", orden: 3,
        descripcion: "Aprende a organizar elementos visuales de forma atractiva.",
        video_url: "https://www.youtube.com/embed/XqFR2lqBYPs",
        lectura: "La composición es cómo organizas los elementos en tu diseño.\n\n**Principios clave:**\n- **Regla de tercios**: Divide tu diseño en 9 cuadros iguales.\n- **Jerarquía visual**: Lo más importante va más grande.\n- **Espacio en blanco**: No llenes todo.\n- **Alineación**: Todos los elementos deben estar alineados.\n\n**Balance:**\n- **Simétrico**: Igual en ambos lados.\n- **Asimétrico**: Diferente pero equilibrado.",
        quiz: [
          { pregunta: "¿En cuántas partes divide la regla de tercios?", opciones: ["4", "9", "6", "3"], correcta: 1 },
          { pregunta: "¿Para qué sirve el espacio en blanco?", opciones: ["Para rellenarlo todo", "Da respiro y elegancia al diseño", "Es un error", "Para ahorrar tinta"], correcta: 1 },
          { pregunta: "¿Qué transmite el balance simétrico?", opciones: ["Dinamismo", "Estabilidad", "Caos", "Tristeza"], correcta: 1 }
        ]
      }
    ]
  },
  {
    perfil: "creativo", titulo: "Fotografía y Composición",
    descripcion: "Conceptos básicos para tomar mejores fotos con tu celular.",
    icono: "◇", orden: 2,
    modulos: [
      {
        titulo: "La Luz en Fotografía", orden: 1,
        descripcion: "Aprende a usar la luz a tu favor.",
        video_url: "https://www.youtube.com/embed/XqFR2lqBYPs",
        lectura: "La luz es la materia prima de la fotografía.\n\n**Tipos de luz:**\n- **Luz Natural**: Del sol. La mejor es en la 'hora dorada' (amanecer/atardecer).\n- **Luz Artificial**: Lámparas, flashes.\n\n**Dirección de la luz:**\n- **Frontal**: Pocas sombras, colores vivos.\n- **Lateral**: Resalta texturas y da volumen.\n- **Contraluz**: Crea siluetas.",
        quiz: [
          { pregunta: "¿Qué es la 'hora dorada'?", opciones: ["Cualquier hora con sol", "Al amanecer o atardecer", "A mediodía", "A medianoche"], correcta: 1 },
          { pregunta: "¿Qué resalta la luz lateral?", opciones: ["Nada", "Texturas y volumen", "Solo colores", "Sombras negras"], correcta: 1 },
          { pregunta: "¿Para qué sirve el contraluz?", opciones: ["Para ver mejor", "Para crear siluetas", "Para eliminar sombras", "Para que la foto salga blanca"], correcta: 1 }
        ]
      }
    ]
  }
];

module.exports = CURSOS_CREATIVO;
