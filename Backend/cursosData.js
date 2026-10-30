const CURSOS_DATA = [
  {
    perfil: "cientifico", titulo: "Intro a la Lógica y Pensamiento Científico",
    descripcion: "Aprende a pensar de forma lógica y a aplicar el método científico para resolver problemas.",
    icono: "◎", orden: 1,
    modulos: [
      {
        titulo: "¿Qué es el Método Científico?", orden: 1,
        descripcion: "Descubre los pasos del método científico y cómo aplicarlo.",
        video_url: "https://www.youtube.com/embed/IbGtpup-1rE",
        lectura: "El método científico es un proceso ordenado para investigar y entender el mundo. Sus pasos son:\n\n1. **Observación**: Mirar algo con atención y hacerte preguntas.\n2. **Hipótesis**: Proponer una posible respuesta o explicación.\n3. **Experimentación**: Hacer pruebas para comprobar tu hipótesis.\n4. **Análisis**: Revisar los resultados obtenidos.\n5. **Conclusión**: Determinar si tu hipótesis era correcta o no.\n\nEste método no es solo para científicos en laboratorios. Tú lo usas a diario cuando, por ejemplo, intentas descubrir por qué tu celular no carga bien: observas el problema, piensas en posibles causas, pruebas soluciones y llegas a una conclusión.",
        quiz: [
          { pregunta: "¿Cuál es el primer paso del método científico?", opciones: ["Experimentación", "Observación", "Conclusión", "Hipótesis"], correcta: 1 },
          { pregunta: "¿Qué es una hipótesis?", opciones: ["Un resultado final", "Una posible respuesta o explicación", "Un experimento", "Una observación"], correcta: 1 },
          { pregunta: "¿El método científico solo se usa en laboratorios?", opciones: ["Sí, solo para científicos", "No, se aplica en la vida diaria", "Solo en universidades", "Solo en matemáticas"], correcta: 1 }
        ]
      },
      {
        titulo: "Pensamiento Lógico", orden: 2,
        descripcion: "Desarrolla tu capacidad de razonar paso a paso.",
        video_url: "https://www.youtube.com/embed/TdITcVD64zI",
        lectura: "El pensamiento lógico es la capacidad de razonar de forma ordenada para llegar a conclusiones válidas. Es como armar un rompecabezas: cada pieza tiene un lugar correcto.\n\n**Tipos de razonamiento:**\n- **Deductivo**: De lo general a lo particular. Ejemplo: 'Todos los mamíferos respiran → Los perros son mamíferos → Los perros respiran.'\n- **Inductivo**: De lo particular a lo general. Ejemplo: 'Este gato tiene pelo, ese gato tiene pelo → Todos los gatos tienen pelo.'\n\n**¿Por qué es importante?** El pensamiento lógico te ayuda a tomar mejores decisiones, resolver problemas complejos y no dejarte engañar por información falsa. Es fundamental en programación, ciencias, matemáticas y en la vida diaria.",
        quiz: [
          { pregunta: "¿Qué es el razonamiento deductivo?", opciones: ["De lo particular a lo general", "De lo general a lo particular", "Basado en emociones", "Aleatorio"], correcta: 1 },
          { pregunta: "¿Para qué sirve el pensamiento lógico?", opciones: ["Solo para matemáticas", "Para tomar mejores decisiones y resolver problemas", "Solo para programar", "No tiene uso práctico"], correcta: 1 },
          { pregunta: "¿Cuál es un ejemplo de razonamiento inductivo?", opciones: ["Todos los mamíferos respiran, los perros son mamíferos", "Observo varios gatos con pelo y concluyo que todos los gatos tienen pelo", "Si llueve me mojo", "2+2=4"], correcta: 1 }
        ]
      },
      {
        titulo: "Resolución de Problemas", orden: 3,
        descripcion: "Aprende técnicas para enfrentar y resolver problemas de forma efectiva.",
        video_url: "https://www.youtube.com/embed/qSup_483xO8",
        lectura: "Resolver problemas es una habilidad que se puede entrenar. Aquí tienes un método efectivo:\n\n1. **Entiende el problema**: ¿Qué te piden? ¿Qué datos tienes?\n2. **Divide el problema**: Separa un problema grande en partes pequeñas.\n3. **Busca patrones**: ¿Se parece a algo que ya resolviste?\n4. **Prueba una solución**: Intenta resolverlo con lo que sabes.\n5. **Evalúa**: ¿Funcionó? Si no, prueba otro camino.\n\n**Ejemplo práctico**: Si necesitas organizar un evento para 50 personas con presupuesto limitado, no intentes resolverlo todo de golpe. Divide: primero el lugar, luego la comida, después la decoración. Cada parte es más fácil de resolver por separado.\n\nEsta técnica se llama 'Divide y Vencerás' y es usada por ingenieros, programadores y científicos todos los días.",
        quiz: [
          { pregunta: "¿Cuál es el primer paso para resolver un problema?", opciones: ["Probar soluciones al azar", "Entender qué te piden y qué datos tienes", "Pedir ayuda inmediatamente", "Ignorarlo"], correcta: 1 },
          { pregunta: "¿Qué significa 'Divide y Vencerás'?", opciones: ["Trabajar en equipo", "Separar un problema grande en partes pequeñas", "Hacer todo rápido", "Usar una calculadora"], correcta: 1 },
          { pregunta: "¿Buscar patrones significa...?", opciones: ["Copiar respuestas", "Ver si el problema se parece a algo que ya resolviste", "Buscar en Google", "Dibujar figuras"], correcta: 1 }
        ]
      },
      {
        titulo: "Experimentación y Comprobación", orden: 4,
        descripcion: "Aprende a diseñar experimentos y verificar tus ideas.",
        video_url: "https://www.youtube.com/embed/MN10KQyvUz0",
        lectura: "La experimentación es la herramienta que convierte una idea en conocimiento comprobado.\n\n**¿Cómo diseñar un buen experimento?**\n1. **Define tu pregunta**: ¿Qué quieres averiguar?\n2. **Controla las variables**: Cambia solo UNA cosa a la vez para saber qué causa el efecto.\n3. **Registra todo**: Anota cada paso y resultado.\n4. **Repite**: Un resultado solo es confiable si se puede repetir.\n\n**Variables:**\n- **Independiente**: Lo que TÚ cambias.\n- **Dependiente**: Lo que MIDES como resultado.\n- **Controlada**: Lo que mantienes IGUAL.\n\n**Ejemplo**: Si quieres saber qué tipo de suelo hace crecer mejor una planta, la variable independiente es el tipo de suelo, la dependiente es el crecimiento de la planta, y las controladas son la cantidad de agua y luz (iguales para todas).",
        quiz: [
          { pregunta: "¿Qué es una variable independiente?", opciones: ["Lo que mides", "Lo que tú cambias en el experimento", "Lo que mantienes igual", "El resultado final"], correcta: 1 },
          { pregunta: "¿Por qué se debe repetir un experimento?", opciones: ["Para perder tiempo", "Para verificar que el resultado es confiable", "Porque sí", "Solo en laboratorios"], correcta: 1 },
          { pregunta: "¿Cuántas cosas debes cambiar a la vez en un experimento?", opciones: ["Todas las que puedas", "Solo una", "Ninguna", "Dos o tres"], correcta: 1 }
        ]
      }
    ]
  },
  {
    perfil: "cientifico", titulo: "Descubre la Programación",
    descripcion: "Da tus primeros pasos en el mundo de la programación y el pensamiento computacional.",
    icono: "◎", orden: 2,
    modulos: [
      {
        titulo: "¿Qué es Programar?", orden: 1,
        descripcion: "Entiende qué significa programar y por qué es importante.",
        video_url: "https://www.youtube.com/embed/JOAqpdM36wI",
        lectura: "Programar es darle instrucciones a una computadora para que haga lo que tú quieras. Es como escribir una receta de cocina: le dices paso a paso qué hacer.\n\n**¿Por qué aprender a programar?**\n- Las apps, videojuegos, sitios web y redes sociales existen gracias a la programación.\n- Es una de las habilidades más demandadas del mundo laboral.\n- Te enseña a pensar de forma estructurada.\n\n**Lenguajes populares:**\n- **Python**: Fácil de aprender, usado en inteligencia artificial.\n- **JavaScript**: Para páginas web interactivas.\n- **Scratch**: Visual y perfecto para principiantes.\n\nNo necesitas ser un genio matemático para programar. Solo necesitas curiosidad, paciencia y ganas de resolver problemas.",
        quiz: [
          { pregunta: "¿Qué es programar?", opciones: ["Usar redes sociales", "Dar instrucciones a una computadora", "Reparar computadoras", "Diseñar logos"], correcta: 1 },
          { pregunta: "¿Qué lenguaje es visual y bueno para principiantes?", opciones: ["Java", "C++", "Scratch", "Assembly"], correcta: 2 },
          { pregunta: "¿Se necesita ser genio matemático para programar?", opciones: ["Sí, es obligatorio", "No, solo curiosidad y ganas", "Sí, mínimo cálculo avanzado", "Solo para algunos lenguajes"], correcta: 1 }
        ]
      },
      {
        titulo: "Variables y Tipos de Datos", orden: 2,
        descripcion: "Aprende sobre variables, el concepto fundamental de la programación.",
        video_url: "https://www.youtube.com/embed/XqFR2lqBYPs",
        lectura: "Una variable es como una caja con etiqueta donde guardas información.\n\n**Ejemplo cotidiano:**\n- Caja 'nombre' → contiene 'Carlos'\n- Caja 'edad' → contiene 16\n- Caja 'le_gusta_música' → contiene verdadero\n\n**Tipos de datos básicos:**\n- **Texto (String)**: Palabras entre comillas → 'Hola mundo'\n- **Número (Integer/Float)**: Valores numéricos → 42, 3.14\n- **Booleano**: Verdadero o falso → true, false\n\n**¿Por qué importa?** Sin variables no podrías guardar datos. Imagina un juego que no recuerda tu puntaje, o una red social que olvida tu nombre. Las variables son la memoria del programa.",
        quiz: [
          { pregunta: "¿Qué es una variable?", opciones: ["Un tipo de computadora", "Un espacio para guardar información", "Un lenguaje de programación", "Un tipo de error"], correcta: 1 },
          { pregunta: "¿Qué tipo de dato es 'Hola mundo'?", opciones: ["Número", "Booleano", "Texto (String)", "Variable"], correcta: 2 },
          { pregunta: "¿Qué valores puede tener un booleano?", opciones: ["Números del 1 al 10", "Verdadero o falso", "Solo letras", "Cualquier cosa"], correcta: 1 }
        ]
      },
      {
        titulo: "Estructuras de Control", orden: 3,
        descripcion: "Aprende sobre condicionales y bucles.",
        video_url: "https://www.youtube.com/embed/iwFEc6I8wSA",
        lectura: "Las estructuras de control le dicen al programa QUÉ CAMINO tomar y CUÁNTAS VECES repetir algo.\n\n**Condicionales (SI/ENTONCES):**\nFuncionan como decisiones:\n- SI hace frío → ENTONCES ponte chaqueta\n- SI tienes hambre → ENTONCES come\n- SI NO → sigue caminando\n\n**Bucles (REPETIR):**\nSirven para repetir acciones:\n- MIENTRAS tengas tarea → haz un ejercicio\n- PARA cada canción en la playlist → reprodúcela\n\n**Ejemplo de la vida real:**\nCuando te lavas los dientes:\n1. SI el cepillo no tiene pasta → ponle pasta\n2. MIENTRAS no pasen 2 minutos → sigue cepillando\n3. CUANDO termines → enjuágate\n\nAsí piensa un programa: decisiones + repeticiones.",
        quiz: [
          { pregunta: "¿Para qué sirve un condicional?", opciones: ["Para repetir acciones", "Para tomar decisiones en el código", "Para guardar datos", "Para imprimir texto"], correcta: 1 },
          { pregunta: "¿Qué hace un bucle?", opciones: ["Borra información", "Repite acciones varias veces", "Apaga el programa", "Crea variables"], correcta: 1 },
          { pregunta: "¿Cuál es un ejemplo de condicional?", opciones: ["Repetir 10 veces", "SI hace frío ENTONCES ponte chaqueta", "Guardar un número", "Imprimir hola"], correcta: 1 }
        ]
      },
      {
        titulo: "Tu Primer Algoritmo", orden: 4,
        descripcion: "Crea tu primer algoritmo paso a paso.",
        video_url: "https://www.youtube.com/embed/ASBC5drF-QU",
        lectura: "Un algoritmo es una serie de pasos ordenados para resolver un problema. ¡Tú ya usas algoritmos todos los días!\n\n**Algoritmo para hacer un sándwich:**\n1. Tomar dos rebanadas de pan\n2. Poner mayonesa en una rebanada\n3. Agregar jamón y queso\n4. Poner la otra rebanada encima\n5. ¡Listo para comer!\n\n**Características de un buen algoritmo:**\n- **Preciso**: Cada paso debe ser claro.\n- **Finito**: Debe terminar en algún momento.\n- **Ordenado**: El orden de los pasos importa.\n\n**Ejercicio mental:**\nIntenta escribir un algoritmo para: 'Buscar una palabra en el diccionario'. Piensa en los pasos exactos que seguirías. ¿Abrirías en la mitad? ¿Irías página por página? La forma en que resuelves esto dice mucho sobre cómo piensas como programador.",
        quiz: [
          { pregunta: "¿Qué es un algoritmo?", opciones: ["Un lenguaje de programación", "Pasos ordenados para resolver un problema", "Un tipo de computadora", "Una página web"], correcta: 1 },
          { pregunta: "¿Qué característica NO es de un buen algoritmo?", opciones: ["Preciso", "Finito", "Infinito", "Ordenado"], correcta: 2 },
          { pregunta: "¿Cuál es un ejemplo de algoritmo en la vida diaria?", opciones: ["Dormir", "Una receta de cocina paso a paso", "Ver televisión", "Escuchar música"], correcta: 1 }
        ]
      }
    ]
  },
  {
    perfil: "cientifico", titulo: "Matemáticas en la Vida Real",
    descripcion: "Descubre cómo las matemáticas están presentes en todo lo que te rodea.",
    icono: "◎", orden: 3,
    modulos: [
      {
        titulo: "Matemáticas en la Naturaleza", orden: 1,
        descripcion: "Descubre patrones matemáticos escondidos en la naturaleza.",
        video_url: "https://www.youtube.com/embed/gecf6Api3tI",
        lectura: "Las matemáticas no son solo números en un cuaderno. La naturaleza está llena de patrones matemáticos increíbles.\n\n**La Secuencia de Fibonacci:**\n1, 1, 2, 3, 5, 8, 13, 21... Cada número es la suma de los dos anteriores. Esta secuencia aparece en los pétalos de las flores, las piñas de los pinos y las conchas de los caracoles.\n\n**La Proporción Áurea (1.618...):**\nEs una proporción que nuestro cerebro percibe como 'bella'. Aparece en la espiral de los girasoles, las galaxias y hasta en el diseño de logos famosos.\n\n**Fractales:**\nFormas que se repiten a diferentes escalas. El brócoli romanesco, los copos de nieve y las costas marinas son fractales naturales.\n\nLas matemáticas son el lenguaje con el que está escrita la naturaleza.",
        quiz: [
          { pregunta: "¿Qué es la secuencia de Fibonacci?", opciones: ["Números aleatorios", "Cada número es la suma de los dos anteriores", "Números pares", "Números primos"], correcta: 1 },
          { pregunta: "¿Dónde aparece la proporción áurea?", opciones: ["Solo en libros", "En girasoles, galaxias y diseño", "Solo en calculadoras", "En ningún lugar natural"], correcta: 1 },
          { pregunta: "¿Qué es un fractal?", opciones: ["Un número muy grande", "Una forma que se repite a diferentes escalas", "Un tipo de ecuación", "Una calculadora especial"], correcta: 1 }
        ]
      },
      {
        titulo: "Estadística Básica", orden: 2,
        descripcion: "Aprende a interpretar datos y no dejarte engañar por números.",
        video_url: "https://www.youtube.com/embed/gecf6Api3tI",
        lectura: "La estadística te ayuda a entender la información del mundo real.\n\n**Conceptos clave:**\n- **Promedio (Media)**: Suma todos los valores y divide entre cuántos son. Ej: Notas 7, 8, 9 → Promedio = 8.\n- **Mediana**: El valor del medio cuando ordenas los datos.\n- **Moda**: El valor que más se repite.\n\n**¿Por qué importa?** Cada día ves estadísticas en noticias, redes sociales y publicidad. Saber interpretarlas te protege de la desinformación.\n\n**Ejemplo**: Si te dicen 'el salario promedio es $5,000', puede ser engañoso si pocas personas ganan muchísimo y elevan el promedio. La mediana te daría una imagen más real.",
        quiz: [
          { pregunta: "¿Qué es el promedio?", opciones: ["El número más grande", "La suma de valores dividida entre cuántos son", "El número del medio", "El más repetido"], correcta: 1 },
          { pregunta: "¿Qué es la moda?", opciones: ["El valor más alto", "Ropa de tendencia", "El valor que más se repite", "El promedio"], correcta: 2 },
          { pregunta: "¿Por qué es importante la estadística?", opciones: ["Solo para matemáticos", "Para interpretar datos y no dejarte engañar", "No tiene importancia", "Solo para científicos"], correcta: 1 }
        ]
      },
      {
        titulo: "Datos y Gráficos", orden: 3,
        descripcion: "Aprende a representar información visualmente.",
        video_url: "https://www.youtube.com/embed/XqFR2lqBYPs",
        lectura: "Los gráficos convierten números aburridos en historias visuales.\n\n**Tipos principales:**\n- **Barras**: Comparan cantidades. Ej: Ventas por mes.\n- **Circular (Torta)**: Muestran proporciones del total. Ej: Distribución de gastos.\n- **Líneas**: Muestran cambios en el tiempo. Ej: Temperatura durante la semana.\n- **Dispersión**: Muestran relaciones entre dos variables.\n\n**Cómo leer un gráfico:**\n1. Lee el título (¿de qué trata?).\n2. Revisa los ejes (¿qué mide cada uno?).\n3. Observa las tendencias (¿sube, baja, se mantiene?).\n4. Busca valores destacados.\n\nSaber crear y leer gráficos es una habilidad valiosa en cualquier carrera.",
        quiz: [
          { pregunta: "¿Para qué sirve un gráfico de barras?", opciones: ["Mostrar proporciones", "Comparar cantidades", "Mostrar cambios en el tiempo", "Decorar informes"], correcta: 1 },
          { pregunta: "¿Qué tipo de gráfico muestra cambios en el tiempo?", opciones: ["Circular", "Barras", "Líneas", "Dispersión"], correcta: 2 },
          { pregunta: "¿Qué es lo primero que debes leer en un gráfico?", opciones: ["Los colores", "El título", "Los números", "La leyenda"], correcta: 1 }
        ]
      },
      {
        titulo: "Geometría Práctica", orden: 4,
        descripcion: "Aplica la geometría a problemas del mundo real.",
        video_url: "https://www.youtube.com/embed/gecf6Api3tI",
        lectura: "La geometría está en todo lo construido por el ser humano: casas, puentes, celulares y hasta videojuegos.\n\n**Formas básicas y sus usos:**\n- **Triángulo**: La forma más fuerte. Usada en puentes y techos.\n- **Círculo**: Ruedas, engranajes, relojes.\n- **Rectángulo**: Pantallas, puertas, libros.\n\n**Conceptos útiles:**\n- **Perímetro**: La distancia alrededor de una figura. Útil para saber cuánta cerca necesitas para un terreno.\n- **Área**: El espacio que ocupa una figura. Útil para saber cuánta pintura necesitas para una pared.\n\n**Dato curioso**: Los videojuegos 3D funcionan con millones de triángulos. Cada personaje, cada edificio, está hecho de triángulos diminutos que forman figuras complejas.",
        quiz: [
          { pregunta: "¿Cuál es la forma geométrica más fuerte para construcciones?", opciones: ["Círculo", "Cuadrado", "Triángulo", "Hexágono"], correcta: 2 },
          { pregunta: "¿Para qué sirve calcular el área?", opciones: ["Saber el peso", "Saber el espacio que ocupa una superficie", "Medir la temperatura", "Contar objetos"], correcta: 1 },
          { pregunta: "¿De qué están hechos los personajes de videojuegos 3D?", opciones: ["Cuadrados", "Círculos", "Millones de triángulos", "Líneas rectas"], correcta: 2 }
        ]
      }
    ]
  }
];

module.exports = CURSOS_DATA;
