import cheerio from "cheerio";
import request from "request-promise";

import { StoreScrapping } from "../core/store-scrapping";
import { Product } from "../dtos/product";

export class ChedrauiScrapping implements StoreScrapping {
  #url: string = "https://www.chedraui.com.mx";

  async search(criteria: string): Promise<Product[]> {
    const response = await request(`${this.#url}/search?text=${criteria}`);
    const $ = cheerio.load(response);

    const products: Product[] = [];
    $(".js-plp-product-click").each((index, element) => {
      const inputName = $(element).find(`.productClickData_plp_name_${index}`);
      const inputPrice = $(element).find(
        `.productClickData_plp_price_${index}`
      );
      const imgSrc = $(element)
        .find("a")
        .find(".plp-product-thumb")
        .find("img")
        .attr("src");

      products.push({
        description: $(inputName).val(),
        price: Number.parseFloat($(inputPrice).val()),
        imageUrl: `${this.#url}/${imgSrc}`,
      } as Product);
    });

    return products;
  }
}
