import { products as initialProducts } from '../data/products.js';
import { pickupPoints } from '../data/pickupPoints.js';
import { categories } from '../data/categories.js';

const GEMINI_API_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || 'YOUR_API_KEY_HERE';
const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

/**
 * Builds the comprehensive knowledge base prompt about Havas Market
 */
export function buildStoreKnowledgePrompt(currentProducts = initialProducts, userContext = {}) {
  // Compress catalog info into structured knowledge
  const productSummaries = (currentProducts || initialProducts).map(p => {
    const title = p.title || '';
    const titleRu = p.titleRu ? ` / ${p.titleRu}` : '';
    const priceFormatted = (p.price || 0).toLocaleString('uz-UZ') + " so'm";
    const oldPriceFormatted = p.oldPrice ? ` (Eski narx: ${p.oldPrice.toLocaleString('uz-UZ')} so'm, chegirma: ${p.discountPercent}%)` : '';
    const installment = p.monthlyPrice ? ` [Nasiya: ${p.monthlyPrice.toLocaleString('uz-UZ')} so'm/oy]` : '';
    const stock = p.inStock ? `Qoldiq: ${p.inStock} ta` : 'Mavjud';
    const rating = p.rating ? `Reyting: ${p.rating} (${p.reviewsCount || 0} ta sharh)` : '';
    const seller = p.seller ? `Sotuvchi: ${p.seller}` : '';
    return `- ID: [${p.id}] "${title}${titleRu}" | Narxi: ${priceFormatted}${oldPriceFormatted}${installment} | Kategoriya: ${p.category}/${p.subcategory || ''} | ${stock} | ${rating} | ${seller}`;
  }).join('\n');

  const pvzSummaries = pickupPoints.map(pvz => 
    `- [${pvz.id}] ${pvz.name} (${pvz.city}): Manzil: ${pvz.address} | Ish vaqti: ${pvz.workingHours} | Tel: ${pvz.phone} | Kiyinish xonalari: ${pvz.fittingRooms} ta`
  ).join('\n');

  const categoriesSummaries = categories.map(c => 
    `- ${c.name} (${c.nameRu || ''}): ${c.subcategories ? c.subcategories.map(s => s.title).join(', ') : ''}`
  ).join('\n');

  let userContextStr = "Foydalanuvchi hozir mehmon sifatida ko'rmoqda (tizimga kirmagan).";
  if (userContext?.isLoggedIn && userContext?.name) {
    userContextStr = `Foydalanuvchi tizimga kirgan: Ismi: ${userContext.name}, Telefon: ${userContext.phone || 'mavjud emas'}. Savatida ${userContext.cartCount || 0} ta tovar bor. Saralanganlar: ${userContext.wishlistCount || 0} ta.`;
  }

  return `Siz "Havas Market" (Twink) onlayn gipermarketining rasmiy aqlli AI yordamchisisiz (Havas AI Assistant).
Siz xushmuomala, bilimdon va foydalanuvchiga yordam berishga doim tayyorsiz.

TILLAR:
- Foydalanuvchi qaysi tilda murojaat qilsa (O'zbekcha, Ruscha, Inglizcha), shu tilda chiroyli, aniq va tushunarli javob bering.

FOYDALANUVCHI HAQIDA CONTEXT:
${userContextStr}

DO'KON HAQIDA TO'LIQ MA'LUMOT:
1. "Havas Market" - O'zbekistondagi eng tezkor va qulay onlayn gipermarket.
2. Yetkazib berish: Butun O'zbekiston bo'ylab 1 kunda (ertagayoq) BEPUL yetkazib beriladi! Topshirish punktlariga (PVZ) yoki kuryer orqali.
3. To'lov usullari: Qabul qilib olganda naqd yoki karta orqali, Payme, Click, Uzum orqali.
4. "Havas Nasiya" (Muddatli to'lov): 0-0-12 (0% boshlang'ich to'lov, 0% ortiqcha to'lov, 12 oygacha foizsiz bo'lib to'lash). Pasport va karta orqali 2 daqiqada rasmiylashtiriladi.
5. Qaytarish siyosati: 10 kun ichida tovar sifati yoki o'lchami yoqmasa, istalgan PVZ orqali bepul qaytarib berish mumkin.
6. Aloqa va qo'llab-quvvatlash: Admin telefon: +998 94 939 25 21, Call-center: +998 71 200 70 07.

TOPSHIRISH PUNKTLARI (PVZ):
${pvzSummaries}

KATEGORIYALAR:
${categoriesSummaries}

MAHSULOTLAR RO'YXATI (KATALOG):
${productSummaries}

MUHIM QOIDALAR:
1. Mahsulotlar haqida so'ralganda, narxlar, nasiya to'lovlari, chegirmalar va texnik xususiyatlarni aniq aytib bering.
2. AGAR BIRON BIR MAHSULOTNI TAVSIYA QILSANGIZ YOKI HAQIDA GAPIRSANGIZ, javobingiz ichiga mahsulot identifikatorini [[PRODUCT:prod-id]] shaklida qo'shing (masalan, [[PRODUCT:prod-1]], [[PRODUCT:prod-3]]). Tizim avtomatik ravishda ushbu tovar uchun chiroyli interaktiv xarid kartochkasini chiqarib beradi!
3. Agar foydalanuvchi do'kondan tashqari boshqa har qanday umumiy mavzuda (fan, texnologiya, matematika, hayotiy maslahat, tillar, umumiy bilim) savol bersa ham, "bilmayman" demasdan, har doim juda to'liq, aqlli va qiziqarli javob bering!
4. Javoblaringizni markdown formatida (qalin matn **text**, ro'yxatlar - element, abzaslar) chiroyli tuzing.
5. Doim xushmuomala, do'stona va professional ohangda gapiring.`;
}

/**
 * Sends messages to Gemini API
 */
export async function sendGeminiChatMessage({
  messages,
  systemPrompt,
  model = 'gemini-3.5-flash-lite'
}) {
  const modelsToTry = [model, 'gemini-3.5-flash', 'gemini-3.6-flash'];

  // Format history for Gemini API
  const formattedContents = messages.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  let lastError = null;

  for (const currentModel of modelsToTry) {
    try {
      const url = `${API_BASE_URL}/${currentModel}:generateContent?key=${GEMINI_API_KEY}`;
      
      const payload = {
        contents: formattedContents,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `HTTP error ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!replyText) {
        throw new Error("Bo'sh javob olindi");
      }

      return replyText;
    } catch (err) {
      console.warn(`Gemini model ${currentModel} failed:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error("Gemini xizmati bilan bog'lanishda xatolik yuz berdi");
}

/**
 * Extracts product IDs tagged in Gemini's response (e.g. [[PRODUCT:prod-1]])
 */
export function extractRecommendedProductIds(text) {
  if (!text) return [];
  const regex = /\[\[PRODUCT:(prod-[^\]]+)\]\]/gi;
  const ids = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!ids.includes(match[1])) {
      ids.push(match[1]);
    }
  }
  return ids;
}

/**
 * Cleans the product tag markers from display text
 */
export function cleanProductTags(text) {
  if (!text) return '';
  return text.replace(/\[\[PRODUCT:[^\]]+\]\]/gi, '').trim();
}
