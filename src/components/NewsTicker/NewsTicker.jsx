import { useState, useEffect } from "react";
import "./NewsTicker.css";

function NewsTicker() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Noticias de respaldo/demo (actualizadas para parecer más reales)
  const demoNews = [
    {
      title: "Sheinbaum anuncia nuevos proyectos de infraestructura para 2025",
      link: "https://www.milenio.com",
    },
    {
      title: "Dólar cierra con ligera baja frente al peso mexicano",
      link: "https://www.milenio.com",
    },
    {
      title: "CDMX registra descenso en temperatura por frente frío",
      link: "https://www.milenio.com",
    },
    {
      title: "Selección Mexicana se prepara para eliminatorias mundialistas",
      link: "https://www.milenio.com",
    },
    {
      title: "Inflación se mantiene estable en diciembre según Banxico",
      link: "https://www.milenio.com",
    },
    {
      title: "Sector turístico reporta incremento en vacaciones de invierno",
      link: "https://www.milenio.com",
    },
    {
      title: "Detectan nueva modalidad de fraude cibernético en México",
      link: "https://www.milenio.com",
    },
    {
      title: "UNAM y IPN anuncian fechas para proceso de admisión 2025",
      link: "https://www.milenio.com",
    },
    {
      title:
        "Inversión extranjera directa muestra crecimiento en último trimestre",
      link: "https://www.milenio.com",
    },
    {
      title: "Autoridades refuerzan seguridad en principales ciudades del país",
      link: "https://www.milenio.com",
    },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Usar RSS2JSON con el feed de Milenio
        const RSS_URL = "https://www.milenio.com/rss/ultimo";
        const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          RSS_URL
        )}&api_key=yzh8fhw7qxmq6bgp1tzdxbdxz8ozmfxbqh7zlcxg`;

        const response = await fetch(API_URL);

        if (!response.ok) {
          console.log("Respuesta no OK de la API, usando noticias demo");
          setNews(demoNews);
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (data.status === "ok" && data.items && data.items.length > 0) {
          const newsItems = data.items
            .slice(0, 10)
            .filter((item) => item.title && item.title.trim() !== "")
            .map((item) => ({
              title: item.title || "",
              link: item.link || "https://www.milenio.com",
            }));

          if (newsItems.length > 0) {
            setNews(newsItems);
            console.log(`Carga exitosa: ${newsItems.length} noticias reales`);
          } else {
            console.log("Sin noticias válidas, usando demo");
            setNews(demoNews);
          }
        } else {
          console.log("Respuesta sin resultados válidos, usando noticias demo");
          setNews(demoNews);
        }

        setLoading(false);
      } catch (error) {
        console.log("Usando noticias demo debido a:", error.message);
        setNews(demoNews);
        setLoading(false);
      }
    };

    fetchNews();
    // Actualizar noticias cada 10 minutos
    const interval = setInterval(fetchNews, 600000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="news-ticker">
        <div className="news-ticker__label">NOTICIAS</div>
        <div className="news-ticker__content">
          <span>Cargando noticias...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="news-ticker">
      <div className="news-ticker__label">NOTICIAS:</div>
      <div className="news-ticker__wrapper">
        <div className="news-ticker__content">
          {news.concat(news).map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="news-ticker__item"
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsTicker;
