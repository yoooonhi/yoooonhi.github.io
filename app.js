const rawInputEl = document.getElementById("rawInput");
const parseBtnEl = document.getElementById("parseBtn");
const clearBtnEl = document.getElementById("clearBtn");
const sampleBtnEl = document.getElementById("sampleBtn");
const pdfBtnEl = document.getElementById("pdfBtn");
const statusTextEl = document.getElementById("statusText");
const invoiceEl = document.getElementById("invoice");

const sellerFields = {
  name: document.getElementById("sellerName"),
  address: document.getElementById("sellerAddress"),
  taxId: document.getElementById("sellerTaxId"),
};

const buyerFields = {
  name: document.getElementById("buyerNameOverride"),
  vat: document.getElementById("buyerVatOverride"),
  address: document.getElementById("buyerAddressOverride"),
};

const SAMPLE_TEXT = `Apple
德国
搜索
订单详情  订单编号：# 303-5548706-1234567您的卖家订单编号：# 303-5548706-1234567
亚马逊的配送截至日期:  2026年3月6日周五 MET
购买日期:  2026年3月6日周五 19:53 MET
销售渠道:  Amazon.de
配送地址
Lena Müller
Hauptstraße 15
München, 80331
<<<<<<< HEAD
德国
=======
奥地利
>>>>>>> origin/master
联系买家:  Andrea
收税模型:  MarketplaceFacilitator
Legislation:  欧盟视同经销商
收税责任方:  Amazon EU S.a.r.L.
Apple iPhone 16e 128 GB: Entwickelt für Apple Intelligence, A18 Chip, Gigantische Batterielaufzeit, 48 MP Fusion Kamera, 6,1'' Super Retina XDR Display, Schwarz
ASIN: B012345678
SKU: TESE-0001
订单商品编号: 12345678910111
1  €6.71  €8.05
付款方式: 标准
商品总计:  €8.05
增值税总计:  €1.34
扣除增值税的销售收益:  €6.71`;

const COUNTRY_NAME_MAP = {
<<<<<<< HEAD
  阿拉伯联合酋长国: "United Arab Emirates",
  阿联酋: "United Arab Emirates",
  爱尔兰: "Ireland",
  澳大利亚: "Australia",
  比利时: "Belgium",
  波兰: "Poland",
  德国: "Germany",
  法国: "France",
  荷兰: "Netherlands",
  加拿大: "Canada",
  美国: "United States",
  墨西哥: "Mexico",
  日本: "Japan",
  瑞典: "Sweden",
  沙特阿拉伯: "Saudi Arabia",
  沙特: "Saudi Arabia",
  土耳其: "Turkey",
  西班牙: "Spain",
  意大利: "Italy",
  英国: "United Kingdom",
};

const COUNTRY_CODE_BY_NAME = {
  "united arab emirates": "AE",
  uae: "AE",
  ireland: "IE",
  australia: "AU",
  belgium: "BE",
  poland: "PL",
=======
  德国: "Germany",
  法国: "France",
  意大利: "Italy",
  西班牙: "Spain",
  奥地利: "Austria",
  荷兰: "Netherlands",
  比利时: "Belgium",
  葡萄牙: "Portugal",
  爱尔兰: "Ireland",
  匈牙利: "Hungary",
  丹麦: "Denmark",
  加拿大: "Canada",
  美国: "United States",
};

const COUNTRY_CODE_BY_NAME = {
>>>>>>> origin/master
  germany: "DE",
  france: "FR",
  italy: "IT",
  spain: "ES",
<<<<<<< HEAD
  netherlands: "NL",
  canada: "CA",
  "united states": "US",
  "united states of america": "US",
  usa: "US",
  mexico: "MX",
  japan: "JP",
  sweden: "SE",
  "saudi arabia": "SA",
  turkey: "TR",
  turkiye: "TR",
  "türkiye": "TR",
  "united kingdom": "UK",
  uk: "UK",
  "great britain": "UK",
  britain: "UK",
  deutschland: "DE",
  frankreich: "FR",
  belgien: "BE",
  polen: "PL",
  niederlande: "NL",
  irland: "IE",
  kanada: "CA",
  mexiko: "MX",
  schweden: "SE",
  türkei: "TR",
  spanien: "ES",
  italien: "IT",
  "vereinigtes königreich": "UK",
  england: "UK",
  阿拉伯联合酋长国: "AE",
  阿联酋: "AE",
  爱尔兰: "IE",
  澳大利亚: "AU",
  比利时: "BE",
  波兰: "PL",
=======
  belgium: "BE",
  netherlands: "NL",
  canada: "CA",
  kanada: "CA",
  "united states": "US",
  usa: "US",
  deutschland: "DE",
  frankreich: "FR",
  italien: "IT",
  spanien: "ES",
  belgien: "BE",
  niederlande: "NL",
>>>>>>> origin/master
  德国: "DE",
  法国: "FR",
  意大利: "IT",
  西班牙: "ES",
<<<<<<< HEAD
  荷兰: "NL",
  加拿大: "CA",
  美国: "US",
  墨西哥: "MX",
  日本: "JP",
  瑞典: "SE",
  沙特阿拉伯: "SA",
  沙特: "SA",
  土耳其: "TR",
  英国: "UK",
=======
  比利时: "BE",
  荷兰: "NL",
  加拿大: "CA",
  美国: "US",
>>>>>>> origin/master
};

const STANDARD_VAT_RATE_BY_COUNTRY = {
  DE: 19,
  FR: 20,
  IT: 22,
  ES: 21,
  BE: 21,
  NL: 21,
};

<<<<<<< HEAD
const CURRENCY_BY_COUNTRY_CODE = {
  AE: "AED",
  IE: "EUR",
  AU: "AUD",
  BE: "EUR",
  PL: "PLN",
  DE: "EUR",
  FR: "EUR",
  NL: "EUR",
  IT: "EUR",
  ES: "EUR",
  CA: "CAD",
  US: "USD",
  MX: "MXN",
  JP: "JPY",
  SE: "SEK",
  SA: "SAR",
  TR: "TRY",
  UK: "GBP",
};

=======
>>>>>>> origin/master
const COMMON_VAT_RATES = [0, 5, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27];

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function readSellerInfo() {
  return {
    name: sellerFields.name.value.trim(),
    address: sellerFields.address.value.trim(),
    taxId: sellerFields.taxId.value.trim(),
  };
}

function readBuyerOverrides() {
  return {
    name: buyerFields.name.value.trim(),
    vat: buyerFields.vat.value.trim(),
    address: buyerFields.address.value.trim(),
  };
}

function getFirstQueryParamValue(params, keys) {
  for (const key of keys) {
    const value = params.get(key);
    if (value != null) return value;
  }
  return null;
}

function normalizeParamText(value) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\\n/g, "\n")
    .trim();
}

function applySellerInfoFromQuery() {
  const hasLocation =
    typeof window !== "undefined" &&
    window.location &&
    typeof window.location.search === "string";
  if (!hasLocation) return false;

  const params = new URLSearchParams(window.location.search);
  const sellerName = getFirstQueryParamValue(params, ["seller_name", "sellerName", "seller"]);
  const sellerTaxId = getFirstQueryParamValue(params, [
    "seller_tax_id",
    "sellerTaxId",
    "seller_vat",
    "sellerVat",
    "vat_no",
    "vatNo",
  ]);
  const sellerAddress = getFirstQueryParamValue(params, ["seller_address", "sellerAddress"]);

  let applied = false;

  if (sellerName != null) {
    sellerFields.name.value = normalizeParamText(sellerName);
    applied = true;
  }

  if (sellerTaxId != null) {
    sellerFields.taxId.value = normalizeParamText(sellerTaxId);
    applied = true;
  }

  if (sellerAddress != null) {
    sellerFields.address.value = normalizeParamText(sellerAddress);
    applied = true;
  }

  return applied;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchOne(text, regex, group = 1) {
  const result = text.match(regex);
  return result?.[group]?.trim() || "";
}

function matchAllLast(text, regex, group = 1) {
  const all = [...text.matchAll(regex)];
  return all.length ? all[all.length - 1][group].trim() : "";
}

function parseMoney(value) {
  if (!value) return null;
  let str = String(value).replace(/[^\d.,-]/g, "").trim();
  if (!str) return null;

  const commaPos = str.lastIndexOf(",");
  const dotPos = str.lastIndexOf(".");

  if (commaPos >= 0 && dotPos >= 0) {
    if (commaPos > dotPos) {
      str = str.replace(/\./g, "").replace(",", ".");
    } else {
      str = str.replace(/,/g, "");
    }
  } else if (commaPos >= 0) {
    str = str.replace(",", ".");
  }

  const num = Number(str);
  return Number.isFinite(num) ? num : null;
}

<<<<<<< HEAD
function currencyTokenFromCountryCode(countryCode) {
  const code = String(countryCode || "").toUpperCase();
  const currencyCode = CURRENCY_BY_COUNTRY_CODE[code];

  if (currencyCode === "USD") return "US$";
  if (currencyCode === "CAD") return "CA$";
  if (currencyCode === "AUD") return "A$";
  if (currencyCode === "MXN") return "MX$";
  if (currencyCode === "JPY") return "¥";
  if (currencyCode === "GBP") return "£";
  if (currencyCode === "PLN") return "PLN";
  if (currencyCode === "SEK") return "SEK";
  if (currencyCode === "SAR") return "SAR";
  if (currencyCode === "TRY") return "TRY";
  if (currencyCode === "AED") return "AED";
  return "€";
}

function detectCurrency(text, marketCountryCode = "") {
  if (/(?:CA\$|C\$|\bCAD\b)/i.test(text)) return "CA$";
  if (/(?:US\$|\bUSD\b)/i.test(text)) return "US$";
  if (/(?:A\$|\bAUD\b)/i.test(text)) return "A$";
  if (/(?:MX\$|\bMXN\b)/i.test(text)) return "MX$";
  if (/\bPLN\b|zł/i.test(text)) return "PLN";
  if (/\bSEK\b|(?:^|[^A-Za-z])kr\.?(?:$|[^A-Za-z])/i.test(text)) return "SEK";
  if (/\bSAR\b/i.test(text)) return "SAR";
  if (/\bAED\b/i.test(text)) return "AED";
  if (/\bTRY\b|₺/i.test(text)) return "TRY";
  if (/\bJPY\b|[¥￥]/.test(text)) return "¥";
  if (/\bGBP\b|£/.test(text)) return "£";
  if (/€/.test(text) || /\bEUR\b/i.test(text)) return "€";

  const symbol = matchOne(text, /([$£¥￥₺])/);
  if (symbol === "$") {
    const byCountry = currencyTokenFromCountryCode(marketCountryCode);
    if (["CA$", "US$", "A$", "MX$"].includes(byCountry)) return byCountry;
    return "US$";
  }
  if (symbol === "¥" || symbol === "￥") return "¥";
  if (symbol === "₺") return "TRY";
  if (symbol) return symbol;

  return currencyTokenFromCountryCode(marketCountryCode);
}

function formatCurrencyWithIntl(
  num,
  locale,
  currencyCode,
  fallbackPrefix = "",
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
) {
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(num);
  if (!fallbackPrefix) return formatted;
  return formatted.includes(fallbackPrefix) ? formatted : formatted.replace("$", fallbackPrefix);
=======
function detectCurrency(text) {
  if (/CA\$/i.test(text)) return "CA$";
  if (/US\$/i.test(text)) return "US$";
  const symbol = matchOne(text, /([€$£¥])/);
  if (symbol) return symbol;
  return "€";
>>>>>>> origin/master
}

function formatMoney(value, symbol = "€") {
  const num = Number(value);
  if (!Number.isFinite(num)) return "";

  if (symbol === "€") {
<<<<<<< HEAD
    return formatCurrencyWithIntl(num, "de-DE", "EUR");
  }

  if (symbol === "US$") {
    return formatCurrencyWithIntl(num, "en-US", "USD", "US$");
  }

  if (symbol === "CA$") {
    return formatCurrencyWithIntl(num, "en-CA", "CAD", "CA$");
  }

  if (symbol === "A$") {
    return formatCurrencyWithIntl(num, "en-AU", "AUD", "A$");
  }

  if (symbol === "MX$") {
    return formatCurrencyWithIntl(num, "es-MX", "MXN", "MX$");
  }

  if (symbol === "£") {
    return formatCurrencyWithIntl(num, "en-GB", "GBP");
  }

  if (symbol === "¥") {
    return formatCurrencyWithIntl(num, "ja-JP", "JPY", "", 0, 0);
  }

  if (symbol === "PLN") {
    return formatCurrencyWithIntl(num, "pl-PL", "PLN");
  }

  if (symbol === "SEK") {
    return formatCurrencyWithIntl(num, "sv-SE", "SEK");
  }

  if (symbol === "SAR") {
    return formatCurrencyWithIntl(num, "en-SA", "SAR");
  }

  if (symbol === "TRY") {
    return formatCurrencyWithIntl(num, "tr-TR", "TRY");
  }

  if (symbol === "AED") {
    return formatCurrencyWithIntl(num, "en-AE", "AED");
  }

  return `${symbol} ${num.toFixed(2)}`;
=======
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }

  if (symbol === "US$") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(num)
      .replace("$", "US$");
  }

  if (symbol === "CA$") {
    const formatted = new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
    return formatted.includes("CA$") ? formatted : formatted.replace("$", "CA$");
  }

  return `${symbol}${num.toFixed(2)}`;
>>>>>>> origin/master
}

function extractMoneyByLabel(text, label, pick = "last") {
  const regex = new RegExp(
<<<<<<< HEAD
    `${escapeRegExp(label)}\\s*[:：]?\\s*([-+]?\\s*(?:[A-Za-z]{1,4}\\$?|[€$£¥￥₺])?\\s*[\\d.,]+)`,
=======
    `${escapeRegExp(label)}\\s*[:：]?\\s*([-+]?\\s*(?:[A-Za-z]{1,3}\\$|[€$£¥])?\\s*[\\d.,]+)`,
>>>>>>> origin/master
    "g",
  );
  const values = [...text.matchAll(regex)]
    .map((item) => parseMoney(item[1]))
    .filter((value) => value != null);
  if (!values.length) return null;
  return pick === "first" ? values[0] : values[values.length - 1];
}

function extractMoneyByAnyLabel(text, labels, pick = "last") {
  for (const label of labels) {
    const amount = extractMoneyByLabel(text, label, pick);
    if (amount != null) return amount;
  }
  return null;
}

function looksLikeAddressLine(value) {
  const text = String(value || "").trim();
  if (!text) return false;
  if (/,?\s*[A-Z]{2}\s+\d{5}(-\d{4})?$/.test(text)) return true;
  if (/\d{4,}/.test(text) && /,/.test(text)) return true;
  return false;
}

function normalizeTrailingCountryLine(addressLines) {
  if (!addressLines.length) return addressLines;

  const normalized = [...addressLines];
  const lastLine = normalized[normalized.length - 1].trim();
  if (!lastLine) return normalized;

  const mappedCountry = COUNTRY_NAME_MAP[lastLine];
  if (mappedCountry) {
    normalized[normalized.length - 1] = mappedCountry;
    return normalized;
  }

  // If the last line is Chinese and not in the map, drop it.
  if (/^[\u4e00-\u9fff\s·]+$/.test(lastLine)) {
    normalized.pop();
  }

  return normalized;
}

function findBuyerAndAddress(lines, fallbackBuyerName = "") {
  const start = lines.findIndex((line) => line.includes("配送地址"));
  if (start < 0) return { buyerName: "", buyerAddress: "" };

  const chunks = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    const current = lines[i].trim();
    if (!current) continue;
    if (current.includes("联系买家") || current.includes("更多详情")) break;
    chunks.push(current);
  }

  let buyerName = chunks[0] || "";
  let addressLines = chunks.slice(1);

  if (looksLikeAddressLine(buyerName) && fallbackBuyerName) {
    addressLines = chunks;
    buyerName = fallbackBuyerName;
  }

  addressLines = normalizeTrailingCountryLine(addressLines);

  return {
    buyerName,
    buyerAddress: addressLines.join(", "),
  };
}

function findProductName(lines) {
  const asinIndex = lines.findIndex((line) => /^ASIN\s*:/i.test(line.trim()));
  if (asinIndex < 1) return "";

  for (let i = asinIndex - 1; i >= 0; i -= 1) {
    const line = lines[i].trim();
    if (!line) continue;
    if (
      [
        "付款完成",
        "状态",
        "商品名称",
        "订单内容",
        "数量",
        "商品单价",
        "（不含增值税）",
        "（含增值税）",
      ].some((skip) => line.includes(skip))
    ) {
      continue;
    }
    return line;
  }
  return "";
}

function findQuantityAndPrices(text) {
  const byOrderItem = text.match(
<<<<<<< HEAD
    /订单商品编号:[^\n]*\n\s*(\d+)\s+([-+]?\s*(?:[A-Za-z]{1,4}\$?|[€$£¥￥₺])?\s*[\d.,]+)(?:\s+([-+]?\s*(?:[A-Za-z]{1,4}\$?|[€$£¥￥₺])?\s*[\d.,]+))?/,
=======
    /订单商品编号:[^\n]*\n\s*(\d+)\s+([-+]?\s*(?:[A-Za-z]{1,3}\$|[€$£¥])?\s*[\d.,]+)(?:\s+([-+]?\s*(?:[A-Za-z]{1,3}\$|[€$£¥])?\s*[\d.,]+))?/,
>>>>>>> origin/master
  );

  if (byOrderItem) {
    const firstPrice = parseMoney(byOrderItem[2]);
    const secondPrice = parseMoney(byOrderItem[3]);
    return {
      quantity: Number(byOrderItem[1]) || 1,
      unitPriceExVat: firstPrice,
      unitPriceIncVat: secondPrice ?? firstPrice,
    };
  }

  return {
    quantity: 1,
    unitPriceExVat: null,
    unitPriceIncVat: null,
  };
}

function buildInvoiceNo(orderId, purchaseDate, marketCountryCode = "") {
  const dateMatch = purchaseDate.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  const orderSuffix = orderId.replace(/\D/g, "").slice(-6) || "000000";
  const siteCode = String(marketCountryCode || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
  if (!dateMatch) return siteCode ? `INV-${siteCode}-${orderSuffix}` : `INV-${orderSuffix}`;

  const yyyy = dateMatch[1];
  const mm = dateMatch[2].padStart(2, "0");
  const dd = dateMatch[3].padStart(2, "0");
  return siteCode
    ? `INV-${yyyy}${mm}${dd}-${siteCode}-${orderSuffix}`
    : `INV-${yyyy}${mm}${dd}-${orderSuffix}`;
}

function parseOrderText(rawText) {
  const text = rawText.replace(/\r/g, "");
  const lines = text.split("\n");

  const orderId = matchOne(text, /订单编号：?#?\s*([0-9-]{10,})/);
  const purchaseDate = matchOne(text, /购买日期:\s*([^\n]+)/);
  const shippingDeadline = matchOne(text, /亚马逊的配送截至日期:\s*([^\n]+)/);
  const channel = matchOne(text, /销售渠道:\s*([^\n]+)/);
  const taxModel = matchOne(text, /收税模型:\s*([^\n]+)/);
  const legislation = matchOne(text, /Legislation:\s*([^\n]+)/);
  const taxCollector = matchOne(text, /收税责任方:\s*([^\n]+)/);
  const paymentMethod = matchOne(text, /付款方式:\s*([^\n]+)/);
  const asin = matchOne(text, /ASIN:\s*([A-Z0-9]+)/i);
  const sku = matchOne(text, /SKU:\s*([^\n]+)/i);
  const orderItemId = matchOne(text, /订单商品编号:\s*([0-9]+)/);
  const contactBuyer = matchOne(text, /联系买家:\s*([^\n]+)/);

  const productName = findProductName(lines);
  const { buyerName, buyerAddress } = findBuyerAndAddress(lines, contactBuyer);
  const { quantity, unitPriceExVat, unitPriceIncVat } = findQuantityAndPrices(text);
<<<<<<< HEAD
  const marketCountryCode = inferCountryCodeFromChannel(channel) || inferCountryCodeFromAddress(buyerAddress);

  const currency = detectCurrency(text, marketCountryCode);
=======

  const currency = detectCurrency(text);
>>>>>>> origin/master
  const totalIncVat = extractMoneyByAnyLabel(text, ["总和", "商品总计", "Total payable"], "first");
  const vatTotal = extractMoneyByAnyLabel(text, ["增值税总计", "税费总计", "税务", "Tax total"]);
  const netRevenue = extractMoneyByAnyLabel(text, ["扣除增值税的销售收益", "商品小计", "Item subtotal"], "first");
  const shippingCharge = extractMoneyByAnyLabel(text, [
    "Shipping Charge",
    "运费总额",
    "配送费总额",
    "运费",
  ]);
  const giftWrap = extractMoneyByAnyLabel(text, ["Gift Wrap", "礼品包装"]);
  const promotions = extractMoneyByAnyLabel(text, ["Promotions", "促销总额", "促销", "优惠"]);

  const effectiveIncVat = totalIncVat ?? unitPriceIncVat;
  const effectiveVat = vatTotal ?? null;
  const effectiveExVat = netRevenue ?? unitPriceExVat ?? (
    effectiveIncVat != null && effectiveVat != null ? effectiveIncVat - effectiveVat : null
  );
  const finalVat = effectiveVat ?? (
    effectiveIncVat != null && effectiveExVat != null ? effectiveIncVat - effectiveExVat : null
  );
<<<<<<< HEAD
=======
  const marketCountryCode = inferCountryCodeFromChannel(channel) || inferCountryCodeFromAddress(buyerAddress);
>>>>>>> origin/master

  return {
    orderId,
    invoiceNo: buildInvoiceNo(orderId, purchaseDate, marketCountryCode),
    purchaseDate,
    shippingDeadline,
    channel,
    paymentMethod,
    buyerName,
    buyerAddress,
    contactBuyer,
    productName,
    asin,
    sku,
    orderItemId,
    quantity,
    unitPriceExVat: effectiveExVat,
    unitPriceIncVat: effectiveIncVat,
    totalIncVat: effectiveIncVat,
    vatTotal: finalVat,
    netRevenue: effectiveExVat,
    marketCountryCode,
    shippingCharge,
    giftWrap,
    promotions,
    taxModel,
    legislation,
    taxCollector,
    currency,
  };
}

function requiredFieldsMissing(parsed) {
  return !parsed.orderId || !parsed.productName || !parsed.totalIncVat;
}

function toTemplateDate(rawValue) {
  if (!rawValue) return "-";
  const match = String(rawValue).match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!match) return rawValue;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const yyyy = Number(match[1]);
  const mm = Number(match[2]);
  const dd = Number(match[3]);
  if (mm < 1 || mm > 12) return rawValue;
  return `${String(dd).padStart(2, "0")} ${monthNames[mm - 1]} ${yyyy}`;
}

function toAddressLines(value) {
  if (!value) return "-";
  return escapeHtml(value)
    .replace(/\n/g, "<br/>")
    .replace(/,\s*/g, "<br/>");
}

function inferCountryCodeFromChannel(channel) {
  const value = String(channel || "").toLowerCase();
  if (!value) return "";
<<<<<<< HEAD
  if (/amazon\.ae/.test(value)) return "AE";
  if (/amazon\.ie/.test(value)) return "IE";
  if (/amazon\.(com\.au|au)/.test(value)) return "AU";
  if (/amazon\.(com\.be|be)/.test(value)) return "BE";
  if (/amazon\.pl/.test(value)) return "PL";
  if (/amazon\.de/.test(value)) return "DE";
  if (/amazon\.fr/.test(value)) return "FR";
  if (/amazon\.nl/.test(value)) return "NL";
  if (/amazon\.ca/.test(value)) return "CA";
  if (/amazon\.(com\.mx|mx)/.test(value)) return "MX";
  if (/amazon\.co\.jp/.test(value)) return "JP";
  if (/amazon\.se/.test(value)) return "SE";
  if (/amazon\.sa/.test(value)) return "SA";
  if (/amazon\.(com\.tr|tr)/.test(value)) return "TR";
  if (/amazon\.es/.test(value)) return "ES";
  if (/amazon\.it/.test(value)) return "IT";
  if (/amazon\.co\.uk/.test(value)) return "UK";
=======
  if (/amazon\.de/.test(value)) return "DE";
  if (/amazon\.fr/.test(value)) return "FR";
  if (/amazon\.it/.test(value)) return "IT";
  if (/amazon\.es/.test(value)) return "ES";
  if (/amazon\.nl/.test(value)) return "NL";
  if (/amazon\.com\.be/.test(value) || /amazon\.be/.test(value)) return "BE";
  if (/amazon\.ca/.test(value)) return "CA";
>>>>>>> origin/master
  if (/amazon\.com/.test(value)) return "US";
  return "";
}

function inferCountryCodeFromAddress(address) {
  const value = String(address || "");
  if (!value) return "";
  const lower = value.toLowerCase();
  for (const [name, code] of Object.entries(COUNTRY_CODE_BY_NAME)) {
    if (lower.includes(name.toLowerCase())) {
      return code;
    }
  }
  return "";
}

function roundToCents(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return null;
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function isRateConsistentWithRoundedAmounts(ratePercent, amounts) {
  const rate = Number(ratePercent);
  if (!Number.isFinite(rate) || rate < 0) return false;

  const totalIncVat = amounts?.totalIncVat;
  const netRevenue = amounts?.netRevenue;
  const vatTotal = amounts?.vatTotal;
  const hits = [];

  if (Number.isFinite(totalIncVat) && Number.isFinite(vatTotal)) {
    const vatFromGross = roundToCents(totalIncVat * (rate / (100 + rate)));
    hits.push(vatFromGross === roundToCents(vatTotal));
  }

  if (Number.isFinite(netRevenue) && Number.isFinite(vatTotal)) {
    const vatFromNet = roundToCents(netRevenue * (rate / 100));
    hits.push(vatFromNet === roundToCents(vatTotal));
  }

  if (Number.isFinite(totalIncVat) && Number.isFinite(netRevenue)) {
    const netFromGross = roundToCents(totalIncVat / (1 + rate / 100));
    hits.push(netFromGross === roundToCents(netRevenue));
  }

  if (!hits.length) return false;
  return hits.filter(Boolean).length >= 2 || hits.some(Boolean);
}

function formatVatRateDisplay(rate, marketCountryCode = "", amounts = {}) {
  const value = Number(rate);
  if (!Number.isFinite(value)) return "-";

  const normalizedCountryCode = String(marketCountryCode || "").toUpperCase();
  const standardRate = STANDARD_VAT_RATE_BY_COUNTRY[normalizedCountryCode];
  if (standardRate != null && isRateConsistentWithRoundedAmounts(standardRate, amounts)) {
    return `${standardRate}%`;
  }

  const consistentCommonRates = COMMON_VAT_RATES.filter((candidate) =>
    isRateConsistentWithRoundedAmounts(candidate, amounts),
  );
  if (consistentCommonRates.length) {
    const closestConsistentRate = consistentCommonRates.reduce((closest, candidate) => {
      const currentDiff = Math.abs(value - candidate);
      const bestDiff = Math.abs(value - closest);
      return currentDiff < bestDiff ? candidate : closest;
    }, consistentCommonRates[0]);
    return `${closestConsistentRate}%`;
  }

  if (standardRate != null && Math.abs(value - standardRate) <= 0.25) {
    return `${standardRate}%`;
  }

  const nearestCommonRate = COMMON_VAT_RATES.reduce((closest, candidate) => {
    const currentDiff = Math.abs(value - candidate);
    const bestDiff = Math.abs(value - closest);
    return currentDiff < bestDiff ? candidate : closest;
  }, COMMON_VAT_RATES[0]);

  // Amounts in order pages are rounded to cents; this keeps display aligned to legal rates (e.g. 19%).
  if (Math.abs(value - nearestCommonRate) <= 0.15) {
    return `${nearestCommonRate}%`;
  }

  return `${value.toFixed(2).replace(/\.00$/, "")}%`;
}

function renderInvoice(parsed, seller, buyerOverride) {
  const currency = parsed.currency || "€";

  const quantity = Number(parsed.quantity) > 0 ? Number(parsed.quantity) : 1;
  const unitPriceExVat = parsed.netRevenue != null ? parsed.netRevenue / quantity : null;
  const unitPriceIncVat = parsed.totalIncVat != null ? parsed.totalIncVat / quantity : null;
  const vatRate =
    parsed.vatTotal != null && parsed.netRevenue
      ? (parsed.vatTotal / parsed.netRevenue) * 100
      : null;
  const vatRateText = formatVatRateDisplay(vatRate, parsed.marketCountryCode, {
    totalIncVat: parsed.totalIncVat,
    netRevenue: parsed.netRevenue,
    vatTotal: parsed.vatTotal,
  });

  const shippingCharge = parsed.shippingCharge ?? null;
  const giftWrap = parsed.giftWrap ?? null;
  const promotions = parsed.promotions ?? null;
  const extraRows = [];
  if (shippingCharge != null) extraRows.push({ label: "Shipping charge", amount: shippingCharge });
  if (giftWrap != null) extraRows.push({ label: "Gift wrap", amount: giftWrap });
  if (promotions != null) extraRows.push({ label: "Promotions", amount: promotions });
  const hasExtraRows = extraRows.length > 0;

  const invoiceDate = toTemplateDate(parsed.purchaseDate);
  const deliveryDate = toTemplateDate(parsed.shippingDeadline || parsed.purchaseDate);
  const buyerName = buyerOverride.name || parsed.buyerName || parsed.contactBuyer || "-";
  const buyerAddress = buyerOverride.address || parsed.buyerAddress || "-";
  const buyerVat = buyerOverride.vat || "";
  const buyerVatLine = buyerVat ? `<p>VAT ID ${escapeHtml(buyerVat)}</p>` : "";
  const sellerName = seller.name || "Seller name not set";
  const sellerAddress = seller.address || "-";
  const sellerTaxId = (seller.taxId || "").trim();
  const sellerVatLine = sellerTaxId ? `<p>VAT ID ${escapeHtml(sellerTaxId)}</p>` : "";
  const isTaxInvoice = parsed.vatTotal != null && Math.abs(parsed.vatTotal) > 0.00001;
  const docTitle = isTaxInvoice ? "Invoice" : "Receipt";
  const docNoLabel = isTaxInvoice ? "Invoice number" : "Receipt number";
  const docDateLabel = isTaxInvoice ? "Delivery date" : "Receipt date";
  const detailsTitle = isTaxInvoice ? "Invoice details" : "Receipt details";
  const refNo = parsed.orderItemId || parsed.orderId || "-";

  const detailsHead = isTaxInvoice
    ? `
        <tr>
          <th>Description</th>
          <th class="num-cell">Qty</th>
          <th class="num-cell">Unit price<br/>(excl. VAT)</th>
          <th class="num-cell">VAT %</th>
          <th class="num-cell">Unit price<br/>(incl. VAT)</th>
          <th class="num-cell">Subtotal<br/>(incl. VAT)</th>
        </tr>
      `
    : `
        <tr>
          <th>Description</th>
          <th class="num-cell">Qty</th>
          <th class="num-cell">Subtotal</th>
        </tr>
      `;

  const productDetails = `
    <strong>${escapeHtml(parsed.productName || "-")}</strong><br/>
    ${parsed.asin ? `ASIN: ${escapeHtml(parsed.asin)}` : ""}
  `;

  const mainLineRow = isTaxInvoice
    ? `
        <tr>
          <td class="desc-cell">${productDetails}</td>
          <td class="num-cell">${escapeHtml(quantity)}</td>
          <td class="num-cell">${escapeHtml(formatMoney(unitPriceExVat, currency) || "-")}</td>
          <td class="num-cell">${escapeHtml(vatRateText)}</td>
          <td class="num-cell">${escapeHtml(formatMoney(unitPriceIncVat, currency) || "-")}</td>
          <td class="num-cell">${escapeHtml(formatMoney(parsed.totalIncVat, currency) || "-")}</td>
        </tr>
      `
    : `
        <tr>
          <td class="desc-cell">${productDetails}</td>
          <td class="num-cell">${escapeHtml(quantity)}</td>
          <td class="num-cell">${escapeHtml(formatMoney(parsed.totalIncVat, currency) || "-")}</td>
        </tr>
      `;

  const extraRowsHtml = extraRows
    .map((row) => {
      if (isTaxInvoice) {
        return `
          <tr class="minor-row">
            <td class="desc-cell">${escapeHtml(row.label)}</td>
            <td class="num-cell"></td>
            <td class="num-cell"></td>
            <td class="num-cell"></td>
            <td class="num-cell"></td>
            <td class="num-cell">${escapeHtml(formatMoney(row.amount, currency) || "-")}</td>
          </tr>
        `;
      }
      return `
        <tr class="minor-row">
          <td class="desc-cell">${escapeHtml(row.label)}</td>
          <td class="num-cell"></td>
          <td class="num-cell">${escapeHtml(formatMoney(row.amount, currency) || "-")}</td>
        </tr>
      `;
    })
    .join("");

  const vatSummaryBlock = isTaxInvoice
    ? `
      <section class="vat-breakdown">
        <table>
          <thead>
            <tr>
              <th>VAT %</th>
              <th class="num-cell">Subtotal<br/>(excl. VAT)</th>
              <th class="num-cell">VAT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${escapeHtml(vatRateText)}</td>
              <td class="num-cell">${escapeHtml(formatMoney(parsed.netRevenue, currency) || "-")}</td>
              <td class="num-cell">${escapeHtml(formatMoney(parsed.vatTotal, currency) || "-")}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>VAT Total</td>
              <td class="num-cell">${escapeHtml(formatMoney(parsed.netRevenue, currency) || "-")}</td>
              <td class="num-cell">${escapeHtml(formatMoney(parsed.vatTotal, currency) || "-")}</td>
            </tr>
          </tfoot>
        </table>
      </section>
    `
    : "";

  const footerNote = isTaxInvoice
    ? ""
    : "Deemed supply to Amazon solely for VAT purposes";

  invoiceEl.classList.remove("empty-state");
  invoiceEl.classList.add("official-template");
  invoiceEl.innerHTML = `
    <div class="invoice-doc">
      <section class="invoice-page template-page">
        <div class="top-blue-bar"></div>
        <header class="template-header">
          <h3>${docTitle}</h3>
        </header>

        <section class="doc-top-grid">
          <article class="customer-block">
            <p>${escapeHtml(buyerName)}</p>
            <p>${toAddressLines(buyerAddress)}</p>
            ${buyerVatLine}
          </article>

          <article class="summary-card">
            <div class="summary-row"><span>Payment reference number</span><strong>${escapeHtml(refNo)}</strong></div>
            <div class="summary-row"><span>Sold by</span><strong>${escapeHtml(sellerName)}</strong></div>
            <div class="summary-divider"></div>
            <div class="summary-row"><span>${docDateLabel}</span><strong>${escapeHtml(deliveryDate)}</strong></div>
            <div class="summary-row"><span>${docNoLabel}</span><strong>${escapeHtml(parsed.invoiceNo)}</strong></div>
            <div class="summary-row total-row"><span>Total payable</span><strong>${escapeHtml(formatMoney(parsed.totalIncVat, currency) || "-")}</strong></div>
          </article>
        </section>

        <div class="template-separator"></div>

        <section class="address-grid">
          <article class="address-card">
            <h4>Billing address</h4>
            <p>${escapeHtml(buyerName)}</p>
            <p>${toAddressLines(buyerAddress)}</p>
            ${buyerVatLine}
          </article>
          <article class="address-card">
            <h4>Delivery address</h4>
            <p>${escapeHtml(buyerName)}</p>
            <p>${toAddressLines(buyerAddress)}</p>
          </article>
          <article class="address-card">
            <h4>Sold by</h4>
            <p>${escapeHtml(sellerName)}</p>
            <p>${toAddressLines(sellerAddress)}</p>
            ${sellerVatLine}
          </article>
        </section>

        <div class="template-separator"></div>

        <section class="order-info">
          <h4>Order information</h4>
          <div class="order-info-table">
            <div><span>Order date</span><strong>${escapeHtml(invoiceDate)}</strong></div>
            <div><span>Order number</span><strong>${escapeHtml(parsed.orderId || "-")}</strong></div>
          </div>
        </section>
        <div class="template-separator"></div>

        <section class="invoice-details-block">
          <h4>${detailsTitle}</h4>
          <table class="template-lines">
            <thead>${detailsHead}</thead>
            <tbody>
              ${mainLineRow}
              ${extraRowsHtml}
            </tbody>
          </table>
        </section>

        <div class="grand-total${hasExtraRows ? "" : " no-extra-rows"}">
          <span>Total amount</span>
          <strong>${escapeHtml(formatMoney(parsed.totalIncVat, currency) || "-")}</strong>
        </div>
        ${vatSummaryBlock}
        <footer class="page-footer">
          <div class="footer-note">${footerNote}</div>
          <div class="footer-page">Page <strong>1</strong> of <strong>1</strong></div>
        </footer>
      </section>
    </div>
  `;
}

function printInvoiceWithoutFileUrl() {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    setStatus("浏览器拦截了弹窗，请允许弹窗后重试。", "error");
    return;
  }

  const invoiceMarkup = invoiceEl.outerHTML;
  const printHtml = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Invoice</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            background: #fff;
            color: #222;
            font-family: Arial, Helvetica, sans-serif;
          }
          .invoice {
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            min-height: auto !important;
            padding: 0 !important;
            width: auto !important;
            max-width: none !important;
            background: #fff !important;
          }
          .invoice-doc {
            background: #fff;
          }
          .template-page {
            width: 210mm;
            height: 297mm;
            margin: 0 auto;
            padding: 0 10mm 8mm;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            background: #fff;
            page-break-after: auto;
            overflow: hidden;
            color: #23282c;
          }
          .top-blue-bar {
            height: 14px;
            background: #333b41;
            margin: 0 -10mm 7px;
          }
          .template-header {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 4px;
          }
          .template-header h3 {
            margin: 0;
            font-size: 34px;
            font-weight: 600;
            color: #31363a;
          }
          .doc-top-grid {
            margin-top: 6px;
            display: grid;
            grid-template-columns: 1fr 360px;
            gap: 22px;
            align-items: start;
          }
          .customer-block {
            margin-top: 102px;
            font-size: 12px;
            line-height: 1.35;
          }
          .customer-block p {
            margin: 2px 0;
          }
          .summary-card {
            background: #e9f1f6;
            border: 1px solid #cad8e2;
            padding: 11px 12px;
            font-size: 12px;
          }
          .summary-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin: 4px 0;
          }
          .summary-row strong {
            font-weight: 600;
            word-break: break-word;
          }
          .summary-divider {
            margin: 7px 0;
            border-top: 1px solid #c8d5df;
          }
          .summary-row.total-row {
            margin-top: 7px;
            font-weight: 700;
          }
          .vat-declare-box {
            width: 360px;
            margin-left: auto;
            margin-top: 8px;
            border: 1px solid #ccd3da;
            font-size: 11px;
          }
          .vat-declare-box div {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            padding: 8px 10px;
          }
          .vat-declare-box div + div {
            border-top: 1px solid #d6dde3;
          }
          .vat-declare-box strong {
            font-weight: 600;
            word-break: break-word;
          }
          .support-line {
            margin: 14px 0 6px;
            font-size: 11px;
          }
          .support-link {
            color: #3557c2;
            font-weight: 700;
          }
          .template-separator {
            border-top: 1px solid #cfd6dc;
            margin: 9px 0;
          }
          .address-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 18px;
            font-size: 11px;
          }
          .address-card h4 {
            margin: 0 0 7px;
            font-size: 18px;
            font-weight: 700;
            color: #262a2d;
          }
          .address-card p {
            margin: 2px 0;
            line-height: 1.3;
          }
          .order-info {
            margin-top: 2px;
            font-size: 11px;
          }
          .order-info h4 {
            margin: 0 0 6px;
            font-size: 18px;
            font-weight: 700;
          }
          .order-info-table {
            max-width: 420px;
          }
          .order-info-table div {
            display: grid;
            grid-template-columns: 120px 1fr;
            gap: 12px;
            margin: 4px 0;
          }
          .order-info-table strong {
            font-weight: 600;
          }
          .invoice-details-block h4 {
            margin: 0 0 6px;
            font-size: 22px;
            font-weight: 700;
          }
          .template-lines {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
          }
          .template-lines th {
            text-align: left;
            font-weight: 700;
            padding: 7px 6px;
            border-top: 1px solid #d7dde2;
            border-bottom: 1px solid #d7dde2;
            background: #f4f5f6;
          }
          .template-lines td {
            padding: 6px 6px;
            border-bottom: 1px solid #e6eaee;
            vertical-align: top;
          }
          .template-lines .desc-cell {
            line-height: 1.35;
          }
          .template-lines .minor-row td {
            padding-top: 5px;
            padding-bottom: 5px;
            border-bottom: none;
          }
          .num-cell {
            text-align: right;
            white-space: nowrap;
          }
          .grand-total {
            margin-top: 8px;
            border-top: 1px solid #d1d7dc;
            padding-top: 7px;
            display: flex;
            justify-content: flex-end;
            align-items: baseline;
            gap: 34px;
          }
          .grand-total.no-extra-rows {
            border-top: none;
            padding-top: 0;
            margin-top: 6px;
          }
          .grand-total span {
            font-size: 30px;
            font-weight: 700;
            color: #32373b;
          }
          .grand-total strong {
            font-size: 32px;
            font-weight: 700;
            color: #2a2f33;
          }
          .vat-breakdown {
            margin-top: 7px;
            margin-left: auto;
            width: 54%;
          }
          .vat-breakdown table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
          }
          .vat-breakdown th,
          .vat-breakdown td {
            text-align: right;
            padding: 6px 6px;
            border-bottom: 1px solid #e1e6ea;
          }
          .vat-breakdown th:first-child,
          .vat-breakdown td:first-child {
            text-align: left;
          }
          .vat-breakdown tfoot td {
            font-weight: 700;
          }
          .page-footer {
            margin-top: auto;
            border-top: 1px solid #cfd6dc;
            padding-top: 7px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            gap: 14px;
          }
          .footer-note {
            max-width: 68%;
            font-size: 9px;
            color: #7a7f84;
            line-height: 1.35;
          }
          .footer-page {
            font-size: 16px;
            color: #63686d;
            white-space: nowrap;
          }
          @media print {
            @page {
              size: A4;
              margin: 0;
            }
            body {
              padding: 0;
            }
            .template-page {
              margin: 0;
              height: 297mm;
            }
          }
        </style>
      </head>
      <body>
        ${invoiceMarkup}
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(printHtml);
  printWindow.document.close();
  printWindow.addEventListener("afterprint", () => printWindow.close());
  printWindow.focus();
  printWindow.print();
}

function setStatus(message, type = "") {
  statusTextEl.textContent = message;
  statusTextEl.classList.remove("error", "ok");
  if (type) statusTextEl.classList.add(type);
}

function parseAndRender() {
  const rawText = rawInputEl.value.trim();
  if (!rawText) {
    setStatus("请先粘贴订单文本。", "error");
    return;
  }

  const parsed = parseOrderText(rawText);
  if (requiredFieldsMissing(parsed)) {
    setStatus("解析不完整：至少需要识别到订单号、商品名和商品总计。", "error");
    return;
  }

  const seller = readSellerInfo();
  const buyerOverride = readBuyerOverrides();
  renderInvoice(parsed, seller, buyerOverride);
  setStatus(`解析成功：订单 ${parsed.orderId}，可以导出 PDF。`, "ok");
}

applySellerInfoFromQuery();

parseBtnEl.addEventListener("click", parseAndRender);

let autoParseTimer = null;
function scheduleAutoParse(delayMs = 450) {
  if (autoParseTimer) clearTimeout(autoParseTimer);
  autoParseTimer = setTimeout(() => {
    const hasText = rawInputEl.value.trim().length > 0;
    if (hasText) parseAndRender();
  }, delayMs);
}

rawInputEl.addEventListener("input", () => {
  scheduleAutoParse(450);
});

rawInputEl.addEventListener("paste", () => {
  // Wait for pasted content to land in textarea, then parse immediately.
  scheduleAutoParse(30);
});

clearBtnEl.addEventListener("click", () => {
  rawInputEl.value = "";
  invoiceEl.className = "invoice empty-state";
  invoiceEl.innerHTML = `
    <p class="empty-title">暂无发票内容</p>
    <p class="empty-desc">请先在左侧粘贴订单文本，再点击“解析并生成”。</p>
  `;
  setStatus("已清空，等待新的订单文本。");
});

sampleBtnEl.addEventListener("click", () => {
  rawInputEl.value = SAMPLE_TEXT;
  parseAndRender();
});

pdfBtnEl.addEventListener("click", () => {
  if (invoiceEl.classList.contains("empty-state")) {
    setStatus("请先生成发票，再导出 PDF。", "error");
    return;
  }
  printInvoiceWithoutFileUrl();
});

const autoRefreshFields = [...Object.values(sellerFields), ...Object.values(buyerFields)];
autoRefreshFields.forEach((field) => {
  field.addEventListener("change", () => {
    if (!invoiceEl.classList.contains("empty-state")) {
      parseAndRender();
    }
  });
});
