import cheerio from "cheerio";
import request from "request-promise";

import { StoreScrapping } from "../core/store-scrapping";
import { Product } from "../dtos/product";

export class SorianaScrapping implements StoreScrapping {
  #url: string = "https://www.soriana.com";

  async search(criteria: string): Promise<Product[]> {
    const response = await request(`${this.#url}/buscar?q=${criteria}`);
    const $ = cheerio.load(response);

    const products: Product[] = [];
    $(".list-item-product").each((index, element) => {
      console.log($(element).html());
      const name = $(element)
        .find(".product")
        .find(".product-tile")
        .find(".tile-body")
        .find(".pdp-link")
        .find("a")
        .text()
        .trim();
      const price = $(element)
        .find(".product")
        .find(".product-tile")
        .find(".tile-body")
        .find(".price")
        .find(".price")
        .find(".contentPrices")
        .find(".sales")
        .find("span")
        .attr("content");
      const imgSrc = $(element)
        .find(".product")
        .find(".product-tile")
        .find(".image-container")
        .find(".justify-content-center")
        .find("img")
        .attr("src");

      products.push({
        description: name,
        price: Number.parseFloat(price),
        imageUrl: imgSrc,
      } as Product);
    });

    return products;
  }
}
