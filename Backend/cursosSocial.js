const CURSOS_SOCIAL = [
  {
    perfil: "social", titulo: "Comunicación Efectiva",
    descripcion: "Aprende a expresarte con claridad, escuchar activamente y conectar con las personas.",
    icono: "○", orden: 1,
    modulos: [
      {
        titulo: "Escucha Activa", orden: 1,
        descripcion: "Aprende a escuchar de verdad, no solo oír.",
        video_url: "https://www.youtube.com/embed/U5L9tWmnjbM",
        lectura: "Escuchar no es lo mismo que oír. Oír es automático, escuchar requiere atención y esfuerzo.\n\n**¿Qué es la escucha activa?**\nEs prestar atención completa a quien habla, entender su mensaje y responder de forma genuina.\n\n**Técnicas:**\n1. **Contacto visual**: Mira a la persona.\n2. **No interrumpas**: Espera a que termine.\n3. **Parafrasea**: 'Entonces lo que dices es que...'\n4. **Pregunta**: Haz preguntas para entender mejor.\n5. **Lenguaje corporal**: Asiente, inclínate hacia adelante.\n\n**¿Por qué importa?** El 70% de los problemas en relaciones y trabajos se deben a mala comunicación. Escuchar activamente resuelve la mayoría de conflictos antes de que crezcan.",
        quiz: [
          { pregunta: "¿Cuál es la diferencia entre oír y escuchar?", opciones: ["Son lo mismo", "Escuchar requiere atención y esfuerzo", "Oír es más difícil", "No hay diferencia"], correcta: 1 },
          { pregunta: "¿Qué técnica de escucha activa confirma que entendiste?", opciones: ["Interrumpir", "Parafrasear lo que dijo la otra persona", "Mirar el celular", "Cambiar de tema"], correcta: 1 },
          { pregunta: "¿Qué porcentaje de problemas se deben a mala comunicación?", opciones: ["10%", "30%", "70%", "100%"], correcta: 2 }
        ]
      },
      {
        titulo: "Hablar en Público", orden: 2,
        descripcion: "Pierde el miedo y aprende a comunicar tus ideas frente a otros.",
        video_url: "https://www.youtube.com/embed/U5L9tWmnjbM",
        lectura: "El miedo a hablar en público es el miedo #1 de la mayoría de 4 personas. ¡Incluso más que el miedo a la muerte!\n\n**Cómo superarlo:**\n1. **Prepárate**: Conocer bien tu tema reduce el 80% del nerviosismo.\n2. **Practica en voz alta**: Frente al espejo o grabándote.\n3. **Empieza pequeño**: Habla primero ante 2-3 personas.\n4. **Respira**: 3 respiraciones profundas antes de empezar.\n\n**Estructura de una buena presentación:**\n- **Apertura fuerte**: Pregunta, dato impactante o historia.\n- **3 puntos clave**: No más de 3 ideas principales.\n- **Cierre memorable**: Resume y deja un mensaje final.\n\n**Tip**: Los nervios no desaparecen, se transforman en energía. Los mejores oradores del mundo también se ponen nerviosos.",
        quiz: [
          { pregunta: "¿Qué reduce el 80% del nerviosismo?", opciones: ["Improvisar todo", "Prepararse y conocer bien el tema", "No pensar en nada", "Leer todo de una hoja"], correcta: 1 },
          { pregunta: "¿Cuántos puntos clave máximo debe tener una presentación?", opciones: ["10", "3", "7", "1"], correcta: 1 },
          { pregunta: "¿Los mejores oradores se ponen nerviosos?", opciones: ["Nunca", "Sí, pero transforman los nervios en energía", "Solo los principiantes", "Solo si no se preparan"], correcta: 1 }
        ]
      },
      {
        titulo: "Comunicación Asertiva", orden: 3,
        descripcion: "Aprende a expresar lo que piensas y sientes sin agredir ni someterte.",
        video_url: "https://www.youtube.com/embed/U5L9tWmnjbM",
        lectura: "La asertividad es el punto medio entre ser agresivo y ser pasivo.\n\n**3 estilos de comunicación:**\n- **Pasivo**: No dices lo que piensas por miedo. Te frustras por dentro.\n- **Agresivo**: Impones tu opinión sin respetar a los demás.\n- **Asertivo**: Expresas tu opinión con respeto y firmeza.\n\n**Fórmula asertiva:**\n'Yo siento [emoción] cuando [situación] porque [razón]. Me gustaría que [solución].'\n\nEjemplo: 'Yo me siento frustrado cuando llegas tarde a nuestras reuniones porque afecta el trabajo del equipo. Me gustaría que intentaras llegar a tiempo.'\n\n**Beneficios:**\n- Mejores relaciones personales\n- Menos estrés y frustración\n- Mayor respeto de los demás\n- Más confianza en ti mismo",
        quiz: [
          { pregunta: "¿Qué es la comunicación asertiva?", opciones: ["Imponer tu opinión", "Expresarte con respeto y firmeza", "No decir nada", "Gritar más fuerte"], correcta: 1 },
          { pregunta: "¿Cuál es el estilo pasivo?", opciones: ["Imponer tu opinión", "No decir lo que piensas por miedo", "Hablar con respeto", "Ser agresivo"], correcta: 1 },
          { pregunta: "¿Con qué palabra empieza la fórmula asertiva?", opciones: ["Tú", "Ellos", "Yo", "Nosotros"], correcta: 2 }
        ]
      },
      {
        titulo: "Comunicación No Verbal", orden: 4,
        descripcion: "Descubre que tu cuerpo comunica más que tus palabras.",
        video_url: "https://www.youtube.com/embed/U5L9tWmnjbM",
        lectura: "Se estima que el 55% de la comunicación es a través del lenguaje corporal, el 38% es el tono de voz, y solo el 7% son las palabras.\n\n**Señales positivas:**\n- Contacto visual (confianza)\n- Sonrisa genuina (cercanía)\n- Postura abierta, brazos sin cruzar (receptividad)\n- Asentir mientras escuchas (interés)\n\n**Señales negativas:**\n- Brazos cruzados (defensa)\n- Evitar mirar a los ojos (inseguridad o mentira)\n- Manos en los bolsillos (nerviosismo)\n- Mirar el celular mientras hablan (falta de respeto)\n\n**Tip**: Tu cuerpo no sabe mentir. Si dices 'estoy bien' con los brazos cruzados y sin sonreír, la gente percibe la verdad.\n\n**Ejercicio**: Observa una conversación entre otras personas (sin escuchar) e intenta adivinar de qué hablan solo con el lenguaje corporal.",
        quiz: [
          { pregunta: "¿Qué porcentaje de la comunicación es lenguaje corporal?", opciones: ["7%", "38%", "55%", "100%"], correcta: 2 },
          { pregunta: "¿Qué señal corporal indica receptividad?", opciones: ["Brazos cruzados", "Postura abierta", "Mirar el celular", "Dar la espalda"], correcta: 1 },
          { pregunta: "¿Qué indica cruzar los brazos?", opciones: ["Confianza", "Actitud defensiva", "Alegría", "Interés"], correcta: 1 }
        ]
      }
    ]
  },
  {
    perfil: "social", titulo: "Liderazgo Comunitario",
    descripcion: "Desarrolla habilidades de liderazgo para generar impacto positivo en tu comunidad.",
    icono: "○", orden: 2,
    modulos: [
      {
        titulo: "¿Qué es un Líder?", orden: 1,
        descripcion: "Descubre qué significa realmente ser líder.",
        video_url: "https://www.youtube.com/embed/U5L9tWmnjbM",
        lectura: "Un líder NO es el jefe, el que manda, ni el más popular. Un líder es quien inspira a otros a alcanzar un objetivo común.\n\n**Mitos sobre el liderazgo:**\n- 'Los líderes nacen, no se hacen.' → Se aprende y se practica.\n- 'El líder es el que más habla.' → El mejor líder es el que más escucha.\n- 'Necesitas un título para ser líder.' → Puedes liderar desde cualquier posición.\n\n**Tipos de liderazgo:**\n- **Democrático**: Escucha a todos antes de decidir.\n- **Transformacional**: Inspira con visión y ejemplo.\n- **Servicial**: Pone las necesidades del equipo primero.\n\n**Los grandes líderes tienen en común:** Empatía, visión clara, comunicación efectiva y humildad.",
        quiz: [
          { pregunta: "¿Qué es un líder?", opciones: ["El jefe que manda", "Quien inspira a otros a alcanzar objetivos", "El más popular", "El más fuerte"], correcta: 1 },
          { pregunta: "¿Los líderes nacen o se hacen?", opciones: ["Solo nacen", "Se aprende y practica", "Solo en universidades", "Es genético"], correcta: 1 },
          { pregunta: "¿Qué tipo de líder pone al equipo primero?", opciones: ["Autoritario", "Servicial", "Democrático", "Transformacional"], correcta: 1 }
        ]
      },
      {
        titulo: "Trabajo en Equipo", orden: 2,
        descripcion: "Aprende a colaborar efectivamente con otros.",
        video_url: "https://www.youtube.com/embed/U5L9tWmnjbM",
        lectura: "Ningún gran logro se ha conseguido en solitario. Trabajar en equipo multiplica lo que puedes lograr.\n\n**Claves del trabajo en equipo:**\n1. **Roles claros**: Cada persona sabe qué le toca hacer.\n2. **Comunicación abierta**: Compartir ideas sin miedo.\n3. **Respeto**: Valorar las opiniones de todos.\n4. **Compromiso**: Todos dan lo mejor de sí.\n\n**Conflictos en equipo:**\nSon normales y hasta necesarios. Lo importante es cómo los resuelves:\n- Escucha todos los puntos de vista.\n- Busca soluciones donde todos ganen.\n- No hagas personal lo profesional.\n\n**Dato**: Según Google, el factor #1 de los equipos exitosos no es tener los miembros más inteligentes, sino la 'seguridad psicológica': sentirse seguro para opinar sin miedo a ser juzgado.",
        quiz: [
          { pregunta: "¿Cuál es el factor #1 de equipos exitosos según Google?", opciones: ["Tener los más inteligentes", "Seguridad psicológica", "Tener un jefe estricto", "Trabajar muchas horas"], correcta: 1 },
          { pregunta: "¿Los conflictos en equipo son...?", opciones: ["Siempre malos", "Normales y hasta necesarios", "Señal de fracaso", "Imposibles de resolver"], correcta: 1 },
          { pregunta: "¿Qué es esencial para un buen equipo?", opciones: ["Que una persona haga todo", "Roles claros y comunicación abierta", "No hablar de problemas", "Competir entre miembros"], correcta: 1 }
        ]
      },
      {
        titulo: "Proyectos Comunitarios", orden: 3,
        descripcion: "Aprende a crear proyectos que impacten positivamente tu barrio o comunidad.",
        video_url: "https://www.youtube.com/embed/U5L9tWmnjbM",
        lectura: "Un proyecto comunitario nace de una necesidad real de tu entorno y busca solucionarla con los recursos disponibles.\n\n**Pasos para crear un proyecto comunitario:**\n1. **Identifica el problema**: ¿Qué necesita tu barrio o comunidad?\n2. **Investiga**: ¿Cuántas personas afecta? ¿Ya hay soluciones?\n3. **Diseña la solución**: ¿Qué puedes hacer con lo que tienes?\n4. **Busca aliados**: Vecinos, organizaciones, instituciones.\n5. **Ejecuta**: Empieza pequeño, mide resultados.\n6. **Evalúa**: ¿Funcionó? ¿Qué mejorarías?\n\n**Ejemplos reales de jóvenes:**\n- Huerta comunitaria en un lote vacío.\n- Clases de apoyo escolar para niños del barrio.\n- Jornadas de limpieza y reciclaje.\n- Talleres de arte o deporte para jóvenes.\n\nNo necesitas grandes recursos. Necesitas ganas, organización y personas que compartan tu visión.",
        quiz: [
          { pregunta: "¿De dónde nace un proyecto comunitario?", opciones: ["De una tarea escolar", "De una necesidad real de la comunidad", "De internet", "De un libro"], correcta: 1 },
          { pregunta: "¿Cuál es el primer paso?", opciones: ["Buscar dinero", "Identificar el problema", "Hacer publicidad", "Formar un equipo grande"], correcta: 1 },
          { pregunta: "¿Se necesitan grandes recursos para impactar?", opciones: ["Sí, mucho dinero", "No, se necesitan ganas y organización", "Solo con apoyo del gobierno", "Sí, equipos costosos"], correcta: 1 }
        ]
      },
      {
        titulo: "Resolución de Conflictos", orden: 4,
        descripcion: "Aprende técnicas para mediar y resolver conflictos de forma pacífica.",
        video_url: "https://www.youtube.com/embed/qSup_483xO8",
        lectura: "Los conflictos son inevitables, pero la violencia NO es la solución. Resolver conflictos pacíficamente es una de las habilidades más valiosas.\n\n**Técnica de mediación:**\n1. **Calma**: Respira. No reacciones con ira.\n2. **Escucha ambas partes**: Sin interrumpir ni juzgar.\n3. **Identifica necesidades**: ¿Qué necesita realmente cada persona?\n4. **Busca opciones**: ¿Qué soluciones satisfacen a ambos?\n5. **Acuerdo**: Llega a un compromiso justo.\n\n**Frases útiles:**\n- 'Entiendo tu punto de vista...'\n- '¿Qué necesitarías para sentirte bien con esto?'\n- '¿Qué pasaría si probamos...?'\n\n**Recuerda**: En un buen acuerdo, nadie siente que perdió. Ambos ceden un poco para ganar algo mejor: la paz y el respeto mutuo.",
        quiz: [
          { pregunta: "¿Qué es lo primero que debes hacer en un conflicto?", opciones: ["Gritar más fuerte", "Calmarte y respirar", "Ignorar a la otra persona", "Irte"], correcta: 1 },
          { pregunta: "¿En un buen acuerdo qué pasa?", opciones: ["Uno gana y otro pierde", "Ambos ceden un poco para ganar algo mejor", "Nadie habla", "Se usa la fuerza"], correcta: 1 },
          { pregunta: "¿Qué debes identificar de cada persona en conflicto?", opciones: ["Sus defectos", "Sus necesidades reales", "Quién tiene la culpa", "Quién grita más"], correcta: 1 }
        ]
      }
    ]
  },
  {
    perfil: "social", titulo: "Primeros Auxilios Básicos",
    descripcion: "Aprende a actuar en emergencias y potencialmente salvar vidas.",
    icono: "○", orden: 3,
    modulos: [
      {
        titulo: "Emergencias Comunes", orden: 1,
        descripcion: "Aprende a reconocer emergencias y cómo actuar ante ellas.",
        video_url: "https://www.youtube.com/embed/a4mrxuCpgyk",
        lectura: "Saber actuar en una emergencia puede salvar vidas. Lo más importante es la conducta PAS:\n\n**P - Proteger**: Asegúrate de que la zona sea segura para ti.\n**A - Avisar**: Llama a emergencias (123 en Colombia, 911 en otros países).\n**S - Socorrer**: Ayuda a la víctima con lo que sepas.\n\n**Emergencias comunes:**\n- Desmayos: Acuesta a la persona y eleva sus piernas.\n- Quemaduras leves: Agua fría por 10 minutos. NO uses hielo.\n- Hemorragias: Presiona con un trapo limpio.\n- Atragantamiento: Maniobra de Heimlich.\n\n**NUNCA hagas:**\n- Mover a alguien con posible lesión de espalda/cuello.\n- Dar medicamentos sin conocimiento.\n- Poner en riesgo tu propia seguridad.\n\nRecuerda: La calma salva vidas. Un socorrista nervioso comete más errores.",
        quiz: [
          { pregunta: "¿Qué significa la P en la conducta PAS?", opciones: ["Preguntar", "Proteger la zona", "Pedir dinero", "Practicar"], correcta: 1 },
          { pregunta: "¿Qué debes hacer ante una quemadura leve?", opciones: ["Poner hielo", "Agua fría por 10 minutos", "Aceite caliente", "No hacer nada"], correcta: 1 },
          { pregunta: "¿Cuál es el número de emergencias en Colombia?", opciones: ["911", "123", "112", "100"], correcta: 1 }
        ]
      },
      {
        titulo: "RCP Básico", orden: 2,
        descripcion: "Aprende la técnica de reanimación cardiopulmonar básica.",
        video_url: "https://www.youtube.com/embed/a4mrxuCpgyk",
        lectura: "La RCP (Reanimación Cardiopulmonar) puede duplicar o triplicar las probabilidades de supervivencia de una persona en paro cardíaco.\n\n**¿Cuándo hacer RCP?**\nCuando una persona NO responde y NO respira normalmente.\n\n**Pasos de RCP solo con manos:**\n1. Llama a emergencias.\n2. Coloca a la persona boca arriba en una superficie dura.\n3. Pon el talón de tu mano en el centro del pecho.\n4. Pon tu otra mano encima y entrelaza los dedos.\n5. Comprime FUERTE y RÁPIDO: 5-6 cm de profundidad.\n6. Ritmo: 100-120 compresiones por minuto (al ritmo de 'Stayin Alive').\n7. No te detengas hasta que llegue ayuda.\n\n**Importante**: No tengas miedo de hacer daño. Una persona en paro cardíaco ya está en la peor situación posible. Tu acción solo puede mejorar las cosas.",
        quiz: [
          { pregunta: "¿Cuándo debes hacer RCP?", opciones: ["Cuando alguien se desmaya", "Cuando no responde y no respira", "Cuando tiene fiebre", "Siempre"], correcta: 1 },
          { pregunta: "¿A qué ritmo se hacen las compresiones?", opciones: ["50 por minuto", "100-120 por minuto", "200 por minuto", "10 por minuto"], correcta: 1 },
          { pregunta: "¿Debes tener miedo de hacer daño al hacer RCP?", opciones: ["Sí, mejor no hacer nada", "No, tu acción solo puede mejorar las cosas", "Solo si eres médico", "Depende de la edad"], correcta: 1 }
        ]
      },
      {
        titulo: "Botiquín Esencial", orden: 3,
        descripcion: "Arma un botiquín básico y aprende a usar cada elemento.",
        video_url: "https://www.youtube.com/embed/a4mrxuCpgyk",
        lectura: "Un botiquín bien equipado es fundamental en cualquier hogar.\n\n**Elementos esenciales:**\n- Gasas estériles y vendas\n- Alcohol y agua oxigenada\n- Cinta adhesiva médica\n- Tijeras pequeñas\n- Guantes desechables\n- Termómetro\n- Pinzas\n- Analgésicos básicos (acetaminofén)\n- Manual de primeros auxilios\n\n**Dónde guardarlo:**\n- Lugar fresco y seco.\n- Accesible para adultos, fuera del alcance de niños.\n- Que TODOS en casa sepan dónde está.\n\n**Mantenimiento:**\n- Revisa cada 6 meses.\n- Reemplaza lo vencido.\n- Repón lo que uses.\n\n**Tip**: Un botiquín no sirve de nada si no sabes usarlo. El conocimiento es el mejor equipo de primeros auxilios.",
        quiz: [
          { pregunta: "¿Con qué frecuencia debes revisar el botiquín?", opciones: ["Cada año", "Cada 6 meses", "Nunca", "Cada semana"], correcta: 1 },
          { pregunta: "¿Dónde debes guardar el botiquín?", opciones: ["En el baño húmedo", "Lugar fresco, seco y accesible", "Debajo de la cama", "En el carro"], correcta: 1 },
          { pregunta: "¿Qué es más importante que el botiquín?", opciones: ["Tener muchas medicinas", "El conocimiento de cómo usar cada cosa", "Un botiquín grande", "Tener un doctor cercano"], correcta: 1 }
        ]
      },
      {
        titulo: "Heridas y Quemaduras", orden: 4,
        descripcion: "Aprende a tratar heridas y quemaduras de forma segura.",
        video_url: "https://www.youtube.com/embed/a4mrxuCpgyk",
        lectura: "Las heridas y quemaduras son las emergencias más comunes en el hogar.\n\n**Heridas leves (cortes pequeños):**\n1. Lávate las manos o usa guantes.\n2. Limpia la herida con agua y jabón.\n3. Aplica presión si sangra.\n4. Cubre con gasa estéril.\n5. Cambia la gasa diariamente.\n\n**Quemaduras:**\n- **1er grado** (piel roja): Agua fría 10-15 min. Crema hidratante.\n- **2do grado** (ampollas): Agua fría. NO revientes las ampollas. Ve al médico.\n- **3er grado** (piel blanca/negra): Emergencia. Llama al 123 inmediatamente.\n\n**NUNCA hagas:**\n- Poner pasta de dientes en quemaduras.\n- Reventar ampollas.\n- Usar algodón directo en heridas (deja pelusas).\n- Soplar una herida (la contaminas con bacterias).\n\nAnte la duda, siempre consulta a un profesional de la salud.",
        quiz: [
          { pregunta: "¿Qué debes poner en una quemadura leve?", opciones: ["Pasta de dientes", "Agua fría por 10-15 minutos", "Hielo directo", "Aceite"], correcta: 1 },
          { pregunta: "¿Se deben reventar las ampollas?", opciones: ["Sí, siempre", "No, nunca", "Solo las grandes", "Solo con una aguja limpia"], correcta: 1 },
          { pregunta: "¿Por qué no se usa algodón directo en heridas?", opciones: ["Es muy caro", "Deja pelusas dentro de la herida", "No absorbe", "Es tóxico"], correcta: 1 }
        ]
      }
    ]
  }
];

module.exports = CURSOS_SOCIAL;
