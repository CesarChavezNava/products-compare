import { Request, Response } from "express";
import { Product } from "../dtos/product";
import { StoreService } from "../services/store.service";

export class ProductController {
  async get(req: Request, res: Response): Promise<void> {
    try {
      const storeService: StoreService = new StoreService(
        req.params.storeName.toString()
      );
      const products: Product[] = await storeService.search(
        req.query.productName.toString()
      );

      res.status(200).send(res.json(products));
    } catch (error) {
      res.status(500).send(res.json({ message: error.message }));
    }
  }
}

export const productController: ProductController = new ProductController();
