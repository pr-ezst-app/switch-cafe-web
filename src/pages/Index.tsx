import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.ezst.app/projects/7c295459-a73d-48cf-9a6d-aecfee27703c/files/ab5c74c3-df55-4a90-8763-eabfb08c2377.jpg";

const menuItems = [
  { emoji: "☕", name: "Авторский эспрессо", desc: "Насыщенный, с карамельными нотками", price: "180 ₽" },
  { emoji: "🥐", name: "Круассан с рикоттой", desc: "Хрустящий, с мёдом и лесными ягодами", price: "220 ₽" },
  { emoji: "🍵", name: "Чай «Лесная тропа»", desc: "Смесь трав, шиповника и чабреца", price: "150 ₽" },
  { emoji: "🍰", name: "Торт «Медовик»", desc: "По домашнему рецепту, со сметанным кремом", price: "280 ₽" },
  { emoji: "🫖", name: "Раф «Ореховый»", desc: "Сливочный, с фундуком и ванилью", price: "230 ₽" },
  { emoji: "🥗", name: "Боул с киноа", desc: "Свежие овощи, авокадо, яйцо пашот", price: "390 ₽" },
];

const reviews = [
  {
    name: "Анна К.",
    avatar: "АК",
    rating: 5,
    text: "Лучшее место в городе, чтобы выдохнуть! Кофе просто волшебный, а персонал встречает как старых друзей. Приходим каждые выходные всей семьёй.",
    date: "Апрель 2025",
  },
  {
    name: "Михаил Р.",
    avatar: "МР",
    rating: 5,
    text: "Switch Cafe — это не просто кофейня, это настроение. Деревянные столики, мягкий свет, запах выпечки... Сюда хочется возвращаться снова и снова.",
    date: "Март 2025",
  },
  {
    name: "Светлана В.",
    avatar: "СВ",
    rating: 5,
    text: "Медовик здесь — это что-то невероятное! Такой домашний вкус, будто бабушка испекла. И порции щедрые. Однозначно советую всем друзьям.",
    date: "Май 2025",
  },
  {
    name: "Дмитрий О.",
    avatar: "ДО",
    rating: 5,
    text: "Работаю здесь с ноутбуком почти каждый день. Тихо, уютно, вай-фай стабильный. Хозяева очень заботливые — всегда спросят, всё ли хорошо.",
    date: "Апрель 2025",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-amber-500 text-sm">★</span>
      ))}
    </div>
  );
}

export default function Index() {
  const [activeReview, setActiveReview] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null, index: number) => {
    revealRefs.current[index] = el;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cafe-cream)" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12"
        style={{ background: "rgba(245, 239, 224, 0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(212, 184, 150, 0.3)" }}>
        <div className="font-display text-2xl font-medium" style={{ color: "var(--cafe-bark)" }}>
          Switch <span className="font-light italic" style={{ color: "var(--cafe-terracotta)" }}>Cafe</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Меню", "Атмосфера", "Отзывы", "Контакты"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link text-sm font-medium"
              style={{ color: "var(--cafe-bark)" }}>
              {item}
            </a>
          ))}
        </div>
        <button
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all hover:opacity-90"
          style={{ backgroundColor: "var(--cafe-terracotta)", color: "var(--cafe-cream)" }}
        >
          Забронировать стол
        </button>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--cafe-bark)" }}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{ backgroundColor: "var(--cafe-cream)" }}>
          {["Меню", "Атмосфера", "Отзывы", "Контакты"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="font-display text-3xl font-medium"
              style={{ color: "var(--cafe-bark)" }}
              onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Switch Cafe interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(44,24,16,0.5) 0%, rgba(44,24,16,0.3) 50%, rgba(44,24,16,0.7) 100%)" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="font-handwritten text-xl mb-4 opacity-0 animate-fade-in delay-100"
            style={{ color: "var(--cafe-warm)", animationFillMode: "forwards" }}>
            добро пожаловать в
          </p>
          <h1 className="font-display text-6xl md:text-8xl font-light leading-none mb-6 opacity-0 animate-fade-in-up delay-200"
            style={{ color: "var(--cafe-cream)", animationFillMode: "forwards" }}>
            Switch<br />
            <em className="font-light" style={{ color: "var(--cafe-sand)" }}>Cafe</em>
          </h1>
          <p className="text-lg md:text-xl font-light leading-relaxed mb-10 opacity-0 animate-fade-in-up delay-400"
            style={{ color: "rgba(232, 213, 183, 0.9)", animationFillMode: "forwards" }}>
            Место, где время замедляется.<br />
            Тёплый кофе, домашняя выпечка и душевная атмосфера.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up delay-500"
            style={{ animationFillMode: "forwards" }}>
            <button className="px-8 py-3 rounded-full text-sm font-medium transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: "var(--cafe-terracotta)", color: "var(--cafe-cream)" }}>
              Забронировать стол
            </button>
            <button className="px-8 py-3 rounded-full text-sm font-medium border transition-all hover:opacity-90"
              style={{ borderColor: "rgba(232, 213, 183, 0.5)", color: "var(--cafe-warm)", backgroundColor: "transparent" }}>
              Смотреть меню
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in delay-600"
          style={{ color: "var(--cafe-warm)", animationFillMode: "forwards" }}>
          <span className="text-xs font-handwritten">листай вниз</span>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-6 md:px-12 text-center" id="атмосфера">
        <div className="max-w-2xl mx-auto">
          <div ref={(el) => addRef(el as HTMLElement, 0)} className="reveal">
            <span className="font-handwritten text-lg" style={{ color: "var(--cafe-terracotta)" }}>наша история</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium mt-2 mb-6 leading-tight"
              style={{ color: "var(--cafe-espresso)" }}>
              Маленький уголок<br />
              <em className="font-light">большого уюта</em>
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--cafe-bark)", opacity: 0.85 }}>
              Switch Cafe открылся с простой идеей — создать место, где можно по-настоящему отдохнуть.
              Здесь нет суеты. Только аромат свежесваренного кофе, мягкие кресла и разговоры, которые имеют значение.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--cafe-bark)", opacity: 0.85 }}>
              Каждое блюдо готовится с заботой из местных продуктов. Мы верим, что хорошая еда и тёплая атмосфера
              способны изменить день к лучшему.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 md:px-12" style={{ borderTop: "1px solid var(--cafe-warm)", borderBottom: "1px solid var(--cafe-warm)" }}>
        <div ref={(el) => addRef(el as HTMLElement, 1)} className="reveal max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "5+", label: "лет работы" },
            { num: "4.9", label: "рейтинг гостей" },
            { num: "40+", label: "позиций в меню" },
            { num: "1000+", label: "гостей в месяц" },
          ].map((stat) => (
            <div key={stat.num}>
              <div className="font-display text-4xl md:text-5xl font-medium" style={{ color: "var(--cafe-terracotta)" }}>
                {stat.num}
              </div>
              <div className="text-sm mt-1 font-light" style={{ color: "var(--cafe-bark)", opacity: 0.7 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section id="меню" className="py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div ref={(el) => addRef(el as HTMLElement, 2)} className="reveal text-center mb-16">
            <span className="font-handwritten text-lg" style={{ color: "var(--cafe-terracotta)" }}>любимое</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium mt-2" style={{ color: "var(--cafe-espresso)" }}>
              Наше меню
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, i) => (
              <div
                key={i}
                ref={(el) => addRef(el as HTMLElement, 3 + i)}
                className="reveal p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1 cursor-default"
                style={{
                  backgroundColor: "rgba(232, 213, 183, 0.35)",
                  borderColor: "var(--cafe-warm)",
                }}
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <div className="font-display text-xl font-medium mb-1" style={{ color: "var(--cafe-espresso)" }}>
                  {item.name}
                </div>
                <div className="text-sm mb-4 leading-relaxed" style={{ color: "var(--cafe-bark)", opacity: 0.75 }}>
                  {item.desc}
                </div>
                <div className="font-handwritten text-xl" style={{ color: "var(--cafe-terracotta)" }}>
                  {item.price}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="px-8 py-3 rounded-full text-sm font-medium border transition-all hover:opacity-80"
              style={{ borderColor: "var(--cafe-bark)", color: "var(--cafe-bark)", backgroundColor: "transparent" }}>
              Полное меню →
            </button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="отзывы" className="py-24 px-6 md:px-12" style={{ backgroundColor: "rgba(107, 66, 38, 0.06)" }}>
        <div className="max-w-5xl mx-auto">
          <div ref={(el) => addRef(el as HTMLElement, 9)} className="reveal text-center mb-16">
            <span className="font-handwritten text-lg" style={{ color: "var(--cafe-terracotta)" }}>говорят гости</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium mt-2" style={{ color: "var(--cafe-espresso)" }}>
              Отзывы и впечатления
            </h2>
          </div>

          {/* Featured review */}
          <div ref={(el) => addRef(el as HTMLElement, 10)} className="reveal mb-12">
            <div className="relative p-8 md:p-12 rounded-3xl overflow-hidden"
              style={{ backgroundColor: "var(--cafe-bark)", color: "var(--cafe-cream)" }}>
              <div className="font-display text-8xl md:text-9xl absolute -top-4 left-6 opacity-20 select-none leading-none"
                style={{ color: "var(--cafe-sand)" }}>"</div>
              <div className="relative z-10 max-w-3xl">
                <StarRating count={reviews[activeReview].rating} />
                <p className="font-display text-xl md:text-2xl font-light italic leading-relaxed mt-4 mb-6"
                  style={{ color: "var(--cafe-warm)" }}>
                  "{reviews[activeReview].text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
                    style={{ backgroundColor: "var(--cafe-terracotta)", color: "var(--cafe-cream)" }}>
                    {reviews[activeReview].avatar}
                  </div>
                  <div>
                    <div className="font-medium text-sm" style={{ color: "var(--cafe-cream)" }}>{reviews[activeReview].name}</div>
                    <div className="text-xs opacity-60">{reviews[activeReview].date}</div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-6 right-8 flex gap-2">
                {reviews.map((_, i) => (
                  <button key={i} onClick={() => setActiveReview(i)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{ backgroundColor: i === activeReview ? "var(--cafe-terracotta)" : "rgba(232,213,183,0.3)" }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Review cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviews.map((review, i) => (
              <div key={i}
                ref={(el) => addRef(el as HTMLElement, 11 + i)}
                className="reveal review-card p-5 rounded-2xl cursor-pointer"
                style={{
                  backgroundColor: i === activeReview ? "rgba(196, 98, 45, 0.12)" : "rgba(232, 213, 183, 0.4)",
                  border: i === activeReview ? "1px solid var(--cafe-terracotta)" : "1px solid var(--cafe-warm)",
                  transition: "all 0.3s ease"
                }}
                onClick={() => setActiveReview(i)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                    style={{ backgroundColor: "var(--cafe-bark)", color: "var(--cafe-cream)" }}>
                    {review.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "var(--cafe-espresso)" }}>{review.name}</div>
                    <div className="text-xs" style={{ color: "var(--cafe-bark)", opacity: 0.6 }}>{review.date}</div>
                  </div>
                </div>
                <StarRating count={review.rating} />
                <p className="text-xs leading-relaxed mt-2 line-clamp-3" style={{ color: "var(--cafe-bark)", opacity: 0.85 }}>
                  {review.text}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10" ref={(el) => addRef(el as HTMLElement, 15)}>
            <button className="px-8 py-3 rounded-full text-sm font-medium border transition-all hover:opacity-80"
              style={{ borderColor: "var(--cafe-terracotta)", color: "var(--cafe-terracotta)", backgroundColor: "transparent" }}>
              Оставить отзыв
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 text-center">
        <div ref={(el) => addRef(el as HTMLElement, 16)} className="reveal max-w-2xl mx-auto">
          <span className="font-handwritten text-lg" style={{ color: "var(--cafe-terracotta)" }}>ждём вас</span>
          <h2 className="font-display text-4xl md:text-5xl font-medium mt-2 mb-6" style={{ color: "var(--cafe-espresso)" }}>
            Забронируйте стол<br />
            <em className="font-light">прямо сейчас</em>
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--cafe-bark)", opacity: 0.8 }}>
            Особый вечер, деловой обед или просто хочется отдохнуть — мы с радостью вас встретим.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-full text-sm font-medium transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: "var(--cafe-terracotta)", color: "var(--cafe-cream)" }}>
              Забронировать стол
            </button>
            <a href="tel:+79001234567"
              className="px-8 py-3 rounded-full text-sm font-medium border flex items-center justify-center gap-2 transition-all hover:opacity-80"
              style={{ borderColor: "var(--cafe-bark)", color: "var(--cafe-bark)", backgroundColor: "transparent" }}>
              <Icon name="Phone" size={16} />
              Позвонить нам
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="контакты" className="py-12 px-6 md:px-12" style={{ backgroundColor: "var(--cafe-espresso)", color: "var(--cafe-warm)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="font-display text-2xl font-medium mb-3" style={{ color: "var(--cafe-cream)" }}>
                Switch <em className="font-light" style={{ color: "var(--cafe-sand)" }}>Cafe</em>
              </div>
              <p className="text-sm leading-relaxed opacity-70">
                Место, где тёплый кофе,<br />домашняя кухня и душевная атмосфера<br />собираются вместе.
              </p>
            </div>
            <div>
              <div className="font-handwritten text-lg mb-4" style={{ color: "var(--cafe-terracotta)" }}>Как нас найти</div>
              <div className="space-y-2 text-sm opacity-80">
                <div className="flex items-start gap-2">
                  <Icon name="MapPin" size={16} className="mt-0.5 flex-shrink-0" />
                  <span>ул. Центральная, 12<br />г. Москва</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>Пн–Вс: 08:00 – 22:00</span>
                </div>
              </div>
            </div>
            <div>
              <div className="font-handwritten text-lg mb-4" style={{ color: "var(--cafe-terracotta)" }}>Связаться</div>
              <div className="space-y-2 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (900) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>hello@switchcafe.ru</span>
                </div>
              </div>
              <div className="flex gap-4 mt-5">
                {["Instagram", "MessageCircle"].map((icon) => (
                  <button key={icon} className="w-9 h-9 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                    style={{ border: "1px solid rgba(232,213,183,0.3)" }}>
                    <Icon name={icon as "Instagram" | "MessageCircle"} size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs opacity-40"
            style={{ borderTop: "1px solid rgba(232,213,183,0.15)" }}>
            <span>© 2025 Switch Cafe. Все права защищены.</span>
            <span className="font-handwritten text-sm">Сделано с ❤️ и кофе</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
