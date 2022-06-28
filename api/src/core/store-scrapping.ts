import { Product } from "../dtos/product";

export interface StoreScrapping {
  search(criteria: string): Promise<Product[]>;
}
