import express, { type Request, type Response } from "express";
import cors from "cors";
import { load } from "cheerio";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/products", async (req: Request, res: Response) => {
  const query = req.query["query"] as string;
  res.json(await ProductService.getProducts(query));
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
  image: string;
  images: string[];
  link: string;
}

class ProductService {
  static KASPI_SHOP_BASE_URL = `https://kaspi.kz/shop`;

  static async getProducts(query: string): Promise<Product[]> {
    const url = this.getProductListUrl(query);
    const headers = this.getHeaders();

    try {
      const response = await fetch(url, { headers });
      const data: any = await response.json();
      const products = await Promise.all(
        data.data.cards.map(async (item: any) => {
          const description = await this.getDescription(item.shopLink);
          const product: Product = {
            id: parseInt(item.id),
            name: item.title,
            description: description,
            price: item.unitSalePrice,
            rating: item.rating,
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

  static getProductListUrl(query: string) {
    return `https://kaspi.kz/yml/product-view/pl/filters?text=${query}`;
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
}
