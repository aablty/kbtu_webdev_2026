import express, { type Request, type Response } from "express";
import cors from "cors";
import { load } from "cheerio";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/products", async (req: Request, res: Response) => {
  const text = (req.query["text"] as string) ?? "";
  const page = ((req.query["page"] as string) ?? "0").toString();
  const q = (req.query["q"] as string) ?? "";

  const sort = (req.query["sort"] as string) ?? "relevance";

  res.json(await ProductService.getProducts(text, page, q, sort as any));
});

app.get("/categories", async (req: Request, res: Response) => {
  const text = (req.query["text"] as string) ?? "";
  const q = (req.query["q"] as string) ?? "";

  res.json(await ProductService.getCategories(text, q));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// =============================================================

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewsQuantity: number;
  image: string;
  images: string[];
  link: string;
}

class ProductService {
  static KASPI_SHOP_BASE_URL = `https://kaspi.kz/shop`;
  static KASPI_PRODUCTS_API_BASE_URL = "https://kaspi.kz/yml/product-view/pl";

  static async getProducts(
    query: string,
    page: string,
    q: string,
    sort: "relevance" | "created-desc" | "price-asc" | "price-desc" | "rating",
  ): Promise<Product[]> {
    const url = this.getProductListUrl(query, page, q, sort);
    const headers = this.getHeaders();

    try {
      const response = await fetch(url, { headers });
      const data: any = await response.json();
      const products = await Promise.all(
        data.data.map(async (item: any) => {
          const description = await this.getDescription(item.shopLink);
          const product: Product = {
            id: parseInt(item.id),
            name: item.title,
            description: description,
            price: item.unitSalePrice,
            rating: item.rating,
            reviewsQuantity: item.reviewsQuantity ?? 0,
            image: item.previewImages[0].large,
            images: item.previewImages.map((img: any) => img.large),
            link: this.KASPI_SHOP_BASE_URL + item.shopLink,
          };
          return product;
        }),
      );
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  static async getCategories(text: string, q: string): Promise<any> {
    const url = this.getFiltersUrl(text, q);
    const headers = this.getHeaders();

    try {
      const response = await fetch(url, { headers });
      const data: any = await response.json();
      return this.sanitizeTreeCategory(data?.data?.treeCategory ?? {});
    } catch (error) {
      console.error("Error fetching categories:", error);
      return {};
    }
  }

  static getHeaders() {
    return {
      Host: "kaspi.kz",
      Origin: "https://kaspi.kz",
      Referer: "https://kaspi.kz/shop/p/",
      "Content-Type": "application/json; charset=UTF-8",
      Accept: "application/json, text/*",
      Cookie:
        "redirected=true; locale=ru-RU; ssaid=cbfcf860-0b65-11ee-9d37-d925727a2869; test.user.group=58; test.user.group_exp=57; test.user.group_exp2=82",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    };
  }

  static getProductListUrl(
    text: string,
    page: string,
    q: string,
    sort: "relevance" | "created-desc" | "price-asc" | "price-desc" | "rating",
  ): string {
    const url = new URL(`${this.KASPI_PRODUCTS_API_BASE_URL}/results`);
    url.searchParams.set("page", page);
    url.searchParams.set("q", ":availableInZones:Magnum_ZONE1" + q);
    url.searchParams.set("text", text);
    url.searchParams.set("sort", sort);
    url.searchParams.set("qs", "");
    url.searchParams.set("ui", "d");
    url.searchParams.set("i", "-1");
    url.searchParams.set("c", "750000000");
    return url.toString();
  }

  static getFiltersUrl(text: string, q: string): string {
    const url = new URL(`${this.KASPI_PRODUCTS_API_BASE_URL}/filters`);
    url.searchParams.set("text", text);
    url.searchParams.set("page", "0");
    url.searchParams.set("all", "false");
    url.searchParams.set("fl", "true");
    url.searchParams.set("ui", "d");
    url.searchParams.set("q", ":availableInZones:Magnum_ZONE1" + q);
    url.searchParams.set("i", "-1");
    url.searchParams.set("c", "750000000");
    return url.toString();
  }

  static async getDescription(shopLink: string): Promise<string> {
    const url = `${this.KASPI_SHOP_BASE_URL}${shopLink}`;
    const headers = this.getHeaders();

    try {
      const response = await fetch(url, { headers });
      const data: any = await response.text();
      return this.extractDescription(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      return "No description available";
    }
  }

  static extractDescription(html: any): string {
    try {
      const $ = load(html);
      return $(".description").text().trim() || "No description found";
    } catch (error) {
      console.error("Error extracting description:", error);
      return "No description available";
    }
  }

  static sanitizeTreeCategory(input: any): any {
    if (Array.isArray(input)) {
      return input.map((item) => this.sanitizeTreeCategory(item));
    }

    if (input && typeof input === "object") {
      const blockedKeys = new Set([
        "link",
        "active",
        "popularity",
        "expanded",
        "titleRu",
      ]);
      const sanitized: Record<string, any> = {};

      for (const [key, value] of Object.entries(input)) {
        if (blockedKeys.has(key)) {
          continue;
        }
        sanitized[key] = this.sanitizeTreeCategory(value);
      }

      return sanitized;
    }

    return input;
  }
}
