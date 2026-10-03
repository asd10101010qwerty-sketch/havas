export const categories = [
  {
    id: "mevalar",
    name: "Mevalar",
    nameRu: "Фрукты",
    icon: "Apple",
    badge: "Yangi",
    color: "from-red-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=60",
    subcategories: [
      {
        title: "Sitrus mevalar",
        titleRu: "Цитрусовые",
        items: ["Apelsin", "Limon", "Mandarin", "Greypfrut"]
      },
      {
        title: "Kuzgi mevalar",
        titleRu: "Осенние фрукты",
        items: ["Olma", "Nok", "Uzum", "Anor", "Xurmo"]
      },
      {
        title: "Tropik mevalar",
        titleRu: "Тропические фрукты",
        items: ["Banan", "Kivi", "Ananas", "Mango"]
      }
    ]
  },
  {
    id: "sabzavotlar",
    name: "Sabzavotlar va ko'katlar",
    nameRu: "Овощи и зелень",
    icon: "Carrot",
    badge: "Arzon",
    color: "from-green-500 to-emerald-600",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=500&auto=format&fit=crop&q=60",
    subcategories: [
      {
        title: "Asosiy sabzavotlar",
        titleRu: "Основные овощи",
        items: ["Kartoshka", "Piyoz", "Sabzi", "Sarimsoqpiyoz"]
      },
      {
        title: "Salat uchun",
        titleRu: "Для салата",
        items: ["Pomidor", "Bodring", "Bulg'or qalampiri", "Karam"]
      },
      {
        title: "Ko'katlar",
        titleRu: "Зелень",
        items: ["Kashnich", "Shivit (Ukrop)", "Rayhon", "Ko'k piyoz"]
      }
    ]
  },
  {
    id: "sut-mahsulotlari",
    name: "Sut mahsulotlari",
    nameRu: "Молочные продукты",
    icon: "Milk",
    badge: "",
    color: "from-blue-400 to-cyan-500",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=60",
    subcategories: [
      {
        title: "Sut va kefir",
        titleRu: "Молоко и кефир",
        items: ["Sut", "Kefir", "Qatiq", "Ryajenka"]
      },
      {
        title: "Pishloq va tvorog",
        titleRu: "Сыр и творог",
        items: ["Qattiq pishloq", "Eritilgan pishloq", "Tvorog", "Brinza"]
      },
      {
        title: "Sariyog' va qaymoq",
        titleRu: "Сливочное масло и сливки",
        items: ["Sariyog'", "Qaymoq", "Smetana", "Margarin"]
      }
    ]
  },
  {
    id: "ichimliklar",
    name: "Ichimliklar",
    nameRu: "Напитки",
    icon: "GlassWater",
    badge: "Ommabop",
    color: "from-sky-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1527960471264-932f2f6530a6?w=500&auto=format&fit=crop&q=60",
    subcategories: [
      {
        title: "Suvlar",
        titleRu: "Вода",
        items: ["Gazlangan suv", "Gazsiz suv", "Mineral suv"]
      },
      {
        title: "Sharbatlar",
        titleRu: "Соки",
        items: ["Olma sharbati", "Apelsin sharbati", "Gilos sharbati", "Meva nektarlari"]
      },
      {
        title: "Gazlangan ichimliklar",
        titleRu: "Газировки",
        items: ["Coca-Cola", "Fanta", "Sprite", "Pepsi"]
      }
    ]
  },
  {
    id: "non",
    name: "Non va shirinliklar",
    nameRu: "Хлеб и сладости",
    icon: "Croissant",
    badge: "",
    color: "from-amber-600 to-yellow-700",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60",
    subcategories: [
      {
        title: "Non va bulochkalar",
        titleRu: "Хлеб и булочки",
        items: ["Buxanka non", "Yopgan non", "Bulochka", "Kruassan"]
      },
      {
        title: "Konditer mahsulotlari",
        titleRu: "Кондитерские изделия",
        items: ["Pechenye", "Vafli", "Pryanik", "Biskvit"]
      },
      {
        title: "Shokoladlar",
        titleRu: "Шоколад",
        items: ["Plitka shokolad", "Konfetlar", "Batonchiklar"]
      }
    ]
  },
  {
    id: "gosht",
    name: "Go'sht va kolbasalar",
    nameRu: "Мясо и колбасы",
    icon: "Drumstick",
    badge: "",
    color: "from-red-600 to-rose-700",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bd682f?w=500&auto=format&fit=crop&q=60",
    subcategories: [
      {
        title: "Xom go'sht",
        titleRu: "Сырое мясо",
        items: ["Mol go'shti", "Qo'y go'shti", "Tovuq go'shti", "Qiyma"]
      },
      {
        title: "Kolbasalar",
        titleRu: "Колбасы",
        items: ["Qaynatilgan kolbasa", "Yarim dudlangan", "Sosiskalar", "Sardelkalar"]
      }
    ]
  },
  {
    id: "baqaleya",
    name: "Baqaleya",
    nameRu: "Бакалея",
    icon: "Wheat",
    badge: "Chegirma",
    color: "from-yellow-500 to-orange-400",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60",
    subcategories: [
      {
        title: "Yormalar",
        titleRu: "Крупы",
        items: ["Guruch", "Grechka", "Mosh", "Loviya", "Suli yormasi"]
      },
      {
        title: "Makaronlar",
        titleRu: "Макароны",
        items: ["Spagetti", "Rojki", "Kamoncha", "Noodle"]
      },
      {
        title: "Yog' va ziravorlar",
        titleRu: "Масло и специи",
        items: ["Kungaboqar yog'i", "Zaytun yog'i", "Tuz", "Shakar", "Qora murch"]
      }
    ]
  },
  {
    id: "tozalik",
    name: "Maishiy kimyo",
    nameRu: "Бытовая химия",
    icon: "Sparkles",
    badge: "",
    color: "from-teal-400 to-emerald-500",
    image: "https://images.unsplash.com/photo-1584820927498-cafe8c1264c9?w=500&auto=format&fit=crop&q=60",
    subcategories: [
      {
        title: "Kir yuvish",
        titleRu: "Для стирки",
        items: ["Kir yuvish kukuni", "Gellar", "Konditsionerlar", "Qora kiyim uchun"]
      },
      {
        title: "Tozalash vositalari",
        titleRu: "Чистящие средства",
        items: ["Idish yuvish vositasi", "Oyna tozalash", "Pol yuvish", "Oshxona uchun"]
      }
    ]
  }
];