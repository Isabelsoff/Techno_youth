const CURSOS_PRACTICO = [
  {
    perfil: "practico", titulo: "Electricidad Básica para el Hogar",
    descripcion: "Aprende los fundamentos de la electricidad y cómo hacer reparaciones seguras en casa.",
    icono: "□", orden: 1,
    modulos: [
      {
        titulo: "Circuitos Simples", orden: 1,
        descripcion: "Entiende cómo funciona un circuito eléctrico básico.",
        video_url: "https://www.youtube.com/embed/a_iQb1lnAEQ",
        lectura: "La electricidad es el flujo de electrones a través de un conductor. Para entenderla, imagina el agua fluyendo por una tubería.\n\n**Conceptos básicos:**\n- **Voltaje (V)**: La 'presión' que empuja la electricidad. Como la presión del agua.\n- **Corriente (A)**: La cantidad de electricidad que fluye. Como el caudal del agua.\n- **Resistencia (Ω)**: Lo que se opone al flujo. Como un tubo estrecho.\n\n**Circuito básico:**\nFuente de energía → Cable → Dispositivo → Cable → Fuente.\nSi el circuito se rompe en cualquier punto, la electricidad deja de fluir (por eso funcionan los interruptores).\n\n**Tipos de circuitos:**\n- **Serie**: Los dispositivos van uno después del otro. Si uno falla, todos se apagan.\n- **Paralelo**: Cada dispositivo tiene su propio camino. Si uno falla, los demás siguen.",
        quiz: [
          { pregunta: "¿Qué es el voltaje?", opciones: ["La cantidad de electricidad", "La presión que empuja la electricidad", "La resistencia", "Un tipo de cable"], correcta: 1 },
          { pregunta: "¿Qué pasa en un circuito en serie si un dispositivo falla?", opciones: ["Los demás siguen funcionando", "Todos se apagan", "Nada cambia", "Solo se apaga el siguiente"], correcta: 1 },
          { pregunta: "¿Qué es un circuito?", opciones: ["Un cable suelto", "Un camino cerrado por donde fluye la electricidad", "Una batería", "Un interruptor"], correcta: 1 }
        ]
      },
      {
        titulo: "Seguridad Eléctrica", orden: 2,
        descripcion: "Reglas de seguridad fundamentales para trabajar con electricidad.",
        video_url: "https://www.youtube.com/embed/D-8NpVWZXhA",
        lectura: "La electricidad puede ser mortal. SIEMPRE respeta estas reglas de seguridad.\n\n**Reglas inquebrantables:**\n1. SIEMPRE desconecta la corriente antes de trabajar.\n2. NUNCA toques cables con las manos mojadas.\n3. NUNCA metas objetos metálicos en los tomacorrientes.\n4. Si no estás seguro, llama a un profesional.\n\n**Elementos de protección:**\n- Guantes aislantes\n- Herramientas con mango aislado\n- Multímetro para verificar si hay corriente\n- Calzado con suela de goma\n\n**En caso de electrocución:**\n1. NO toques a la persona directamente.\n2. Desconecta la fuente de electricidad.\n3. Si no puedes desconectar, usa algo de madera o plástico para separar a la persona.\n4. Llama a emergencias inmediatamente.\n\n**Recuerda**: La electricidad no avisa. La precaución es tu mejor herramienta.",
        quiz: [
          { pregunta: "¿Qué debes hacer SIEMPRE antes de trabajar con electricidad?", opciones: ["Ponerte guantes de tela", "Desconectar la corriente", "Mojarte las manos", "Nada especial"], correcta: 1 },
          { pregunta: "Si alguien se electrocuta, ¿qué NO debes hacer?", opciones: ["Llamar a emergencias", "Tocarlo directamente con tus manos", "Desconectar la corriente", "Usar algo de madera para separarlo"], correcta: 1 },
          { pregunta: "¿Qué herramienta verifica si hay corriente?", opciones: ["Martillo", "Destornillador", "Multímetro", "Pinzas"], correcta: 2 }
        ]
      },
      {
        titulo: "Reparaciones Comunes", orden: 3,
        descripcion: "Aprende a hacer reparaciones eléctricas sencillas en casa.",
        video_url: "https://www.youtube.com/embed/XqFR2lqBYPs",
        lectura: "Con conocimientos básicos puedes hacer reparaciones sencillas y ahorrar dinero.\n\n**Cambiar un enchufe/tomacorriente:**\n1. Desconecta el breaker de esa zona.\n2. Verifica con multímetro que no hay corriente.\n3. Retira la tapa y desconecta los cables.\n4. Conecta los cables al nuevo enchufe.\n5. Atornilla y pon la tapa.\n\n**Cambiar un interruptor de luz:**\nProceso similar. Los cables van en los tornillos del interruptor.\n\n**Cambiar un bombillo:**\nParece simple, pero hay reglas:\n- Apaga el interruptor primero.\n- Espera a que se enfríe.\n- Verifica el tipo de rosca y vatios máximos.\n\n**¿Cuándo llamar a un profesional?**\n- Si el problema involucra el panel de breakers.\n- Si huele a quemado.\n- Si hay chispas.\n- Si no estás 100% seguro de lo que haces.",
        quiz: [
          { pregunta: "¿Qué es lo primero al cambiar un tomacorriente?", opciones: ["Arrancar los cables", "Desconectar el breaker", "Tocar los cables", "Nada"], correcta: 1 },
          { pregunta: "¿Cuándo debes llamar a un profesional?", opciones: ["Nunca", "Si hay chispas o huele a quemado", "Solo si se va la luz", "Siempre"], correcta: 1 },
          { pregunta: "¿Qué verificas con un multímetro?", opciones: ["El color del cable", "Que no hay corriente", "La marca del enchufe", "El tamaño"], correcta: 1 }
        ]
      },
      {
        titulo: "Herramientas Básicas", orden: 4,
        descripcion: "Conoce las herramientas esenciales para el trabajo eléctrico y manual.",
        video_url: "https://www.youtube.com/embed/a_iQb1lnAEQ",
        lectura: "Un buen técnico conoce y cuida sus herramientas.\n\n**Herramientas esenciales:**\n- **Destornilladores** (plano y estrella): Para tornillos.\n- **Alicates**: Para sujetar y cortar cables.\n- **Pinzas pelacables**: Para quitar el aislante de los cables.\n- **Multímetro**: Para medir voltaje, corriente y resistencia.\n- **Cinta aislante**: Para proteger conexiones.\n- **Llave ajustable**: Para tuercas de diferentes tamaños.\n\n**Cuidado de herramientas:**\n1. Guárdalas en un lugar seco.\n2. Limpia después de usar.\n3. Verifica que los mangos aislantes no estén dañados.\n4. Nunca uses herramientas rotas.\n\n**Inversión inteligente**: Compra pocas herramientas pero de buena calidad. Una herramienta barata que se rompe puede causar un accidente.",
        quiz: [
          { pregunta: "¿Para qué sirven las pinzas pelacables?", opciones: ["Para cortar metal", "Para quitar el aislante de los cables", "Para pintar", "Para medir voltaje"], correcta: 1 },
          { pregunta: "¿Qué mide un multímetro?", opciones: ["Solo voltaje", "Voltaje, corriente y resistencia", "Solo temperatura", "El peso"], correcta: 1 },
          { pregunta: "¿Es mejor comprar muchas herramientas baratas?", opciones: ["Sí, así tienes más", "No, mejor pocas de buena calidad", "Da igual la calidad", "Solo las más caras"], correcta: 1 }
        ]
      }
    ]
  },
  {
    perfil: "practico", titulo: "Emprendimiento desde Cero",
    descripcion: "Aprende a convertir una idea en un negocio real, paso a paso.",
    icono: "□", orden: 2,
    modulos: [
      {
        titulo: "Encuentra tu Idea de Negocio", orden: 1,
        descripcion: "Descubre cómo encontrar oportunidades de negocio a tu alrededor.",
        video_url: "https://www.youtube.com/embed/pQN-pnXPaVg",
        lectura: "Las mejores ideas de negocio nacen de resolver problemas reales.\n\n**¿Cómo encontrar tu idea?**\n1. **Observa problemas**: ¿Qué molesta a la gente de tu barrio?\n2. **Piensa en habilidades**: ¿Qué sabes hacer bien?\n3. **Busca la intersección**: ¿Qué problema puedes resolver con tus habilidades?\n\n**Ejemplos reales de jóvenes emprendedores:**\n- Reparación de celulares en el barrio.\n- Venta de comida casera por WhatsApp.\n- Diseño de logos y flyers para negocios locales.\n- Clases particulares de lo que sabes.\n\n**Valida tu idea** antes de invertir:\n- Pregúntale a 10 personas si pagarían por tu producto/servicio.\n- Si 7+ dicen que sí, tienes algo.\n- Si dicen que no, ajusta o busca otra idea.\n\nNo necesitas una idea revolucionaria. Solo necesitas resolver un problema mejor que los demás.",
        quiz: [
          { pregunta: "¿De dónde nacen las mejores ideas de negocio?", opciones: ["De copiar a otros", "De resolver problemas reales", "De la suerte", "De tener mucho dinero"], correcta: 1 },
          { pregunta: "¿Cómo validas tu idea?", opciones: ["Inviertes todo tu dinero", "Preguntas a personas si pagarían por ello", "La guardas en secreto", "Esperas a que alguien la copie"], correcta: 1 },
          { pregunta: "¿Necesitas una idea revolucionaria para emprender?", opciones: ["Sí, siempre", "No, solo resolver un problema mejor que otros", "Solo con tecnología avanzada", "Sí, algo nunca antes visto"], correcta: 1 }
        ]
      },
      {
        titulo: "Plan de Negocio Básico", orden: 2,
        descripcion: "Organiza tu idea en un plan simple pero efectivo.",
        video_url: "https://www.youtube.com/embed/pQN-pnXPaVg",
        lectura: "Un plan de negocio es tu mapa. No necesita ser de 50 páginas. Con una sola puedes empezar.\n\n**Canvas simplificado (una página):**\n1. **Problema**: ¿Qué problema resuelves?\n2. **Solución**: ¿Cómo lo resuelves?\n3. **Clientes**: ¿Quién te va a comprar?\n4. **Propuesta de valor**: ¿Por qué te elegirían a ti?\n5. **Ingresos**: ¿Cómo ganas dinero?\n6. **Costos**: ¿Cuánto necesitas para empezar?\n7. **Canales**: ¿Cómo llegas a tus clientes?\n\n**Ejemplo:**\n- Problema: Los negocios del barrio no tienen presencia en redes sociales.\n- Solución: Manejo de redes sociales a bajo costo.\n- Clientes: Tiendas, restaurantes y peluquerías locales.\n- Precio: $100.000/mes por negocio.\n\n**Tip**: Tu primer plan SIEMPRE va a cambiar. Es normal. Lo importante es empezar con algo.",
        quiz: [
          { pregunta: "¿Qué es un plan de negocio?", opciones: ["Un documento de 100 páginas", "Un mapa que organiza tu idea", "Un contrato legal", "Un préstamo bancario"], correcta: 1 },
          { pregunta: "¿Qué es la propuesta de valor?", opciones: ["El precio", "Por qué te elegirían a ti sobre otros", "Tu nombre comercial", "Tu logo"], correcta: 1 },
          { pregunta: "¿El primer plan de negocio cambiará?", opciones: ["No, debe ser perfecto", "Sí, siempre se ajusta con el tiempo", "Solo si fallas", "Nunca debe cambiar"], correcta: 1 }
        ]
      },
      {
        titulo: "Marketing Digital Básico", orden: 3,
        descripcion: "Aprende a promocionar tu negocio en redes sociales sin gastar dinero.",
        video_url: "https://www.youtube.com/embed/pQN-pnXPaVg",
        lectura: "No necesitas un presupuesto millonario para hacer marketing. Las redes sociales son gratuitas y poderosas.\n\n**Redes clave según tu negocio:**\n- **Instagram**: Visual. Ideal para comida, moda, diseño.\n- **WhatsApp Business**: Comunicación directa. Catálogo de productos.\n- **TikTok**: Contenido viral. Ideal para llegar a jóvenes.\n- **Facebook**: Comunidad local. Marketplace para vender.\n\n**Contenido que funciona:**\n1. **Detrás de cámaras**: Muestra cómo haces tu producto.\n2. **Testimonios**: Clientes satisfechos.\n3. **Educativo**: Enseña algo relacionado con tu negocio.\n4. **Ofertas**: Promociones especiales.\n\n**La regla 80/20**: 80% contenido de valor, 20% ventas directas. Nadie quiere seguir una cuenta que solo vende.\n\n**Empieza con UN canal** y hazlo bien. Después crece a otros.",
        quiz: [
          { pregunta: "¿Qué red es mejor para comunicación directa con clientes?", opciones: ["TikTok", "WhatsApp Business", "YouTube", "Twitter"], correcta: 1 },
          { pregunta: "¿Qué dice la regla 80/20?", opciones: ["80% ventas, 20% contenido", "80% contenido de valor, 20% ventas", "80% fotos, 20% videos", "80% texto, 20% imágenes"], correcta: 1 },
          { pregunta: "¿Con cuántas redes sociales debes empezar?", opciones: ["Todas las posibles", "Una, y hacerla bien", "Mínimo 5", "Ninguna"], correcta: 1 }
        ]
      },
      {
        titulo: "Finanzas Personales y del Negocio", orden: 4,
        descripcion: "Aprende a manejar el dinero de tu negocio de forma inteligente.",
        video_url: "https://www.youtube.com/embed/pQN-pnXPaVg",
        lectura: "Muchos negocios fracasan no porque no vendan, sino porque no saben manejar el dinero.\n\n**Regla de oro: Separa tu dinero personal del negocio.**\n\n**Conceptos clave:**\n- **Ingreso**: Lo que entra (ventas).\n- **Gasto fijo**: Lo que pagas siempre (arriendo, internet).\n- **Gasto variable**: Cambia según vendas (materiales).\n- **Ganancia**: Ingresos - Gastos = Lo que realmente ganas.\n\n**Registro básico:**\nLleva un cuaderno o Excel simple con:\n| Fecha | Concepto | Ingreso | Gasto |\n\n**Tips financieros:**\n1. Ahorra mínimo el 20% de tus ganancias.\n2. Reinvierte en el negocio.\n3. Ten un fondo de emergencia (3 meses de gastos).\n4. No gastes dinero que aún no has ganado.\n\nEl dinero no es el fin, es la herramienta para que tu negocio crezca.",
        quiz: [
          { pregunta: "¿Qué debes separar siempre?", opciones: ["Los productos", "El dinero personal del dinero del negocio", "Los clientes", "Las redes sociales"], correcta: 1 },
          { pregunta: "¿Qué es la ganancia?", opciones: ["Todo lo que vendes", "Ingresos menos gastos", "Solo los ingresos", "Los gastos fijos"], correcta: 1 },
          { pregunta: "¿Cuánto mínimo debes ahorrar de tus ganancias?", opciones: ["5%", "20%", "50%", "Nada"], correcta: 1 }
        ]
      }
    ]
  },
  {
    perfil: "practico", titulo: "Introducción a la Tecnología",
    descripcion: "Entiende cómo funciona la tecnología que usas todos los días.",
    icono: "□", orden: 3,
    modulos: [
      {
        titulo: "Hardware Básico", orden: 1,
        descripcion: "Conoce las partes físicas de una computadora.",
        video_url: "https://www.youtube.com/embed/gVaE2F0jOJs",
        lectura: "El hardware es todo lo que puedes tocar de una computadora.\n\n**Componentes principales:**\n- **CPU (Procesador)**: El 'cerebro'. Ejecuta las instrucciones.\n- **RAM (Memoria)**: Memoria temporal. Más RAM = más cosas a la vez.\n- **Disco duro/SSD**: Almacena todo permanentemente (fotos, apps, sistema).\n- **Pantalla**: Muestra la información visualmente.\n- **Teclado y mouse**: Dispositivos de entrada.\n\n**Analogía con una cocina:**\n- CPU = El chef (procesa todo).\n- RAM = La mesa de trabajo (espacio temporal).\n- Disco duro = La despensa (almacén permanente).\n- Pantalla = La ventana del restaurante (muestra el resultado).\n\n**Tip**: Cuando tu computadora va lenta, generalmente es por poca RAM o disco duro lleno, no por el procesador.",
        quiz: [
          { pregunta: "¿Qué es el CPU?", opciones: ["La pantalla", "El procesador, cerebro de la computadora", "Un cable", "La memoria"], correcta: 1 },
          { pregunta: "¿Para qué sirve la RAM?", opciones: ["Almacenar fotos", "Memoria temporal para tareas activas", "Conectar a internet", "Mostrar imágenes"], correcta: 1 },
          { pregunta: "¿Qué causa generalmente que una PC vaya lenta?", opciones: ["Pantalla pequeña", "Poca RAM o disco lleno", "Teclado viejo", "Mouse lento"], correcta: 1 }
        ]
      },
      {
        titulo: "Software Esencial", orden: 2,
        descripcion: "Entiende qué es el software y los programas esenciales.",
        video_url: "https://www.youtube.com/embed/gVaE2F0jOJs",
        lectura: "El software es todo lo que NO puedes tocar: programas, apps, el sistema operativo.\n\n**Tipos de software:**\n- **Sistema operativo**: Windows, macOS, Linux, Android. Es el software base.\n- **Aplicaciones**: Chrome, Word, WhatsApp. Programas que tú usas.\n- **Drivers**: Traducen entre el hardware y el sistema operativo.\n\n**Software esencial gratuito:**\n- **Navegador**: Chrome o Firefox.\n- **Ofimática**: Google Docs, Sheets, Slides (gratis en la nube).\n- **Antivirus**: Windows Defender (viene con Windows).\n- **Almacenamiento**: Google Drive (15GB gratis).\n\n**Software libre vs privativo:**\n- **Libre**: Gratuito y abierto (Linux, LibreOffice).\n- **Privativo**: De pago y cerrado (Windows, Adobe).\n\n**Tip**: Nunca descargues software pirata. Además de ser ilegal, suele venir con virus.",
        quiz: [
          { pregunta: "¿Qué es el sistema operativo?", opciones: ["Una app cualquiera", "El software base que controla la computadora", "Un tipo de hardware", "Un antivirus"], correcta: 1 },
          { pregunta: "¿Qué suite ofimática es gratuita?", opciones: ["Microsoft Office", "Google Docs/Sheets/Slides", "Adobe Creative Suite", "AutoCAD"], correcta: 1 },
          { pregunta: "¿Por qué no debes descargar software pirata?", opciones: ["Es más lento", "Es ilegal y puede traer virus", "No funciona bien", "Es más caro"], correcta: 1 }
        ]
      },
      {
        titulo: "Redes e Internet", orden: 3,
        descripcion: "Entiende cómo funciona internet y las redes.",
        video_url: "https://www.youtube.com/embed/D-8NpVWZXhA",
        lectura: "Internet es una red global de computadoras conectadas entre sí.\n\n**¿Cómo funciona?**\n1. Tu dispositivo se conecta al router (WiFi o cable).\n2. El router se conecta a tu proveedor de internet.\n3. Tu proveedor se conecta a la red global.\n4. Cuando visitas una página, pides datos a un servidor lejano y te los envía.\n\n**Conceptos clave:**\n- **IP**: La 'dirección' de tu dispositivo en la red.\n- **WiFi**: Conexión inalámbrica local.\n- **Ancho de banda**: Velocidad de tu conexión (Mbps).\n- **Servidor**: Computadora que almacena páginas web y servicios.\n\n**¿Por qué va lento el internet?**\n- Muchos dispositivos en la misma red.\n- Lejanía del router.\n- Hora punta (todos conectados).\n- Plan de internet limitado.\n\n**Tip**: Reiniciar el router resuelve el 80% de los problemas de conexión.",
        quiz: [
          { pregunta: "¿Qué es una dirección IP?", opciones: ["Una contraseña", "La dirección de tu dispositivo en la red", "Un virus", "Un tipo de cable"], correcta: 1 },
          { pregunta: "¿Qué es un servidor?", opciones: ["Tu celular", "Computadora que almacena páginas web", "Un cable de red", "Un tipo de WiFi"], correcta: 1 },
          { pregunta: "¿Qué resuelve el 80% de problemas de internet?", opciones: ["Comprar un plan nuevo", "Reiniciar el router", "Cambiar de celular", "Llamar a soporte"], correcta: 1 }
        ]
      },
      {
        titulo: "Seguridad Digital", orden: 4,
        descripcion: "Protege tus datos y tu identidad en internet.",
        video_url: "https://www.youtube.com/embed/D-8NpVWZXhA",
        lectura: "En internet, tu información es tu bien más valioso. Protégela.\n\n**Contraseñas seguras:**\n- Mínimo 12 caracteres.\n- Mezcla mayúsculas, minúsculas, números y símbolos.\n- NO uses: tu nombre, fecha de nacimiento, '123456'.\n- Usa una diferente para cada cuenta importante.\n\n**Amenazas comunes:**\n- **Phishing**: Correos o mensajes falsos que piden tus datos.\n- **Malware**: Programas maliciosos que dañan tu equipo.\n- **Ingeniería social**: Alguien se hace pasar por otra persona.\n\n**Cómo protegerte:**\n1. No hagas clic en enlaces sospechosos.\n2. Verifica el remitente de los correos.\n3. Activa la verificación en dos pasos.\n4. No compartas contraseñas con nadie.\n5. Actualiza tu sistema operativo y apps.\n\n**Regla de oro**: Si algo parece demasiado bueno para ser verdad en internet, probablemente es una estafa.",
        quiz: [
          { pregunta: "¿Cuántos caracteres mínimo debe tener una buena contraseña?", opciones: ["4", "8", "12", "6"], correcta: 2 },
          { pregunta: "¿Qué es phishing?", opciones: ["Un juego", "Correos falsos que piden tus datos", "Un tipo de red social", "Un antivirus"], correcta: 1 },
          { pregunta: "¿Qué debes activar para proteger tus cuentas?", opciones: ["Modo avión", "Verificación en dos pasos", "Bluetooth", "GPS"], correcta: 1 }
        ]
      }
    ]
  }
];

module.exports = CURSOS_PRACTICO;
