import { StoreScrapping } from "../core/store-scrapping";
import { Product } from "../dtos/product";

import { ChedrauiScrapping } from "../stores/chedraui-scrapping";
import { SorianaScrapping } from "../stores/soriana-scrapping";

export class StoreService {
  #stores: Map<string, StoreScrapping> = new Map();
  #storeName: string;

  constructor(storeName: string) {
    this.#stores.set("chedraui", new ChedrauiScrapping());
    this.#stores.set("soriana", new SorianaScrapping());

    this.#storeName = storeName;
  }

  async search(productName: string): Promise<Product[]> {
    const storeScrapping: StoreScrapping = this.#stores.get(this.#storeName);
    return storeScrapping.search(productName);
  }
}
