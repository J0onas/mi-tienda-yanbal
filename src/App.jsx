import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, X, Menu, Phone, Instagram, Facebook, Star, Trash2, Send, ChevronRight, User, MapPin, Mail, CheckCircle, Gift, Sparkles, Tag, Zap } from 'lucide-react';

// --- DATOS DEL VENDEDOR ---
const SELLER = {
  name: "Zoila Isabel Luca Jurupe",
  role: "Director Independiente Yanbal",
  phone: "34674142327",
  displayPhone: "+34 674 14 23 27",
  location: "San Lorenzo de la Parrilla, Cuenca, España",
  email: "contacto@zoilayanbal.es"
};

// --- CATÁLOGO CAMPAÑA 12 (Extraído del PDF) ---
const PRODUCTS = [
  // --- PERFUMES ---
  {
    id: 2225,
    name: "Osadía Mujer Ed. Limitada",
    price: 29.00,
    originalPrice: 45.00,
    category: "Perfumes",
    image: "https://www.yanbal.com/medias/20014190-01.jpg?context=bWFzdGVyfGltYWdlc3wyMzIxMDR8aW1hZ2UvanBlZ3xhR1ZqTDJnek1pOHhNVFkyTkRRM016azBPREU1TUM4eU1EQXhOREU1TUY4d01TNXFjR2N8NTgxY2Y2YzU0NDMyNTY2MmNiNWE2MjA2ZDIyZDUyN2JmZDhhZWVjY2MwZDAwNDVlZTQyZjQzNTJjM2Y1ZWU3Mg", 
    description: "Dos aromas encantadores. Destellos frutales de granada, flor de maracuyá y jengibre. Edición especial.",
    badge: "OFERTA TOP"
  },
  {
    id: 76009,
    name: "Set Ccori Rosé Parfum",
    price: 39.00,
    originalPrice: 61.00,
    category: "Perfumes",
    image: "https://placehold.co/400x400/FF6B35/ffffff?text=Set+Ccori+Rose", // CAMBIAR IMAGEN
    description: "El poder del oro rosa. Floral ambarado con ciruela y vainilla. Incluye: Parfum 50ml + Desodorante.",
    badge: "SET REGALO"
  },
  {
    id: 2222,
    name: "Colonia de Seda Gold",
    price: 15.00,
    originalPrice: 22.00,
    category: "Perfumes",
    image: "https://www.yanbal.com/medias/20014188-01.jpg?context=bWFzdGVyfGltYWdlc3wyOTA3MzB8aW1hZ2UvanBlZ3xhR0U1TDJnNU1pOHhNVFkyTkRRNE5UZzNOVGMwTWk4eU1EQXhOREU0T0Y4d01TNXFjR2N8MmEzMTUyZTM1ZjI2MTFjNTc4MWNkNmQ2NDI0YTliZjRhZDFiMGVjMDQ3OGI3NjhhOGE3OTE2YTQyODAzMTZhNg",
    description: "Aroma dulce y cálido con frutas confitadas, amaretto y miel blanca. Con perlas doradas.",
    badge: "NAVIDAD"
  },
  {
    id: 2219,
    name: "Soy Sexy Colonia",
    price: 13.00,
    originalPrice: 19.00,
    category: "Perfumes",
    image: "https://placehold.co/400x400/FF6B35/ffffff?text=Soy+Sexy", // CAMBIAR IMAGEN
    description: "Aroma ambarado maderoso con neroli, sándalo y musk. Para celebrar tu personalidad única.",
    badge: "COLECCIÓN"
  },
  {
    id: 76038,
    name: "Set Gaïa Parfum",
    price: 39.00,
    originalPrice: 61.00,
    category: "Perfumes",
    image: "https://placehold.co/400x400/FF6B35/ffffff?text=Set+Gaia", // CAMBIAR IMAGEN
    description: "Revela la diosa en ti. Notas florales de jacarandá, magnolias y orquídeas. Incluye: Parfum + Desodorante.",
    badge: "SET REGALO"
  },
  {
    id: 2202,
    name: "Ícono Intense Eau de Parfum",
    price: 31.50,
    originalPrice: 45.00,
    category: "Perfumes",
    image: "https://placehold.co/400x400/FF6B35/ffffff?text=Icono+Intense", // CAMBIAR IMAGEN
    description: "La versión más intensa. Con ylang ylang, notas de cedro y crema de vainilla. Floral ambarado.",
    badge: "INTENSO"
  },
  {
    id: 2203,
    name: "Pasión Parfum",
    price: 37.00,
    originalPrice: 53.00,
    category: "Perfumes",
    image: "https://placehold.co/400x400/FF6B35/ffffff?text=Pasion", // CAMBIAR IMAGEN
    description: "Con peonía blanca, violeta y una nota cautivadora de tonka. Aroma ambarado floral.",
    badge: "30% DTO"
  },
  {
    id: 76040,
    name: "Eau Vitale (Elige tu Aroma)",
    price: 22.00,
    originalPrice: 44.00,
    category: "Perfumes",
    image: "https://placehold.co/400x400/FF6B35/ffffff?text=Eau+Vitale+2x1", // CAMBIAR IMAGEN
    description: "Aromaterapia para el bienestar. Elige entre Lavanda, Té Verde o Neroli. ¡Llévate 2 por el precio de 1!",
    badge: "2x1"
  },
  {
    id: 2224,
    name: "Osadía Hombre Carácter",
    price: 31.00,
    originalPrice: 48.00,
    category: "Perfumes",
    image: "https://www.yanbal.com/medias/20014191-01.jpg?context=bWFzdGVyfGltYWdlc3wyODgxNzR8aW1hZ2UvanBlZ3xhRFprTDJoaFpTOHhNVFkyTXpBeE5EQXdNamN4T0M4eU1EQXhOREU1TVY4d01TNXFjR2N8M2QyOTBkYTU5YzU3NTM0YzM0NzIzYzU2ODBiNDdlZTBmNTA3NDUxNDA4ZDMwMDllMDliMjdmMjRmOGNiZGJhMQ",
    description: "Fusión provocativa de hierbabuena, café dulce y madera de ébano. Carácter y seducción.",
    badge: "OFERTA TOP"
  },
  {
    id: 76012,
    name: "Set Arom Absolute",
    price: 36.00,
    originalPrice: 56.00,
    category: "Perfumes",
    image: "https://placehold.co/400x400/000000/ffffff?text=Set+Arom+Absolute", // CAMBIAR IMAGEN
    description: "Maderoso especiado con limón Kaffir y cardamomo. Incluye: Parfum 90ml + Desodorante.",
    badge: "MEJOR PRECIO"
  },
  {
    id: 202,
    name: "Solo Parfum",
    price: 35.00,
    originalPrice: 50.00,
    category: "Perfumes",
    image: "https://placehold.co/400x400/000000/ffffff?text=Solo+Parfum", // CAMBIAR IMAGEN
    description: "Aroma maderoso cítrico con cáscara de mandarina, jengibre y cuero. Para el hombre que define su camino.",
    badge: "30% DTO"
  },
  {
    id: 206,
    name: "Dendur Eau de Parfum",
    price: 33.50,
    originalPrice: 48.00,
    category: "Perfumes",
    image: "https://placehold.co/400x400/000000/ffffff?text=Dendur", // CAMBIAR IMAGEN
    description: "Aroma ambarado especiado con jengibre, tabaco y pimienta negra. Espíritu libre y aventurero.",
    badge: "CLÁSICO"
  },

  // --- CREMAS Y CUIDADO FACIAL/CORPORAL ---
  {
    id: 17,
    name: "Elixir de Vida Rostro",
    price: 36.00,
    originalPrice: 52.00,
    category: "Cremas",
    image: "https://placehold.co/400x400/800080/ffffff?text=Elixir+Vida+Rostro", // CAMBIAR IMAGEN
    description: "Crema rejuvenecedora con Resveratrol. Alisa arrugas y reafirma. Resultados en 7 días.",
    badge: "ANTIEDAD"
  },
  {
    id: 15,
    name: "Elixir de Vida Ojos",
    price: 28.00,
    originalPrice: 40.00,
    category: "Cremas",
    image: "https://placehold.co/400x400/800080/ffffff?text=Elixir+Vida+Ojos", // CAMBIAR IMAGEN
    description: "Acción antiedad contra bolsas, ojeras y arrugas. Con efecto bótox natural.",
    badge: "30% DTO"
  },
  {
    id: 187,
    name: "Sérum Antiarrugas Lift",
    price: 31.50,
    originalPrice: 49.00,
    category: "Cremas",
    image: "https://www.yanbal.com/medias/20013706-01.jpg?context=bWFzdGVyfGltYWdlc3wyNzY5M3xpbWFnZS9qcGVnfGFEbGtMMmhtTnk4eE1EUTJORGd5TURBek5UWXhOQzh5TURBeE16Y3dObDh3TVM1cWNHY3w3YzExOWFiYjFhMDNhZTI3NzMxZmQ1YjY3YWE5MzIxNjYzOWM0MzY4NGVkNjg3ZGE0YmNjZDViMWZhZmZhODBj",
    description: "Con Bakuchiol y Niacinamida. Mejora la firmeza y alisa arrugas visiblemente en 28 días.",
    badge: "35% DTO"
  },
  {
    id: 1802,
    name: "Sérum Antimanchas",
    price: 34.00,
    originalPrice: 49.00,
    category: "Cremas",
    image: "https://placehold.co/400x400/800080/ffffff?text=Serum+Antimanchas", // CAMBIAR IMAGEN
    description: "Actúa contra la hiperpigmentación. Con niacinamida y hexylresorcinol. 100% acción antimanchas.",
    badge: "EFECTIVO"
  },
  {
    id: 3,
    name: "Limpiador Pigment Control",
    price: 18.90,
    originalPrice: 27.00,
    category: "Cremas",
    image: "https://placehold.co/400x400/800080/ffffff?text=Limpiador+Pigment", // CAMBIAR IMAGEN
    description: "Limpia, tonifica, exfolia y despigmenta. Restaura la luminosidad del rostro.",
    badge: "NUEVO"
  },
  {
    id: 331,
    name: "Total Block SPF 50+",
    price: 16.50,
    originalPrice: 24.00,
    category: "Cuidado Personal",
    image: "https://www.yanbal.com/medias/20011008-01.jpg?context=bWFzdGVyfGltYWdlc3w1MzUzNnxpbWFnZS9qcGVnfGFHRXdMMmhqTXk4eE1EVTBNalkwTVRjM05EWXlNaTh5TURBeE1UQXdPRjh3TVM1cWNHY3xmNzA2YTlkOWQ0ZGY5NzcxYjI4ZGJmNDk5NzRiMTYwZTEwYjQ4YjlkZGExMWFlNGRkYTYwZDFlY2Y0MjU4Yjcw",
    description: "Muy alta protección solar (UVB/UVA/Luz Azul). Resistente al agua y sudor. Nº1 en Ventas.",
    badge: "TOP VENTAS"
  },
  {
    id: 743,
    name: "Total Block Dermafusión Gel",
    price: 22.00,
    originalPrice: 32.00,
    category: "Cuidado Personal",
    image: "https://placehold.co/400x400/00aaee/ffffff?text=Dermafusion+Gel", // CAMBIAR IMAGEN
    description: "Gel invisible tipo primer. Acabado mate aterciopelado con ácido hialurónico.",
    badge: "INVISIBLE"
  },
  {
    id: 689,
    name: "Blum Champú Hidratación",
    price: 12.00,
    originalPrice: 16.00,
    category: "Cuidado Personal",
    image: "https://www.yanbal.com/medias/20013530-01.jpg?context=bWFzdGVyfGltYWdlc3w2NDIyNnxpbWFnZS9qcGVnfGFEazJMMmd5WVM4eE1ETXhORGMyTWpjNE1EY3dNaTh5TURBeE16VXpNRjh3TVM1cWNHY3xhMzNkMzlkM2RkM2I1OGM0M2Y4YTU5YTJhOWIwMTg4ZGZmNzVhMTAzZTE2NTJhYjRmYjQyZDQxNjY0ZGNhNWVh",
    description: "¡Nuevo! Cabello hidratado, suave y brillante con Tri-Fort Complex. Aroma manzana y lavanda.",
    badge: "LANZAMIENTO"
  },
  {
    id: 727,
    name: "Blum Sérum Nutri-Control",
    price: 18.00,
    originalPrice: 24.00,
    category: "Cuidado Personal",
    image: "https://placehold.co/400x400/00aaee/ffffff?text=Blum+Serum", // CAMBIAR IMAGEN
    description: "Sérum reparador de puntas y control de frizz. Sin enjuague. Resultados desde el primer uso.",
    badge: "CONTROL FRIZZ"
  },

  // --- MAQUILLAJE ---
  {
    id: 176,
    name: "BB Cream Hidratante",
    price: 18.90,
    originalPrice: 27.00,
    category: "Maquillaje",
    image: "https://placehold.co/400x400/e91e63/ffffff?text=BB+Cream", // CAMBIAR IMAGEN
    description: "Hidrata, protege (SPF 30) y perfecciona la piel. Acabado natural mate hasta 10 horas.",
    badge: "TENDENCIA"
  },
  {
    id: 172,
    name: "BB Lips (Bálsamo)",
    price: 11.00,
    originalPrice: 16.00,
    category: "Maquillaje",
    image: "https://placehold.co/400x400/e91e63/ffffff?text=BB+Lips", // CAMBIAR IMAGEN
    description: "Labios hidratados, reparados y con un toque de color. Con manteca de karité y SPF 20.",
    badge: "HIDRATACIÓN"
  },
  {
    id: 4681,
    name: "Máscara Crece Extreme",
    price: 23.00,
    originalPrice: 46.00,
    category: "Maquillaje",
    image: "https://www.yanbal.com/medias/YA001341-es-ES-01.jpg?context=bWFzdGVyfGltYWdlc3wzODIwMDh8aW1hZ2UvanBlZ3xhR1kzTDJneU55OHhNRFUxTnpjeU9ETTFPRFF6TUM5WlFUQXdNVE0wTVY5bGMxOUZVMTh3TVM1cWNHY3w1YTM2M2M4ODFiZjk3YzBkODZiYjQ4OWEzMDYzM2I5MDY4ZmQ5ZWJmNGZmMWQ1ZTI4N2IxNjNmYjkzMTE5NWY1",
    description: "Acelera el crecimiento real de tus pestañas hasta un 242%. ¡Oferta 2x1! Pide 1 y te llegan 2.",
    badge: "2x1"
  },
  {
    id: 5434,
    name: "Ya! Máscara Waterproof",
    price: 8.00,
    originalPrice: 12.00,
    category: "Maquillaje",
    image: "https://placehold.co/400x400/e91e63/ffffff?text=Ya+Mascara", // CAMBIAR IMAGEN
    description: "4 beneficios en 1: Alarga, define, da volumen y rizado. A prueba de agua.",
    badge: "PRÁCTICO"
  },
  {
    id: 6426,
    name: "Labial Active Shine",
    price: 13.50,
    originalPrice: 18.00,
    category: "Maquillaje",
    image: "https://placehold.co/400x400/e91e63/ffffff?text=Active+Shine", // CAMBIAR IMAGEN
    description: "Labial con cápsulas de destellos que se activan al presionar los labios. Larga duración.",
    badge: "BRILLO"
  },
  {
    id: 79038,
    name: "Hydra-Lip Líquido Mate",
    price: 18.00,
    originalPrice: 36.00,
    category: "Maquillaje",
    image: "https://placehold.co/400x400/e91e63/ffffff?text=HydraLip+Mate+2x1", // CAMBIAR IMAGEN
    description: "Acabado mate e hidratación con ácido hialurónico. ¡Oferta 2x1! Elige tus tonos favoritos.",
    badge: "2x1"
  },
  {
    id: 6393,
    name: "Paleta Sombras 58th",
    price: 22.50,
    originalPrice: 35.00,
    category: "Maquillaje",
    image: "https://www.yanbal.com/medias/20014099-01.jpg?context=bWFzdGVyfGltYWdlc3wxMzk4NjN8aW1hZ2UvanBlZ3xhR0prTDJnMk55OHhNRGs0TnpnM056VTVOekl4TkM4eU1EQXhOREE1T1Y4d01TNXFjR2N8MjZiYWRmYjI1M2U2NGFiYTU1ZDg4MzBhYWYzNDJmOWQwZDYwMGU5MjNjNjI5MWUyMjNmZDcwZTI0MTU0MjBhNg",
    description: "6 sombras y 1 colorete en tonos terrosos y cálidos. Edición especial de Aniversario.",
    badge: "ED. LIMITADA"
  },
  {
    id: 735,
    name: "Polvos Sueltos Hialurónico",
    price: 18.00,
    originalPrice: 26.00,
    category: "Maquillaje",
    image: "https://placehold.co/400x400/e91e63/ffffff?text=Polvos+Sueltos", // CAMBIAR IMAGEN
    description: "Sella y matifica sin resecar. Con ácido hialurónico y SPF 15. Tonos universales.",
    badge: "NUEVO"
  },
  {
    id: 5104,
    name: "Delineador Tattoo Líquido",
    price: 9.50,
    originalPrice: 15.00,
    category: "Maquillaje",
    image: "https://placehold.co/400x400/e91e63/ffffff?text=Delineador+Tattoo", // CAMBIAR IMAGEN
    description: "Punta plumón flexible. Color negro intenso, a prueba de agua y sudor. Hasta 24h de duración.",
    badge: "RESISTENTE"
  },
  {
    id: 60053,
    name: "Set de Brochas Pro",
    price: 35.00,
    originalPrice: 44.00,
    category: "Maquillaje",
    image: "https://placehold.co/400x400/e91e63/ffffff?text=Set+Brochas", // CAMBIAR IMAGEN
    description: "4 brochas profesionales con mango de madera. Incluye brocha para base, polvos, sombras y cejas.",
    badge: "PREMIUM"
  },

  // --- JOYERÍA ---
  {
    id: 43231,
    name: "Collar Inicial Dorezzi",
    price: 25.50,
    originalPrice: 30.00,
    category: "Joyería",
    image: "https://placehold.co/400x400/FFD700/ffffff?text=Collar+Inicial", // CAMBIAR IMAGEN
    description: "Personaliza tu regalo. Bañado en oro de 24k con cristales. El detalle perfecto para Navidad.",
    badge: "REGALO TOP"
  },
  {
    id: 43188,
    name: "Collar Leonora",
    price: 74.00,
    originalPrice: 74.00,
    category: "Joyería",
    image: "https://placehold.co/400x400/FFD700/ffffff?text=Collar+Leonora", // CAMBIAR IMAGEN
    description: "Elegancia pura. Bañado en oro de 24 quilates. Diseño exclusivo de eslabones.",
    badge: "LUJO"
  },
  {
    id: 43210,
    name: "Aros Delia",
    price: 32.00,
    originalPrice: 32.00,
    category: "Joyería",
    image: "https://placehold.co/400x400/FFD700/ffffff?text=Aros+Delia", // CAMBIAR IMAGEN
    description: "Aros clásicos con un toque moderno. Baño de oro de 24k. Perfectos para combinar.",
    badge: "CLÁSICO"
  },
  {
    id: 43221,
    name: "Set Ilusión Cristal",
    price: 42.00,
    originalPrice: 42.00,
    category: "Joyería",
    image: "https://placehold.co/400x400/FFD700/ffffff?text=Set+Ilusion", // CAMBIAR IMAGEN
    description: "Collar y pendientes con cristales finos. Brillo sutil para tus celebraciones.",
    badge: "SET"
  }
];

// --- COMPONENTES AUXILIARES ---

const Notification = ({ message, show }) => (
  <div className={`fixed top-32 right-5 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl transition-all duration-500 z-[100] transform ${show ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-10 opacity-0 pointer-events-none'} flex items-center gap-3 border-l-4 border-white`}>
    <div className="bg-white/20 p-2 rounded-full">
        <CheckCircle size={20} />
    </div>
    <div>
        <p className="font-bold text-sm">¡Añadido a tu bolsa!</p>
        <p className="text-xs text-green-100">{message}</p>
    </div>
  </div>
);

// Utilizando React.memo para evitar re-renderizados innecesarios del banner
const InfiniteBanner = React.memo(() => {
    return (
        <div className="bg-[#FF6B35] text-white py-2 overflow-hidden relative z-50 shadow-md border-b border-orange-600">
            <div className="flex whitespace-nowrap animate-marquee will-change-transform">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center mx-6 gap-4 font-bold text-sm tracking-wide uppercase">
                        <span className="flex items-center gap-2"><Tag size={16} fill="white" /> 10% DE DESCUENTO PARA NUEVOS CLIENTES</span>
                        <span className="text-orange-200">|</span>
                        <span className="flex items-center gap-2"><Sparkles size={16} className="text-yellow-300" /> EN TU PRIMERA COMPRA</span>
                        <span className="text-orange-200">|</span>
                    </div>
                ))}
            </div>
        </div>
    );
});

// --- APP PRINCIPAL ---

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [showNotification, setShowNotification] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Inyectar fuentes
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // Bloquear scroll del body cuando el modal o carrito están abiertos
  useEffect(() => {
    if (selectedProduct || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProduct, isCartOpen]);

  // --- LÓGICA DEL CARRITO ---
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setLastAddedItem(product.name);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    setIsCartOpen(true);
    setSelectedProduct(null);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    let message = `Hola Zoila, soy un NUEVO CLIENTE y quiero aprovechar el 10% de descuento en mi primer pedido:%0A%0A`;
    cart.forEach(item => {
      message += `▪ *${item.quantity}* x ${item.name} (€${item.price})%0A`;
    });
    message += `%0A💰 *Total a pagar: €${cartTotal.toFixed(2)}*`;
    message += `%0A📍 Dirección de entrega: ...`;
    message += `%0A%0A¿Me confirmas el total con descuento?`;
    
    window.open(`https://wa.me/${SELLER.phone}?text=${message}`, '_blank');
  };

  // OPTIMIZACIÓN: useMemo para evitar re-filtrar en cada render
  const filteredProducts = useMemo(() => {
    return activeCategory === "Todos" 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen selection:bg-[#FF6B35] selection:text-white">
      <style>{`
        body { font-family: 'Montserrat', sans-serif; scroll-behavior: smooth; }
        h1, h2, h3, h4, .font-serif { font-family: 'Playfair Display', serif; }
        
        .bg-primary { background-color: #FF6B35; }
        .text-primary { color: #FF6B35; }
        .border-primary { border-color: #FF6B35; }
        
        .btn-primary { 
            background-color: #FF6B35; 
            color: white; 
            transition: all 0.3s; 
            box-shadow: 0 4px 14px rgba(255, 107, 53, 0.4);
        }
        .btn-primary:hover { 
            background-color: #E65525; 
            transform: translateY(-2px); 
            box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6); 
        }

        .glass-nav { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); }
        
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }

        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.7); transform: scale(1); }
          70% { box-shadow: 0 0 0 15px rgba(255, 107, 53, 0); transform: scale(1.05); }
          100% { box-shadow: 0 0 0 0 rgba(255, 107, 53, 0); transform: scale(1); }
        }
        .animate-pulse-glow { animation: pulse-glow 2s infinite; }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translate3d(0, 40px, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        .animate-slide-in {
            animation: slideIn 0.3s ease-out forwards;
        }

        /* Clase de utilidad para GPU acceleration */
        .will-change-transform { will-change: transform; }
      `}</style>

      {/* --- BANNER INFINITO --- */}
      <InfiniteBanner />

      {/* --- HEADER --- */}
      <header className="sticky top-0 glass-nav shadow-sm z-40 border-b border-gray-100 will-change-transform">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveCategory("Todos")}>
            <div className="leading-none">
                <div className="text-2xl font-bold tracking-widest text-gray-900">
                ZOI<span className="text-primary">BEAUTY</span>
                </div>
                <div className="text-[10px] text-gray-500 tracking-wider font-semibold uppercase">Yanbal España</div>
            </div>
          </div>

          <nav className="hidden md:flex gap-8 font-semibold text-sm uppercase tracking-wide items-center">
            {['Todos', 'Perfumes', 'Joyería', 'Cremas', 'Maquillaje'].map(cat => (
              <button 
                key={cat}
                onClick={() => { setActiveCategory(cat); document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }); }}
                className={`hover-text-primary transition-colors ${activeCategory === cat ? 'text-primary font-bold' : 'text-gray-600'}`}
              >
                {cat}
              </button>
            ))}
            <a 
                href={`https://wa.me/${SELLER.phone}`} 
                target="_blank"
                rel="noreferrer"
                className="btn-primary px-5 py-2 rounded-full font-bold flex items-center gap-2 text-sm"
            >
                <Phone size={16} /> Escribenos
            </a>  
          </nav>

          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={24} />
            </button>
            
            <div className="relative cursor-pointer group" onClick={() => setIsCartOpen(true)}>
              <div className="p-2 rounded-full hover:bg-orange-50 transition-colors relative">
                <ShoppingBag size={24} className="text-gray-800 group-hover:text-primary transition-colors" />
                {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                    {cartCount}
                    </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 flex flex-col gap-2 shadow-lg absolute w-full z-50">
            {['Todos', 'Perfumes', 'Joyería', 'Cremas', 'Maquillaje'].map(cat => (
              <button 
                key={cat}
                onClick={() => { setActiveCategory(cat); setIsMenuOpen(false); }}
                className="text-left font-semibold py-3 px-4 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-primary"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
              src="https://i.ibb.co/x862dr4H/vista-frontal-de-la-mujer-joven-con-borla-y-polvo-para-maquillaje-en-pared-roja.jpg" 
              alt="Belleza y Estilo Yanbal" 
              className="w-full h-full object-cover object-center will-change-transform"
              loading="eager" // Carga prioritaria para el hero
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/55 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="max-w-3xl animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg">
                        <Zap size={14} fill="white" /> Nueva Campaña 12
                    </span>
                    <span className="border border-white/30 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                        Edición Limitada
                    </span>
                </div>
                
                <h1 className="text-5xl md:text-8xl font-bold mb-6 font-serif leading-none drop-shadow-lg">
                    Belleza que <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-200">Inspira.</span>
                </h1>
                
                <p className="text-xl md:text-2xl mb-10 font-light text-gray-100 max-w-xl leading-relaxed drop-shadow-md">
                    Descubre los aromas y colores que definirán tus mejores momentos estas Fiestas.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                        onClick={() => document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' })}
                        className="btn-primary px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform"
                    >
                        Ver Catálogo <ChevronRight size={22} />
                    </button>
                    <a 
                        href={`https://wa.me/${SELLER.phone}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-gray-900 px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all"
                    >
                        <Gift size={22} /> Pedir Asesoría
                    </a>
                </div>
            </div>
        </div>
      </section>

      {/* --- SECCIÓN VENDEDORA --- */}
      <section className="bg-orange-50 py-24 relative z-20"> 
        <div className="container mx-auto px-4 relative">
            <div className="relative z-30 bg-white rounded-3xl p-8 shadow-xl border border-orange-100 flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
                <div className="w-40 h-40 rounded-full shrink-0 shadow-2xl border-4 border-white overflow-hidden bg-gray-100 -mt-24 md:-mt-16 relative z-40">
                    <img 
                        src="https://i.ibb.co/Tq4dZVkw/Foto-mam.jpg" 
                        alt={SELLER.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
                <div className="text-center md:text-left flex-1 pt-6 md:pt-0">
                    <div className="flex flex-col md:flex-row items-center gap-3 mb-2 justify-center md:justify-start">
                        <h2 className="text-3xl font-bold text-gray-900 font-serif">{SELLER.name}</h2>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <CheckCircle size={12} /> Verificada
                        </span>
                    </div>
                    <p className="text-gray-600 mb-4 text-lg">{SELLER.role} | Asesoría personalizada para resaltar tu belleza.</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100"><MapPin size={14} className="text-primary" /> {SELLER.location}</span>
                        <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100"><Phone size={14} className="text-primary" /> {SELLER.displayPhone}</span>
                    </div>
                </div>
                <a 
                    href={`https://wa.me/${SELLER.phone}`}
                    className="btn-primary p-5 rounded-full shadow-lg hover:shadow-xl shrink-0"
                    title="Enviar WhatsApp"
                >
                    <Send size={28} />
                </a>
            </div>
        </div>
      </section>

      {/* --- CATÁLOGO DE PRODUCTOS --- */}
      <section className="pb-20 pt-10 container mx-auto px-4" id="catalogo">
        <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block flex items-center justify-center gap-2">
                 <Star size={14} fill="#FF6B35" /> Campaña 12 - España <Star size={14} fill="#FF6B35" />
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mb-4 font-serif">Favoritos de Temporada</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Selección exclusiva de productos Yanbal. Calidad internacional con ingredientes naturales.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300">
              {/* Imagen */}
              <div className="relative h-[350px] overflow-hidden cursor-pointer flex items-center justify-center bg-gray-50" onClick={() => setSelectedProduct(product)}>
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md z-10 flex items-center gap-1">
                    <Sparkles size={12} /> {product.badge}
                  </span>
                )}
                
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
                  loading="lazy"
                />
                
                <div className="absolute inset-x-4 bottom-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                    <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold text-sm hover:bg-primary hover:text-orange-500 transition-all flex items-center justify-center gap-2 shadow-xl border border-gray-100"
                    >
                        <ShoppingBag size={16} /> Añadir Rápido
                    </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{product.category}</p>
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif leading-tight min-h-[3.5rem] group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    {product.name}
                </h3>
                
                <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400 line-through">€{product.originalPrice.toFixed(2)}</span>
                        <span className="text-2xl font-bold text-primary">€{product.price.toFixed(2)}</span>
                    </div>
                    <button 
                        onClick={() => addToCart(product)}
                        className="w-12 h-12 rounded-full bg-orange-50 text-primary flex items-center justify-center hover:bg-primary hover:orange transition-all shadow-sm hover:shadow-lg hover:rotate-12"
                    >
                        <ShoppingBag size={22} />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- MODAL DETALLE PRODUCTO OPTIMIZADO PARA MÓVIL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-[2px] animate-fade-in-up" onClick={() => setSelectedProduct(null)}>
            {/* Contenedor principal del modal: Altura máxima 90vh y flex column para móvil */}
            <div 
                className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:grid md:grid-cols-2" 
                onClick={e => e.stopPropagation()}
            >
                {/* BOTÓN CERRAR STICKY: Se queda pegado arriba a la derecha */}
                <button 
                    className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors shadow-md border border-gray-100" 
                    onClick={() => setSelectedProduct(null)}
                >
                    <X size={24} />
                </button>

                {/* Sección Imagen: Reducida en móvil (h-64) para que se vea el contenido */}
                <div className="bg-gray-100 p-8 flex items-center justify-center relative h-64 md:h-auto shrink-0">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="h-full w-full object-contain mix-blend-multiply" />
                </div>
                
                {/* Sección Contenido: Scrollable */}
                <div className="p-6 md:p-12 flex flex-col justify-center bg-white">
                    <span className="text-primary font-bold text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-primary"></span> {selectedProduct.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 font-serif text-gray-900 leading-tight">{selectedProduct.name}</h2>
                    <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">{selectedProduct.description}</p>
                    
                    <div className="bg-orange-50 p-4 md:p-6 rounded-2xl mb-6 md:mb-8 flex items-center justify-between border border-orange-100">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 line-through mb-1">Antes: €{selectedProduct.originalPrice.toFixed(2)}</span>
                            <span className="text-3xl md:text-4xl font-bold text-primary">€{selectedProduct.price.toFixed(2)}</span>
                        </div>
                        {selectedProduct.badge && <span className="bg-primary text-white px-3 py-1 md:px-4 md:py-2 rounded-xl font-bold text-xs md:text-sm shadow-lg flex items-center gap-2"><Sparkles size={16}/> {selectedProduct.badge}</span>}
                    </div>

                    <button 
                        onClick={() => addToCart(selectedProduct)}
                        className="btn-primary w-full py-4 md:py-5 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform"
                    >
                        <ShoppingBag size={20} /> Agregar al Carrito
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                        <CheckCircle size={12} /> Stock disponible para entrega inmediata
                    </p>
                </div>
            </div>
        </div>
      )}

      {/* --- CART DRAWER --- */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-[2px] transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-white z-[70] shadow-2xl flex flex-col transform transition-transform animate-slide-in">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-bold flex items-center gap-3 font-serif">
                Tu Pedido
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-sans">{cartCount}</span>
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-red-500">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center">
                  <ShoppingBag size={64} className="mb-4 text-gray-200" />
                  <p className="text-lg font-medium">Tu bolsa está vacía</p>
                  <p className="text-sm">¡Aprovecha las rebajas del C12!</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-6 animate-fade-in-up">
                    <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 text-sm line-clamp-2">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500">
                            <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-primary font-bold mb-3">€{(item.price * item.quantity).toFixed(2)}</p>
                      <div className="flex items-center gap-3">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 font-bold">-</button>
                          <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 font-bold">+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t">
                <div className="bg-yellow-100 border border-yellow-200 p-3 rounded-lg mb-4 text-xs text-yellow-800 flex items-start gap-2">
                    <Tag size={14} className="shrink-0 mt-0.5" />
                    <p>Se aplicará el <strong>10% de descuento</strong> al confirmar que es tu primera compra por WhatsApp.</p>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600">Total Estimado</span>
                    <span className="text-3xl font-bold text-gray-900">€{cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#20ba5c] text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
                >
                  <Send size={20} />
                  Enviar Pedido por WhatsApp
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <Notification message={lastAddedItem} show={showNotification} />

      <a 
        href={`https://wa.me/${SELLER.phone}`}
        target="_blank"
        rel="noreferrer" 
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-2xl hover:bg-orange-600 transition-all duration-300 z-30 flex items-center justify-center group animate-pulse-glow"
        aria-label="Chat en WhatsApp"
      >
        <Phone size={32} className="group-hover:rotate-12 transition-transform" />
      </a>
      
      {/* --- FOOTER --- */}
      <footer className="bg-[#1a1a1a] text-white pt-20 pb-10 border-t-4 border-primary">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div>
                    <div className="text-3xl font-bold tracking-widest mb-6">
                        ZOI<span className="text-primary">BEAUTY</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Tu tienda de confianza Yanbal en Cuenca. Productos originales, asesoría personalizada y entrega segura. Garantía de satisfacción total.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-primary transition-all hover:-translate-y-1"><Facebook size={20} /></a>
                        <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-primary transition-all hover:-translate-y-1"><Instagram size={20} /></a>
                    </div>
                </div>
                
                <div>
                    <h4 className="text-xl font-bold mb-8 font-serif text-white">Contacto Directo</h4>
                    <ul className="space-y-6 text-gray-400 text-sm">
                        <li className="flex items-start gap-4 group">
                            <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                <MapPin className="text-primary group-hover:text-white" size={20} />
                            </div>
                            <span className="mt-1">{SELLER.location}</span>
                        </li>
                        <li className="flex items-center gap-4 group">
                            <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                <Phone className="text-primary group-hover:text-white" size={20} />
                            </div>
                            <span>{SELLER.displayPhone}</span>
                        </li>
                        <li className="flex items-center gap-4 group">
                            <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                <Mail className="text-primary group-hover:text-white" size={20} />
                            </div>
                            <span>{SELLER.email}</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xl font-bold mb-8 font-serif text-white">Métodos de Pago</h4>
                    <p className="text-gray-400 text-sm mb-6">Aceptamos Bizum, Transferencia Bancaria y Efectivo contra entrega (según zona).</p>
                    <div className="flex gap-3 opacity-60">
                        <div className="h-10 w-16 bg-white rounded flex items-center justify-center text-black text-xs font-bold">Bizum</div>
                        <div className="h-10 w-16 bg-white rounded flex items-center justify-center text-black text-xs font-bold">Visa</div>
                        <div className="h-10 w-16 bg-white rounded flex items-center justify-center text-black text-xs font-bold">€ Efectivo</div>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
                <p>&copy; 2025 ZOIBEAUTY - Asesora Independiente Yanbal {SELLER.name}.</p>
                <p className="mt-2">Las imágenes son referenciales. Precios válidos para Campaña 12 España.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}